import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceAfterSkippedSet, buildSessionProgress, mergeCatalogMetadata, snapshotMuscleGroups } from '../js/workout-domain.js';

test('skipping a strength set creates a distinct skipped-set record and advances without a rest timer', () => {
  const result = advanceAfterSkippedSet({ index: 2, setNo: 1, setStartedAt: 123 }, { exerciseId: 'squat', setTarget: 2 }, 'session-1', 1000);
  assert.deepEqual(result.active, { index: 2, setNo: 2, setStartedAt: null });
  assert.deepEqual(result.skippedSet, { workoutSessionId: 'session-1', exerciseId: 'squat', setNumber: 1, timestamp: 1000, status: 'skipped' });
  assert.equal(result.startsRest, false);
});

test('skipping the final strength set advances to the next exercise', () => {
  const result = advanceAfterSkippedSet({ index: 2, setNo: 2 }, { exerciseId: 'squat', setTarget: 2 }, 'session-1', 1000);
  assert.deepEqual(result.active, { index: 3, setNo: 1, setStartedAt: null });
});

test('existing catalog records receive missing seed muscle-group tags without overwriting user fields', () => {
  const catalog = mergeCatalogMetadata([{ id: 'row', name: 'My row', equipment: 'Cable', muscleGroups: [] }], [{ id: 'row', name: 'Row', muscleGroups: ['back', 'biceps'] }]);
  assert.deepEqual(catalog, [{ id: 'row', name: 'My row', equipment: 'Cable', muscleGroups: ['back', 'biceps'] }]);
  assert.deepEqual(snapshotMuscleGroups([{ exerciseId: 'row' }], Object.fromEntries(catalog.map(x => [x.id, x]))), ['back', 'biceps']);
});

test('session progress has independently numbered warm-up, workout, and cooldown sections', () => {
  const progress = buildSessionProgress({
    warmup: [{ exerciseId: 'warm' }],
    strength: [{ exerciseId: 'lift', setTarget: 2 }],
    cooldown: [{ name: 'Stretch' }],
    active: { phase: 'strength', index: 0, setNo: 1 },
    warmupEntries: [{ exerciseId: 'warm', status: 'completed', value: '10' }],
    exerciseSets: [{ exerciseId: 'lift', setNumber: 1, reps: 8 }],
    skippedSets: [{ exerciseId: 'lift', setNumber: 2 }],
    cooldownEntries: [{ name: 'Stretch', status: 'completed', value: '2' }]
  });
  assert.deepEqual(progress.map(section => section.title), ['Warm-up', 'Workout', 'Cooldown']);
  assert.equal(progress[0].rows[0].data, 'Warm-up 1 of 1');
  assert.equal(progress[1].rows[0].data, 'Workout 1 of 1 · Set 1 of 2');
  assert.equal(progress[1].rows[0].status, 'Completed');
  assert.match(progress[1].rows[0].details, /Set 1: 8 reps/);
  assert.match(progress[1].rows[0].details, /Set 2: Skipped set/);
  assert.equal(progress[2].rows[0].data, 'Cooldown 1 of 1');
});
