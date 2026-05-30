/* ============================================================
   BewyNoteBook v2 — Flat Design / Long Shadow Components
   Bold geometric blocks, dark bg, material-flat aesthetic
   ============================================================ */

/* ---- Color palette (flat design) ---- */
const FLAT = {
  dark:      '#1E1B18',
  darkSoft:  '#2A2520',
  gold:      '#F2B544',
  goldDeep:  '#D89824',
  red:       '#C73C2E',
  redDeep:   '#9E2E22',
  redLight:  '#D95040',
  cream:     '#FBF4E4',
  creamDeep: '#F2E7CE',
  jade:      '#2F8F6F',
  jadeSoft:  '#3AAE85',
  sky:       '#6FB8D1',
  skyDeep:   '#3F8AAA',
  lotus:     '#E89BA8',
  terracotta:'#D9633B',
  ink:       '#2A2520',
};

/* ---- Subject data ---- */
const SUBJECTS_V2 = [
  { id: 'math',      label: 'Math',      icon: 'π',  color: FLAT.gold,      deep: FLAT.goldDeep,   desc: 'Algebra, Calculus, Geometry, Statistics & Probability' },
  { id: 'physics',   label: 'Physics',   icon: '⚙',  color: FLAT.sky,       deep: FLAT.skyDeep,    desc: 'Mechanics, Thermodynamics, Waves, Electromagnetism' },
  { id: 'chemistry', label: 'Chemistry', icon: '⚗',  color: FLAT.jade,      deep: '#1F6A52',       desc: 'Organic, Inorganic, Physical & Analytical Chemistry' },
  { id: 'biology',   label: 'Biology',   icon: '🧬',  color: FLAT.terracotta, deep: '#B04A26',       desc: 'Cell Biology, Genetics, Ecology, Human Anatomy' },
  { id: 'economics', label: 'Economics', icon: '📊',  color: FLAT.lotus,     deep: '#C76C7E',       desc: 'Micro, Macro, Econometrics & Development Economics' },
];

/* ---- Long shadow generator ---- */
function longShadow(color, length = 20) {
  const shadows = [];
  for (let i = 1; i <= length; i++) {
    shadows.push(`${i}px ${i}px 0 ${color}`);
  }
  return shadows.join(', ');
}

/* ---- Flat Book SVG (hero) ---- */
function FlatBook({ color, bookmarkColor, size = 280 }) {
  const w = size;
  const h = size * 1.15;
  const spineW = w * 0.08;
  const labelH = h * 0.28;
  const labelY = h * 0.18;
  const bandY = h * 0.58;
  const bandH = h * 0.12;
  const bmarkW = w * 0.08;
  const bmarkH = h * 0.2;
  const bmarkX = w * 0.45;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {/* Spine */}
      <rect x="0" y="0" width={spineW} height={h} rx="4"
        fill={bookmarkColor || '#9E2E22'} />
      {/* Book body */}
      <rect x={spineW - 2} y="0" width={w - spineW + 2} height={h} rx="8"
        fill={color || FLAT.red} />
      {/* Cream label */}
      <rect x={spineW + w * 0.1} y={labelY} width={w * 0.65} height={labelH} rx="4"
        fill={FLAT.cream} />
      {/* Lower band */}
      <rect x={spineW + w * 0.1} y={bandY} width={w * 0.65} height={bandH} rx="4"
        fill={bookmarkColor || FLAT.redDeep} />
      {/* Bookmark ribbon */}
      <polygon
        points={`${bmarkX},0 ${bmarkX + bmarkW},0 ${bmarkX + bmarkW},${bmarkH} ${bmarkX + bmarkW / 2},${bmarkH - bmarkW * 0.6} ${bmarkX},${bmarkH}`}
        fill={FLAT.dark} />
      {/* Small clasp at bottom */}
      <rect x={w * 0.47} y={h - h * 0.08} width={w * 0.1} height={h * 0.03} rx="2"
        fill={bookmarkColor || FLAT.redDeep} />
    </svg>
  );
}

/* ---- Flat Subject Tab ---- */
function FlatTab({ subject, active, onClick, index }) {
  const [hovered, setHovered] = React.useState(false);
  const isActive = active === subject.id;

  return (
    <button
      onClick={() => onClick(subject.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 22px',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: 16, fontWeight: isActive ? 700 : 500,
        color: isActive ? FLAT.dark : FLAT.cream,
        background: isActive ? subject.color : 'rgba(251,244,228,0.08)',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transform: hovered && !isActive ? 'translateX(6px)' : 'none',
        transition: 'all 0.25s cubic-bezier(.34,1.56,.64,1)',
        position: 'relative', overflow: 'hidden',
        width: '100%', textAlign: 'left',
      }}
    >
      {/* Active indicator bar */}
      {isActive && <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: subject.deep, borderRadius: '0 4px 4px 0',
      }} />}
      <span style={{
        width: 36, height: 36, borderRadius: 10,
        background: isActive ? 'rgba(0,0,0,0.12)' : 'rgba(251,244,228,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, flexShrink: 0,
        transition: 'all 0.2s ease',
      }}>{subject.icon}</span>
      <span>{subject.label}</span>
      {isActive && <span style={{
        marginLeft: 'auto', fontSize: 18, opacity: 0.5,
      }}>→</span>}
    </button>
  );
}

/* ---- Flat CTA Button ---- */
function FlatButton({ children, primary, color, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const bg = primary ? (color || FLAT.gold) : 'transparent';
  const fg = primary ? FLAT.dark : FLAT.cream;
  const shadowColor = primary ? (color ? 'rgba(0,0,0,0.3)' : 'rgba(210,152,36,0.4)') : 'transparent';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: 16, fontWeight: 700,
        padding: '14px 32px',
        background: bg,
        color: fg,
        border: primary ? 'none' : `2px solid rgba(251,244,228,0.2)`,
        borderRadius: 14,
        cursor: 'pointer',
        transform: pressed ? 'translateY(2px) scale(0.98)' : hovered ? 'translateY(-2px)' : 'none',
        boxShadow: pressed ? 'none' :
          primary ? `0 ${hovered ? 12 : 8}px ${hovered ? 28 : 20}px -4px ${shadowColor}` :
          'none',
        transition: 'all 0.2s cubic-bezier(.34,1.56,.64,1)',
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </button>
  );
}

/* ---- Feature Card (flat) ---- */
function FlatFeatureCard({ icon, title, desc, color }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 24,
        background: 'rgba(251,244,228,0.04)',
        borderRadius: 16,
        border: '1px solid rgba(251,244,228,0.06)',
        transform: hov ? 'translateY(-4px)' : 'none',
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: color || FLAT.gold,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, marginBottom: 16,
        boxShadow: `0 6px 16px -4px ${color || FLAT.gold}44`,
      }}>{icon}</div>
      <h4 style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: 16, fontWeight: 700,
        color: FLAT.cream, margin: '0 0 6px',
      }}>{title}</h4>
      <p style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: 14, color: 'rgba(251,244,228,0.5)',
        margin: 0, lineHeight: 1.5,
      }}>{desc}</p>
    </div>
  );
}

/* ---- Subject Modal (flat) ---- */
function FlatModal({ subject, onClose }) {
  if (!subject) return null;
  const s = SUBJECTS_V2.find(sub => sub.id === subject);
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
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      animation: 'flatFadeIn 0.2s ease',
    }} onClick={onClose}>
      <div style={{
        background: FLAT.darkSoft,
        borderRadius: 20,
        padding: '32px 36px',
        maxWidth: 440, width: '90%',
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5)',
        animation: 'flatPopIn 0.3s cubic-bezier(.34,1.56,.64,1)',
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: s.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            }}>{s.icon}</div>
            <div>
              <h2 style={{
                fontFamily: "'Caveat', cursive", fontSize: 30,
                margin: 0, color: FLAT.cream,
              }}>{s.label}</h2>
              <p style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 13, color: 'rgba(251,244,228,0.4)', margin: 0,
              }}>{(chapters[s.id] || []).length} chapters available</p>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(251,244,228,0.06)',
            border: 'none', cursor: 'pointer',
            color: FLAT.cream, fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>
        {/* Chapters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(chapters[s.id] || []).map((ch, i) => (
            <ChapterRow key={i} index={i} label={ch} color={s.color} deep={s.deep} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterRow({ index, label, color, deep }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '12px 16px',
        background: hov ? 'rgba(251,244,228,0.06)' : 'transparent',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        transform: hov ? 'translateX(4px)' : 'none',
      }}>
      <span style={{
        width: 30, height: 30, borderRadius: 8,
        background: hov ? color : 'rgba(251,244,228,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: 13, fontWeight: 700,
        color: hov ? FLAT.dark : 'rgba(251,244,228,0.4)',
        transition: 'all 0.15s ease', flexShrink: 0,
      }}>{index + 1}</span>
      <span style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontSize: 15, color: FLAT.cream,
      }}>{label}</span>
      <span style={{
        marginLeft: 'auto', fontSize: 14,
        color: 'rgba(251,244,228,0.2)',
        transform: hov ? 'translateX(4px)' : 'none',
        transition: 'all 0.15s ease',
      }}>→</span>
    </div>
  );
}

/* ---- Brand Logo (flat) ---- */
function FlatBrand({ size = 'default' }) {
  const sz = size === 'large' ? 28 : 20;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{
        width: sz + 16, height: sz + 16, borderRadius: sz * 0.4,
        background: FLAT.gold,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="13" height="17" rx="2" fill={FLAT.dark} opacity="0.2"/>
          <rect x="6" y="1" width="13" height="17" rx="2" fill={FLAT.dark} opacity="0.6"/>
          <rect x="9" y="4" width="7" height="3" rx="1" fill={FLAT.cream} opacity="0.7"/>
        </svg>
      </div>
      <span style={{
        fontFamily: "'Caveat', cursive", fontWeight: 700,
        fontSize: sz, color: FLAT.cream,
        letterSpacing: '-0.02em',
      }}>LR Hub</span>
    </div>
  );
}

Object.assign(window, {
  FLAT, SUBJECTS_V2, longShadow,
  FlatBook, FlatTab, FlatButton, FlatFeatureCard,
  FlatModal, FlatBrand, ChapterRow,
});
