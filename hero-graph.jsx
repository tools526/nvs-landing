// Animated node/connection graph for the hero section.
// Subtle, on-brand: small set of labeled nodes, soft pulses traveling the edges.
const { useEffect, useRef, useState } = React;

function HeroGraph() {
  const W = 1200;
  const H = 280;

  // Layout nodes deterministically. Labels evoke "AI systems / connections".
  const nodes = [
    { id: 'src',   x: 80,   y: 140, label: 'data.in',     kind: 'in' },
    { id: 'a',     x: 240,  y: 80,  label: 'ingest' },
    { id: 'b',     x: 240,  y: 200, label: 'classify' },
    { id: 'c',     x: 440,  y: 60,  label: 'route' },
    { id: 'd',     x: 440,  y: 150, label: 'reason',    kind: 'accent' },
    { id: 'e',     x: 440,  y: 230, label: 'enrich' },
    { id: 'f',     x: 660,  y: 100, label: 'decide',    kind: 'accent' },
    { id: 'g',     x: 660,  y: 200, label: 'compose' },
    { id: 'h',     x: 880,  y: 80,  label: 'execute' },
    { id: 'i',     x: 880,  y: 180, label: 'notify' },
    { id: 'out',   x: 1080, y: 140, label: 'system.out', kind: 'out' },
  ];

  const edges = [
    ['src','a'], ['src','b'],
    ['a','c'], ['a','d'],
    ['b','d'], ['b','e'],
    ['c','f'], ['d','f'], ['d','g'], ['e','g'],
    ['f','h'], ['f','i'], ['g','i'],
    ['h','out'], ['i','out'],
  ];

  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));

  // Pulses: small dots that traverse a random edge and respawn.
  const [pulses, setPulses] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      edgeIdx: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.0035 + Math.random() * 0.003,
    }))
  );

  const rafRef = useRef();
  useEffect(() => {
    let running = true;
    function tick() {
      if (!running) return;
      setPulses(prev => prev.map(p => {
        let t = p.t + p.speed;
        let edgeIdx = p.edgeIdx;
        let speed = p.speed;
        if (t >= 1) {
          t = 0;
          edgeIdx = Math.floor(Math.random() * edges.length);
          speed = 0.0028 + Math.random() * 0.0035;
        }
        return { ...p, t, edgeIdx, speed };
      }));
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  // Animate node "active" highlight when a pulse arrives near it.
  const activeIds = new Set();
  pulses.forEach(p => {
    const [a, b] = edges[p.edgeIdx];
    if (p.t > 0.85) activeIds.add(b);
    if (p.t < 0.15) activeIds.add(a);
  });

  return (
    <svg className="hero-graph" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      {/* Edges */}
      <g>
        {edges.map(([a, b], i) => {
          const A = byId[a], B = byId[b];
          // gentle curve
          const mx = (A.x + B.x) / 2;
          const my = (A.y + B.y) / 2 + (B.y > A.y ? -10 : 10);
          return (
            <path
              key={i}
              className="edge"
              d={`M${A.x},${A.y} Q${mx},${my} ${B.x},${B.y}`}
            />
          );
        })}
      </g>

      {/* Pulses */}
      <g>
        {pulses.map(p => {
          const [a, b] = edges[p.edgeIdx];
          const A = byId[a], B = byId[b];
          const mx = (A.x + B.x) / 2;
          const my = (A.y + B.y) / 2 + (B.y > A.y ? -10 : 10);
          // quadratic bezier interpolation
          const t = p.t;
          const x = (1 - t) * (1 - t) * A.x + 2 * (1 - t) * t * mx + t * t * B.x;
          const y = (1 - t) * (1 - t) * A.y + 2 * (1 - t) * t * my + t * t * B.y;
          return <circle key={p.id} cx={x} cy={y} r={3.2} className="pulse" />;
        })}
      </g>

      {/* Nodes */}
      <g>
        {nodes.map(n => {
          const isActive = activeIds.has(n.id);
          const r = n.kind === 'in' || n.kind === 'out' ? 8 : 6;
          return (
            <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
              {isActive && (
                <circle r={r + 6} fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
              )}
              <circle
                r={r}
                className={`node ${n.kind === 'accent' || isActive ? 'node-accent' : ''}`}
              />
              <text
                className="node-label"
                x={0}
                y={r + 16}
                textAnchor="middle"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

window.HeroGraph = HeroGraph;
