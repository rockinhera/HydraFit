// Water tracker

let water = Number(localStorage.getItem("water")) || 0;
const waterGoal = 2500;

const waterBar = document.getElementById("waterBar");
const waterText = document.getElementById("waterText");
const waterMessage = document.getElementById("waterMessage");

function updateWater() {
    let percent = (water / waterGoal) * 100;

    if (percent > 100) {
        percent = 100;
    }

    waterBar.style.width = percent + "%";
    waterText.textContent = water + " / " + waterGoal + " ml";

    if (water >= waterGoal) {
        waterBar.style.backgroundColor = "#4caf50";
        waterMessage.textContent = "Goal Achieved!";
    } else {
        waterBar.style.backgroundColor = "var(--main-color)";
        waterMessage.textContent = "";
    }

    localStorage.setItem("water", water);
}

document.getElementById("cup").onclick = function() {
    water += 250;
    updateWater();
};

document.getElementById("bottle").onclick = function() {
    water += 500;
    updateWater();
};

document.getElementById("waterReset").onclick = function() {
    water = 0;
    updateWater();
};

updateWater();


// Habit tracker

let habits = [];

const savedHabits = localStorage.getItem("habits");

if (savedHabits) {
    habits = JSON.parse(savedHabits);
}

const habitInput = document.getElementById("habitInput");
const addHabit = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");
const habitMessage = document.getElementById("habitMessage");

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function showHabits() {
    habitList.innerHTML = "";

    habits.forEach(function(habit, index) {

        const habitDiv = document.createElement("div");

        const habitText = document.createElement("p");
        habitText.textContent =
            habit.name + " - " + habit.streak + " day streak";

        const logButton = document.createElement("button");
        logButton.textContent = "Log Today";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        logButton.onclick = function() {
            habits[index].streak++;

            saveHabits();
            showHabits();
        };

        deleteButton.onclick = function() {
            habits.splice(index, 1);

            saveHabits();

            addHabit.disabled = false;
            habitMessage.textContent = "";

            showHabits();
        };

        habitDiv.appendChild(habitText);
        habitDiv.appendChild(logButton);
        habitDiv.appendChild(deleteButton);

        habitList.appendChild(habitDiv);
    });

    if (habits.length >= 4) {
        addHabit.disabled = true;
    } else {
        addHabit.disabled = false;
    }
}

addHabit.onclick = function() {

    const name = habitInput.value.trim();

    if (name === "") {
        habitMessage.textContent = "Enter a habit first.";
        return;
    }

    if (habits.length >= 4) {
        habitMessage.textContent = "You can only have 4 habits.";
        addHabit.disabled = true;
        return;
    }

    habits.push({
        name: name,
        streak: 0
    });

    saveHabits();

    habitInput.value = "";
    habitMessage.textContent = "";

    showHabits();
};

showHabits();


// Calorie calculator

const today = new Date().toDateString();
const savedDate = localStorage.getItem("calorieDate");

let totalCalories = 0;

if (savedDate === today) {
    totalCalories = Number(localStorage.getItem("calories")) || 0;
} else {
    localStorage.setItem("calorieDate", today);
    localStorage.setItem("calories", 0);
}

const activity = document.getElementById("activity");
const duration = document.getElementById("duration");
const calculate = document.getElementById("calculate");
const calories = document.getElementById("calories");

calories.textContent = totalCalories + " kcal";

calculate.onclick = function() {

    let minutes = Number(duration.value);
    let rate = Number(activity.value);

    if (minutes <= 0) {
        return;
    }

    let burned = minutes * rate;

    totalCalories += burned;

    calories.textContent = totalCalories + " kcal";

    localStorage.setItem("calories", totalCalories);
    localStorage.setItem("calorieDate", today);

    duration.value = "";
};


// Theme button

const themeButton = document.getElementById("themeButton");

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    themeButton.textContent = "Dark Mode";
}

themeButton.onclick = function() {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeButton.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
    } else {
        themeButton.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    }
}; 