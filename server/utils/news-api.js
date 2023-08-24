// function that shows events based on the city typed in the search bar 
function searchHandler(event) {
    event.preventDefault();
    var country = searchInput.value;
    getNews(country);
}

// function that pulls information from the Ticketmaster API
function getNews(country){
    var apiKey = "38d818b814364e2c8cf44be7b62549c5"
    var queryURL = `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&source-countries=${country}`

    fetch(queryURL)
    .then(function(resp) { return resp.json()})
    .then(function(data) {
        if (data) {
            console.log(data)
        } else {
            console.log(ERROR)
        }
    });

// searchInput.addEventListener("submit", searchHandler);
};

export {searchHandler, getNews};