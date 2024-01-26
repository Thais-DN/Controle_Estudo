document.addEventListener("DOMContentLoaded", function () {
    const contributionsContainer = document.querySelector(".contributions");
    const dayLabelsContainer = document.querySelector(".day-labels");
    const monthLabelsContainer = document.querySelector(".month-labels");
    const optionsMenu = createOptionsMenu();
    document.body.appendChild(optionsMenu);

    let contributions = JSON.parse(localStorage.getItem("contributions")) || {};
    updateContributionGrid();

    function updateContributionGrid() {
        const today = new Date();
        const startPeriod = new Date();
        startPeriod.setDate(today.getDate() - 368);

        // Limpar o contêiner antes de adicionar novos elementos
        contributionsContainer.innerHTML = "";
        dayLabelsContainer.innerHTML = "";
        monthLabelsContainer.innerHTML = "";

        ["Mon", "Wed", "Fri"].forEach((day, index) => {
            addDayLabel(day, index);
        });

        addMonthLabels();

        const totalDays = Math.min(
            371,
            Math.floor((today - startPeriod) / (1000 * 60 * 60 * 24)) + 1
        );

        for (let i = 0; i < totalDays; i++) {
            const dayDate = new Date(
                startPeriod.getFullYear(),
                startPeriod.getMonth(),
                startPeriod.getDate() + i
            );
            const dateString = formatDate(dayDate);

            // Crie quadrados apenas para dias até hoje
            if (dayDate <= today) {
                const dayElement = document.createElement("div");
                dayElement.classList.add("contribution");
                dayElement.setAttribute("data-date", dateString);

                if (contributions[dateString]) {
                    dayElement.classList.add(contributions[dateString]);
                }

                dayElement.addEventListener("click", function (event) {
                    showOptionsMenu(event, this, optionsMenu);
                });

                contributionsContainer.appendChild(dayElement);
            }
        }
    }

    function addMonthLabels() {
        const today = new Date();
        const startPeriod = new Date();
        startPeriod.setDate(today.getDate() - 368);
        let currentMonth = -1;
        let gridColumnStart = 1; // Posição inicial na grade

        for (let i = 0; i < 371; i++) {
            const dayDate = new Date(
                startPeriod.getFullYear(),
                startPeriod.getMonth(),
                startPeriod.getDate() + i
            );

            if (dayDate.getMonth() !== currentMonth && i % 7 === 0) {
                // Verificar mudança de mês e dias na primeira coluna
                currentMonth = dayDate.getMonth();
                gridColumnStart = Math.ceil(i / 7) + 1; // Calcular a posição da coluna

                const monthLabel = document.createElement("div");
                monthLabel.classList.add("month-label");
                monthLabel.textContent = dayDate.toLocaleString("en-us", {
                    month: "short",
                });
                monthLabel.style.gridColumnStart = gridColumnStart;
                monthLabelsContainer.appendChild(monthLabel);
            }
        }
    }

    function addDayLabel(day, index) {
        const labelElement = document.createElement("div");
        labelElement.classList.add("day-label");
        labelElement.textContent = day;
        dayLabelsContainer.appendChild(labelElement);
    }

    function createOptionsMenu() {
        const menu = document.createElement("div");
        menu.classList.add("options-menu");

        ["pouco", "medio", "normal", "muito"].forEach((level) => {
            const option = document.createElement("div");
            option.classList.add("option", level);
            option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
            option.addEventListener("click", function () {
                const selectedLevel = this.classList[1];
                menu.relatedElement.className = "contribution";
                menu.relatedElement.classList.add(selectedLevel);
                const selectedDate =
                    menu.relatedElement.getAttribute("data-date");

                // Atualizar o objeto de contribuições e salvar no localStorage
                contributions[selectedDate] = selectedLevel;
                localStorage.setItem(
                    "contributions",
                    JSON.stringify(contributions)
                );
                menu.classList.remove("active");
            });
            menu.appendChild(option);
        });

        return menu;
    }

    function showOptionsMenu(event, element, menu) {
        menu.style.top = `${event.pageY}px`;
        menu.style.left = `${event.pageX}px`;
        menu.classList.add("active");
        menu.relatedElement = element; // Referência ao quadrado clicado
    }
});

function formatDate(date) {
    const months = [
        "January",
        "February",
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
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];

    return `${monthName} ${ordinalSuffix(day)}`;
}

function ordinalSuffix(i) {
    const j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

window.addEventListener("load", (event) => {
    const container = document.querySelector(".container");
    const divMaior = document.querySelector(".div-maior");

    container.addEventListener("scroll", () => {
        // Verifica se o contêiner foi rolado até o fim
        if (
            container.scrollWidth - container.scrollLeft ===
            container.clientWidth
        ) {
            divMaior.style.alignItems = "flex-end";
        } else {
            divMaior.style.alignItems = "flex-start";
        }
    });
});
