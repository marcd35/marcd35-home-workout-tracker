import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('main Workout and History navigation controls are never hidden by shared data-view CSS', async () => {
  const css = await readFile(new URL('../css/app.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /button\[data-view="workout"\].*display:none/);
  assert.doesNotMatch(css, /button\[data-view="history"\].*display:none/);
});
