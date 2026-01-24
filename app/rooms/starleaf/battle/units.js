// app/rooms/starleaf/_battle/units.js

import { TEAM } from "./state";

let uid = 0;
const id = (prefix) => `${prefix}_${String(uid++).padStart(3, "0")}`;

// ここはPhase1: 役割は「表示名/チーム/WT/移動力」だけでOK
export function makeUnits({ rng }) {
  uid = 0;

  return [
    // Allies
    {
      id: id("ALLY"),
      name: "シオン",
      team: TEAM.ALLY,
      hp: 100,
      wt: 0,
      baseWT: 32,
      mov: 4,
      cls: "ARBORIST",
      pos: { x: 0, y: 0 },
    },
    {
      id: id("ALLY"),
      name: "リィナ",
      team: TEAM.ALLY,
      hp: 80,
      wt: 8,
      baseWT: 30,
      mov: 4,
      cls: "FLOWER",
      pos: { x: 0, y: 0 },
    },
    {
      id: id("ALLY"),
      name: "ゼノ",
      team: TEAM.ALLY,
      hp: 90,
      wt: 12,
      baseWT: 34,
      mov: 3,
      cls: "ELDER",
      pos: { x: 0, y: 0 },
    },

    // Enemies (black iron soldiers)
    ...Array.from({ length: 4 }, (_, i) => ({
      id: id("ENEMY"),
      name: "黒鉄兵",
      team: TEAM.ENEMY,
      hp: 60,
      wt: 4 + i * 2,
      baseWT: 34 + (i % 2) * 2,
      mov: 3 + (i === 1 ? 1 : 0),
      cls: "IRON",
      pos: { x: 0, y: 0 },
    })),
  ];
}
