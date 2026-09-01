import test from 'node:test';
import assert from 'node:assert/strict';
import { TimestampTimer, formatDuration } from '../js/timers.js';
import { toCsv, validateBackup } from '../js/backup.js';

test('timer is calculated from timestamps and recovers from a snapshot', () => { const timer=new TimestampTimer({status:'running',durationMs:60000,startedAt:0,remainingMs:60000}); assert.equal(timer.remaining(15000),45000); assert.equal(formatDuration(timer.remaining(15000)),'00:45'); });
test('backup validation rejects malformed data', () => assert.throws(()=>validateBackup({}), /supported/));
test('CSV quotes values safely', () => assert.match(toCsv([{'workout date':'2026-01-01',exercise:'Row, "heavy"'}]), /"Row, ""heavy"""/));
