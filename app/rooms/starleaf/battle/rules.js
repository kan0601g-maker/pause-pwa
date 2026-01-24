// app/rooms/starleaf/_battle/rules.js

import { keyOf } from "./utils";
import { getUnitById, isInside, isBlocked, neighbors4 } from "./state";

// BFS: reachable cells within mov
export function calcMoveRange(state, unitId) {
  const u = getUnitById(state, unitId);
  if (!u) return { cells: [], prev: {} };

  const maxD = u.mov;

  const q = [];
  const dist = {};
  const prev = {};

  const startKey = keyOf(u.pos);
  dist[startKey] = 0;
  q.push(u.pos);

  while (q.length) {
    const cur = q.shift();
    const curKey = keyOf(cur);
    const d = dist[curKey];

    for (const n of neighbors4(state, cur)) {
      const nk = keyOf(n);
      if (dist[nk] != null) continue;

      const nd = d + 1;
      if (nd > maxD) continue;

      // allow staying; block if occupied by other unit
      if (isBlocked(state, n)) continue;

      dist[nk] = nd;
      prev[nk] = curKey;
      q.push(n);
    }
  }

  const cells = Object.keys(dist).map((k) => {
    const [x, y] = k.split(",").map(Number);
    return { x, y, d: dist[k] };
  });

  return { cells, prev };
}

export function buildPath(prev, fromPos, toPos) {
  const fromK = keyOf(fromPos);
  const toK = keyOf(toPos);
  if (fromK === toK) return [fromPos];

  if (!prev[toK]) return null;

  const pathKeys = [toK];
  let cur = toK;
  while (cur !== fromK) {
    cur = prev[cur];
    if (!cur) return null;
    pathKeys.push(cur);
  }
  pathKeys.reverse();
  return pathKeys.map((k) => {
    const [x, y] = k.split(",").map(Number);
    return { x, y };
  });
}
