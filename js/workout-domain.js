export function advanceAfterSkippedSet(active, item, workoutSessionId, timestamp) {
  const isFinalSet = active.setNo >= item.setTarget;
  return {
    active: { index: isFinalSet ? active.index + 1 : active.index, setNo: isFinalSet ? 1 : active.setNo + 1, setStartedAt: null },
    skippedSet: { workoutSessionId, exerciseId: item.exerciseId, setNumber: active.setNo, timestamp, status: 'skipped' },
    startsRest: false
  };
}

export function mergeCatalogMetadata(records, seedRecords) {
  const seedById = new Map(seedRecords.map(record => [record.id, record]));
  return records.map(record => {
    const seed = seedById.get(record.id);
    if (!seed || (Array.isArray(record.muscleGroups) && record.muscleGroups.length)) return record;
    return { ...record, muscleGroups: [...(seed.muscleGroups || [])] };
  });
}

export function snapshotMuscleGroups(items, exercisesById) {
  return [...new Set(items.flatMap(item => exercisesById[item.exerciseId]?.muscleGroups || []))];
}

export function buildSessionProgress({ warmup, strength, cooldown, active, warmupEntries, exerciseSets, skippedSets, cooldownEntries }) {
  const simpleRow = (item, index, phase, entries, title) => {
    const entry = entries.find(value => (item.exerciseId ? value.exerciseId === item.exerciseId : value.name === item.name));
    const status = entry?.status === 'skipped' ? 'Skipped' : entry ? 'Completed' : active.phase === phase && active.index === index ? 'In progress' : 'Not started';
    return { item, data: `${title} ${index + 1} of ${phase === 'warmup' ? warmup.length : cooldown.length}`, status, details: entry ? entry.value || entry.notes || 'Completed' : '' };
  };
  return [
    { title: 'Warm-up', rows: warmup.map((item, index) => simpleRow(item, index, 'warmup', warmupEntries, 'Warm-up')) },
    { title: 'Workout', rows: strength.map((item, index) => {
      const records = Array.from({ length: item.setTarget }, (_, setIndex) => {
        const number = setIndex + 1;
        const set = exerciseSets.find(value => value.exerciseId === item.exerciseId && value.setNumber === number);
        const skipped = skippedSets.find(value => value.exerciseId === item.exerciseId && value.setNumber === number);
        return set ? `Set ${number}: ${set.reps} reps${set.weight ? ` · ${set.weight}${set.weightUnit}` : ''}` : skipped ? `Set ${number}: Skipped set` : `Set ${number}: Not recorded`;
      });
      const complete = records.every(value => !value.endsWith('Not recorded'));
      const status = complete ? 'Completed' : active.phase === 'strength' && active.index === index ? 'In progress' : 'Not started';
      const currentSet = active.phase === 'strength' && active.index === index ? active.setNo : 1;
      return { item, data: `Workout ${index + 1} of ${strength.length} · Set ${currentSet} of ${item.setTarget}`, status, details: records.join(' · ') };
    }) },
    { title: 'Cooldown', rows: cooldown.map((item, index) => simpleRow(item, index, 'cooldown', cooldownEntries, 'Cooldown')) }
  ];
}
