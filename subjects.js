/**
 * MACOKI Education Hub - Subjects & Class Structure
 * Organised by school level. Content is platform-created learning structure
 * designed to align with relevant Nigerian curriculum requirements.
 * Official curriculum documents should be consulted for authoritative requirements.
 */
const SCHOOL_STRUCTURE = {
  nursery: {
    label: "Nursery School",
    description: "Early childhood learning – fun, visual and play-based.",
    classes: [
      { id: "nursery1", name: "Nursery 1", ages: "3–4 years" },
      { id: "nursery2", name: "Nursery 2", ages: "4–5 years" },
      { id: "nursery3", name: "Nursery 3", ages: "5–6 years" }
    ],
    subjects: [
      { id: "alphabet", name: "Alphabet & Phonics", icon: "🔤" },
      { id: "numbers", name: "Numbers & Counting", icon: "🔢" },
      { id: "colours", name: "Colours & Shapes", icon: "🎨" },
      { id: "animals", name: "Animals & Nature", icon: "🐾" },
      { id: "everyday", name: "Everyday Objects", icon: "🏠" }
    ]
  },
  primary: {
    label: "Primary School",
    description: "Foundation years building literacy, numeracy and basic skills.",
    classes: [
      { id: "primary1", name: "Primary 1" },
      { id: "primary2", name: "Primary 2" },
      { id: "primary3", name: "Primary 3" },
      { id: "primary4", name: "Primary 4" },
      { id: "primary5", name: "Primary 5" },
      { id: "primary6", name: "Primary 6" }
    ],
    subjects: [
      { id: "english", name: "English Studies", icon: "📖" },
      { id: "mathematics", name: "Mathematics", icon: "➗" },
      { id: "basic-science", name: "Basic Science", icon: "🔬" },
      { id: "social-studies", name: "Social Studies", icon: "🌍" },
      { id: "civic", name: "Civic Education", icon: "🏛️" },
      { id: "computer", name: "Computer Studies", icon: "💻" },
      { id: "creative-arts", name: "Cultural & Creative Arts", icon: "🎭" },
      { id: "phe", name: "Physical & Health Education", icon: "🏃" }
    ]
  },
  jss: {
    label: "Junior Secondary School",
    description: "Broad basic education preparing students for senior secondary.",
    classes: [
      { id: "jss1", name: "JSS 1" },
      { id: "jss2", name: "JSS 2" },
      { id: "jss3", name: "JSS 3" }
    ],
    subjects: [
      { id: "english", name: "English Studies", icon: "📖" },
      { id: "mathematics", name: "Mathematics", icon: "➗" },
      { id: "basic-science", name: "Basic Science", icon: "🔬" },
      { id: "basic-tech", name: "Basic Technology", icon: "⚙️" },
      { id: "social-studies", name: "Social Studies", icon: "🌍" },
      { id: "civic", name: "Civic Education", icon: "🏛️" },
      { id: "computer", name: "Computer Studies", icon: "💻" },
      { id: "business", name: "Business Studies", icon: "📊" },
      { id: "agric", name: "Agricultural Science", icon: "🌾" },
      { id: "phe", name: "Physical & Health Education", icon: "🏃" },
      { id: "cca", name: "Cultural & Creative Arts", icon: "🎨" },
      { id: "crs", name: "Christian Religious Studies", icon: "✝️" },
      { id: "irs", name: "Islamic Religious Studies", icon: "☪️" },
      { id: "french", name: "French", icon: "🇫🇷" }
    ]
  },
  ss: {
    label: "Senior Secondary School",
    description: "Specialised pathways – Science, Commercial and Arts.",
    classes: [
      { id: "ss1", name: "SS 1" },
      { id: "ss2", name: "SS 2" },
      { id: "ss3", name: "SS 3" }
    ],
    subjects: {
      science: [
        { id: "english", name: "English Language", icon: "📖" },
        { id: "mathematics", name: "Mathematics", icon: "➗" },
        { id: "biology", name: "Biology", icon: "🧬" },
        { id: "chemistry", name: "Chemistry", icon: "⚗️" },
        { id: "physics", name: "Physics", icon: "⚛️" },
        { id: "agric", name: "Agricultural Science", icon: "🌾" },
        { id: "computer", name: "Computer Science", icon: "💻" }
      ],
      commercial: [
        { id: "english", name: "English Language", icon: "📖" },
        { id: "mathematics", name: "Mathematics", icon: "➗" },
        { id: "economics", name: "Economics", icon: "📈" },
        { id: "accounting", name: "Financial Accounting", icon: "📒" },
        { id: "commerce", name: "Commerce", icon: "🛒" },
        { id: "government", name: "Government", icon: "🏛️" },
        { id: "computer", name: "Computer Science", icon: "💻" }
      ],
      arts: [
        { id: "english", name: "English Language", icon: "📖" },
        { id: "mathematics", name: "Mathematics", icon: "➗" },
        { id: "literature", name: "Literature in English", icon: "📚" },
        { id: "government", name: "Government", icon: "🏛️" },
        { id: "economics", name: "Economics", icon: "📈" },
        { id: "history", name: "History", icon: "📜" },
        { id: "crs", name: "Christian Religious Studies", icon: "✝️" },
        { id: "irs", name: "Islamic Religious Studies", icon: "☪️" }
      ]
    }
  }
};
