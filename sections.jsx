// NVS Landing — section components
const { useEffect, useRef, useState } = React;

/* -------- Reveal-on-scroll wrapper -------- */
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('in'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

/* -------- NAV -------- */
function Nav() {
  return (
    <div className="nav-wrap">
      <nav className="nav">
        <a href="#" className="nav-logo">
          <img src="assets/nvs-logo.svg" alt="NVS" className="nav-logo-flag" />
          <span className="nav-logo-name">Nomad Ventures Studio</span>
        </a>
        <ul className="nav-links">
          <li><a href="#">Company</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#careers">Careers</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-cta">
          <a href="careers.html" className="btn btn-dark btn-sm">Open roles <span className="nav-roles-badge">4</span></a>
        </div>
      </nav>
    </div>
  );
}

/* -------- HERO -------- */
function Hero() {
  return (
    <section className="hero container">
      <div className="panel hero-panel">
        <div className="hero-eyebrow-row">
          <span className="eyebrow">Nomad Ventures Studio</span>
          <span className="eyebrow" style={{ fontFamily: 'var(--mono)', textTransform: 'none', letterSpacing: '0.04em' }}>
            <span style={{ background: 'var(--accent)', width: 6, height: 6, borderRadius: '50%' }}></span>
            Build. Scale. Repeat.
          </span>
        </div>

        <h1 className="h-display hero-headline">
          We build AI-powered products for the world.
        </h1>

        <p className="lead hero-sub">
          Nomad Ventures Studio is a venture studio that creates and scales B2C digital products for a global audience — with the people we respect, on problems that actually matter.
        </p>

        <div className="hero-ctas">
          <a href="#products" className="btn btn-primary">
            See what we're building →
          </a>
          <a href="#contact" className="btn btn-ghost">Work with us</a>
        </div>

        <div className="hero-graph-wrap">
          <span className="hero-graph-corner">NVS / WORKFLOW MAP</span>
          <window.HeroGraph />
          <span className="hero-graph-caption">11 nodes · 15 edges · live</span>
        </div>
      </div>
    </section>
  );
}

/* -------- PRODUCTS -------- */
function Products() {
  const products = [
    {
      id: 1,
      mark: 'J',
      name: 'Jobescape',
      tag: 'AI EDUCATION · SKILLS',
      url: 'https://jobescape.me',
      desc: 'Learn AI effectively and apply it in everyday tasks — automation, agents, apps, and media creation. Practical, outcome-focused training.',
      metrics: [
        { value: '40K', label: 'Active users' },
        { value: '$1.4M', label: 'MRR' },
        { value: '$32', label: 'CAC / user' },
      ],
    },
    {
      id: 2,
      mark: 'G',
      name: 'Genescape',
      tag: 'CREATIVE · IMAGE & VIDEO',
      url: 'https://genescape-go.vercel.app/artist/new',
      desc: 'All-in-one AI creator studio for images, video, music, and voiceovers — consistent styles across every project in one subscription.',
      metrics: [
        { value: '7K+', label: 'Generations' },
        { value: '3.1K+', label: 'AI songs' },
        { value: '340+', label: 'AI videos' },
      ],
    },
  ];

  return (
    <section className="section container" id="products">
      <Reveal className="section-head">
        <div className="section-head-text">
          <h2 className="h-section" style={{ marginTop: 0 }}>
            Our products
          </h2>
        </div>
        <p className="lead" style={{ maxWidth: '38ch' }}>
          Every product we create starts with a simple question: does this make life meaningfully better for real people? If the answer is yes, we build it.
        </p>
      </Reveal>

      <div className="products-stack">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <article className="product-card product-card-wide" onClick={() => window.open(p.url, '_blank', 'noopener,noreferrer')} style={{ cursor: 'pointer' }}>
              {/* Left — metrics */}
              <div className="product-wide-left">
                <div className="product-metrics">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="product-metric">
                      <span className="product-metric-value">{m.value}</span>
                      <span className="product-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right — name, desc (fades out on hover), photo (fades in on hover) */}
              <div className="product-wide-right">
                <div className="product-card-head">
                  <div className="product-mark" data-i={p.id}>{p.mark}</div>
                  <span className="product-tag">{p.tag}</span>
                </div>
                <h3 className="h-card product-title">{p.name}</h3>
                <p className="product-desc product-desc-fadeable">{p.desc}</p>
                <div className="product-hover-img">
                  <img src={p.id === 1 ? 'assets/jobescape.png' : 'assets/genescape.png'} alt={p.name + ' preview'} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------- Animated clock hook -------- */
function useClock() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf, start;
    function tick(now) {
      if (!start) start = now;
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}

/* -------- Product visualizations — real product screenshots -------- */
function ProductVis({ i }) {
  const src = i === 1 ? 'assets/jobescape.png' : 'assets/genescape.png';
  const alt = i === 1 ? 'Jobescape product preview' : 'Genescape product preview';
  return (
    <div className="product-vis product-vis-img">
      <img src={src} alt={alt} />
    </div>
  );
}

/* Jobescape — week streak + progress bar */
function JobescapeVis() {
  const t = useClock();
  const days = ['M','T','W','T','F','S','S'];
  const activeIdx = Math.floor((t * 0.6) % 7);
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {days.map((d, k) => {
          const x = 28 + k * 38;
          const isActive = k <= activeIdx;
          return (
            <g key={k}>
              <circle cx={x} cy={42} r={isActive ? 11 : 9}
                fill={isActive ? 'var(--accent)' : 'var(--bg-card)'}
                stroke={isActive ? 'var(--accent)' : 'var(--ink-3)'}
                strokeWidth="0.8"
              />
              {isActive && k === activeIdx && (
                <circle cx={x} cy={42} r={13 + (Math.sin(t * 4) + 1) * 3} fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity={0.4}/>
              )}
              <text x={x} y={66} textAnchor="middle" fontFamily="var(--mono)" fontSize="8" fill="var(--ink-3)">{d}</text>
            </g>
          );
        })}
        <line x1="28" y1="96" x2="292" y2="96" stroke="var(--rule-2)" strokeWidth="3" strokeLinecap="round"/>
        <line x1="28" y1="96" x2={28 + (activeIdx + 1) * 38 - 10} y2="96" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="28" cy="96" r="5" fill="var(--accent)"/>
        <circle cx={28 + (activeIdx + 1) * 38 - 10} cy="96" r="5" fill="var(--accent)"/>
        <text x="28" y="122" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-2)">DAY 01</text>
        <text x="292" y="122" textAnchor="end" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-2)">PLATINUM</text>
      </svg>
    </div>
  );
}

/* Genescape — mosaic of app tiles, one highlighted at a time */
function GenescapeVis() {
  const t = useClock();
  const tiles = [
    { x: 16,  y: 14, w: 50, h: 56, hue: 0 },
    { x: 72,  y: 14, w: 50, h: 56, hue: 1 },
    { x: 128, y: 14, w: 50, h: 56, hue: 2 },
    { x: 184, y: 14, w: 50, h: 56, hue: 3 },
    { x: 240, y: 14, w: 64, h: 56, hue: 4 },
    { x: 16,  y: 76, w: 50, h: 50, hue: 5 },
    { x: 72,  y: 76, w: 50, h: 50, hue: 6 },
    { x: 128, y: 76, w: 64, h: 50, hue: 7 },
    { x: 198, y: 76, w: 50, h: 50, hue: 8 },
    { x: 254, y: 76, w: 50, h: 50, hue: 9 },
  ];
  const palette = ['#3a2519','#1f2a23','#1a1f2a','#2a1c2e','#2e2415','#152a2c','#3b1f2a','#1c2c1f','#1f1f2e','#2a2018'];
  const accent  = ['#D97757','#7BAF8A','#8aa1c4','#b58dc4','#d4a542','#5fb1b7','#c47d8c','#7caf6f','#7d8ec9','#c79c6a'];
  const activeIdx = Math.floor((t * 1.2) % tiles.length);
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {tiles.map((tile, k) => {
          const isActive = k === activeIdx;
          return (
            <g key={k}>
              <rect x={tile.x} y={tile.y} width={tile.w} height={tile.h} rx="6"
                fill={palette[tile.hue]}
                stroke={isActive ? accent[tile.hue] : 'transparent'}
                strokeWidth="1.2"
                style={{ transition: 'stroke 0.3s ease' }}
              />
              <rect x={tile.x} y={tile.y} width={tile.w} height={tile.h * 0.5} rx="6"
                fill={accent[tile.hue]} opacity="0.18"/>
              <circle cx={tile.x + 10} cy={tile.y + 10} r="3" fill={accent[tile.hue]} opacity="0.7"/>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Legacy vis kept (unused after product cut) */
function FlowVis() {
  const t = useClock();
  const rows = [20, 60, 100];
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {rows.map((y, idx) => {
          const phase = (t * 0.45 + idx * 0.33) % 1;
          // 3 stages with 2 connector segments
          const segs = [
            { x1: 80, x2: 120 },  // after stage 1
            { x1: 180, x2: 220 }, // after stage 2
          ];
          return (
            <g key={idx} opacity={1 - idx * 0.12}>
              <rect x="20" y={y} width="60" height="20" rx="4" fill="var(--accent-tint)" stroke="var(--accent)" strokeWidth="0.8"/>
              <line x1="80" y1={y + 10} x2="120" y2={y + 10} stroke="var(--ink-3)" strokeDasharray="2 2"/>
              <rect x="120" y={y} width="60" height="20" rx="4" fill="var(--bg-card)" stroke="var(--ink-3)" strokeWidth="0.8"/>
              <line x1="180" y1={y + 10} x2="220" y2={y + 10} stroke="var(--ink-3)" strokeDasharray="2 2"/>
              <rect x="220" y={y} width="60" height="20" rx="4" fill="var(--ink)" stroke="var(--ink)" strokeWidth="0.8"/>
              {/* moving packet */}
              {(() => {
                const x = 20 + phase * 260;
                const inSeg = segs.some(s => x >= s.x1 && x <= s.x2);
                if (!inSeg) return null;
                return <circle cx={x} cy={y + 10} r="2.6" fill="var(--accent)" />;
              })()}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Signal — animated line chart, bars rise/fall, latest point pulses */
function SignalVis() {
  const t = useClock();
  const N = 16;
  const xs = Array.from({ length: N }, (_, k) => 14 + k * (292 / (N - 1)));
  const ys = xs.map((_, k) => {
    const phase = t * 0.6 - k * 0.2;
    const v = Math.sin(phase) * 18 + Math.sin(phase * 0.5 + k) * 10;
    return 70 - v;
  });
  const path = xs.map((x, k) => `${k === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[k].toFixed(1)}`).join(' ');
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {/* baseline grid */}
        {[40, 80, 120].map(y => (
          <line key={y} x1="10" y1={y} x2="310" y2={y} stroke="var(--rule-2)" strokeWidth="0.5"/>
        ))}
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <path d={`${path} L${xs[N-1].toFixed(1)},130 L${xs[0].toFixed(1)},130 Z`} fill="var(--accent-tint)" opacity="0.5"/>
        {/* moving cursor at right edge */}
        <line x1={xs[N-1]} y1="20" x2={xs[N-1]} y2="130" stroke="var(--ink)" strokeWidth="0.5" strokeDasharray="2 3"/>
        <circle cx={xs[N-1]} cy={ys[N-1]} r={3.5 + Math.sin(t * 4) * 1} fill="var(--accent)" />
        <circle cx={xs[N-1]} cy={ys[N-1]} r={8 + (Math.sin(t * 4) + 1) * 4} fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity={0.4}/>
      </svg>
    </div>
  );
}

/* Ops Engine — grid of cells; rolling wave activates them in sequence */
function OpsVis() {
  const t = useClock();
  const cols = 6, rows = 3;
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        {Array.from({ length: cols }).map((_, c) =>
          Array.from({ length: rows }).map((__, r) => {
            // wave activates a cell if (c+r) is near current wave-front
            const wave = (t * 1.6) % (cols + rows + 2);
            const dist = Math.abs((c + r) - wave);
            const active = dist < 0.7;
            const fill = active
              ? 'var(--accent)'
              : (c + r) % 5 === 0 ? 'var(--ink)' : 'var(--bg-card)';
            return (
              <rect
                key={`${c}-${r}`}
                x={20 + c * 48}
                y={20 + r * 32}
                width={40}
                height={24}
                rx={4}
                fill={fill}
                stroke="var(--ink-3)"
                strokeWidth="0.6"
                style={{ transition: 'fill 0.3s ease' }}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

/* Pulse — radar sweep + pinging satellites */
function PulseVis() {
  const t = useClock();
  const cx = 160, cy = 70;
  const sweepAngle = (t * 0.9) % (Math.PI * 2);
  const sats = [
    { angle: 0.6, r: 50 },
    { angle: 2.1, r: 36 },
    { angle: 3.8, r: 56 },
    { angle: 5.2, r: 42 },
  ];
  return (
    <div className="product-vis">
      <svg viewBox="0 0 320 140" width="100%" height="100%">
        <circle cx={cx} cy={cy} r="58" fill="none" stroke="var(--ink-3)" strokeWidth="0.5"/>
        <circle cx={cx} cy={cy} r="40" fill="none" stroke="var(--ink-3)" strokeWidth="0.5"/>
        <circle cx={cx} cy={cy} r="22" fill="none" stroke="var(--ink-3)" strokeWidth="0.5"/>
        {/* sweep wedge */}
        <defs>
          <radialGradient id="sweep-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <path
          d={`M${cx},${cy} L${cx + Math.cos(sweepAngle) * 58},${cy + Math.sin(sweepAngle) * 58} A58,58 0 0 1 ${cx + Math.cos(sweepAngle - 0.5) * 58},${cy + Math.sin(sweepAngle - 0.5) * 58} Z`}
          fill="url(#sweep-grad)"
        />
        {/* satellites */}
        {sats.map((s, idx) => {
          const x = cx + Math.cos(s.angle) * s.r;
          const y = cy + Math.sin(s.angle) * s.r;
          // ping when sweep crosses near angle
          const diff = Math.abs(((sweepAngle - s.angle) + Math.PI * 2) % (Math.PI * 2));
          const ping = Math.min(diff, Math.PI * 2 - diff);
          const isPinging = ping < 0.4;
          return (
            <g key={idx}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--ink-3)" strokeWidth="0.4" opacity="0.5"/>
              {isPinging && (
                <circle cx={x} cy={y} r={4 + (1 - ping / 0.4) * 8} fill="none" stroke="var(--accent)" strokeWidth="1" opacity={1 - ping / 0.4}/>
              )}
              <circle cx={x} cy={y} r="3" fill={isPinging ? 'var(--accent)' : 'var(--ink)'}/>
            </g>
          );
        })}
        {/* core */}
        <circle cx={cx} cy={cy} r="6" fill="var(--accent)"/>
        <circle cx={cx} cy={cy} r={6 + (Math.sin(t * 3) + 1) * 3} fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.5"/>
      </svg>
    </div>
  );
}

/* -------- CAPABILITIES -------- */
function Capabilities() {
  const items = [
    { n: '01', title: 'Build', desc: 'We go from 0 to 1 fast. Idea validation, product design, engineering — all under one roof.' },
    { n: '02', title: 'Integrate AI', desc: 'Every product we build has AI baked in from day one. Not as a feature. As a foundation.' },
    { n: '03', title: 'Scale globally', desc: 'We don\'t build for local markets. We build for the world — and we know how to get there.' },
  ];

  return (
    <section className="section container" id="capabilities">
      <Reveal className="section-head">
        <div className="section-head-text">
          <h2 className="h-section" style={{ marginTop: 0 }}>What we do</h2>
          <p className="cap-subheading">From zero to global — that's the only direction we know</p>
        </div>
        <p className="lead" style={{ maxWidth: '42ch' }}>
          We identify high-potential markets, assemble the right team, and build products from scratch using modern AI-first approaches. Then we scale them to millions of users.
        </p>
      </Reveal>
      <Reveal>
        <div className="cap-list">
          {items.map((it) => (
            <div className="cap-item" key={it.n}>
              <span className="cap-bookmark">
                <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
                  <path d="M2 2h18v24l-9-6-9 6V2z" fill="var(--accent-tint)" stroke="var(--accent)" strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="cap-title">{it.title}</span>
              <p className="cap-desc">{it.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------- HOW WE WORK -------- */
function HowWeWork() {
  const items = [
    'We build systems, not one-off solutions',
    'We ship fast and refine with real usage',
    'We prioritize clarity over complexity',
    'We focus on outcomes, not outputs',
  ];
  return (
    <section className="section container" id="how">
      <Reveal className="section-head">
        <div className="section-head-text">
          <h2 className="h-section" style={{ marginTop: 0 }}>How we work</h2>
          <p className="how-subhead">Move fast. Stay focused. Build things that last.</p>
        </div>
        <p className="lead" style={{ maxWidth: '36ch' }}>
          Speed without direction is chaos. We combine startup velocity with a clear product vision — testing quickly, killing what doesn't work, and doubling down on what does.
        </p>
      </Reveal>
      <Reveal>
        <div className="how-grid">
          {items.map((t, i) => (
            <div className="how-cell" key={i}>
              <span className="how-cell-num">— 0{i + 1}</span>
              <p className="how-cell-text">{t}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}


/* -------- CASE STUDIES -------- */
function CaseStudies() {
  const cases = [
    { n: '01', tag: 'E-commerce operations',  metric: <><>70<span className="small">%</span></></>, desc: 'Automated internal workflows and reduced manual processing time by 70%.' },
    { n: '02', tag: 'Product team',           metric: <><>5<span className="small">+</span></></>, desc: 'Built internal tools that replaced 5+ disconnected systems.' },
    { n: '03', tag: 'Data workflows',         metric: <><>sec<span className="small" style={{ display: 'block', fontSize: 18, marginTop: 4 }}>was hours</span></></>, desc: 'Implemented real-time decision system reducing response time from hours to seconds.' },
  ];
  return (
    <section className="section container" id="cases">
      <Reveal className="section-head">
        <div className="section-head-text">
          <h2 className="h-section" style={{ marginTop: 0 }}>What we've built</h2>
        </div>
      </Reveal>
      <div className="cases-grid">
        {cases.map((c, i) => (
          <Reveal key={c.n} delay={i * 80}>
            <article className="case-card">
              <span className="case-num">CASE {c.n}</span>
              <p className="case-tag">{c.tag}</p>
              <div className="case-metric">{c.metric}</div>
              <p className="case-desc">{c.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------- TEAM -------- */
function Team() {
  const photos = [
    { id: 1, src: 'team_img/5197443047514379357.jpg', name: 'Team Member', role: 'Role' },
    { id: 2, src: 'team_img/5199694847328064623.jpg', name: 'Team Member', role: 'Role' },
    { id: 3, src: 'team_img/5224520952299853360.jpg', name: 'Team Member', role: 'Role' },
    { id: 4, src: 'team_img/5424713681519901384.jpg', name: 'Team Member', role: 'Role' },
    { id: 5, src: 'team_img/5427009251349040558.jpg', name: 'Team Member', role: 'Role' },
    { id: 6, src: 'team_img/IMG_3467 (1).jpg', name: 'Team Member', role: 'Role' },
    { id: 7, src: 'team_img/IMG_7163.jpg', name: 'Team Member', role: 'Role' },
    { id: 8, src: 'team_img/photo_2026-05-12_15-50-31.jpg', name: 'Team Member', role: 'Role' },
    { id: 9, src: 'team_img/photo_2026-05-12_15-51-25.jpg', name: 'Team Member', role: 'Role' },
  ];

  return (
    <section className="section container team-photos-section" id="team">
      <Reveal>
        <p className="eyebrow" style={{ marginBottom: 20 }}>We work with people we'd choose again</p>
        <div className="section-head" style={{ marginBottom: 56, alignItems: 'flex-start' }}>
          <div className="section-head-text">
            <h2 className="h-section" style={{ marginTop: 0 }}>The people behind it</h2>
          </div>
          <p className="lead" style={{ maxWidth: '36ch', marginTop: 0 }}>
            We hire for ownership, not titles — and we build an environment where talented people do their best work.
          </p>
        </div>
      </Reveal>
      <div className="team-photos-grid">
        {photos.map(p => (
          <div className="team-photo-cell" key={p.id}>
            {p.src
              ? <img src={p.src} alt={p.name} loading="lazy" />
              : <div className="team-photo-placeholder" />
            }
            <div className="team-photo-info">
              <span className="team-photo-name">{p.name}</span>
              <span className="team-photo-role">{p.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


/* -------- MEDIA ABOUT US -------- */
function MediaAboutUs() {
  const [active, setActive] = React.useState(0);

  const cards = [
    {
      src: 'uploads/photo_2026-05-12_15-50-31.jpg',
      name: 'NVS in TechCrunch',
      desc: 'The studio that ships products in weeks, not years — how NVS is rewriting the venture playbook.',
      href: '#',
    },
    {
      src: 'uploads/photo_2026-05-12_15-50-49.jpg',
      name: 'Forbes Feature',
      desc: 'AI studios are the new accelerators. Inside the operators building the next generation of software.',
      href: '#',
    },
    {
      src: 'uploads/photo_2026-05-12_15-50-58.jpg',
      name: 'Sifted Report',
      desc: "Central Asia's quiet AI powerhouse — NVS and the founders building from Almaty to the world.",
      href: '#',
    },
    {
      src: 'uploads/photo_2026-05-12_15-51-14.jpg',
      name: 'Product Hunt #1',
      desc: 'Jobescape topped the charts — Product of the Week and a sign of what AI-native hiring tools can do.',
      href: '#',
    },
  ];

  const total = cards.length;
  // Append clone of first card so the last real card always has a neighbour
  const track = [...cards, cards[0]];

  const [animated, setAnimated] = React.useState(true);

  const goTo = (idx, anim = true) => {
    setAnimated(anim);
    setActive(idx);
  };

  const prev = () => goTo((active - 1 + total) % total);
  const next = () => {
    if (active === total - 1) {
      // slide to clone, then instantly snap to real index 0
      goTo(total);
      setTimeout(() => goTo(0, false), 500);
    } else {
      goTo(active + 1);
    }
  };

  React.useEffect(() => {
    const id = setInterval(() => {
      setActive(a => {
        if (a === total - 1) {
          // animate to clone index, then snap back
          setAnimated(true);
          setTimeout(() => {
            setAnimated(false);
            setActive(0);
          }, 500);
          return total; // slide to clone
        }
        setAnimated(true);
        return a + 1;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [total]);

  const dotIndex = active >= total ? 0 : active;

  return (
    <section className="section container" id="media">
      <Reveal>
        <p className="eyebrow" style={{ marginBottom: 20 }}>Recognition</p>
        <div className="section-head" style={{ marginBottom: 48, alignItems: 'flex-start' }}>
          <div className="section-head-text">
            <h2 className="h-section" style={{ marginTop: 0 }}>Media about us</h2>
          </div>
          <p className="lead" style={{ maxWidth: '36ch', marginTop: 0 }}>
            What builders, investors, and journalists say about NVS and our work.
          </p>
        </div>
      </Reveal>

      <div className="media-carousel">
        <div className="media-carousel-wrap">
          <div
            className="media-track"
            style={{
              transform: `translateX(calc(-${active} * (50% + 12px)))`,
              transition: animated ? 'transform 0.5s var(--ease)' : 'none',
            }}
          >
            {track.map((c, i) => (
              <a key={i} href={c.href} className="media-card" target="_blank" rel="noopener noreferrer">
                <img src={c.src} alt={c.name} loading="lazy" />
                <div className="media-card-overlay">
                  <div className="media-play-btn">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M8 6.5l9 4.5-9 4.5V6.5z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="media-card-text">
                    <span className="media-card-name">{c.name}</span>
                    <span className="media-card-desc">{c.desc}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <button className="media-nav media-nav-prev" onClick={prev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="media-nav media-nav-next" onClick={next} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="media-dots">
          {cards.map((_, i) => (
            <button key={i} className={`media-dot${i === dotIndex ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}


/* -------- CAREERS -------- */
function Careers() {
  return (
    <section className="section container" id="careers">
      <Reveal>
        <div className="panel careers-panel">
          <div>
            <h2 className="h-section" style={{ marginTop: 0, marginBottom: 24 }}>Join NVS</h2>
            <p className="lead" style={{ marginBottom: 32 }}>
              We're building systems that change how work gets done. If you care about speed, clarity, and real impact — you'll fit here.
            </p>
            <a href="careers.html" className="btn btn-primary">
              View open roles
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8m0 0L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div className="careers-art">
            <div className="careers-art-grid"></div>
            <div className="careers-art-text">
              build<br/>
              <span className="accent">real</span><br/>
              things
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------- FINAL CTA -------- */
function FinalCTA() {
  return (
    <section className="section container" id="contact">
      <Reveal>
        <div className="panel final-panel">
          <div className="final-bg-pattern"></div>
          <div style={{ position: 'relative' }}>
            <h2 className="h-display" style={{ margin: '0 auto 0', maxWidth: '14ch' }}>
              Let's build<br/>
              something <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>real</em>
            </h2>
            <p className="lead">
              Tell us what you're working on — we'll help you turn it into a system that scales.
            </p>
            <a href="#" className="btn btn-primary">
              Work with us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8m0 0L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------- FOOTER -------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="nav-logo" style={{ color: 'var(--ink)' }}>
            <img src="assets/nvs-logo.svg" alt="NVS" className="nav-logo-flag" style={{ height: 26, width: 52 }} />
          </div>
          <p className="footer-tag">
            AI-native systems that automate real work. Built for teams who care about outcomes.
          </p>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">Products</h4>
          <ul>
            <li><a href="#">Jobescape</a></li>
            <li><a href="#">Genescape</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#cases">Case studies</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">Connect</h4>
          <ul>
            <li><a href="#">hello@nvs.team</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">X / Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© NVS</span>
        <span className="footer-mono">NVS / 2026 / SHIPPING</span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Reveal, Nav, Hero, Products, Capabilities, HowWeWork,
  CaseStudies, Team, MediaAboutUs, Careers, FinalCTA, Footer,
});
