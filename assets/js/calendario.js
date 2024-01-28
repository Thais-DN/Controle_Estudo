// Função para salvar eventos no Local Storage
function saveEvents(events) {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
}

// Função para carregar eventos do Local Storage
function loadEvents() {
    let storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
        return JSON.parse(storedEvents);
    }
    return [];
}

// Exemplo de uso:
let events = loadEvents();
// Adiciona um novo evento e salva
events.push({ date: "2024-01-28", title: "Exemplo de Evento" });
saveEvents(events);

function showMonth(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let calendar = document.getElementById("calendar");
    calendar.innerHTML = ""; // Limpa o calendário

    // Dias do mês anterior
    let prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
        let cell = document.createElement("div");
        cell.className = "day padding";
        cell.innerText = prevMonthDays - firstDay + i + 1;
        calendar.appendChild(cell);
    }

    // Preenche os dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
        let cell = document.createElement("div");
        cell.className = "day";
        cell.innerText = i;
        calendar.appendChild(cell);
    }

    // Cálculo para os dias do próximo mês
    let totalCells = firstDay + daysInMonth;
    let additionalCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    // Preenche os dias do próximo mês
    for (let i = 1; i <= additionalCells; i++) {
        let cell = document.createElement("div");
        cell.className = "day padding";
        cell.innerText = i;
        calendar.appendChild(cell);
    }

    // Atualiza o display do mês e do ano
    let monthDisplay = document.getElementById("monthDisplay");
    monthDisplay.innerText = `${getMonthName(month)} ${year}`;
}

function getMonthName(monthIndex) {
    const monthNames = [
        "January",
        "february",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return monthNames[monthIndex];
}

// Inicializa o calendário com o mês e ano atuais
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
showMonth(currentMonth, currentYear);

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    showMonth(currentMonth, currentYear);
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    showMonth(currentMonth, currentYear);
}

document.getElementById("nextButton").addEventListener("click", nextMonth);
document.getElementById("backButton").addEventListener("click", previousMonth);

showMonth(currentMonth, currentYear);
