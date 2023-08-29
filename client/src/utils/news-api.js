var apiKey = "ab9c7cce208a4d04b3ce75bbf6ca7809";

export const getHeadlines = async () => {
  return fetch(
    `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&earliest-publish-date=2023-08-23 12:00:00`
  );
};

