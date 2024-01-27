let nav = 0;
let clicked = null;
let events = localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : {};

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

function openModal(date) {
    clicked = date;
    const eventForDay = events.find((e) => e.date === clicked);

    if (eventForDay) {
        document.getElementById("eventText").innerText = eventForDay.title;
        deleteEventModal.style.display = "block";
    } else {
        newEventModal.style.display = "block";
    }

    backDrop.style.display = "block";
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    document.getElementById(
        "monthDisplay"
    ).innerText = `${dt.toLocaleDateString("en-us", {
        month: "long",
    })} ${year}`;

    calendar.innerHTML = "";

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");
    
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    
        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            
            // Se houver eventos nessa data, crie e adicione-os ao dia correspondente
            if (events[dayString]) {
                events[dayString].forEach(event => {
                    const eventDiv = document.createElement("div");
                    eventDiv.classList.add("event");
                    eventDiv.innerText = event.title;
                    daySquare.appendChild(eventDiv);
                });
            }
    
            daySquare.addEventListener("click", () => openModal(dayString));
        } else {
            daySquare.classList.add("padding");
        }
    
        calendar.appendChild(daySquare);
    }
    

function closeModal() {
    eventTitleInput.classList.remove("error");
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    backDrop.style.display = "none";
    eventTitleInput.value = "";
    clicked = null;
    load();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove("error");

        const event = {
            id: Date.now(), // ID único baseado no timestamp atual.
            title: eventTitleInput.value,
        };

        if (!events[clicked]) {
            events[clicked] = [];
        }

        events[clicked].push(event);

        localStorage.setItem("events", JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add("error");
    }
}

function deleteEvent(eventId) {
    // Filtra fora o evento com o ID correspondente.
    events[clicked] = events[clicked].filter((event) => event.id !== eventId);
    if (events[clicked].length === 0) {
        delete events[clicked];
    }

    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
}

function editEvent(eventId) {
    // Encontra o evento que queremos editar.
    const eventForDay = events[clicked].find((e) => e.id === eventId);

    if (eventForDay) {
        // Aqui você irá preencher os dados do evento no seu modal de edição.
        // Suponhamos que você tenha um campo de entrada com id "eventEditInput"
        const eventEditInput = document.getElementById("eventEditInput");
        eventEditInput.value = eventForDay.title;
        newEventModal.style.display = "block";

        // Você precisará de um botão ou forma de salvar a edição.
        // Isso pode ser um botão separado ou você pode reutilizar o botão de salvar existente,
        // mas certifique-se de que ele saiba que está no modo de edição.
    }
}

function openModal(date) {
    clicked = date;
    const eventsForDay = events[clicked] || [];

    const eventsList = document.createElement("ul");

    eventsForDay.forEach((event) => {
        const eventListItem = document.createElement("li");
        eventListItem.textContent = event.title;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            editEvent(event.id); // Abre o evento para edição
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteEvent(event.id); // Deleta o evento
        };

        eventListItem.appendChild(editButton);
        eventListItem.appendChild(deleteButton);
        eventsList.appendChild(eventListItem);
    });

    deleteEventModal.innerHTML = ""; // Limpa o conteúdo anterior do modal
    deleteEventModal.appendChild(eventsList);
    deleteEventModal.style.display = "block";
    backDrop.style.display = "block";
}

function initButtons() {
    document.getElementById("nextButton").addEventListener("click", () => {
        nav++;
        load();
    });

    document.getElementById("backButton").addEventListener("click", () => {
        nav--;
        load();
    });

    document.getElementById("saveButton").addEventListener("click", saveEvent);
    document
        .getElementById("cancelButton")
        .addEventListener("click", closeModal);
    document
        .getElementById("deleteButton")
        .addEventListener("click", deleteEvent);
    document
        .getElementById("closeButton")
        .addEventListener("click", closeModal);
}

initButtons();
load();
