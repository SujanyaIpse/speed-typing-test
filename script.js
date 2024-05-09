let timerEl = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");
let uniqueId = null;

resetBtn.addEventListener("click", function() {
    clearInterval(uniqueId);
    spinner.classList.remove("d-none");

    fetchQuote();

    timerEl.textContent = 0;
    quoteInput.value = "";
    resultEl.textContent = "";

    startTimer();
});

submitBtn.addEventListener("click", function() {
    if (quoteInput.value === quoteDisplay.textContent) {
        resultEl.textContent = "You typed in " + timerEl.textContent + " seconds";
        resultEl.classList.add("result");
        clearInterval(uniqueId);
    } else {
        resultEl.textContent = "You typed an incorrect answer";
        resultEl.classList.add("result");
    }
});

function fetchQuote() {
    let options = {
        method: "GET"
    };

    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add("d-none");
            quoteDisplay.textContent = jsonData.content;
        })
        .catch(function(error) {
            console.error("Error fetching quote:", error);
            spinner.classList.add("d-none");
            quoteDisplay.textContent = "Error fetching quote. Please try again later.";
        });
}

function startTimer() {
    uniqueId = setInterval(function() {
        timerEl.textContent = parseInt(timerEl.textContent) + 1;
    }, 1000);
}

// Initial fetch and timer start
fetchQuote();
startTimer();
