// Selects all elements with class "page"
const pages = document.querySelectorAll(".page")

// Function to switch visible pages
function showPage(id) {

  // Remove "active" from all pages
  pages.forEach(p => p.classList.remove("active"))

  // Add "active" to the requested page
  document.getElementById(id).classList.add("active")
}

// When user clicks "Start Survey"
document.getElementById("start-btn").onclick = () => {

  showPage("survey") // show the survey screen

  showQuestion() // load the first question
}

// Opens the code entry page
document.getElementById("code-btn").onclick = () => showPage("code-page")

// Goes back to intro page
document.getElementById("back-btn").onclick = () => showPage("intro")

// Restart button reloads the page
document.getElementById("restart-btn").onclick = () => {
  location.reload()
}

// Object storing descriptions for each MBTI type
const types = {
  ISTJ: "The Inspector — Responsible and practical.",
  ISFJ: "The Protector — Warm and dedicated.",
  INFJ: "The Counselor — Insightful and principled.",
  INTJ: "The Mastermind — Strategic and independent.",
  ISTP: "The Craftsman — Bold and practical.",
  ISFP: "The Composer — Flexible and charming.",
  INFP: "The Healer — Idealistic and compassionate.",
  INTP: "The Architect — Innovative thinkers.",
  ESTP: "The Dynamo — Energetic problem solvers.",
  ESFP: "The Performer — Enthusiastic and fun-loving.",
  ENFP: "The Champion — Creative and sociable.",
  ENTP: "The Visionary — Curious and inventive.",
  ESTJ: "The Supervisor — Excellent organizers.",
  ESFJ: "The Provider — Loyal and caring.",
  ENFJ: "The Teacher — Charismatic leaders.",
  ENTJ: "The Commander — Bold strategists."
}

// When the user submits a manual MBTI code
document.getElementById("submit-code-btn").onclick = () => {

  const code = document.getElementById("code").value.toUpperCase()
  // Get the typed code and convert it to uppercase

  showResult(code) // display the result page
}

// Displays the final result page
function showResult(type) {

  document.getElementById("result-header").textContent =
    "Your MBTI Type: " + type
  // Show the MBTI type

  document.getElementById("result-text").textContent =
    types[type] || "Unknown type. Please enter a valid MBTI code."
  // Show description (or fallback if invalid)

  showPage("result") // switch to result page
}

// Survey questions
const questions = [
  { text: "You gain energy from:", options: ["E","I"], labels:["Being with people","Being alone"] },
  { text: "You focus more on:", options:["S","N"], labels:["Facts","Ideas"] },
  { text: "You decide based on:", options:["T","F"], labels:["Logic","Feelings"] },
  { text: "You prefer life to be:", options:["J","P"], labels:["Planned","Flexible"] }
]

// Tracks current question index
let current = 0

// Stores score for each MBTI letter
let score = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0}

// Displays the current survey question
function showQuestion() {

  const q = questions[current] // get the question

  document.getElementById("question-text").textContent = q.text
  // show question text

  document.getElementById("current-question").textContent = current + 1
  // update question number

  const container = document.getElementById("options-container")

  container.innerHTML = "" // clear old options

  // create a button for each answer option
  q.options.forEach((letter, i) => {

    const btn = document.createElement("button")

    btn.className = "option-btn"

    btn.textContent = q.labels[i]

    btn.onclick = () => {

      score[letter]++ // increment MBTI score

      current++ // move to next question

      if (current < questions.length)
        showQuestion() // show next question
      else
        finishSurvey() // survey finished
    }

    container.appendChild(btn) // add button to page
  })
}

// Calculate final MBTI type
function finishSurvey() {

  const type =
    (score.E >= score.I ? "E":"I") +
    (score.S >= score.N ? "S":"N") +
    (score.T >= score.F ? "T":"F") +
    (score.J >= score.P ? "J":"P")

  showResult(type) // display the result
}
