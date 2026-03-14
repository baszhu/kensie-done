// --- Data ---
const questions = [
  { text: "After a long week, what energizes you more?", options: [{ text: "Going out with friends", code: "E" }, { text: "Staying home alone", code: "I" }] },
  { text: "In conversations, do you tend to...", options: [{ text: "Speak your thoughts aloud", code: "E" }, { text: "Listen and reflect first", code: "I" }] },
  { text: "At social events, you usually...", options: [{ text: "Meet new people easily", code: "E" }, { text: "Stay with people you know", code: "I" }] },
  { text: "What kind of information do you prefer?", options: [{ text: "Facts and details", code: "S" }, { text: "Ideas and possibilities", code: "N" }] },
  { text: "When planning a trip, do you focus on...", options: [{ text: "Logistics and itinerary", code: "S" }, { text: "Experiences and vibes", code: "N" }] },
  { text: "You consider yourself to be more...", options: [{ text: "Practical and realistic", code: "S" }, { text: "Imaginative and visionary", code: "N" }] },
  { text: "When making a decision, you prioritize...", options: [{ text: "Logic and consistency", code: "T" }, { text: "Feelings and harmony", code: "F" }] },
  { text: "If a friend is sad, your instinct is to...", options: [{ text: "Offer solutions", code: "T" }, { text: "Offer empathy", code: "F" }] },
  { text: "You value...", options: [{ text: "Fairness and justice", code: "T" }, { text: "Compassion and mercy", code: "F" }] },
  { text: "How do you handle deadlines?", options: [{ text: "Plan ahead and finish early", code: "J" }, { text: "Work best under pressure", code: "P" }] },
  { text: "Your workspace is usually...", options: [{ text: "Organized and tidy", code: "J" }, { text: "Flexible and messy", code: "P" }] },
  { text: "You prefer a lifestyle that is...", options: [{ text: "Structured", code: "J" }, { text: "Spontaneous", code: "P" }] }
];

const types = {
  ISTJ: "The Logistician — Practical and fact-minded individuals.",
  ISFJ: "The Defender — Warm and dedicated protectors.",
  INFJ: "The Advocate — Quiet and mystical idealists.",
  INTJ: "The Architect — Imaginative and strategic thinkers.",
  ISTP: "The Virtuoso — Bold experimenters.",
  ISFP: "The Adventurer — Flexible and charming artists.",
  INFP: "The Mediator — Poetic, kind, altruistic.",
  INTP: "The Logician — Innovative inventors.",
  ESTP: "The Entrepreneur — Energetic and perceptive.",
  ESFP: "The Entertainer — Spontaneous and enthusiastic.",
  ENFP: "The Campaigner — Creative and sociable.",
  ENTP: "The Debater — Smart and curious thinkers.",
  ESTJ: "The Executive — Excellent administrators.",
  ESFJ: "The Consul — Caring and social.",
  ENFJ: "The Protagonist — Charismatic and inspiring leaders.",
  ENTJ: "The Commander — Bold and strong-willed."
};

// Map MBTI to secondary result (animal / archetype + video)
const animals = {
  INTJ: {name:"Owl", text:"Strategic and observant.", video:""},
  INFJ: {name:"Beluga Whale", text:"Mystical and inspiring.", video:""},
  INTP: {name:"Octopus", text:"Innovative problem solver.", video:""},
  INFP: {name:"Dolphin", text:"Empathetic and kind.", video:""},
  ENTJ: {name:"Lion", text:"Dominant leader.", video:""},
  ENTP: {name:"Fox", text:"Clever and curious.", video:""},
  ENFJ: {name:"Horse", text:"Charismatic and loyal.", video:""},
  ENFP: {name:"Hummingbird", text:"Energetic and free-spirited.", video:""},
  ISTJ: {name:"Elephant", text:"Reliable and methodical.", video:""},
  ISFJ: {name:"Beaver", text:"Dedicated and protective.", video:""},
  ISTP: {name:"Tiger", text:"Practical and adventurous.", video:""},
  ISFP: {name:"Cat", text:"Flexible and graceful.", video:""},
  ESTP: {name:"Cheetah", text:"Energetic and fast.", video:""},
  ESFP: {name:"Parrot", text:"Sociable and playful.", video:""},
  ESTJ: {name:"Dog", text:"Organized and strong.", video:""},
  ESFJ: {name:"Otter", text:"Friendly and helpful.", video:""}
};

const pages = ["intro","survey","code-page","result","animal-result"];
let currentIdx = 0;
let scores = {};
let currentType = "";


// --- Page references ---
const startBtn = document.getElementById("start-btn");
const codeBtn = document.getElementById("code-btn");
const submitCodeBtn = document.getElementById("submit-code-btn");
const backBtn = document.getElementById("back-btn");
const restartBtn = document.getElementById("restart-btn");
const nextBtn = document.getElementById("next-btn");
const codeInput = document.getElementById("code");


// --- Event listeners ---
startBtn.onclick = startSurvey;
codeBtn.onclick = () => showPage("code-page");
submitCodeBtn.onclick = submitCode;
backBtn.onclick = () => showPage("intro");
restartBtn.onclick = () => location.reload();
nextBtn.onclick = showAnimalResult;


// --- Functions ---
function resetScores(){ scores={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0}; }

function showPage(id){
  pages.forEach(p => document.getElementById(p).classList.toggle("active", p===id));
}

function startSurvey(){
  currentIdx=0;
  resetScores();
  showPage("survey");
  showQuestion();
}

function showQuestion(){
  const q = questions[currentIdx];
  document.getElementById("question-text").textContent = q.text;
  document.getElementById("current-question").textContent = currentIdx+1;

  const container = document.getElementById("options-container");
  container.innerHTML = "";

  q.options.forEach(opt=>{
    const btn = document.createElement("button");
    btn.className="option-btn";
    btn.textContent=opt.text;
    btn.onclick = () => {
      scores[opt.code]++;
      currentIdx++;
      if(currentIdx<questions.length){ showQuestion(); }
      else{
        // calculate type and show MBTI result page
        currentType = [
          scores.E>=scores.I?"E":"I",
          scores.S>=scores.N?"S":"N",
          scores.T>=scores.F?"T":"F",
          scores.J>=scores.P?"J":"P"
        ].join("");
        showResult(currentType);
      }
    };
    container.appendChild(btn);
  });
}

function submitCode(){
  const code = codeInput.value.trim().toUpperCase();
  if(!types[code]){ alert("Please enter a valid 4-letter MBTI code."); return; }
  currentType = code;
  showResult(currentType);
}

function showResult(type){
  document.getElementById("result-header").textContent=`Your Personality Type: ${type}`;
  document.getElementById("result-text").textContent=types[type]||"Type not found.";
  showPage("result");
}

function showAnimalResult(){
  const animal = animals[currentType] || {name:"Unknown", text:"No data", video:""};
  document.getElementById("animal-header").textContent="Your Spirit Animal: "+animal.name;
  document.getElementById("animal-text").textContent=animal.text;
  document.getElementById("video").src=animal.video;
  showPage("animal-result");
}
