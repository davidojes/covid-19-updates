var countries = [{
    "Country": "Niger",
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
    "NewConfirmed": 51,
    "TotalConfirmed": 493,
    "NewDeaths": 4,
    "TotalDeaths": 17,
    "NewRecovered": 7,
    "TotalRecovered": 159,
    "Date": "2020-04-18T15:08:11Z"
}];
var global = {
    "NewConfirmed": 83608,
    "TotalConfirmed": 2400051,
    "NewDeaths": 5534,
    "TotalDeaths": 165012,
    "NewRecovered": 31584,
    "TotalRecovered": 623259
}

var userInputBox = document.getElementById("userInput");
var resultDiv = document.getElementById("searchResults");
var globalUpdatesDiv = document.getElementById("globalUpdates");
var searchResults = [];

// var requestURL = 'https://api.covid19api.com/summary';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function () {
//     countries = request.response.Countries;
//     global = request.response.Global;
// }

globalUpdatesDiv.appendChild(createParagraph("New Confirmed Cases: " + global.NewConfirmed));
globalUpdatesDiv.appendChild(createParagraph("Total Confirmed Cases: " + global.TotalConfirmed));
globalUpdatesDiv.appendChild(createParagraph("New Deaths: " + global.NewDeaths));
globalUpdatesDiv.appendChild(createParagraph("Total Deaths: " + global.TotalDeaths));
globalUpdatesDiv.appendChild(createParagraph("New Recoveries: " + global.NewRecovered));
globalUpdatesDiv.appendChild(createParagraph("Total Recoveries: " + global.TotalRecovered));



function search() {
    var userInput = trimAndToLowerCase(userInputBox.value);
    var countryFound = false;
    searchResults = [];
    resultDiv.innerHTML = "";

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
            resultDiv.appendChild(createParagraph("No matches"))
        }

        else {
            displaySearchResults();
        }
    }

}


function displaySearchResults() {
    resultDiv.appendChild(createH2("Search Results"));
    
    for (var i = 0; i < searchResults.length; i++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add("search-result");
        var newSpan = document.createElement("span");
        newSpan.innerHTML = searchResults[i].Country;
        newSpan.classList.add("search-result-span");
        var hiddenValue = document.createElement("input");
        hiddenValue.hidden = true;
        hiddenValue.value = i;
        var viewButton = document.createElement("button");
        viewButton.innerHTML = "View Updates";
        viewButton.classList.add("view-button")

        newDiv.appendChild(newSpan);
        newDiv.appendChild(viewButton);
        newDiv.appendChild(hiddenValue);
        resultDiv.appendChild(newDiv);

        // event listener that displays a country's stats when the view details button is clicked
        viewButton.addEventListener("click", function () {
            var chosenResult = this.parentElement;
            var countryIndex = chosenResult.getElementsByTagName("input")[0].value;
            resultDiv.innerHTML = "";

            
            resultDiv.appendChild(createH2("COVID-19 in " + searchResults[countryIndex].Country));
            resultDiv.appendChild(createParagraph("Country Name: " + searchResults[countryIndex].Country));
            resultDiv.appendChild(createParagraph("New Confirmed Cases: " + searchResults[countryIndex].NewConfirmed));
            resultDiv.appendChild(createParagraph("Total Confirmed Cases: " + searchResults[countryIndex].TotalConfirmed));
            resultDiv.appendChild(createParagraph("New Deaths: " + searchResults[countryIndex].NewDeaths));
            resultDiv.appendChild(createParagraph("Total Deaths: " + searchResults[countryIndex].TotalDeaths));
            resultDiv.appendChild(createParagraph("New Recoveries: " + searchResults[countryIndex].NewRecovered));
            resultDiv.appendChild(createParagraph("Total Recoveries: " + searchResults[countryIndex].TotalRecovered));
           console.log(searchResults[countryIndex].Date);
            resultDiv.appendChild(createParagraph("Result Timestamp: " + searchResults[countryIndex].Date));
            resultDiv.appendChild(createParagraph("(Note that the date and time are automatically converted to match your local date and time)"));
        })
    }
}

function convertDate(date){
    tempDate = new Date(date);
    tempDate = tempDate.toLocaleString();
    if(tempDate == "Invalid Date"){
        return date;
    }
    else{
        return tempDate;
    }
}

function createH2(text){
    var h2 = document.createElement("h2");
    h2.innerHTML = text;
    return h2;
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