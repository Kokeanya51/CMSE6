# MACOKI Education Hub

A modern, interactive educational platform built with **vanilla HTML5, CSS3 and JavaScript**.  
Designed for Nursery, Primary, Junior Secondary and Senior Secondary learners in Nigeria.

**Learn. Practise. Explore. Grow.**

---

## Features

- **Responsive design** – works on phones, tablets and desktops
- **Dark / Light mode** with preference saved in LocalStorage
- **Alphabet Learning** (A–Z) with pictures, example words and **Text-to-Speech**
- **School Levels** – Nursery, Primary, JSS, SS with class & subject structure
- **CBT Examination System**
  - Class & subject selection
  - Configurable number of questions (up to 50+)
  - Optional countdown timer with auto-submit
  - Answer navigation, scoring, percentage, review
  - Results saved to local student dashboard
- **Learning Pad** – HTML Canvas drawing / writing practice (touch & mouse)
- **Digital Library** – organised practice notes and resources
- **Student Dashboard** – name, scores, badges, recent activity (LocalStorage)
- **Global Search**
- **Accessible** – semantic HTML, keyboard navigation, ARIA, reduced-motion support
- **No frameworks** – pure vanilla JS for easy learning and maintenance

---

## How to Open the Website

1. Download or clone the project folder `macoki-education-hub`.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. **No build step or server required** for basic use.  
   (For best results with some browsers’ file restrictions you can use a simple local server, e.g. `npx serve .` or VS Code Live Server.)

---

## File Structure

```
macoki-education-hub/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles (custom properties, dark mode, responsive)
├── js/
│   └── app.js          ← Main application logic
├── data/
│   ├── alphabet.js     ← A–Z data + emojis
│   ├── subjects.js     ← School levels, classes, subjects
│   └── questions.js    ← CBT practice question bank + helper
├── assets/
│   ├── images/         ← (empty – add your own images later)
│   └── icons/
└── README.md
```

---

## How CSS & JavaScript Are Connected

In `index.html`:

```html
<link rel="stylesheet" href="css/style.css">
...
<script src="data/alphabet.js"></script>
<script src="data/subjects.js"></script>
<script src="data/questions.js"></script>
<script src="js/app.js"></script>
```

Keep this order so data is available before `app.js` runs.

---

## Adding New Alphabet Words

Edit `data/alphabet.js`:

```js
{ letter: "A", upper: "A", lower: "a", word: "Apple", emoji: "🍎", phonetic: "ay" },
```

Replace the `emoji` with an image path later if desired, and update the display logic in `app.js` accordingly.

---

## Adding Subjects / Classes

Edit `data/subjects.js`.  
The structure is already organised by level (`nursery`, `primary`, `jss`, `ss`).  
For Senior Secondary, subjects are further grouped into pathways (`science`, `commercial`, `arts`).

---

## Adding CBT Questions

Edit `data/questions.js`. Each question follows this shape:

```js
{
  id: "unique-id",
  question: "What is 2 + 2?",
  options: ["3", "4", "5", "6"],
  answer: 1,               // index of correct option (0-based)
  explanation: "2 + 2 = 4",
  classLevel: "primary1",  // must match a class id
  subject: "mathematics",  // must match a subject id
  topic: "Addition"
}
```

The helper `getQuestions({ classLevel, subject, limit })` automatically filters and shuffles.  
You can grow the bank to 100, 200 or more questions without changing the CBT engine.

**Important:** All questions are **MACOKI Practice CBT**.  
Do not label them as official WAEC, NECO, JAMB or Ministry examination questions.

---

## Text-to-Speech

Uses the browser’s native **SpeechSynthesis API**.  
Supported on most modern browsers. A clear toast message appears if the API is unavailable.

---

## LocalStorage

The following keys are used for demo persistence:

| Key                | Purpose                          |
|--------------------|----------------------------------|
| `macoki-theme`     | Light / dark preference          |
| `macoki-student`   | Name, scores, badges, activities |
| `macoki-pad-save`  | Last saved canvas drawing        |

LocalStorage is **not** secure authentication. It is only for a pleasant single-browser experience.

---

## Curriculum Note

Content is **platform-created learning material** designed to align with relevant Nigerian curriculum requirements.  
Official Federal Ministry of Education and examination-body documents should always be consulted for authoritative syllabi and requirements.

---

## Deploying the Website

Any static host works:

- **GitHub Pages** – push the folder and enable Pages
- **Netlify / Vercel / Cloudflare Pages** – drag & drop or connect repo
- **Traditional hosting** – upload via FTP

No server-side code is required.

---

## Customising Branding

1. Change the logo text / icon in the header of `index.html`.
2. Update colours in `css/style.css` under `:root` (`--primary`, `--secondary`, etc.).
3. Replace the hero tagline and section titles as needed.
4. Add real images into `assets/images/` and update references.

---

## Testing Checklist

- [ ] Homepage loads and cards navigate correctly
- [ ] Mobile hamburger menu opens / closes (Escape key works)
- [ ] Dark mode toggles and persists
- [ ] Alphabet letters + Speak button work
- [ ] School levels and subject cards appear
- [ ] CBT starts, navigates questions, scores correctly
- [ ] Timer counts down and auto-submits
- [ ] Results screen and Review Answers work
- [ ] Learning Pad draws (mouse + touch) and saves
- [ ] Dashboard shows saved scores and badges
- [ ] Search returns relevant pages
- [ ] Contact form validates
- [ ] Scroll-to-top button appears after ~300 px
- [ ] Keyboard focus is visible
- [ ] Reduced-motion preference is respected

---

## Future Expansion Ideas

- Connect a real backend / database for multi-user accounts
- Expand the question bank significantly
- Add more interactive games for Nursery
- Teacher / admin panel for uploading resources
- Offline support via Service Worker

---

Built with care for Nigerian learners.  
**MACOKI Education Hub** – Learn. Practise. Explore. Grow.
