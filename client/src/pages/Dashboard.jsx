import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../Dashboard.module.css';
import { useMutation } from '@apollo/client';
import { SAVE_NEWS } from '../utils/mutations';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xsbXc5MmE1MDRjMjNla3F6bDhueTV5OSJ9.cu9Y3UeEMkFTX45o0UDaSw';
const NEWS_API_KEY = '72854b184e9b4fb88d7b85d9362f3e4a';

function Dashboard() {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [news, setNews] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);
  const [isNewsVisible, setIsNewsVisible] = useState(true);

  const fetchNewsForCountry = async countryCode => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    console.log(data);

    if (data && data.status === 'ok' && Array.isArray(data.articles)) {
      setNews(data.articles);
      setIsNewsVisible(true); // Make news box reappear each time new news is set
    } else {
      console.error('Unexpected data format from API:', data);
      setNews([]);
    }
  };

  const onMapClick = useCallback(async e => {
    const lngLat = e.lngLat;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();

    if (data && data.features && data.features.length) {
      const placeName = data.features[0].place_name;
      const countryCode = data.features[0].context.find(
        c => c.id.indexOf('country') === 0
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
      style: 'mapbox://styles/swmythos/cllq0tvmh00jm01p9d4q123ar',
      center: [-74.5, 40],
      zoom: 2,
      pitch: 10,
      bearing: 0,
      projection: 'globe',
      accessToken: MAPBOX_TOKEN,
    });

    map.current.on('click', onMapClick);
  }, [onMapClick]);

  const [savedNews, setSavedNews] = useState({
    newsId: '',
    title: '',
    summary: '',
    url: '',
    image: '',
  });
  const [saveNews, { error }] = useMutation(SAVE_NEWS);

  const handleSaveNews = async newsItem => {
    event.preventDefault();
    try {
      console.log(newsItem);
      let variables = {
        saveNews: {
          newsId: newsItem.publishedAt + newsItem.source.name + newsItem.author,
          title: newsItem.title,
          summary: newsItem.description || '',
          url: newsItem.url,
          image: newsItem.urlToImage,
        },
      };

      const mutationResponse = await saveNews({
        variables: variables,
      });

      console.log('Mutation response:', mutationResponse);
      // const { token, currentUser } = mutationResponse.data.saveNews;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div ref={mapContainer} className={styles.dashboardMapContainer}>
        {locationDetails && (
          <div className={styles.locationInfoBox}>
            {/* <h4></h4> */}
            <p>{locationDetails}</p>
          </div>
        )}
      </div>

      {news.length > 0 && isNewsVisible && (
        <>
          <div className="absolute flex top-32 justify-center">
            <h4 className=" text-white  text-3xl text-center w-full top-0">
              LATEST NEWS
            </h4>
          </div>

          <div
            className="mt-72 absolute p-5 bg-transparent max-w-[20rem] z-10 overflow-y-scroll h-[600px] rounded-5 shadow-md flex flex-col items-center"
            onClick={() => setIsNewsVisible(false)}
          >
            {news.map((newsItem, index) => (
              <div
                key={index}
                className="mb-5 p-4 bg-newsRed rounded-[0.375rem] shadow-md transition-transform duration-200 ease-in-out"
              >
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
                  onClick={() => handleSaveNews(newsItem)}
                >
                  Save
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
