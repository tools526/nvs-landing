// Careers page components
const { useState, useEffect, useRef } = React;

/* -------- Careers Nav (our nav adapted for careers page) -------- */
function CareersNav() {
  const openCount = careersData.filter(r => r.open !== false).length;
  return (
    <div className="nav-wrap">
      <nav className="nav">
        <a href="index.html" className="nav-logo">
          <img src="assets/nvs-logo.svg" alt="NVS" className="nav-logo-flag" />
          <span className="nav-logo-name">Nomad Ventures Studio</span>
        </a>
        <ul className="nav-links">
          <li><a href="index.html">Company</a></li>
          <li><a href="index.html#products">Products</a></li>
          <li><a href="index.html#careers">Careers</a></li>
          <li><a href="index.html#contact">Contact</a></li>
        </ul>
        <div className="nav-cta">
          <a href="#open-roles" className="btn btn-dark btn-sm">
            Open roles <span className="nav-roles-badge">{openCount}</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

/* -------- Careers data -------- */
const careersData = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    department: 'Analytics',
    type: 'Full-time',
    location: 'Astana / Remote',
    about: 'We are looking for a Data Analyst to build the reporting infrastructure that drives business decisions across the company. You will own dashboards, metrics, and data pipelines.\nYou\'ll work with product, marketing, finance, and leadership to surface insights that actually change decisions.',
    requirements: [
      '2+ years in analytics, product analytics, or data engineering',
      'Strong SQL — you can write complex queries without thinking',
      'Experience with BigQuery, Looker, Amplitude, or similar tools',
      'Ability to explain data clearly to non-technical stakeholders',
      'Detail-oriented and self-driven',
    ],
    offer: [
      'Direct impact on business decisions',
      'Access to full data stack and modern tooling',
      'Fast learning curve in a fast-moving company',
      'Flexible remote/hybrid setup',
    ],
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote',
    about: 'We\'re looking for a Product Designer who thinks in systems, not screens. You\'ll own the end-to-end design process across our products — from discovery to shipped UI.\nYou\'ll collaborate closely with engineers and PMs to ship things that look great and work even better.',
    requirements: [
      '3+ years of product design experience',
      'Strong portfolio showing end-to-end product thinking',
      'Proficiency in Figma and modern design tooling',
      'Experience designing for web and mobile',
      'Comfort working in fast-moving, high-autonomy environments',
    ],
    offer: [
      'Ownership of design across multiple products',
      'Work with a team that cares about quality',
      'Fully remote with async-first culture',
      'Competitive compensation + equity upside',
    ],
  },
  {
    id: 'growth-marketing-manager',
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Remote / Astana',
    about: 'We need a Growth Marketing Manager who is obsessed with distribution. You\'ll own the full funnel — from acquisition to activation — across our consumer AI products.\nYou know how to run experiments, read data, and scale what works.',
    requirements: [
      '3+ years in growth or performance marketing',
      'Experience with paid channels, SEO, and lifecycle marketing',
      'Analytical mindset — you make decisions with data',
      'Proven track record of growing user acquisition',
      'Experience with B2C digital products preferred',
    ],
    offer: [
      'Full ownership of growth across multiple products',
      'Large experimentation budget',
      'Work on products used by tens of thousands of people',
      'Hybrid setup — Astana office or fully remote',
    ],
  },
  {
    id: 'senior-backend-engineer',
    title: 'Senior Backend Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    about: 'We\'re looking for a Senior Backend Engineer to build the systems that power our AI products. You\'ll work on APIs, data pipelines, and integrations that handle real-world scale.\nYou\'ll have full ownership over what you build and ship.',
    requirements: [
      '5+ years of backend engineering experience',
      'Strong proficiency in Node.js, Python, or Go',
      'Experience designing and operating distributed systems',
      'Comfortable with cloud infrastructure (GCP / AWS)',
      'Experience integrating AI/ML APIs is a plus',
    ],
    offer: [
      'High-ownership engineering culture',
      'Modern stack — no legacy baggage',
      'Work directly on products used globally',
      'Fully remote with occasional team meetups',
    ],
  },
];

/* -------- Apply form -------- */
function ApplyForm({ role }) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    linkedin: '', portfolio: '',
    cv: null,
    cover: '',
  });

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function next(e) {
    e.preventDefault();
    if (step < totalSteps) setStep(s => s + 1);
  }

  function back(e) {
    e.preventDefault();
    if (step > 1) setStep(s => s - 1);
  }

  const stepLabels = ['Personal info', 'Links', 'CV', 'Cover letter'];

  return (
    <div className="apply-form-wrap">
      <div className="apply-form-header">
        <h3 className="apply-form-title">Apply for {role.title}</h3>
        <p className="apply-form-subtitle">Send your details, CV, and a short cover letter.</p>
      </div>

      <div className="apply-steps-bar">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className={`apply-step-segment ${i < step ? 'done' : ''} ${i === step - 1 ? 'active' : ''}`} />
        ))}
      </div>
      {step <= totalSteps && <p className="apply-step-label">Step {step} of {totalSteps} — {stepLabels[step - 1]}</p>}

      <form onSubmit={step === totalSteps ? (e) => { e.preventDefault(); setStep(totalSteps + 1); } : next}>
        {step === 1 && (
          <div className="apply-fields">
            <div className="apply-field-full">
              <label className="apply-label">Full name *</label>
              <input className="apply-input" type="text" placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} required />
            </div>
            <div className="apply-field-row">
              <div>
                <label className="apply-label">Phone number *</label>
                <input className="apply-input" type="tel" placeholder="+7 / +1 / +971…" value={form.phone} onChange={e => update('phone', e.target.value)} required />
              </div>
              <div>
                <label className="apply-label">Email *</label>
                <input className="apply-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => update('email', e.target.value)} required />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="apply-fields">
            <div className="apply-field-full">
              <label className="apply-label">LinkedIn profile</label>
              <input className="apply-input" type="url" placeholder="https://linkedin.com/in/yourname" value={form.linkedin} onChange={e => update('linkedin', e.target.value)} />
            </div>
            <div className="apply-field-full">
              <label className="apply-label">Portfolio / website</label>
              <input className="apply-input" type="url" placeholder="https://yourwebsite.com" value={form.portfolio} onChange={e => update('portfolio', e.target.value)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="apply-fields">
            <div className="apply-field-full">
              <label className="apply-label">Upload CV *</label>
              <div className="apply-file-zone" onClick={() => document.getElementById('cv-input').click()}>
                {form.cv
                  ? <span className="apply-file-name">{form.cv.name}</span>
                  : <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span>Drop your CV here or click to upload</span>
                      <span className="apply-file-hint">PDF, DOC, DOCX — up to 10 MB</span>
                    </>
                }
              </div>
              <input id="cv-input" type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => update('cv', e.target.files[0])} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="apply-fields">
            <div className="apply-field-full">
              <label className="apply-label">Cover letter</label>
              <textarea className="apply-input apply-textarea" placeholder="Tell us why you want to join NVS and what you'd bring to the team…" value={form.cover} onChange={e => update('cover', e.target.value)} rows={6} />
            </div>
          </div>
        )}

        {step === totalSteps + 1 && (
          <div className="apply-success">
            <div className="apply-success-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13 18 8 13"/><path d="M20 20H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12z" opacity="0"/></svg>
            </div>
            <h4 className="apply-success-title">Application sent!</h4>
            <p className="apply-success-body">We'll review your application and get back to you within a few days.</p>
          </div>
        )}

        {step <= totalSteps && (
          <div className="apply-form-foot">
            {step > 1 && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={back}>← Back</button>
            )}
            <button type="submit" className="btn btn-primary">
              {step === totalSteps ? 'Submit application' : 'Continue →'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

/* -------- Role card (accordion) -------- */
function RoleCard({ role }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  return (
    <article className={`role-card ${open ? 'role-card--open' : ''}`}>
      <button className="role-card-header" onClick={() => setOpen(o => !o)}>
        <div className="role-card-info">
          <h3 className="role-card-title">{role.title}</h3>
          <p className="role-card-meta">{role.department} · {role.type} · {role.location}</p>
        </div>
        <span className="role-card-toggle">
          {open
            ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          }
        </span>
      </button>

      {open && (
        <div className="role-card-body" ref={bodyRef}>
          <div className="role-body-inner">
            <div className="role-about-box">
              <p className="role-about-text">
                <strong>Nomad Venture Studio</strong> is on a mission to build global AI products that make personal and professional growth more accessible. Our entrepreneurial environment, backed by a team of bright talents, inspires bold ideas and ambitious goals.
              </p>
            </div>

            <div className="role-sections">
              <div className="role-section">
                <h4 className="role-section-title">About the role</h4>
                {role.about.split('\n').map((p, i) => (
                  <p key={i} className="role-section-text">{p}</p>
                ))}
              </div>

              <div className="role-section">
                <h4 className="role-section-title">Requirements</h4>
                <ul className="role-list">
                  {role.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div className="role-section">
                <h4 className="role-section-title">What we offer</h4>
                <ul className="role-list">
                  {role.offer.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>
            </div>

            <ApplyForm role={role} />
          </div>
        </div>
      )}
    </article>
  );
}

/* -------- Main careers page -------- */
function CareersPage() {
  const openCount = careersData.length;

  return (
    <>
      {/* Hero */}
      <section className="careers-hero container">
        <div className="careers-hero-inner">
          <span className="eyebrow">Careers at NVS</span>
          <h1 className="h-display careers-hero-title">Careers</h1>
          <p className="lead careers-hero-sub">
            Join Nomad Venture Studio. We build global AI products and look for people who want growth, ownership, and responsibility.
          </p>
        </div>
      </section>

      {/* Roles list */}
      <section className="careers-roles container" id="open-roles">
        <div className="careers-roles-header">
          <h2 className="careers-roles-count">{openCount} open roles</h2>
        </div>
        <div className="roles-list">
          {careersData.map(role => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </section>
    </>
  );
}

Object.assign(window, { CareersNav, CareersPage });
