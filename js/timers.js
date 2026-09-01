export const now = () => Date.now();
export function formatDuration(milliseconds) { const seconds=Math.max(0,Math.floor(milliseconds/1000)); return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`; }
export class TimestampTimer {
  constructor(snapshot) { this.snapshot = snapshot || null; }
  start(durationMs) { this.snapshot={ status:'running', durationMs, startedAt:now(), remainingMs:durationMs }; return this.snapshot; }
  remaining(at=now()) { if (!this.snapshot) return 0; return this.snapshot.status==='running' ? Math.max(0, this.snapshot.durationMs-(at-this.snapshot.startedAt)) : this.snapshot.remainingMs; }
  pause() { if (this.snapshot?.status==='running') this.snapshot={...this.snapshot,status:'paused',remainingMs:this.remaining()}; return this.snapshot; }
  resume() { if (this.snapshot?.status==='paused') this.snapshot={...this.snapshot,status:'running',durationMs:this.snapshot.remainingMs,startedAt:now()}; return this.snapshot; }
  add(milliseconds) { if (!this.snapshot) return; if (this.snapshot.status==='running') this.snapshot.durationMs=this.remaining()+milliseconds, this.snapshot.startedAt=now(); else this.snapshot.remainingMs+=milliseconds; return this.snapshot; }
  done() { return Boolean(this.snapshot) && this.remaining()===0; }
}
