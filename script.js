// Water
let water = Number(localStorage.getItem("water")) || 0;
const waterGoal = 2500;

const waterBar = document.getElementById("waterBar");
const waterText = document.getElementById("waterText");
const waterMessage = document.getElementById("waterMessage");

function updateWater() {
    waterText.textContent = `${water} / ${waterGoal} ml`;

    let percent = (water / waterGoal) * 100;
    waterBar.style.width = `${Math.min(percent, 100)}%`;

    if (water >= waterGoal) {
        waterMessage.textContent = "Goal Achieved!";
    } else {
        waterMessage.textContent = "";
    }

    localStorage.setItem("water", water);
}

document.getElementById("cup").onclick = function () {
    water += 250;
    updateWater();
};

document.getElementById("bottle").onclick = function () {
    water += 500;
    updateWater();
};

document.getElementById("waterReset").onclick = function () {
    water = 0;
    updateWater();
};

updateWater();


// Habits
let habits = JSON.parse(localStorage.getItem("habits")) || [];

const habitInput = document.getElementById("habitInput");
const addHabit = document.getElementById("addHabit");
const habitMessage = document.getElementById("habitMessage");
const habitList = document.getElementById("habitList");

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function showHabits() {
    habitList.innerHTML = "";

    habits.forEach(function (habit, index) {
        const habitDiv = document.createElement("div");

        const habitName = document.createElement("span");
        habitName.textContent = `${habit.name} - ${habit.streak} day streak`;

        const logButton = document.createElement("button");
        logButton.textContent = "Log Today";

        logButton.onclick = function () {
            habit.streak++;
            saveHabits();
            showHabits();
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {
            habits.splice(index, 1);
            saveHabits();
            showHabits();
        };

        habitDiv.appendChild(habitName);
        habitDiv.appendChild(logButton);
        habitDiv.appendChild(deleteButton);

        habitList.appendChild(habitDiv);
    });

    // Keep the Add Habit button visible
    if (habits.length >= 4) {
        addHabit.disabled = true;
        habitMessage.textContent = "You can only have 4 habits.";
    } else {
        addHabit.disabled = false;
        habitMessage.textContent = "";
    }
}

addHabit.onclick = function () {
    const name = habitInput.value.trim();

    if (name === "") {
        habitMessage.textContent = "Enter a habit first.";
        return;
    }

    if (habits.length >= 4) {
        habitMessage.textContent = "You can only have 4 habits.";
        return;
    }

    habits.push({
        name: name,
        streak: 0
    });

    saveHabits();

    habitInput.value = "";

    showHabits();
};

showHabits();


// Calories
let calories = Number(localStorage.getItem("calories")) || 0;
let savedDate = localStorage.getItem("calorieDate");

const today = new Date().toDateString();

if (savedDate !== today) {
    calories = 0;
    localStorage.setItem("calories", calories);
    localStorage.setItem("calorieDate", today);
}

const activity = document.getElementById("activity");
const duration = document.getElementById("duration");
const calculate = document.getElementById("calculate");
const caloriesText = document.getElementById("calories");

function updateCalories() {
    caloriesText.textContent = `${calories} kcal`;
    localStorage.setItem("calories", calories);
    localStorage.setItem("calorieDate", today);
}

calculate.onclick = function () {
    const minutes = Number(duration.value);
    const rate = Number(activity.value);

    if (isNaN(minutes) || minutes <= 0) {
        return;
    }

    const burned = minutes * rate;

    calories += burned;

    updateCalories();

    duration.value = "";
};

updateCalories();


// Theme
const themeButton = document.getElementById("themeButton");

themeButton.onclick = function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeButton.textContent = "Dark Mode";
    } else {
        themeButton.textContent = "Light Mode";
    }
}; 