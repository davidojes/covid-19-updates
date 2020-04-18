var countries = [{
    "Country": "Niger",
    "CountryCode": "NE",
    "Slug": "niger",
    "NewConfirmed": 43,
    "TotalConfirmed": 627,
    "NewDeaths": 4,
    "TotalDeaths": 18,
    "NewRecovered": 20,
    "TotalRecovered": 110,
    "Date": "2020-04-18T15:08:11Z"
},
{
    "Country": "Nigeria",
    "CountryCode": "NG",
    "Slug": "nigeria",
    "NewConfirmed": 51,
    "TotalConfirmed": 493,
    "NewDeaths": 4,
    "TotalDeaths": 17,
    "NewRecovered": 7,
    "TotalRecovered": 159,
    "Date": "2020-04-18T15:08:11Z"
}];;
var userInputBox = document.getElementById("userInput");
var resultDiv = document.getElementById("result");
var searchResults = [];

// var requestURL = 'https://api.covid19api.com/summary';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function () {
//     countries = request.response.Countries;
// }

function search() {
    var userInput = trimAndToLowerCase(userInputBox.value);
    var countryFound = false;
    searchResults = [];
    resultDiv.innerHTML = "";

    if (isEmpty(userInput) == true) {
        var newParagraph = document.createElement("p");
        newParagraph.innerHTML = "Please enter a search value";
        result.appendChild(newParagraph);
    }
    else {
        countries.forEach(function (country) {
            if (trimAndToLowerCase(country.Country).includes(userInput)) {
                searchResults.push(country);
                country.Date = new Date(country.Date).toLocaleString() + " (Note that the date and time are automatically converted to match your local date and time)";
                countryFound = true;
            }
        })

        if (countryFound == false) {
            var newParagraph = document.createElement("p")
            newParagraph.innerHTML = "No matches";
            document.getElementById("result").appendChild(newParagraph)
        }

        else {
            displaySearchResults();
        }
    }

}


function displaySearchResults() {
    for (var i = 0; i < searchResults.length; i++) {
        var newDiv = document.createElement("div");
        newDiv.innerHTML = searchResults[i].Country;
        var hiddenValue = document.createElement("input");
        hiddenValue.hidden = true;
        hiddenValue.value = i;
        var viewButton = document.createElement("button");
        viewButton.innerHTML = "View Details";

        newDiv.appendChild(viewButton);
        newDiv.appendChild(hiddenValue);
        resultDiv.appendChild(newDiv);

        viewButton.addEventListener("click", function () {
            var chosenResult = this.parentElement;
            var countryIndex = chosenResult.getElementsByTagName("input")[0].value;
            console.log(countryIndex);
            console.log(chosenResult);
            console.log(chosenResult);
            resultDiv.innerHTML = "";

            resultDiv.appendChild(createParagraph("Country Name: " + searchResults[countryIndex].Country));
            resultDiv.appendChild(createParagraph("New Confirmed Cases: " + searchResults[countryIndex].NewConfirmed));
            resultDiv.appendChild(createParagraph("Total Confirmed Cases: " + searchResults[countryIndex].TotalConfirmed));
            resultDiv.appendChild(createParagraph("New Deaths: " + searchResults[countryIndex].NewDeaths));
            resultDiv.appendChild(createParagraph("Total Deaths: " + searchResults[countryIndex].TotalDeaths));
            resultDiv.appendChild(createParagraph("New Recoveries: " + searchResults[countryIndex].NewRecovered));
            resultDiv.appendChild(createParagraph("Total Recoveries: " + searchResults[countryIndex].TotalRecovered));
            resultDiv.appendChild(createParagraph("Result Timestamp: " + searchResults[countryIndex].Date));
        })
    }
}

function createParagraph(text) {
    let paragrapgh = document.createElement("p");
    paragrapgh.innerHTML = text;
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