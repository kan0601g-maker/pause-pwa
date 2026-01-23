"use client";

import { useMemo, useState } from "react";

const SIZE = 14;

// --- ユニット定義（Phase0：移動とWTだけ） ---
const initialUnits = [
  // Allies (3)
  { id: "A1", side: "ALLY", name: "シオン", x: 3, y: 10, mov: 4, wt: 0, baseWT: 32 },
  { id: "A2", side: "ALLY", name: "リィナ", x: 5, y: 11, mov: 4, wt: 8, baseWT: 30 },
  { id: "A3", side: "ALLY", name: "ゼノ", x: 2, y: 12, mov: 3, wt: 12, baseWT: 34 },

  // Enemies (4)
  { id: "E1", side: "ENEMY", name: "黒鉄兵", x: 10, y: 3, mov: 3, wt: 4, baseWT: 34 },
  { id: "E2", side: "ENEMY", name: "黒鉄兵", x: 11, y: 5, mov: 3, wt: 10, baseWT: 34 },
  { id: "E3", side: "ENEMY", name: "黒鉄兵", x: 9, y: 6, mov: 4, wt: 6, baseWT: 32 },
  { id: "E4", side: "ENEMY", name: "黒鉄兵", x: 12, y: 4, mov: 3, wt: 14, baseWT: 36 },
];

export default function TacticsClient() {
  const [units, setUnits] = useState(initialUnits);
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState("IDLE"); // IDLE | MOVE
  const [log, setLog] = useState(["起動：Phase0（移動 + WT）"]);

  const turn = useMemo(() => getTurnUnit(units), [units]);
  const selected = useMemo(
    () => units.find((u) => u.id === selectedId) ?? null,
    [units, selectedId]
  );

  const occupied = useMemo(() => {
    const map = new Map();
    for (const u of units) map.set(`${u.x},${u.y}`, u.id);
    return map;
  }, [units]);

  const reachable = useMemo(() => {
    if (!selected || mode !== "MOVE") return new Set();
    return computeReachable(selected, units, occupied, SIZE);
  }, [selected, mode, units, occupied]);

  function pushLog(line) {
    setLog((prev) => [line, ...prev].slice(0, 12));
  }

  function onCellClick(x, y) {
    const key = `${x},${y}`;
    const occId = occupied.get(key);

    // ユニットをクリック：選択
    if (occId) {
      setSelectedId(occId);
      setMode("IDLE");
      return;
    }

    // MOVEモード中：到達可能なら移動確定
    if (selected && mode === "MOVE") {
      if (!reachable.has(key)) return;

      setUnits((prev) =>
        prev.map((u) => (u.id === selected.id ? { ...u, x, y } : u))
      );
      pushLog(`${selected.name}：移動 → (${x},${y})`);
      setMode("IDLE");
    }
  }

  function startMove() {
    if (!selected) return;
    if (selected.id !== turn.id) {
      pushLog(`いま行動できるのは ${turn.name}（WT最小）`);
      return;
    }
    setMode("MOVE");
    pushLog(`${selected.name}：移動先を選択`);
  }

  function endTurn() {
    // 行動できるユニット（WT最小）を終了
    setUnits((prev) => {
      const t = getTurnUnit(prev);
      const updated = prev.map((u) =>
        u.id === t.id ? { ...u, wt: u.wt + u.baseWT } : u
      );
      return normalizeWT(updated);
    });

    setSelectedId(null);
    setMode("IDLE");
    pushLog(`ターン終了：WT加算（次の行動へ）`);
  }

  function autoSelectTurn() {
    setSelectedId(turn.id);
    setMode("IDLE");
  }

  return (
    <div style={s.shell}>
      <div style={s.left}>
        <Board
          units={units}
          occupied={occupied}
          reachable={reachable}
          selectedId={selectedId}
          turnId={turn.id}
          onCellClick={onCellClick}
        />
      </div>

      <div style={s.right}>
        <Panel title="ターン（WT）">
          <TurnQueue units={units} currentId={turn.id} onAutoSelect={autoSelectTurn} />
          <div style={s.hr} />
          <div style={s.small}>
            ルール：WTが最小のユニットが行動。行動後に <b>WT += baseWT</b>。
          </div>
        </Panel>

        <Panel title="操作">
          <div style={s.row}>
            <button style={btn()} onClick={autoSelectTurn}>
              現在ターンを選択
            </button>
            <button style={btn("ghost")} onClick={() => setSelectedId(null)}>
              選択解除
            </button>
          </div>

          <div style={{ marginTop: 10 }} />

          <div style={s.row}>
            <button style={btn()} onClick={startMove} disabled={!selected}>
              移動
            </button>
            <button style={btn("danger")} onClick={endTurn}>
              ターン終了
            </button>
          </div>

          <div style={{ marginTop: 10 }} />

          <div style={s.small}>
            Phase0は <b>移動のみ</b>。次で「攻撃→HP/MOR連動」「説得」「宝箱」を足す。
          </div>
        </Panel>

        <Panel title="選択中">
          {selected ? (
            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 900 }}>
                {selected.name} <span style={{ opacity: 0.7 }}>({selected.side})</span>
              </div>
              <div style={s.kv}>
                <div style={s.k}>座標</div>
                <div style={s.v}>
                  ({selected.x},{selected.y})
                </div>
              </div>
              <div style={s.kv}>
                <div style={s.k}>MOV</div>
                <div style={s.v}>{selected.mov}</div>
              </div>
              <div style={s.kv}>
                <div style={s.k}>WT</div>
                <div style={s.v}>{selected.wt}</div>
              </div>
              <div style={s.kv}>
                <div style={s.k}>baseWT</div>
                <div style={s.v}>{selected.baseWT}</div>
              </div>
              <div style={s.small}>
                {mode === "MOVE" ? "移動先をクリック" : "移動を押すと到達範囲が出る"}
              </div>
            </div>
          ) : (
            <div style={s.small}>ユニットをクリックして選択。</div>
          )}
        </Panel>

        <Panel title="ログ">
          <div style={{ display: "grid", gap: 6 }}>
            {log.map((l, i) => (
              <div key={i} style={s.logLine}>
                {l}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ---------------- Board ---------------- */

function Board({ units, occupied, reachable, selectedId, turnId, onCellClick }) {
  const unitById = useMemo(() => {
    const m = new Map();
    for (const u of units) m.set(u.id, u);
    return m;
  }, [units]);

  const rows = [];
  for (let y = 0; y < SIZE; y++) {
    const cells = [];
    for (let x = 0; x < SIZE; x++) {
      const key = `${x},${y}`;
      const occId = occupied.get(key);
      const u = occId ? unitById.get(occId) : null;

      const isReach = reachable.has(key);
      const isSelected = occId && occId === selectedId;
      const isTurn = occId && occId === turnId;

      cells.push(
        <button
          key={key}
          onClick={() => onCellClick(x, y)}
          style={{
            ...b.cell,
            ...(isReach ? b.reach : null),
            ...(isSelected ? b.selected : null),
            ...(isTurn ? b.turn : null),
          }}
          title={u ? `${u.name} (${u.side}) WT:${u.wt}` : `(${x},${y})`}
        >
          {u ? (
            <span style={u.side === "ALLY" ? b.ally : b.enemy}>
              {u.side === "ALLY" ? "◆" : "▲"}
            </span>
          ) : (
            ""
          )}
        </button>
      );
    }
    rows.push(
      <div key={y} style={b.row}>
        {cells}
      </div>
    );
  }

  return (
    <div>
      <div style={b.legend}>
        <div style={b.badge}>14×14</div>
        <div style={{ ...b.badge, opacity: 0.9 }}>◆ 味方</div>
        <div style={{ ...b.badge, opacity: 0.9 }}>▲ 敵</div>
        <div style={{ ...b.badge, opacity: 0.9 }}>WT最小＝枠強調</div>
      </div>
      <div style={b.board}>{rows}</div>
    </div>
  );
}

/* ---------------- Turn Queue ---------------- */

function TurnQueue({ units, currentId, onAutoSelect }) {
  const sorted = useMemo(() => {
    return [...units].sort((a, b) => a.wt - b.wt || a.id.localeCompare(b.id));
  }, [units]);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button style={btn()} onClick={onAutoSelect}>
        現在ターン（WT最小）を選択
      </button>

      <div style={{ display: "grid", gap: 6 }}>
        {sorted.map((u) => {
          const active = u.id === currentId;
          return (
            <div key={u.id} style={{ ...q.item, ...(active ? q.active : null) }}>
              <div style={{ fontWeight: 900 }}>
                {u.side === "ALLY" ? "◆" : "▲"} {u.name}
              </div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                WT {u.wt} / base {u.baseWT} / MOV {u.mov}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                ({u.x},{u.y}) {u.id}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function getTurnUnit(units) {
  return [...units].sort((a, b) => a.wt - b.wt || a.id.localeCompare(b.id))[0];
}

function normalizeWT(units) {
  // 小さい方を0に寄せる（数が増えても扱いやすい）
  const min = Math.min(...units.map((u) => u.wt));
  if (min === 0) return units;
  return units.map((u) => ({ ...u, wt: u.wt - min }));
}

function computeReachable(me, units, occupied, size) {
  // 壁・地形なし、他ユニットは“止まれない”として扱う（通り抜けも不可）
  const blocked = (x, y) => occupied.has(`${x},${y}`) && !(x === me.x && y === me.y);

  const startKey = `${me.x},${me.y}`;
  const dist = new Map([[startKey, 0]]);
  const q = [{ x: me.x, y: me.y }];

  while (q.length) {
    const cur = q.shift();
    const d = dist.get(`${cur.x},${cur.y}`) ?? 9999;

    const nexts = [
      { x: cur.x + 1, y: cur.y },
      { x: cur.x - 1, y: cur.y },
      { x: cur.x, y: cur.y + 1 },
      { x: cur.x, y: cur.y - 1 },
    ];

    for (const n of nexts) {
      if (n.x < 0 || n.y < 0 || n.x >= size || n.y >= size) continue;
      if (blocked(n.x, n.y)) continue;

      const nk = `${n.x},${n.y}`;
      const nd = d + 1;
      if (nd > me.mov) continue;
      const prev = dist.get(nk);
      if (prev == null || nd < prev) {
        dist.set(nk, nd);
        q.push(n);
      }
    }
  }

  // 到達可能＝distにある座標（ただし他ユニットがいる場所は除外）
  const reach = new Set();
  for (const [k] of dist) {
    if (k === startKey) continue;
    if (occupied.has(k)) continue;
    reach.add(k);
  }
  return reach;
}

/* ---------------- Styles ---------------- */

function btn(kind) {
  const base = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(120,255,180,0.22)",
    background: "rgba(0,0,0,0.20)",
    color: "#b9ffd6",
    fontSize: 13,
    cursor: "pointer",
  };
  if (kind === "ghost") {
    return { ...base, opacity: 0.85 };
  }
  if (kind === "danger") {
    return { ...base, border: "1px solid rgba(255,140,140,0.35)", color: "#ffd0d0" };
  }
  return base;
}

const s = {
  shell: {
    display: "grid",
    gridTemplateColumns: "minmax(420px, 1fr) 360px",
    gap: 16,
    alignItems: "start",
  },
  left: {},
  right: { display: "grid", gap: 12 },
  hr: { height: 1, background: "rgba(120,255,180,0.18)", margin: "10px 0" },
  small: { fontSize: 12, opacity: 0.8, lineHeight: 1.7 },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  kv: { display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13 },
  k: { opacity: 0.75 },
  v: { fontWeight: 900 },
  logLine: {
    fontSize: 12,
    opacity: 0.85,
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(120,255,180,0.16)",
    background: "rgba(0,0,0,0.16)",
  },
};

function Panel({ title, children }) {
  return (
    <section
      style={{
        border: "1px solid rgba(120,255,180,0.20)",
        background: "rgba(0,0,0,0.22)",
        borderRadius: 16,
        padding: 14,
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>{title}</div>
      {children}
    </section>
  );
}

const b = {
  legend: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 },
  badge: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(120,255,180,0.18)",
    background: "rgba(0,0,0,0.18)",
    color: "#b9ffd6",
  },
  board: {
    border: "1px solid rgba(120,255,180,0.20)",
    borderRadius: 16,
    padding: 10,
    background: "rgba(0,0,0,0.18)",
    display: "grid",
    gap: 4,
  },
  row: { display: "grid", gridTemplateColumns: `repeat(${SIZE}, 1fr)`, gap: 4 },
  cell: {
    aspectRatio: "1 / 1",
    borderRadius: 8,
    border: "1px solid rgba(120,255,180,0.10)",
    background: "rgba(0,0,0,0.15)",
    cursor: "pointer",
    color: "#d9ffe6",
    fontSize: 14,
    display: "grid",
    placeItems: "center",
  },
  reach: {
    border: "1px solid rgba(120,255,180,0.38)",
    background: "rgba(60, 255, 150, 0.10)",
  },
  selected: {
    outline: "2px solid rgba(120,255,180,0.75)",
    background: "rgba(60, 255, 150, 0.14)",
  },
  turn: {
    boxShadow: "0 0 0 2px rgba(255,255,255,0.08) inset, 0 0 18px rgba(120,255,180,0.18)",
  },
  ally: { color: "#b9ffd6", fontWeight: 900 },
  enemy: { color: "#ffd0d0", fontWeight: 900 },
};

const q = {
  item: {
    padding: "10px 10px",
    borderRadius: 12,
    border: "1px solid rgba(120,255,180,0.16)",
    background: "rgba(0,0,0,0.14)",
  },
  active: {
    border: "1px solid rgba(120,255,180,0.36)",
    background: "rgba(60, 255, 150, 0.10)",
  },
};
