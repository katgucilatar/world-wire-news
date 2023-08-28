import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../Dashboard.module.css";
import { useMutation } from '@apollo/client';
import { SAVE_NEWS } from '../utils/mutations';


const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xsbXc5MmE1MDRjMjNla3F6bDhueTV5OSJ9.cu9Y3UeEMkFTX45o0UDaSw";
const NEWS_API_KEY = "76c92a54c1ed409d97c7ca30981b71e1";

function Dashboard() {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [news, setNews] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);
  const [isNewsVisible, setIsNewsVisible] = useState(true);
  

  const fetchNewsForCountry = async (countryCode) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();

    if (data && data.status === "ok" && Array.isArray(data.articles)) {
      setNews(data.articles);
      setIsNewsVisible(true); // Make news box reappear each time new news is set
    } else {
      console.error("Unexpected data format from API:", data);
      setNews([]);
    }
  };

  const onMapClick = useCallback(async (e) => {
    const lngLat = e.lngLat;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();

    if (data && data.features && data.features.length) {
      const placeName = data.features[0].place_name;
      const countryCode = data.features[0].context.find(
        (c) => c.id.indexOf("country") === 0
      )?.short_code;

      setLocationDetails(placeName);
      if (countryCode) {
        fetchNewsForCountry(countryCode);
      }
    }
  }, []);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/swmythos/cllq0tvmh00jm01p9d4q123ar",
      center: [-74.5, 40],
      zoom: 2,
      pitch: 10,
      bearing: 0,
      projection: "globe",
      accessToken: MAPBOX_TOKEN,
    });

    map.current.on("click", onMapClick);
  }, [onMapClick]);

    const [SavedNews, setSavedNews] = useState({
      title: '',
      summary: '',
    });

  const [saveNews, { error }] = useMutation(SAVE_NEWS);

   const handleSaveNews = async newsItem => {
     try {
      console.log('newsItem' + newsItem)
       let variables = {
         newsItem: {
           title: newsItem.title,
           summary: newsItem.summary,
           // Mr. Sneed don't forget to add parameters once you get the this working
         },
       };
       console.log(variables)

       const mutationResponse = await saveNews({
         variables: variables,
       });

       console.log('Mutation response:', mutationResponse);
       const { token, user } = mutationResponse.data.saveNews;
       // Handle success or any necessary updates
     } catch (e) {
       console.log(e);
     }
   };

  return (
    <div className={styles.dashboardContainer}>
      <div ref={mapContainer} className={styles.dashboardMapContainer}>
        {locationDetails && (
          <div className={styles.locationInfoBox}>
            <h4>Location Details</h4>
            <p>{locationDetails}</p>
          </div>
        )}
      </div>

      {news.length > 0 && isNewsVisible && (
        <div
          className={styles.newsInfoBox}
          onClick={() => setIsNewsVisible(false)}
        >
          <h4 className={styles.newsHeading}>LATEST NEWS</h4>
          {news.map((newsItem, index) => (
            <div key={index} className={styles.newsItemContainer}>
              {newsItem.urlToImage && (
                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={styles.newsItemImage}
                    src={newsItem.urlToImage}
                    alt={newsItem.title}
                    onError={e => {
                      e.target.style.display = 'none';
                    }}
                  />
                </a>
              )}
              <h5>
                <a
                  className={styles.newsTitleLink}
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {newsItem.title}
                </a>
              </h5>
              <p>{newsItem.description}</p>
              <button
                className="float-right"
                onClick={() => handleSaveNews(SavedNews)}
              >
                Save
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
