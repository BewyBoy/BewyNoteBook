# Rework Scrollytelling & Snap: Developer Guide & Template

This guide outlines the unified design pattern and code structure for building or reworking split-screen scrollytelling pages in the BewyNoteBook project. It relies on **native browser CSS snapping** for smooth scroll performance, **IntersectionObserver** for section activation (without heavy libraries like GSAP ScrollTrigger), and **automatic mobile relocation**.

---

## 1. Directory Structure & Naming
When building a new chapter page, create two versions of the file:
1. `chuong-[name]-split.html` (The primary working file)
2. `chuong-[name].html` (The production-ready synced file)

Always copy the content of the `-split.html` file into the main file after changes.

---

## 2. Layout Structure (HTML)

The page layout is divided into a left-side **Notebook Column** and a right-side fixed **Lab/Visuals Panel**. On mobile viewports, the right panel is hidden, and the interactive visualizations are moved inline under each section.

```html
<div class="scrolly-container">
  
  <!-- LEFT SIDE: NOTEBOOK COLUMN -->
  <div class="notebook-panel">
    
    <!-- Hero / Header Section -->
    <header class="hero ruled-page" data-demo="0">
      <div class="crumb">
        <a href="Learning Resources Hub v4.html">Hóa học</a> › Chương [N]
      </div>
      <h1 class="title">[Chapter Title]</h1>
      <div class="title-stroke"></div>
      <p class="subtitle">[Subtitles]</p>
      <p class="intro">
        [Introductory text...]
      </p>
    </header>

    <main class="layout">
      
      <!-- SECTION 1 -->
      <section id="sec-notebook-1" class="card ruled-page" data-demo="1">
        <h2>1. [Section Title]</h2>
        <p>[Notebook content description...]</p>
        
        <!-- Mobile Placeholder (Dynamically filled on <= 920px screen sizes) -->
        <div id="mob-demo-1" class="mobile-demo-placeholder"></div>
      </section>

      <!-- SECTION 2 -->
      <section id="sec-notebook-2" class="card ruled-page" data-demo="2">
        <h2>2. [Section Title]</h2>
        <p>[Notebook content description...]</p>
        <div id="mob-demo-2" class="mobile-demo-placeholder"></div>
      </section>

      <!-- Add more sections as needed (e.g. data-demo="3", data-demo="4", etc.) -->

    </main>
  </div>

  <!-- RIGHT SIDE: ELEGANT LAB BENCH / CHALKBOARD -->
  <div class="lab-panel">
    <div class="lab-sticky-wrapper">
      
      <!-- Desktop Demonstration Panels (Anchored here on > 920px screens) -->
      <div id="desk-demo-1" class="desk-demo-slot">
        <div id="demo-1" class="demo-panel">
          <!-- Interactive Widget 1 (Three.js, game, quiz, etc.) -->
        </div>
      </div>

      <div id="desk-demo-2" class="desk-demo-slot">
        <div id="demo-2" class="demo-panel">
          <!-- Interactive Widget 2 -->
        </div>
      </div>

    </div>
  </div>

</div>
```

---

## 3. Styling & Scroll Snapping (CSS)

Add the following CSS rules to your `<style>` tag to lock the viewport on desktop and enable native scroll snapping.

```css
/* Base container and column widths */
.scrolly-container {
  display: flex;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.notebook-panel {
  width: 50%;
  position: relative;
  background-color: var(--paper);
  box-shadow: 5px 0 15px rgba(0,0,0,0.2);
  z-index: 5;
}

.lab-panel {
  width: 50%;
  background: #141913;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 1;
}

/* Sections on left-side notebook */
.hero {
  padding: 90px 40px 30px 96px;
  border-bottom: 2px solid rgba(26,18,8,0.12);
  scroll-snap-align: start;
}

.card {
  padding: 90px 36px 90px 96px;
  border-top: 1px solid rgba(26,18,8,0.08);
  min-height: 100vh;
  box-sizing: border-box;
  scroll-snap-align: start;
}

/* Desktop Scroll Snapping & Panel Locking (min-width: 921px) */
@media (min-width: 921px) {
  .scrolly-container {
    height: 100vh;
    overflow: hidden;
  }
  .notebook-panel {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory; /* Native CSS Snapping */
    scrollbar-width: none;
  }
  .notebook-panel::-webkit-scrollbar {
    display: none;
  }
  .lab-panel {
    position: relative;
    right: auto;
    top: auto;
    height: 100vh;
  }
  
  /* Inactive section content fading */
  .card > *:not(.mobile-demo-placeholder) {
    opacity: 0.15;
    transition: opacity 0.5s ease;
  }
  .card.active-section > *:not(.mobile-demo-placeholder) {
    opacity: 1;
  }
  .hero > * {
    opacity: 0.15;
    transition: opacity 0.5s ease;
  }
  .hero.active-section > * {
    opacity: 1;
  }
}

/* Mobile Responsive Setup (max-width: 920px) */
@media (max-width: 920px) {
  .scrolly-container {
    flex-direction: column;
  }
  .notebook-panel {
    width: 100%;
  }
  .lab-panel {
    display: none;
  }
  .mobile-demo-placeholder {
    display: block;
    width: 100%;
    margin: 16px 0;
  }
  .demo-panel {
    position: relative;
    top: auto; bottom: auto; left: auto; right: auto;
    opacity: 1 !important;
    transform: none !important;
    pointer-events: auto !important;
    padding: 0;
    margin-top: 10px;
    height: auto;
  }
  .card {
    min-height: auto;
    padding-bottom: 24px;
  }
}
```

---

## 4. Section Detection & Relocation (JavaScript)

Place this script before `</body>` to control active state switching, side-panel toggling, and desktop-to-mobile relocation of widgets.

```javascript
/* ══════════════════════════════════════
   SECTION DETECTION — IntersectionObserver
   (Approach from example scroll.txt)
══════════════════════════════════════ */
const notebookSections = document.querySelectorAll('.hero, #sec-notebook-1, #sec-notebook-2, #sec-notebook-3, #sec-notebook-4');
const demoPanels = document.querySelectorAll('.demo-panel');

let currentActiveSec = null;

function setActiveSection(sec) {
  if (currentActiveSec === sec) return;
  currentActiveSec = sec;

  const activeDemoNum = sec.dataset.demo;
  const isDesktop = window.innerWidth > 920;

  // 1. Highlight active section and fade others on desktop via classes
  notebookSections.forEach((s) => {
    if (s === sec) {
      s.classList.add('active-section');
    } else {
      s.classList.remove('active-section');
    }
  });

  // 2. Activate the matching demo panel
  demoPanels.forEach((panel) => {
    if (panel.id === `demo-${activeDemoNum}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // 3. Trigger resize for specific visualization scenes (e.g. Three.js) if they exist
  if (activeDemoNum === '1' && typeof threeScene !== 'undefined' && threeScene && threeScene.resize) {
    threeScene.resize();
  }
}

// Set up IntersectionObserver with threshold: 0.2
function observeSection(sec) {
  const scroller = window.innerWidth > 920 ? document.querySelector('.notebook-panel') : null;
  const options = {
    root: scroller || null,
    threshold: 0.2
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target);
      }
    });
  }, options);
  io.observe(sec);
  return io;
}

let sectionObservers = [];

function initObservers() {
  sectionObservers.forEach(io => io.disconnect());
  sectionObservers = [];
  notebookSections.forEach(sec => {
    sectionObservers.push(observeSection(sec));
  });
}

initObservers();


/* ══════════════════════════════════════
   MOBILE RESPONSIVE ELEMENT RELOCATION
══════════════════════════════════════ */
let wasDesktop = window.innerWidth > 920;

const relocateDemos = () => {
  const isMobile = window.innerWidth <= 920;
  const isDesktop = !isMobile;
  
  if (isDesktop !== wasDesktop) {
    wasDesktop = isDesktop;
    // Re-initialize observers when switching between mobile/desktop modes
    initObservers();
  }

  // Relocate demo blocks depending on screen size
  for (let i = 1; i <= 4; i++) {
    const demo = document.getElementById(`demo-${i}`);
    if (!demo) continue;
    
    if (isMobile) {
      const mobContainer = document.getElementById(`mob-demo-${i}`);
      if (mobContainer && demo.parentElement !== mobContainer) {
        mobContainer.appendChild(demo);
      }
    } else {
      const deskContainer = document.getElementById(`desk-demo-${i}`);
      if (deskContainer && demo.parentElement !== deskContainer) {
        deskContainer.appendChild(demo);
      }
    }
  }
  
  if (isMobile) {
    notebookSections.forEach((s) => {
      const targets = Array.from(s.children).filter(c => !c.classList.contains('mobile-demo-placeholder'));
      targets.forEach(t => t.style.opacity = ''); // Reset inline opacities on mobile
    });
  }
  
  // Call your canvas resize handlers if they exist
  if (typeof resize === 'function') resize();
  if (typeof resizeHistory === 'function') resizeHistory();
};

window.addEventListener('resize', relocateDemos);
// Run once on load
setTimeout(relocateDemos, 150);
```
