export const DB_NAME = 'home-workout-tracker';
export const DB_VERSION = 1;
export const STORE_NAMES = ['exercises', 'templates', 'workoutSessions', 'exerciseSets', 'cardioSessions', 'bodyMetrics'];

const openRequest = () => new Promise((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onupgradeneeded = () => {
    const db = request.result;
    const create = (name, options, indexes = []) => {
      if (db.objectStoreNames.contains(name)) return;
      const store = db.createObjectStore(name, options);
      indexes.forEach(([key, path]) => store.createIndex(key, path));
    };
    create('exercises', { keyPath: 'id' });
    create('templates', { keyPath: 'id' });
    create('workoutSessions', { keyPath: 'id' }, [['byStart','startTimestamp'], ['byDate','workoutDate'], ['byTemplate','templateId']]);
    create('exerciseSets', { keyPath: 'id' }, [['bySession','workoutSessionId'], ['byExercise','exerciseId'], ['byExerciseFinished','exerciseFinished']]);
    create('cardioSessions', { keyPath: 'id' }, [['byTimestamp','timestamp']]);
    create('bodyMetrics', { keyPath: 'id' }, [['byDate','date']]);
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

export async function db() { return openRequest(); }
export async function get(store, key) { const d = await db(); return new Promise((resolve,reject) => { const r=d.transaction(store).objectStore(store).get(key); r.onsuccess=()=>resolve(r.result); r.onerror=()=>reject(r.error); }); }
export async function getAll(store) { const d = await db(); return new Promise((resolve,reject) => { const r=d.transaction(store).objectStore(store).getAll(); r.onsuccess=()=>resolve(r.result); r.onerror=()=>reject(r.error); }); }
export async function put(store, value) { const d=await db(); return new Promise((resolve,reject) => { const r=d.transaction(store,'readwrite').objectStore(store).put(value); r.onsuccess=()=>resolve(value); r.onerror=()=>reject(r.error); }); }
export async function putMany(store, values) { const d=await db(); return new Promise((resolve,reject) => { const tx=d.transaction(store,'readwrite'); values.forEach(value=>tx.objectStore(store).put(value)); tx.oncomplete=()=>resolve(values); tx.onerror=()=>reject(tx.error); }); }
export async function byIndex(store, index, value) { const d=await db(); return new Promise((resolve,reject) => { const r=d.transaction(store).objectStore(store).index(index).getAll(value); r.onsuccess=()=>resolve(r.result); r.onerror=()=>reject(r.error); }); }
export async function clearAll() { const d=await db(); return new Promise((resolve,reject) => { const tx=d.transaction(STORE_NAMES,'readwrite'); STORE_NAMES.forEach(name=>tx.objectStore(name).clear()); tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error); }); }
export async function replaceAll(records) { const d=await db(); return new Promise((resolve,reject) => { const tx=d.transaction(STORE_NAMES,'readwrite'); STORE_NAMES.forEach(name=>{ const s=tx.objectStore(name); s.clear(); (records[name] || []).forEach(row=>s.put(row)); }); tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error); }); }
