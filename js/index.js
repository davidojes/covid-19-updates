
var countries = [];
var global = {};
var userInputBox = document.getElementById("userInput");
var searchButton = document.getElementById("searchButton");
userInputBox.addEventListener("keydown", function (key) {
    if (key.keyCode == 13 && !key.shiftKey) {
        // prevent default behavior
        key.preventDefault();
        searchButton.click();
    }
});
var resultDiv = document.getElementById("searchResults");
var globalUpdatesDiv = document.getElementById("globalUpdates");
var searchResults = [];
var resultGrid = document.getElementById("resultGrid");

/* request to get current stats */
var requestURL = 'https://api.covid19api.com/summary';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    countries = request.response.Countries;
    global = request.response.Global;

    globalUpdatesDiv.appendChild(createParagraph("New Confirmed Cases: " + global.NewConfirmed));
    globalUpdatesDiv.appendChild(createParagraph("Total Confirmed Cases: " + global.TotalConfirmed));
    globalUpdatesDiv.appendChild(createParagraph("New Deaths: " + global.NewDeaths));
    globalUpdatesDiv.appendChild(createParagraph("Total Deaths: " + global.TotalDeaths));
    globalUpdatesDiv.appendChild(createParagraph("New Recoveries: " + global.NewRecovered));
    globalUpdatesDiv.appendChild(createParagraph("Total Recoveries: " + global.TotalRecovered));
}





function search() {
    var userInput = trimAndToLowerCase(userInputBox.value);
    var countryFound = false;
    searchResults = [];
    resultDiv.innerHTML = "";
    resultGrid.style.display = "none";

    if (isEmpty(userInput) == true) {
        resultDiv.appendChild(createParagraph("Please enter a search value"));
    }
    else {
        countries.forEach(function (country) {
            if (trimAndToLowerCase(country.Country).includes(userInput)) {
                searchResults.push(country);
                country.Date = convertDate(country.Date);
                countryFound = true;
            }
        })

        if (countryFound == false) {
            resultDiv.appendChild(createParagraph("No matches. Please use a different search term"))
        }

        else {
            displaySearchResults();
        }
    }

}

function displaySearchResults() {
    resultGrid.innerHTML = "";
    resultDiv.innerHTML = "";
    resultGrid.style.display = "grid";

    for (var i = 0; i < searchResults.length; i++) {
        var countryName = document.createElement("span");
        countryName.innerHTML = searchResults[i].Country;
        countryName.classList.add("grid-item");

        var hiddenValue = document.createElement("input");
        hiddenValue.hidden = true;
        hiddenValue.value = i;
        var viewButton = document.createElement("button");
        viewButton.innerHTML = "View Updates";
        viewButton.classList.add("view-button");
        var buttonSpan = document.createElement("span");
        buttonSpan.classList.add("grid-item");
        buttonSpan.appendChild(hiddenValue);
        buttonSpan.appendChild(viewButton);

        resultGrid.appendChild(countryName);
        resultGrid.appendChild(buttonSpan);

        // event listener that displays a country's stats when the view details button is clicked
        viewButton.addEventListener("click", function () {
            var chosenResult = this.parentElement;
            var countryIndex = chosenResult.getElementsByTagName("input")[0].value;
            resultGrid.style.display = "none";

            var h2 = document.createElement("h2");
            h2.innerHTML = "COVID-19 in " + searchResults[countryIndex].Country;
            resultDiv.appendChild(h2);
            // resultDiv.appendChild(createParagraph("Country Name: " + searchResults[countryIndex].Country));
            resultDiv.appendChild(createParagraph("New Confirmed Cases: " + searchResults[countryIndex].NewConfirmed));
            resultDiv.appendChild(createParagraph("Total Confirmed Cases: " + searchResults[countryIndex].TotalConfirmed));
            resultDiv.appendChild(createParagraph("New Deaths: " + searchResults[countryIndex].NewDeaths));
            resultDiv.appendChild(createParagraph("Total Deaths: " + searchResults[countryIndex].TotalDeaths));
            resultDiv.appendChild(createParagraph("New Recoveries: " + searchResults[countryIndex].NewRecovered));
            resultDiv.appendChild(createParagraph("Total Recoveries: " + searchResults[countryIndex].TotalRecovered));
            // console.log(searchResults[countryIndex].Date);
            resultDiv.appendChild(createParagraph("Result Timestamp: " + searchResults[countryIndex].Date));
            resultDiv.appendChild(createParagraph("(Note that the date and time are automatically converted to match your local date and time)", "note"));
        })
    }
}

function convertDate(date) {
    tempDate = new Date(date);
    tempDate = tempDate.toLocaleString();
    if (tempDate == "Invalid Date") {
        return date;
    }
    else {
        return tempDate;
    }
}

function createParagraph(text, className) {
    let paragrapgh = document.createElement("p");
    paragrapgh.innerHTML = text;
    if (className != undefined) {
        paragrapgh.classList.add(className);
    }
    return paragrapgh;
}

function isEmpty(userInput) {
    if (userInput.length === 0 || userInput.trim() === "") {
        return true;
    }
    else {
        return false
    }
}

function trimAndToLowerCase(input) {
    input = input.replace(/ /g, "");
    input = input.toLowerCase();
    return input;
}