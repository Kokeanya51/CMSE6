/**
 * MACOKI Education Hub - Practice CBT Question Bank
 * All questions are MACOKI Practice CBT (platform-created).
 * They are NOT official WAEC, NECO, JAMB or Ministry examination questions.
 * Architecture supports easy expansion beyond the initial set.
 */
const CBT_QUESTIONS = [
  // ---------- Primary Mathematics ----------
  {
    id: "p1-math-1",
    question: "What is 7 + 5?",
    options: ["10", "11", "12", "13"],
    answer: 2,
    explanation: "7 + 5 = 12.",
    classLevel: "primary1",
    subject: "mathematics",
    topic: "Addition"
  },
  {
    id: "p1-math-2",
    question: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    explanation: "A triangle has three sides.",
    classLevel: "primary1",
    subject: "mathematics",
    topic: "Shapes"
  },
  {
    id: "p2-math-1",
    question: "What is 15 − 8?",
    options: ["5", "6", "7", "8"],
    answer: 2,
    explanation: "15 − 8 = 7.",
    classLevel: "primary2",
    subject: "mathematics",
    topic: "Subtraction"
  },
  {
    id: "p3-math-1",
    question: "What is 6 × 4?",
    options: ["20", "22", "24", "26"],
    answer: 2,
    explanation: "6 × 4 = 24.",
    classLevel: "primary3",
    subject: "mathematics",
    topic: "Multiplication"
  },
  {
    id: "p4-math-1",
    question: "What is 36 ÷ 6?",
    options: ["4", "5", "6", "7"],
    answer: 2,
    explanation: "36 ÷ 6 = 6.",
    classLevel: "primary4",
    subject: "mathematics",
    topic: "Division"
  },
  {
    id: "p5-math-1",
    question: "What is the place value of 7 in 3,752?",
    options: ["Ones", "Tens", "Hundreds", "Thousands"],
    answer: 2,
    explanation: "In 3,752 the 7 is in the hundreds place.",
    classLevel: "primary5",
    subject: "mathematics",
    topic: "Place Value"
  },
  {
    id: "p6-math-1",
    question: "Simplify: 2/4",
    options: ["1/4", "1/2", "2/2", "3/4"],
    answer: 1,
    explanation: "2/4 reduces to 1/2.",
    classLevel: "primary6",
    subject: "mathematics",
    topic: "Fractions"
  },

  // ---------- Primary English ----------
  {
    id: "p1-eng-1",
    question: "Which word starts with the letter 'B'?",
    options: ["Apple", "Ball", "Cat", "Dog"],
    answer: 1,
    explanation: "Ball starts with B.",
    classLevel: "primary1",
    subject: "english",
    topic: "Alphabet"
  },
  {
    id: "p2-eng-1",
    question: "What is the plural of 'child'?",
    options: ["Childs", "Children", "Childes", "Child"],
    answer: 1,
    explanation: "The plural of child is children.",
    classLevel: "primary2",
    subject: "english",
    topic: "Nouns"
  },
  {
    id: "p3-eng-1",
    question: "Choose the correct spelling:",
    options: ["Beutiful", "Beautiful", "Beautifull", "Beutiful"],
    answer: 1,
    explanation: "The correct spelling is Beautiful.",
    classLevel: "primary3",
    subject: "english",
    topic: "Spelling"
  },

  // ---------- JSS Basic Science ----------
  {
    id: "jss1-bs-1",
    question: "Which of the following is a living thing?",
    options: ["Stone", "Water", "Plant", "Air"],
    answer: 2,
    explanation: "Plants are living organisms.",
    classLevel: "jss1",
    subject: "basic-science",
    topic: "Living Things"
  },
  {
    id: "jss1-bs-2",
    question: "The process by which green plants make their food is called:",
    options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
    answer: 1,
    explanation: "Photosynthesis is the process plants use to make food using sunlight.",
    classLevel: "jss1",
    subject: "basic-science",
    topic: "Photosynthesis"
  },
  {
    id: "jss2-bs-1",
    question: "Which gas do we breathe in to stay alive?",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    answer: 1,
    explanation: "Humans need oxygen for respiration.",
    classLevel: "jss2",
    subject: "basic-science",
    topic: "Respiration"
  },
  {
    id: "jss3-bs-1",
    question: "The smallest unit of matter is the:",
    options: ["Molecule", "Atom", "Cell", "Compound"],
    answer: 1,
    explanation: "An atom is the smallest unit of an element.",
    classLevel: "jss3",
    subject: "basic-science",
    topic: "Matter"
  },

  // ---------- JSS Mathematics ----------
  {
    id: "jss1-math-1",
    question: "What is the value of 3²?",
    options: ["6", "9", "12", "15"],
    answer: 1,
    explanation: "3² = 3 × 3 = 9.",
    classLevel: "jss1",
    subject: "mathematics",
    topic: "Indices"
  },
  {
    id: "jss2-math-1",
    question: "Find the LCM of 4 and 6.",
    options: ["8", "10", "12", "24"],
    answer: 2,
    explanation: "The least common multiple of 4 and 6 is 12.",
    classLevel: "jss2",
    subject: "mathematics",
    topic: "LCM"
  },
  {
    id: "jss3-math-1",
    question: "Solve for x: 2x + 5 = 15",
    options: ["x = 3", "x = 5", "x = 10", "x = 20"],
    answer: 1,
    explanation: "2x = 10 → x = 5.",
    classLevel: "jss3",
    subject: "mathematics",
    topic: "Linear Equations"
  },

  // ---------- SS Biology ----------
  {
    id: "ss1-bio-1",
    question: "The basic unit of life is the:",
    options: ["Tissue", "Organ", "Cell", "System"],
    answer: 2,
    explanation: "The cell is the basic structural and functional unit of life.",
    classLevel: "ss1",
    subject: "biology",
    topic: "Cell Biology"
  },
  {
    id: "ss2-bio-1",
    question: "Which organ pumps blood around the body?",
    options: ["Liver", "Lungs", "Heart", "Kidney"],
    answer: 2,
    explanation: "The heart pumps blood throughout the circulatory system.",
    classLevel: "ss2",
    subject: "biology",
    topic: "Circulatory System"
  },
  {
    id: "ss3-bio-1",
    question: "Photosynthesis mainly occurs in which part of the plant?",
    options: ["Root", "Stem", "Leaf", "Flower"],
    answer: 2,
    explanation: "Most photosynthesis takes place in the leaves.",
    classLevel: "ss3",
    subject: "biology",
    topic: "Photosynthesis"
  },

  // ---------- SS Chemistry ----------
  {
    id: "ss1-chem-1",
    question: "The chemical symbol for water is:",
    options: ["H2O", "CO2", "NaCl", "O2"],
    answer: 0,
    explanation: "Water is H₂O (two hydrogen atoms and one oxygen atom).",
    classLevel: "ss1",
    subject: "chemistry",
    topic: "Chemical Formulae"
  },
  {
    id: "ss2-chem-1",
    question: "Which of these is an acid?",
    options: ["NaOH", "HCl", "NaCl", "CaCO3"],
    answer: 1,
    explanation: "HCl is hydrochloric acid.",
    classLevel: "ss2",
    subject: "chemistry",
    topic: "Acids and Bases"
  },

  // ---------- SS Physics ----------
  {
    id: "ss1-phy-1",
    question: "The SI unit of force is:",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    answer: 1,
    explanation: "Force is measured in Newtons (N).",
    classLevel: "ss1",
    subject: "physics",
    topic: "Force"
  },
  {
    id: "ss2-phy-1",
    question: "Light travels fastest in:",
    options: ["Water", "Glass", "Vacuum", "Air"],
    answer: 2,
    explanation: "Light travels fastest in a vacuum.",
    classLevel: "ss2",
    subject: "physics",
    topic: "Light"
  },

  // ---------- Civic / Social Studies ----------
  {
    id: "jss1-civic-1",
    question: "The capital of Nigeria is:",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    answer: 1,
    explanation: "Abuja is the capital city of Nigeria.",
    classLevel: "jss1",
    subject: "civic",
    topic: "Nigeria"
  },
  {
    id: "jss2-ss-1",
    question: "Nigeria became independent in which year?",
    options: ["1957", "1960", "1963", "1970"],
    answer: 1,
    explanation: "Nigeria gained independence on 1 October 1960.",
    classLevel: "jss2",
    subject: "social-studies",
    topic: "History of Nigeria"
  },
  {
    id: "ss1-gov-1",
    question: "The three arms of government in Nigeria are:",
    options: ["Executive, Legislative, Judiciary", "President, Governor, Mayor", "Federal, State, Local", "Army, Police, Customs"],
    answer: 0,
    explanation: "The three arms are the Executive, Legislature and Judiciary.",
    classLevel: "ss1",
    subject: "government",
    topic: "Arms of Government"
  },

  // ---------- Computer Studies ----------
  {
    id: "jss1-comp-1",
    question: "Which of these is an input device?",
    options: ["Monitor", "Printer", "Keyboard", "Speaker"],
    answer: 2,
    explanation: "A keyboard is used to input data into a computer.",
    classLevel: "jss1",
    subject: "computer",
    topic: "Computer Hardware"
  },
  {
    id: "ss1-comp-1",
    question: "CPU stands for:",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing Unit"],
    answer: 0,
    explanation: "CPU means Central Processing Unit.",
    classLevel: "ss1",
    subject: "computer",
    topic: "Computer Fundamentals"
  },

  // Extra practice questions to reach a usable bank size
  {
    id: "p4-eng-1",
    question: "Identify the noun in the sentence: 'The dog ran fast.'",
    options: ["ran", "fast", "dog", "the"],
    answer: 2,
    explanation: "Dog is a noun (naming word).",
    classLevel: "primary4",
    subject: "english",
    topic: "Parts of Speech"
  },
  {
    id: "p5-eng-1",
    question: "Which is a synonym of 'happy'?",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    answer: 2,
    explanation: "Joyful means the same as happy.",
    classLevel: "primary5",
    subject: "english",
    topic: "Vocabulary"
  },
  {
    id: "jss3-eng-1",
    question: "Choose the correct article: ___ university",
    options: ["A", "An", "The", "No article"],
    answer: 0,
    explanation: "We say 'a university' because the sound begins with a consonant /j/.",
    classLevel: "jss3",
    subject: "english",
    topic: "Articles"
  },
  {
    id: "ss2-eng-1",
    question: "The literary device that compares two things using 'like' or 'as' is:",
    options: ["Metaphor", "Simile", "Personification", "Hyperbole"],
    answer: 1,
    explanation: "A simile uses 'like' or 'as'.",
    classLevel: "ss2",
    subject: "literature",
    topic: "Figures of Speech"
  },
  {
    id: "p6-sci-1",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1,
    explanation: "Mars is often called the Red Planet.",
    classLevel: "primary6",
    subject: "basic-science",
    topic: "Solar System"
  },
  {
    id: "jss1-math-2",
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "40"],
    answer: 1,
    explanation: "25% of 80 = (25/100) × 80 = 20.",
    classLevel: "jss1",
    subject: "mathematics",
    topic: "Percentages"
  },
  {
    id: "ss3-math-1",
    question: "The quadratic formula is used to solve equations of the form:",
    options: ["ax + b = 0", "ax² + bx + c = 0", "a/x = b", "x² = a"],
    answer: 1,
    explanation: "The quadratic formula solves ax² + bx + c = 0.",
    classLevel: "ss3",
    subject: "mathematics",
    topic: "Quadratic Equations"
  },
  {
    id: "ss1-econ-1",
    question: "Economics is the study of:",
    options: ["How to make money only", "How societies use scarce resources", "Only banking", "Only farming"],
    answer: 1,
    explanation: "Economics studies the allocation of scarce resources.",
    classLevel: "ss1",
    subject: "economics",
    topic: "Introduction to Economics"
  },
  {
    id: "jss2-agric-1",
    question: "Which of these is a cash crop in Nigeria?",
    options: ["Cassava", "Cocoa", "Yam", "Maize"],
    answer: 1,
    explanation: "Cocoa is an important cash crop in Nigeria.",
    classLevel: "jss2",
    subject: "agric",
    topic: "Crops"
  },
  {
    id: "ss2-acct-1",
    question: "The accounting equation is:",
    options: ["Assets = Liabilities + Capital", "Assets = Liabilities − Capital", "Capital = Assets + Liabilities", "Liabilities = Assets + Capital"],
    answer: 0,
    explanation: "Assets = Liabilities + Owner's Equity (Capital).",
    classLevel: "ss2",
    subject: "accounting",
    topic: "Accounting Equation"
  }
];

// Helper to get questions by filters (used by the CBT engine)
function getQuestions({ classLevel = null, subject = null, limit = 50 } = {}) {
  let filtered = CBT_QUESTIONS.slice();
  if (classLevel) {
    filtered = filtered.filter(q => q.classLevel === classLevel);
  }
  if (subject) {
    filtered = filtered.filter(q => q.subject === subject);
  }
  // Shuffle for variety
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  return filtered.slice(0, Math.min(limit, filtered.length));
}
