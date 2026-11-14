// Interacciones de BioMundo
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Resaltar una fila de la tabla al seleccionarla.
const tableRows = document.querySelectorAll("#branchTable tbody tr");
tableRows.forEach(row => {
  row.addEventListener("click", () => {
    tableRows.forEach(item => item.classList.remove("selected"));
    row.classList.add("selected");
  });
});

// Ordenamiento de la tabla.
const tableBody = document.querySelector("#branchTable tbody");
function sortTable(columnIndex) {
  const rows = Array.from(tableBody.querySelectorAll("tr"));
  rows.sort((a, b) => {
    const first = a.cells[columnIndex].textContent.trim().toLocaleLowerCase("es");
    const second = b.cells[columnIndex].textContent.trim().toLocaleLowerCase("es");
    return first.localeCompare(second, "es");
  });
  rows.forEach(row => tableBody.appendChild(row));
  document.querySelectorAll("#branchTable tbody tr").forEach(row => row.classList.remove("selected"));
}
document.getElementById("sortName").addEventListener("click", () => sortTable(0));
document.getElementById("sortTopic").addEventListener("click", () => sortTable(1));

// Cuestionario de repaso.
document.getElementById("quizForm").addEventListener("submit", event => {
  event.preventDefault();
  const answers = { q1: "b", q2: "c", q3: "a" };
  const formData = new FormData(event.currentTarget);
  let score = 0;
  let unanswered = 0;
  Object.keys(answers).forEach(question => {
    if (!formData.get(question)) unanswered++;
    else if (formData.get(question) === answers[question]) score++;
  });
  const result = document.getElementById("quizResult");
  if (unanswered > 0) {
    result.textContent = `Te falta(n) responder ${unanswered} pregunta(s). ¡Inténtalo!`;
    result.style.color = "#a45a19";
  } else {
    result.textContent = `Obtuviste ${score} de 3 respuestas correctas. ${score === 3 ? "¡Excelente trabajo!" : "Repasa los temas e inténtalo de nuevo."}`;
    result.style.color = score === 3 ? "#126b5c" : "#a45a19";
  }
});

// Formulario demostrativo: no transmite información a un servidor.
document.getElementById("questionForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("studentName").value.trim();
  const question = document.getElementById("question").value.trim();
  const message = document.getElementById("formMessage");
  if (!name || !question) {
    message.textContent = "Completa tu nombre y tu pregunta antes de enviar.";
    message.style.color = "#ffd28b";
    return;
  }
  message.textContent = `¡Gracias, ${name}! Tu pregunta quedó registrada en esta demostración.`;
  message.style.color = "#a4e2bd";
  event.currentTarget.reset();
});

// Botón para regresar al inicio.
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 450);
});
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
