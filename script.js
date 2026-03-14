const pages = document.querySelectorAll(".page")

function showPage(id) {
  pages.forEach(p => p.classList.remove("active"))
  document.getElementById(id).classList.add("active")
}

document.getElementById("start-btn").onclick = () => {
  showPage("survey")
  showQuestion()
}

document.getElementById("code-btn").onclick = () => showPage("code-page")
document.getElementById("back-btn").onclick = () => showPage("intro")

document.getElementById("restart-btn").onclick = () => {
  location.reload()
}

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

document.getElementById("submit-code-btn").onclick = () => {
  const code = document.getElementById("code").value.toUpperCase()
  showResult(code)
}

function showResult(type) {
  document.getElementById("result-header").textContent = "Your MBTI Type: " + type
  document.getElementById("result-text").textContent =
    types[type] || "Unknown type. Please enter a valid MBTI code."
  showPage("result")
}

const questions = [
  { text: "You gain energy from:", options: ["E","I"], labels:["Being with people","Being alone"] },
  { text: "You focus more on:", options:["S","N"], labels:["Facts","Ideas"] },
  { text: "You decide based on:", options:["T","F"], labels:["Logic","Feelings"] },
  { text: "You prefer life to be:", options:["J","P"], labels:["Planned","Flexible"] }
]

let current = 0
let score = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0}

function showQuestion() {
  const q = questions[current]

  document.getElementById("question-text").textContent = q.text
  document.getElementById("current-question").textContent = current + 1

  const container = document.getElementById("options-container")
  container.innerHTML = ""

  q.options.forEach((letter, i) => {
    const btn = document.createElement("button")
    btn.className = "option-btn"
    btn.textContent = q.labels[i]

    btn.onclick = () => {
      score[letter]++
      current++

      if (current < questions.length) showQuestion()
      else finishSurvey()
    }

    container.appendChild(btn)
  })
}

function finishSurvey() {
  const type =
    (score.E >= score.I ? "E":"I") +
    (score.S >= score.N ? "S":"N") +
    (score.T >= score.F ? "T":"F") +
    (score.J >= score.P ? "J":"P")

  showResult(type)
}