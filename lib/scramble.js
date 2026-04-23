const CHARS = "!<>-_\\/[]{}=+*^?#abcdefghijklmnopqrstuvwxyz0123456789";

export function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function buildScrambleQueue(target, { startStep = 2 } = {}) {
  return target.split("").map((c, i) => ({
    from: randomChar(),
    to: c,
    start: i * startStep,
    end: i * startStep + 20,
  }));
}

export function renderScrambleFrame(queue, frame) {
  let out = "";
  let done = 0;
  for (const q of queue) {
    if (frame >= q.end) {
      out += q.to;
      done += 1;
    } else if (frame >= q.start) {
      out += q.from;
    } else {
      out += q.from;
    }
  }
  return { text: out, done, total: queue.length };
}
