var apiKey = "ba06caaa1f8742bb9bae3e305828b552"

export const getHeadlines = async (query) => {
    return fetch(`https://api.worldnewsapi.com/search-news?api-key=${apiKey}&earliest-publish-date=2023-08-23 12:00:00`);
};
