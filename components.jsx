/* ============================================================
   BewyNoteBook — Component library
   Sketch-brutalism style Learning Resources Hub
   ============================================================ */

/* ---- Subject data ---- */
const SUBJECTS = [
  { id: 'math',      label: 'Math',      icon: 'π',  color: 'var(--terracotta)', colorDeep: 'var(--terracotta-deep)', desc: 'Algebra, Calculus, Geometry, Statistics & Probability' },
  { id: 'physics',   label: 'Physics',   icon: '⚙',  color: 'var(--sky)',        colorDeep: 'var(--sky-deep)',        desc: 'Mechanics, Thermodynamics, Waves, Electromagnetism' },
  { id: 'chemistry', label: 'Chemistry', icon: '⚗',  color: 'var(--jade)',       colorDeep: 'var(--jade-deep)',       desc: 'Organic, Inorganic, Physical & Analytical Chemistry' },
  { id: 'biology',   label: 'Biology',   icon: '🧬', color: 'var(--marigold)',   colorDeep: 'var(--marigold-deep)',   desc: 'Cell Biology, Genetics, Ecology, Human Anatomy' },
  { id: 'economics', label: 'Economics', icon: '📊', color: 'var(--lotus)',      colorDeep: 'var(--lotus-deep)',      desc: 'Micro, Macro, Econometrics & Development Economics' },
];

/* ---- Decorative pencil SVG ---- */
function Pencil({ rotate, x, y, color }) {
  return (
    <svg width="160" height="18" viewBox="0 0 160 18" style={{
      position: 'absolute', left: x, top: y, transform: `rotate(${rotate}deg)`,
      filter: 'drop-shadow(2px 2px 0 rgba(42,37,32,0.15))', pointerEvents: 'none',
    }}>
      <rect x="20" y="3" width="120" height="12" rx="2" fill={color} stroke="var(--ink)" strokeWidth="2"/>
      <polygon points="0,9 20,3 20,15" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="130" y="3" width="26" height="12" rx="2" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2"/>
      <line x1="20" y1="3" x2="20" y2="15" stroke="var(--ink)" strokeWidth="1.5"/>
      <line x1="130" y1="3" x2="130" y2="15" stroke="var(--ink)" strokeWidth="1.5"/>
      <circle cx="6" cy="9" r="1.5" fill="var(--ink)"/>
    </svg>
  );
}

/* ---- Spiral binding ring ---- */
function SpiralRings({ count }) {
  return (
    <div style={{
      position: 'absolute', left: -12, top: 0, bottom: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
      alignItems: 'center', width: 24, zIndex: 5, pointerEvents: 'none',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="24" height="20" viewBox="0 0 24 20">
          <path d="M18 2 C 24 2, 24 18, 18 18 L 6 18 C 0 18, 0 2, 6 2"
            fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx="12" cy="10" rx="4" ry="7" fill="none"
            stroke="var(--ink-faint)" strokeWidth="1" opacity="0.3"/>
        </svg>
      ))}
    </div>
  );
}

/* ---- Subject Tab ---- */
function SubjectTab({ subject, active, onClick, index }) {
  const [hovered, setHovered] = React.useState(false);
  const isActive = active === subject.id;
  return (
    <button
      onClick={() => onClick(subject.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 20px 10px 16px',
        fontFamily: 'var(--font-hand)', fontSize: 20,
        color: 'var(--ink)',
        background: isActive ? subject.color : 'var(--paper)',
        border: `2.5px solid var(--ink)`,
        borderRight: 'none',
        borderRadius: '14px 0 0 14px',
        cursor: 'pointer',
        transform: `translateX(${isActive ? 8 : hovered ? 4 : 0}px) rotate(${isActive ? 0 : (index % 2 === 0 ? 0.5 : -0.5)}deg)`,
        transition: 'all 0.2s cubic-bezier(.34,1.56,.64,1)',
        boxShadow: isActive ? '3px 3px 0 var(--ink)' : hovered ? '2px 2px 0 var(--ink)' : 'none',
        position: 'relative', zIndex: isActive ? 3 : 1,
        minWidth: 150, justifyContent: 'space-between',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontWeight: 600 }}>{subject.label}</span>
      <span style={{ fontSize: 22, lineHeight: 1 }}>{subject.icon}</span>
    </button>
  );
}

/* ---- Notebook Card (main hero) ---- */
function NotebookCard({ activeSubject, onSubjectClick, tweaks }) {
  const subject = SUBJECTS.find(s => s.id === activeSubject) || SUBJECTS[0];
  return (
    <div style={{
      position: 'relative',
      background: tweaks.notebookColor,
      border: `3.5px solid var(--ink)`,
      borderRadius: 'var(--r-lg)',
      padding: '48px 48px 48px 60px',
      minHeight: 340,
      boxShadow: '6px 6px 0 var(--ink)',
      transform: 'rotate(-1deg)',
      transition: 'all 0.3s cubic-bezier(.34,1.56,.64,1)',
      maxWidth: 520,
      width: '100%',
    }}>
      <SpiralRings count={8} />

      {/* Label plaque */}
      <div style={{
        background: 'var(--paper)',
        border: '2.5px solid var(--ink)',
        borderRadius: 'var(--r-md)',
        padding: '28px 32px',
        position: 'relative',
        boxShadow: '2px 2px 0 var(--ink)',
      }}>
        {/* Decorative bracket corners */}
        <div style={{
          position: 'absolute', top: 6, left: 6, right: 6, bottom: 6,
          border: '1.5px solid var(--ink-faint)',
          borderRadius: 8, opacity: 0.4, pointerEvents: 'none',
        }}></div>

        <h1 style={{
          fontFamily: 'var(--font-doodle)', fontSize: 'clamp(32px, 5vw, 46px)',
          lineHeight: 1, margin: 0, color: 'var(--ink)',
          letterSpacing: '-0.01em',
        }}>
          Learning<br/>Resources Hub
        </h1>
        <h2 style={{
          fontFamily: 'var(--font-hand-sc)', fontSize: 16,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--ink-soft)', margin: '12px 0 0', fontWeight: 400,
        }}>
          Curriculum Chapters
        </h2>

        {/* Divider line */}
        <svg width="100%" height="6" viewBox="0 0 300 6" preserveAspectRatio="none" style={{ margin: '16px 0 12px' }}>
          <path d="M0 3 Q 75 0 150 3 T 300 3" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        <p style={{
          fontFamily: 'var(--font-hand)', fontSize: 17,
          color: 'var(--ink-faint)', margin: 0, lineHeight: 1.4,
        }}>
          Browse curated chapters across core subjects — real textbook insights, clear explanations, and more.
        </p>
      </div>

      {/* Active subject preview */}
      <div style={{
        marginTop: 20, padding: '14px 18px',
        background: 'rgba(251,244,228,0.5)',
        borderRadius: 'var(--r-md)',
        border: '1.5px dashed var(--ink-faint)',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{subject.icon}</span>
          <span style={{
            fontFamily: 'var(--font-hand)', fontSize: 18,
            color: 'var(--ink)', fontWeight: 600,
          }}>
            {subject.label} — Chapter Preview
          </span>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 14,
          color: 'var(--ink-soft)', margin: '6px 0 0', lineHeight: 1.5,
        }}>
          {subject.desc}
        </p>
      </div>
    </div>
  );
}

/* ---- CTA Button ---- */
function SketchButton({ children, primary, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        fontFamily: 'var(--font-hand)', fontSize: 19,
        padding: '12px 28px',
        background: primary ? 'var(--ink)' : 'var(--paper)',
        color: primary ? 'var(--paper)' : 'var(--ink)',
        border: `${primary ? 3.5 : 2.5}px solid var(--ink)`,
        borderRadius: 'var(--r-md)',
        cursor: 'pointer',
        transform: pressed
          ? 'translateY(3px) rotate(0deg)'
          : hovered
          ? 'translateY(-2px) rotate(-1deg)'
          : 'rotate(0deg)',
        boxShadow: pressed
          ? 'none'
          : hovered
          ? '4px 4px 0 var(--ink)'
          : 'var(--shadow-sketch)',
        transition: 'all 0.2s cubic-bezier(.34,1.56,.64,1)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
}

/* ---- Feature bullet ---- */
function FeatureBullet({ text, icon }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      fontFamily: 'var(--font-hand)', fontSize: 17,
      color: 'var(--ink-soft)', lineHeight: 1.4,
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, flexShrink: 0,
        background: 'var(--highlight)',
        border: '2px solid var(--ink)',
        borderRadius: '50%', fontSize: 14,
      }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

/* ---- Decorative doodle elements ---- */
function DoodleDecor({ tweaks }) {
  if (!tweaks.showDoodles) return null;
  return (
    <>
      <Pencil rotate={-25} x="-60px" y="120px" color="var(--sky)" />
      <Pencil rotate={-35} x="-80px" y="180px" color="var(--sky-deep)" />
      <Pencil rotate={-20} x="-40px" y="240px" color="var(--jade)" />
      <Pencil rotate={-30} x="-70px" y="300px" color="var(--terracotta)" />

      {/* Floating doodle icons */}
      <img src="assets/icons/tree.svg" width="36" height="36" style={{
        position: 'absolute', right: 40, bottom: 30,
        transform: 'rotate(8deg)', opacity: 0.3, pointerEvents: 'none',
        animation: 'wiggle 4s ease-in-out infinite',
      }}/>
      <img src="assets/icons/leaf.svg" width="28" height="28" style={{
        position: 'absolute', left: 60, top: 40,
        transform: 'rotate(-12deg)', opacity: 0.25, pointerEvents: 'none',
        animation: 'wiggle 3.5s ease-in-out infinite reverse',
      }}/>
      <img src="assets/icons/sun.svg" width="32" height="32" style={{
        position: 'absolute', right: 120, top: 20,
        opacity: 0.2, pointerEvents: 'none',
        animation: 'wiggle 5s ease-in-out infinite',
      }}/>
      <img src="assets/icons/coffee.svg" width="30" height="30" style={{
        position: 'absolute', left: 140, bottom: 20,
        transform: 'rotate(5deg)', opacity: 0.2, pointerEvents: 'none',
        animation: 'wiggle 4.5s ease-in-out infinite reverse',
      }}/>
    </>
  );
}

/* ---- Scroll / rolled paper decoration ---- */
function ScrollDecor({ style }) {
  return (
    <svg width="80" height="24" viewBox="0 0 80 24" style={{ ...style, pointerEvents: 'none', opacity: 0.25 }}>
      <rect x="8" y="4" width="64" height="16" rx="8" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2"/>
      <circle cx="10" cy="12" r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5"/>
      <circle cx="70" cy="12" r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5"/>
    </svg>
  );
}

/* ---- Brand mark ---- */
function BrandMark() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: 'var(--font-doodle)', fontSize: 24,
      color: 'var(--ink)', fontWeight: 700,
    }}>
      <svg width="36" height="36" viewBox="0 0 36 36">
        <rect x="2" y="6" width="20" height="26" rx="3" fill="var(--paper)"
          stroke="var(--ink)" strokeWidth="2.5"/>
        <rect x="14" y="2" width="20" height="26" rx="3" fill="var(--sky)"
          stroke="var(--ink)" strokeWidth="2.5"/>
        <path d="M20 10 L24 16 L20 22" fill="none" stroke="var(--ink)"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>LR Hub</span>
    </div>
  );
}

/* ---- Washi tape decoration ---- */
function WashiTape({ color, rotate, style }) {
  return (
    <div style={{
      position: 'absolute',
      width: 80, height: 22,
      background: color,
      opacity: 0.65,
      transform: `rotate(${rotate}deg)`,
      border: '1px solid var(--ink-faint)',
      borderRadius: 2,
      ...style,
    }}>
      <div style={{
        position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
        width: 4, height: 4, borderRadius: '50%',
        background: 'var(--ink)', opacity: 0.3,
      }}></div>
      <div style={{
        position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
        width: 4, height: 4, borderRadius: '50%',
        background: 'var(--ink)', opacity: 0.3,
      }}></div>
    </div>
  );
}

/* ---- Modal for subject detail ---- */
function SubjectModal({ subject, onClose }) {
  if (!subject) return null;
  const s = SUBJECTS.find(sub => sub.id === subject);
  if (!s) return null;

  const chapters = {
    math: ['Algebra Fundamentals', 'Calculus I & II', 'Linear Algebra', 'Probability & Statistics', 'Discrete Mathematics'],
    physics: ['Classical Mechanics', 'Electromagnetism', 'Thermodynamics', 'Waves & Optics', 'Modern Physics'],
    chemistry: ['Atomic Structure', 'Chemical Bonding', 'Organic Chemistry', 'Reaction Kinetics', 'Analytical Methods'],
    biology: ['Cell Biology', 'Genetics & DNA', 'Human Anatomy', 'Ecology & Environment', 'Evolutionary Biology'],
    economics: ['Microeconomics', 'Macroeconomics', 'International Trade', 'Financial Markets', 'Development Economics'],
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(42,37,32,0.4)',
      animation: 'fadeIn 0.2s ease',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--paper)',
        border: '3.5px solid var(--ink)',
        borderRadius: 'var(--r-lg)',
        padding: '36px 40px',
        maxWidth: 440, width: '90%',
        boxShadow: '8px 8px 0 var(--ink)',
        transform: 'rotate(-0.5deg)',
        animation: 'popIn 0.3s cubic-bezier(.34,1.56,.64,1)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 'var(--r-md)',
              background: s.color, border: '2.5px solid var(--ink)',
              fontSize: 22,
            }}>{s.icon}</span>
            <h2 style={{
              fontFamily: 'var(--font-doodle)', fontSize: 32,
              margin: 0, color: 'var(--ink)',
            }}>{s.label}</h2>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--paper-deep)', border: '2px solid var(--ink)',
            cursor: 'pointer', fontFamily: 'var(--font-hand)', fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)',
          }}>✕</button>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 15,
          color: 'var(--ink-soft)', margin: '0 0 20px', lineHeight: 1.5,
        }}>{s.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(chapters[s.id] || []).map((ch, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px',
              background: i % 2 === 0 ? 'var(--paper-deep)' : 'var(--paper)',
              border: '1.5px solid var(--ink)',
              borderRadius: 'var(--r-sm)',
              fontFamily: 'var(--font-hand)', fontSize: 17,
              color: 'var(--ink)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '2px 2px 0 var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span style={{
                width: 24, height: 24, borderRadius: '50%',
                background: s.color, border: '2px solid var(--ink)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                color: 'var(--ink)', flexShrink: 0,
              }}>{i + 1}</span>
              {ch}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  SUBJECTS, Pencil, SpiralRings, SubjectTab, NotebookCard,
  SketchButton, FeatureBullet, DoodleDecor, ScrollDecor,
  BrandMark, WashiTape, SubjectModal,
});
