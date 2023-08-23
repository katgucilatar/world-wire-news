import WorldNewsApi from 'world_news_api';

function News() {
let defaultClient = WorldNewsApi.ApiClient.instance;
// Configure API key authorization: apiKey
let apiKey = defaultClient.authentications['apiKey'];
apiKey.apiKey = 'YOUR API KEY';
// Set a prefix for the API key, e.g. "Token" (defaults to null)
apiKey.apiKeyPrefix = 'Token';

let apiInstance = new WorldNewsApi.NewsApi();
let opts = {
  'sourceCountries': gb,us, // String | A comma-separated list of ISO 3166 country codes from which the news should originate, e.g. gb,us.
  'locationFilter': 51.050407, 13.737262, 50, // String | Filter news by radius around a certain location. Format is \"latitude,longitude,radius in kilometers\", e.g. 51.050407, 13.737262, 100
};
apiInstance.searchNews(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});

// insert return () here 

}