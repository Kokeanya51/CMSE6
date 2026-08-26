/**
 * MACOKI EDUCATION HUB – Main Application Script
 * Vanilla JavaScript only. Organized into logical modules.
 * Detailed comments for educational purposes.
 */

/* =========================================================
   1. STATE & UTILITIES
   ========================================================= */
const AppState = {
  currentPage: "home",
  theme: localStorage.getItem("macoki-theme") || "light",
  currentLetterIndex: 0,
  cbt: {
    active: false,
    questions: [],
    currentIndex: 0,
    answers: {},
    timer: null,
    timeLeft: 0,
    studentName: "",
    classLevel: "",
    subject: ""
  },
  student: JSON.parse(localStorage.getItem("macoki-student") || "null") || {
    name: "Learner",
    classLevel: "",
    scores: [],
    activities: [],
    badges: []
  }
};

/** Simple toast notification */
function showToast(message, duration = 3000) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/** Safe LocalStorage helpers */
function saveStudent() {
  try {
    localStorage.setItem("macoki-student", JSON.stringify(AppState.student));
  } catch (e) {
    console.warn("LocalStorage unavailable:", e);
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("macoki-theme", theme);
  } catch (e) {}
}

/* =========================================================
   2. THEME (Dark / Light Mode)
   ========================================================= */
function initTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (!localStorage.getItem("macoki-theme") && prefersDark) {
    AppState.theme = "dark";
  }
  document.documentElement.setAttribute("data-theme", AppState.theme);
  updateThemeIcon();
}

function toggleTheme() {
  AppState.theme = AppState.theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", AppState.theme);
  saveTheme(AppState.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.textContent = AppState.theme === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-label", AppState.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}

/* =========================================================
   3. NAVIGATION & MOBILE MENU
   ========================================================= */
function initNavigation() {
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
    });
  }

  // Close menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navList?.classList.contains("open")) {
      navList.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  });

  // SPA-like page switching
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) showPage(page);
      // Close mobile menu
      navList?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  // Hub cards also navigate
  document.querySelectorAll("[data-goto]").forEach(el => {
    el.addEventListener("click", () => {
      const page = el.dataset.goto;
      if (page) showPage(page);
    });
  });
}

function showPage(pageId) {
  // Hide all sections
  document.querySelectorAll(".page-section").forEach(sec => {
    sec.classList.remove("active");
  });
  // Show target
  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.add("active");
    AppState.currentPage = pageId;
    // Update active nav
    document.querySelectorAll(".nav-link").forEach(l => {
      l.classList.toggle("active", l.dataset.page === pageId);
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Page-specific init
    if (pageId === "alphabet") renderAlphabet();
    if (pageId === "schools") renderSchoolLevels();
    if (pageId === "cbt") resetCbtSetup();
    if (pageId === "dashboard") renderDashboard();
    if (pageId === "library") renderLibrary();
  }
}

/* =========================================================
   4. SCROLL TO TOP & ANIMATIONS
   ========================================================= */
function initScrollFeatures() {
  const scrollBtn = document.getElementById("scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("visible", window.scrollY > 300);
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // IntersectionObserver for fade-in animations
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    document.querySelectorAll("[data-animate]").forEach(el => el.classList.add("visible"));
  }
}

/* =========================================================
   5. ALPHABET + TEXT-TO-SPEECH
   ========================================================= */
function renderAlphabet() {
  const grid = document.getElementById("alphabet-grid");
  const display = document.getElementById("alphabet-display");
  if (!grid || !display || typeof ALPHABET_DATA === "undefined") return;

  // Build letter buttons
  grid.innerHTML = ALPHABET_DATA.map((item, i) =>
    `<button class="letter-btn${i === AppState.currentLetterIndex ? " active" : ""}" 
             data-index="${i}" 
             aria-label="Letter ${item.upper}">
       ${item.upper}
     </button>`
  ).join("");

  grid.querySelectorAll(".letter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      AppState.currentLetterIndex = parseInt(btn.dataset.index, 10);
      updateAlphabetDisplay();
      grid.querySelectorAll(".letter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  updateAlphabetDisplay();
}

function updateAlphabetDisplay() {
  const item = ALPHABET_DATA[AppState.currentLetterIndex];
  const display = document.getElementById("alphabet-display");
  if (!display || !item) return;

  display.innerHTML = `
    <div class="letter-big" aria-live="polite">${item.upper}</div>
    <div class="letter-case">${item.upper} ${item.lower}</div>
    <div class="letter-emoji" aria-hidden="true">${item.emoji}</div>
    <div class="letter-word">${item.word}</div>
    <div class="alphabet-controls">
      <button class="btn btn-sm" id="prev-letter" aria-label="Previous letter">← Prev</button>
      <button class="btn btn-sm btn-secondary" id="speak-letter" aria-label="Speak letter and word">🔊 Speak</button>
      <button class="btn btn-sm" id="next-letter" aria-label="Next letter">Next →</button>
    </div>
  `;

  document.getElementById("prev-letter")?.addEventListener("click", () => {
    AppState.currentLetterIndex = (AppState.currentLetterIndex - 1 + 26) % 26;
    renderAlphabet();
  });
  document.getElementById("next-letter")?.addEventListener("click", () => {
    AppState.currentLetterIndex = (AppState.currentLetterIndex + 1) % 26;
    renderAlphabet();
  });
  document.getElementById("speak-letter")?.addEventListener("click", () => {
    speakText(`${item.upper}. ${item.word}`);
  });
}

/** Text-to-Speech using Web Speech API */
function speakText(text) {
  if (!("speechSynthesis" in window)) {
    showToast("Speech synthesis is not supported in this browser.");
    return;
  }
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB"; // Clear British English for Nigerian learners
  utterance.rate = 0.9;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

/* =========================================================
   6. SCHOOL LEVELS
   ========================================================= */
function renderSchoolLevels() {
  const container = document.getElementById("schools-content");
  if (!container || typeof SCHOOL_STRUCTURE === "undefined") return;

  container.innerHTML = `
    <div class="hub-grid" data-animate>
      ${Object.entries(SCHOOL_STRUCTURE).map(([key, level]) => `
        <article class="card hub-card" data-level="${key}" role="button" tabindex="0">
          <div class="icon">${key === "nursery" ? "🧸" : key === "primary" ? "📚" : key === "jss" ? "🎓" : "🏫"}</div>
          <h3>${level.label}</h3>
          <p>${level.description}</p>
        </article>
      `).join("")}
    </div>
  `;

  container.querySelectorAll("[data-level]").forEach(card => {
    const handler = () => showLevelDetail(card.dataset.level);
    card.addEventListener("click", handler);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") handler(); });
  });
}

function showLevelDetail(levelKey) {
  const level = SCHOOL_STRUCTURE[levelKey];
  const container = document.getElementById("schools-content");
  if (!level || !container) return;

  let subjectsHtml = "";
  if (levelKey === "ss") {
    // Senior secondary has pathways
    subjectsHtml = Object.entries(level.subjects).map(([path, subjects]) => `
      <h4 style="margin:1.5rem 0 0.75rem;text-transform:capitalize;">${path} Pathway</h4>
      <div class="subject-grid">
        ${subjects.map(s => `
          <div class="card subject-card" data-subject="${s.id}" data-level="${levelKey}">
            <div class="icon">${s.icon}</div>
            <h4>${s.name}</h4>
          </div>
        `).join("")}
      </div>
    `).join("");
  } else {
    subjectsHtml = `
      <div class="subject-grid">
        ${level.subjects.map(s => `
          <div class="card subject-card" data-subject="${s.id}" data-level="${levelKey}">
            <div class="icon">${s.icon}</div>
            <h4>${s.name}</h4>
          </div>
        `).join("")}
      </div>
    `;
  }

  container.innerHTML = `
    <button class="btn btn-outline back-btn" id="back-to-levels">← Back to Levels</button>
    <h2 class="section-title" style="text-align:left;margin-bottom:0.5rem;">${level.label}</h2>
    <p class="section-subtitle" style="text-align:left;margin-left:0;">${level.description}</p>
    
    <h3 style="margin:1.5rem 0 0.75rem;">Classes</h3>
    <div class="class-grid">
      ${level.classes.map(c => `
        <div class="card class-card" data-class="${c.id}">
          <h4>${c.name}</h4>
          ${c.ages ? `<p style="font-size:0.85rem;color:var(--text-muted);">${c.ages}</p>` : ""}
        </div>
      `).join("")}
    </div>

    <h3 style="margin:2rem 0 0.75rem;">Subjects</h3>
    ${subjectsHtml}
    <p style="margin-top:1.5rem;font-size:0.9rem;color:var(--text-muted);">
      Content is designed to align with relevant Nigerian curriculum requirements. 
      Official curriculum documents should be consulted for authoritative requirements.
    </p>
  `;

  document.getElementById("back-to-levels")?.addEventListener("click", renderSchoolLevels);

  // Class selection → store preference
  container.querySelectorAll("[data-class]").forEach(el => {
    el.addEventListener("click", () => {
      AppState.student.classLevel = el.dataset.class;
      saveStudent();
      showToast(`Selected: ${el.querySelector("h4").textContent}`);
      el.classList.add("active");
    });
  });

  // Subject click → optional navigation to CBT filtered by subject
  container.querySelectorAll("[data-subject]").forEach(el => {
    el.addEventListener("click", () => {
      showToast(`${el.querySelector("h4").textContent} – open CBT or Library for practice materials.`);
    });
  });
}

/* =========================================================
   7. CBT EXAMINATION SYSTEM
   ========================================================= */
function resetCbtSetup() {
  const setup = document.getElementById("cbt-setup");
  const exam = document.getElementById("cbt-exam");
  const results = document.getElementById("cbt-results");
  if (setup) setup.style.display = "block";
  if (exam) exam.style.display = "none";
  if (results) results.style.display = "none";

  // Stop any running timer
  if (AppState.cbt.timer) {
    clearInterval(AppState.cbt.timer);
    AppState.cbt.timer = null;
  }
  AppState.cbt.active = false;
}

function initCbt() {
  const startBtn = document.getElementById("start-cbt");
  if (!startBtn) return;

  startBtn.addEventListener("click", () => {
    const name = document.getElementById("cbt-name")?.value.trim() || "Learner";
    const classLevel = document.getElementById("cbt-class")?.value || "";
    const subject = document.getElementById("cbt-subject")?.value || "";
    const numQuestions = parseInt(document.getElementById("cbt-count")?.value || "10", 10);
    const useTimer = document.getElementById("cbt-timer-check")?.checked;
    const minutes = parseInt(document.getElementById("cbt-minutes")?.value || "15", 10);

    if (!classLevel) {
      showToast("Please select a class level.");
      return;
    }

    // Get questions (supports expansion)
    let questions = typeof getQuestions === "function"
      ? getQuestions({ classLevel, subject: subject || null, limit: numQuestions })
      : [];

    // Fallback: if filter returns too few, take any available
    if (questions.length < 3 && typeof CBT_QUESTIONS !== "undefined") {
      questions = getQuestions({ limit: numQuestions });
    }

    if (questions.length === 0) {
      showToast("No questions available for this selection. Try a different class/subject.");
      return;
    }

    AppState.cbt = {
      active: true,
      questions,
      currentIndex: 0,
      answers: {},
      timer: null,
      timeLeft: useTimer ? minutes * 60 : 0,
      studentName: name,
      classLevel,
      subject: subject || "General"
    };

    AppState.student.name = name;
    saveStudent();

    document.getElementById("cbt-setup").style.display = "none";
    document.getElementById("cbt-exam").style.display = "block";
    document.getElementById("cbt-results").style.display = "none";

    renderQuestion();
    renderQuestionNumbers();

    if (useTimer && AppState.cbt.timeLeft > 0) {
      startCbtTimer();
    } else {
      const timerEl = document.getElementById("cbt-timer");
      if (timerEl) timerEl.textContent = "No timer";
    }
  });
}

function renderQuestion() {
  const q = AppState.cbt.questions[AppState.cbt.currentIndex];
  const container = document.getElementById("question-area");
  if (!q || !container) return;

  const selected = AppState.cbt.answers[AppState.cbt.currentIndex];

  container.innerHTML = `
    <div class="question-card">
      <div class="question-number">Question ${AppState.cbt.currentIndex + 1} of ${AppState.cbt.questions.length}</div>
      <div class="question-text">${q.question}</div>
      <div class="option-list">
        ${q.options.map((opt, i) => `
          <label class="option-item${selected === i ? " selected" : ""}">
            <input type="radio" name="cbt-option" value="${i}" ${selected === i ? "checked" : ""}>
            <span><strong>${String.fromCharCode(65 + i)}.</strong> ${opt}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `;

  container.querySelectorAll(".option-item").forEach(label => {
    label.addEventListener("click", () => {
      const val = parseInt(label.querySelector("input").value, 10);
      AppState.cbt.answers[AppState.cbt.currentIndex] = val;
      renderQuestion(); // re-render to update selected state
      renderQuestionNumbers();
    });
  });

  // Nav buttons
  const prevBtn = document.getElementById("cbt-prev");
  const nextBtn = document.getElementById("cbt-next");
  const submitBtn = document.getElementById("cbt-submit");

  if (prevBtn) {
    prevBtn.disabled = AppState.cbt.currentIndex === 0;
    prevBtn.onclick = () => {
      if (AppState.cbt.currentIndex > 0) {
        AppState.cbt.currentIndex--;
        renderQuestion();
        renderQuestionNumbers();
      }
    };
  }
  if (nextBtn) {
    nextBtn.disabled = AppState.cbt.currentIndex >= AppState.cbt.questions.length - 1;
    nextBtn.onclick = () => {
      if (AppState.cbt.currentIndex < AppState.cbt.questions.length - 1) {
        AppState.cbt.currentIndex++;
        renderQuestion();
        renderQuestionNumbers();
      }
    };
  }
  if (submitBtn) {
    submitBtn.onclick = submitCbt;
  }
}

function renderQuestionNumbers() {
  const container = document.getElementById("q-numbers");
  if (!container) return;
  container.innerHTML = AppState.cbt.questions.map((_, i) => {
    let cls = "q-num";
    if (i === AppState.cbt.currentIndex) cls += " current";
    if (AppState.cbt.answers[i] !== undefined) cls += " answered";
    return `<button class="${cls}" data-q="${i}" aria-label="Go to question ${i + 1}">${i + 1}</button>`;
  }).join("");

  container.querySelectorAll(".q-num").forEach(btn => {
    btn.addEventListener("click", () => {
      AppState.cbt.currentIndex = parseInt(btn.dataset.q, 10);
      renderQuestion();
      renderQuestionNumbers();
    });
  });
}

function startCbtTimer() {
  const timerEl = document.getElementById("cbt-timer");
  const update = () => {
    const m = Math.floor(AppState.cbt.timeLeft / 60);
    const s = AppState.cbt.timeLeft % 60;
    if (timerEl) {
      timerEl.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      timerEl.classList.toggle("warning", AppState.cbt.timeLeft <= 60);
    }
    if (AppState.cbt.timeLeft <= 0) {
      clearInterval(AppState.cbt.timer);
      showToast("Time is up! Submitting automatically.");
      submitCbt();
      return;
    }
    AppState.cbt.timeLeft--;
  };
  update();
  AppState.cbt.timer = setInterval(update, 1000);
}

function submitCbt() {
  if (AppState.cbt.timer) {
    clearInterval(AppState.cbt.timer);
    AppState.cbt.timer = null;
  }

  const total = AppState.cbt.questions.length;
  let correct = 0;
  let answered = 0;

  AppState.cbt.questions.forEach((q, i) => {
    if (AppState.cbt.answers[i] !== undefined) {
      answered++;
      if (AppState.cbt.answers[i] === q.answer) correct++;
    }
  });

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const incorrect = answered - correct;
  const unanswered = total - answered;

  // Save score to student profile
  AppState.student.scores.push({
    date: new Date().toISOString(),
    classLevel: AppState.cbt.classLevel,
    subject: AppState.cbt.subject,
    score: correct,
    total,
    percentage
  });
  AppState.student.activities.push({
    type: "cbt",
    detail: `CBT – ${AppState.cbt.subject} (${percentage}%)`,
    date: new Date().toLocaleDateString()
  });
  // Simple badge logic
  if (percentage >= 80 && !AppState.student.badges.includes("High Scorer")) {
    AppState.student.badges.push("High Scorer");
  }
  if (AppState.student.scores.length >= 3 && !AppState.student.badges.includes("Persistent Learner")) {
    AppState.student.badges.push("Persistent Learner");
  }
  saveStudent();

  // Show results
  document.getElementById("cbt-exam").style.display = "none";
  const results = document.getElementById("cbt-results");
  results.style.display = "block";

  let message = "Keep practising – every attempt makes you stronger!";
  if (percentage >= 90) message = "Outstanding! Excellent work!";
  else if (percentage >= 70) message = "Very good! You’re doing well.";
  else if (percentage >= 50) message = "Good effort. Review the topics and try again.";

  results.innerHTML = `
    <h2>Examination Complete</h2>
    <div class="score-circle" style="--score-pct: ${percentage}%">
      <div class="score-value">${percentage}%</div>
    </div>
    <p style="font-size:1.15rem;font-weight:600;margin-bottom:0.5rem;">
      ${AppState.cbt.studentName}
    </p>
    <p style="color:var(--text-muted);margin-bottom:1rem;">
      ${AppState.cbt.classLevel.toUpperCase()} · ${AppState.cbt.subject}
    </p>
    <p style="margin-bottom:1.5rem;">${message}</p>
    <div class="results-stats">
      <div class="stat-item"><span>Score</span><strong>${correct} / ${total}</strong></div>
      <div class="stat-item"><span>Percentage</span><strong>${percentage}%</strong></div>
      <div class="stat-item"><span>Correct</span><strong>${correct}</strong></div>
      <div class="stat-item"><span>Incorrect</span><strong>${incorrect}</strong></div>
      <div class="stat-item"><span>Unanswered</span><strong>${unanswered}</strong></div>
      <div class="stat-item"><span>Answered</span><strong>${answered}</strong></div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center;margin-top:1.5rem;">
      <button class="btn" id="review-answers">Review Answers</button>
      <button class="btn btn-secondary" id="try-again">Try Again</button>
      <button class="btn btn-outline" id="back-dashboard">Dashboard</button>
    </div>
  `;

  document.getElementById("try-again")?.addEventListener("click", resetCbtSetup);
  document.getElementById("back-dashboard")?.addEventListener("click", () => showPage("dashboard"));
  document.getElementById("review-answers")?.addEventListener("click", reviewAnswers);
}

function reviewAnswers() {
  const results = document.getElementById("cbt-results");
  let html = `<h2>Answer Review</h2><div style="text-align:left;max-height:60vh;overflow-y:auto;">`;
  AppState.cbt.questions.forEach((q, i) => {
    const userAns = AppState.cbt.answers[i];
    const isCorrect = userAns === q.answer;
    html += `
      <div style="margin-bottom:1.25rem;padding:1rem;border:1px solid var(--border);border-radius:8px;background:var(--surface-2);">
        <p style="font-weight:600;">Q${i + 1}. ${q.question}</p>
        <p style="margin-top:0.5rem;">Your answer: <strong style="color:${isCorrect ? "var(--success)" : "var(--danger)"}">
          ${userAns !== undefined ? q.options[userAns] : "Not answered"}
        </strong></p>
        ${!isCorrect ? `<p>Correct: <strong>${q.options[q.answer]}</strong></p>` : ""}
        <p style="font-size:0.9rem;color:var(--text-muted);margin-top:0.4rem;">${q.explanation}</p>
      </div>
    `;
  });
  html += `</div><button class="btn" id="close-review" style="margin-top:1rem;">Close Review</button>`;
  results.innerHTML = html;
  document.getElementById("close-review")?.addEventListener("click", () => {
    // Re-show the score summary by re-submitting logic is heavy; simply go back to setup
    resetCbtSetup();
  });
}

/* =========================================================
   8. LEARNING PAD (Canvas Drawing)
   ========================================================= */
function initLearningPad() {
  const canvas = document.getElementById("drawing-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let drawing = false;
  let lastX = 0, lastY = 0;

  // Set actual canvas resolution
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const colorInput = document.getElementById("pad-color");
  const sizeInput = document.getElementById("pad-size");
  const clearBtn = document.getElementById("pad-clear");
  const saveBtn = document.getElementById("pad-save");

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
  }

  function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.strokeStyle = colorInput?.value || "#000";
    ctx.lineWidth = sizeInput?.value || 4;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastX = pos.x;
    lastY = pos.y;
  }

  function stopDraw() { drawing = false; }

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDraw);
  canvas.addEventListener("mouseleave", stopDraw);
  canvas.addEventListener("touchstart", startDraw, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });
  canvas.addEventListener("touchend", stopDraw);

  clearBtn?.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showToast("Canvas cleared");
  });

  saveBtn?.addEventListener("click", () => {
    try {
      const data = canvas.toDataURL("image/png");
      localStorage.setItem("macoki-pad-save", data);
      showToast("Drawing saved locally!");
      AppState.student.activities.push({
        type: "pad",
        detail: "Saved a Learning Pad drawing",
        date: new Date().toLocaleDateString()
      });
      saveStudent();
    } catch (e) {
      showToast("Could not save drawing.");
    }
  });
}

/* =========================================================
   9. DIGITAL LIBRARY (placeholder structure)
   ========================================================= */
function renderLibrary() {
  const container = document.getElementById("library-content");
  if (!container) return;

  // Demo resources – easy to expand later
  const resources = [
    { title: "Introduction to Numbers", level: "Nursery", type: "Notes", desc: "Counting 1–20 with pictures." },
    { title: "Alphabet Sounds", level: "Nursery", type: "Activity", desc: "Phonics practice for early readers." },
    { title: "Primary Mathematics – Addition", level: "Primary 1–3", type: "Notes", desc: "Step-by-step addition strategies." },
    { title: "Parts of Speech", level: "Primary 4–6", type: "Notes", desc: "Nouns, verbs, adjectives explained." },
    { title: "Living & Non-living Things", level: "JSS 1", type: "Notes", desc: "Basic Science foundation topic." },
    { title: "Photosynthesis Summary", level: "JSS 2–3", type: "Revision", desc: "Key points and simple diagrams." },
    { title: "Cell Structure", level: "SS 1 Biology", type: "Notes", desc: "Animal and plant cell overview." },
    { title: "Accounting Equation", level: "SS Commercial", type: "Notes", desc: "Assets = Liabilities + Capital." },
    { title: "Nigerian Independence", level: "JSS / SS", type: "Article", desc: "Historical overview for Civic / History." },
    { title: "Practice CBT Tips", level: "All Levels", type: "Guide", desc: "How to approach multiple-choice tests." }
  ];

  container.innerHTML = `
    <div class="library-grid" data-animate>
      ${resources.map(r => `
        <article class="card library-card">
          <span class="badge">${r.level}</span>
          <h4>${r.title}</h4>
          <p>${r.desc}</p>
          <p style="margin-top:0.6rem;font-size:0.85rem;color:var(--primary);">${r.type}</p>
        </article>
      `).join("")}
    </div>
    <p style="text-align:center;margin-top:2rem;color:var(--text-muted);font-size:0.9rem;">
      Resources are platform-created practice materials. Copyrighted textbooks are not reproduced.
      New materials can be added via the data layer.
    </p>
  `;
}

/* =========================================================
   10. STUDENT DASHBOARD
   ========================================================= */
function renderDashboard() {
  const container = document.getElementById("dashboard-content");
  if (!container) return;

  const s = AppState.student;
  const bestScore = s.scores.length
    ? Math.max(...s.scores.map(x => x.percentage))
    : 0;
  const totalTests = s.scores.length;
  const recent = s.activities.slice(-5).reverse();

  container.innerHTML = `
    <div class="dashboard-grid">
      <div class="card dash-card" data-animate>
        <h3>👤 Profile</h3>
        <p><strong>Name:</strong> ${s.name}</p>
        <p><strong>Class:</strong> ${s.classLevel || "Not selected yet"}</p>
        <div style="margin-top:1rem;">
          <label for="dash-name" style="font-weight:600;">Update name:</label>
          <input id="dash-name" type="text" value="${s.name}" style="width:100%;padding:0.5rem;margin-top:0.3rem;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);">
          <button class="btn btn-sm" id="save-name" style="margin-top:0.5rem;">Save</button>
        </div>
      </div>

      <div class="card dash-card" data-animate>
        <h3>📊 CBT Performance</h3>
        <p>Tests completed: <strong>${totalTests}</strong></p>
        <p>Best score: <strong>${bestScore}%</strong></p>
        <div class="progress-bar"><div class="progress-fill" style="width:${bestScore}%"></div></div>
      </div>

      <div class="card dash-card" data-animate>
        <h3>🏅 Badges</h3>
        <div class="badge-list">
          ${s.badges.length
            ? s.badges.map(b => `<span class="badge">${b}</span>`).join("")
            : "<span style='color:var(--text-muted);'>Complete activities to earn badges</span>"}
        </div>
      </div>

      <div class="card dash-card" data-animate>
        <h3>📝 Recent Activity</h3>
        ${recent.length
          ? `<ul style="font-size:0.95rem;">${recent.map(a => `<li style="margin-bottom:0.4rem;">${a.detail} <span style="color:var(--text-muted);">(${a.date})</span></li>`).join("")}</ul>`
          : "<p style='color:var(--text-muted);'>No activity yet. Start learning!</p>"}
      </div>
    </div>
  `;

  document.getElementById("save-name")?.addEventListener("click", () => {
    const val = document.getElementById("dash-name")?.value.trim();
    if (val) {
      AppState.student.name = val;
      saveStudent();
      showToast("Name updated");
      renderDashboard();
    }
  });
}

/* =========================================================
   11. GLOBAL SEARCH
   ========================================================= */
function initSearch() {
  const input = document.getElementById("global-search");
  const resultsBox = document.getElementById("search-results");
  if (!input || !resultsBox) return;

  const searchable = [
    { title: "Alphabet Learning", page: "alphabet", keywords: "alphabet letters phonics a-z" },
    { title: "Nursery School", page: "schools", keywords: "nursery early childhood" },
    { title: "Primary School", page: "schools", keywords: "primary 1 2 3 4 5 6" },
    { title: "Junior Secondary (JSS)", page: "schools", keywords: "jss junior secondary" },
    { title: "Senior Secondary (SS)", page: "schools", keywords: "ss senior secondary science commercial arts" },
    { title: "CBT Examination", page: "cbt", keywords: "cbt exam test practice questions" },
    { title: "Learning Pad", page: "pad", keywords: "drawing writing practice canvas" },
    { title: "Digital Library", page: "library", keywords: "library notes resources materials" },
    { title: "Student Dashboard", page: "dashboard", keywords: "dashboard progress scores" },
    { title: "Contact Support", page: "contact", keywords: "contact help support" }
  ];

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) {
      resultsBox.innerHTML = "";
      return;
    }
    const matches = searchable.filter(item =>
      item.title.toLowerCase().includes(q) || item.keywords.includes(q)
    );
    if (matches.length === 0) {
      resultsBox.innerHTML = `<p style="text-align:center;color:var(--text-muted);">No results found for “${input.value}”</p>`;
      return;
    }
    resultsBox.innerHTML = matches.map(m =>
      `<div class="search-item" data-page="${m.page}">${m.title}</div>`
    ).join("");
    resultsBox.querySelectorAll(".search-item").forEach(el => {
      el.addEventListener("click", () => {
        showPage(el.dataset.page);
        input.value = "";
        resultsBox.innerHTML = "";
      });
    });
  });
}

/* =========================================================
   12. CONTACT FORM
   ========================================================= */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#contact-name");
    const email = form.querySelector("#contact-email");
    const message = form.querySelector("#contact-message");
    let valid = true;

    [name, email, message].forEach(field => {
      const group = field.closest(".form-group");
      if (!field.value.trim()) {
        group.classList.add("error");
        valid = false;
      } else {
        group.classList.remove("error");
      }
    });

    // Basic email check
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.closest(".form-group").classList.add("error");
      valid = false;
    }

    if (!valid) {
      showToast("Please fill all fields correctly.");
      return;
    }

    // Demo only – no real backend
    showToast("Thank you! Your message has been recorded (demo mode).");
    form.reset();
  });
}

/* =========================================================
   13. INITIALISATION
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initScrollFeatures();
  initCbt();
  initLearningPad();
  initSearch();
  initContactForm();

  // Theme toggle
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

  // Default page
  showPage("home");

  console.log("MACOKI Education Hub loaded successfully.");
});
