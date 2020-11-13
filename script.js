'use strict';

const apiKey = 'api_key=ITSpwbgW82vThEh2xCOX9uIGsfLS58L9DIusQ401';
const searchURL = 'https://developer.nps.gov/api/v1/parks?';



function displayResults(responseJson) {
    console.log(responseJson);
    //clear out previous results
    $('#results-list').empty();
    const dataList = responseJson.data;
    //use for loop to sort through items
    for (let i=0; i<dataList.length; i++){
        $('#results-list').append(`
            <li>
                <h3><a href=${dataList[i].url}>${dataList[i].fullName}</a></h3>
                <p>${dataList[i].description}</p>
            </li>
        `);
    }
    //remove the hidden class so the results get displayed
    $('#results').removeClass('hidden');
}    
 
function getNationalParks(stateId, maxResults) {

    const stateCodes = stateId.join('%2C');
    const stateCodeQuery = 'stateCode=' + stateCodes;
    const limitQuery = 'limit=' + maxResults;
    
    console.log(stateCodes);
    console.log(limitQuery);
        
    const url = searchURL + stateCodeQuery + '&' + limitQuery + '&' + apiKey ;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error (response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const stateId = $('#stateCode').val();
        console.log(stateId);
        const maxResults = $('#limit').val();
        console.log(maxResults);
        getNationalParks(stateId, maxResults);
    })
}

$(watchForm);