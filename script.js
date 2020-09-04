'use strict';

const apiKey = 'hxPzOOModoBIvDp3kLgBncehP3vBiX8ZzYm5S2Ge';

function displayParks(responseJson) {
  $('#results-list').empty();
  for (let i=0;i<responseJson.data.length;i++){
  $('#results-list').append( 
     `<li class="item"> 
      <h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}<p>`
  );
  }
  $('#results').removeClass('hidden');
  $('#js-error-message').empty()
};

function findStateParks(searchTerm, maxResults) {
  let url = `https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&limit=${maxResults}&api_key=${apiKey}`;

  fetch(url)
    .then (response => {
      return response.json();
    })
    .then (responseJson => {
      displayParks(responseJson);
    })
    .catch (err => {
      $('#js-error-message').text(`No State Parks found in ${searchTerm}. Try using the State 2-letter Abbreviation(i.e. IN for Indiana.`);
    });
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    findStateParks(searchTerm, maxResults);
  });
}

$(watchForm);
