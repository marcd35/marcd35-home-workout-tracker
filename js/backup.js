import { DB_NAME, DB_VERSION, STORE_NAMES, getAll, replaceAll } from './db.js';

const required = {
  exercises: ['id','name'], templates: ['id','name'], workoutSessions: ['id','workoutDate','startTimestamp','completionStatus'],
  exerciseSets: ['id','workoutSessionId','exerciseId','setNumber'], cardioSessions: ['id','timestamp'], bodyMetrics: ['id','date']
};
export async function makeBackup() {
  const records = Object.fromEntries(await Promise.all(STORE_NAMES.map(async name => [name, await getAll(name)])));
  return { format: 'home-workout-tracker-backup', version: 1, database: { name: DB_NAME, version: DB_VERSION }, exportedAt: new Date().toISOString(), records };
}
export function validateBackup(value) {
  if (!value || value.format !== 'home-workout-tracker-backup' || value.version !== 1 || !value.records) throw new Error('This is not a supported Home Workout Tracker backup.');
  for (const store of STORE_NAMES) {
    if (!Array.isArray(value.records[store])) throw new Error(`Backup is missing the ${store} collection.`);
    for (const row of value.records[store]) for (const field of required[store]) if (row[field] === undefined || row[field] === null || row[field] === '') throw new Error(`${store} contains a record missing ${field}.`);
  }
  return value;
}
export async function restoreBackup(value) { return replaceAll(validateBackup(value).records); }
export function toCsv(rows) {
  const headers=['workout date','workout name','exercise','set number','reps','weight','weight unit','assistance','set duration','rest duration'];
  const quote=value => `"${String(value ?? '').replaceAll('"','""')}"`;
  return [headers, ...rows.map(row => headers.map(header=>row[header]))].map(row=>row.map(quote).join(',')).join('\n');
}
export async function makeSetCsv() {
  const [sessions, sets, exercises, templates] = await Promise.all(['workoutSessions','exerciseSets','exercises','templates'].map(getAll));
  const sessionById=Object.fromEntries(sessions.map(x=>[x.id,x])); const exerciseById=Object.fromEntries(exercises.map(x=>[x.id,x])); const templateById=Object.fromEntries(templates.map(x=>[x.id,x]));
  return toCsv(sets.sort((a,b)=>a.exerciseFinished-b.exerciseFinished).map(set=>{ const session=sessionById[set.workoutSessionId]||{}; return {'workout date':session.workoutDate,'workout name':templateById[session.templateId]?.name || session.templateName,'exercise':exerciseById[set.exerciseId]?.name || set.exerciseId,'set number':set.setNumber,reps:set.reps,weight:set.weight,'weight unit':set.weightUnit,assistance:set.assistanceWeight,'set duration':set.setDuration,'rest duration':set.restDuration}; }));
}
export function download(text, filename, type) { const link=document.createElement('a'); link.href=URL.createObjectURL(new Blob([text],{type})); link.download=filename; link.click(); setTimeout(()=>URL.revokeObjectURL(link.href),1000); }
