import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import SearchNews from "./SearchNews"

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xsbXc5MmE1MDRjMjNla3F6bDhueTV5OSJ9.cu9Y3UeEMkFTX45o0UDaSw";
const NEWS_API_KEY = "9f126c9ab647469682b1742692c17533";

function Dashboard() {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [news, setNews] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);

  const fetchNewsForLocation = async (location) => {
    const encodedLocation = encodeURIComponent(location);
    const response = await fetch(
      `https://api.worldnewsapi.com/search-news?api-key=${NEWS_API_KEY}&location=${encodedLocation}`
    );
    const data = await response.json();
    if (data && Array.isArray(data.news)) {
      console.log(data.news); // Debugging: Logging news data to check for any errors
      setNews(data.news);
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
      setLocationDetails(placeName);
      fetchNewsForLocation(placeName); // Fetching for the location
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

  return (
    <div style={{ position: "relative", width: "100%", height: "800px" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "800px" }}></div>

      {/* Location Info Box */}
      {locationDetails && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            maxWidth: "300px",
            zIndex: 1,
          }}
        >
          <h4>Location Details</h4>
          <p>{locationDetails}</p>
        </div>
      )}

      {/* News Info Box */}
      {news.length > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "10px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            maxWidth: "300px",
            zIndex: 1,
            overflowY: "scroll", // Scroll added
            maxHeight: "300px", // Max height for news info box
          }}
        >
          <h4>Latest News</h4>
          {news.map((newsItem, index) => (
            <div key={index}>
              {/* Checking for Image URL */}
              {typeof newsItem.imageUrl === "string" &&
                newsItem.imageUrl.length > 0 && (
                  <img
                    src={newsItem.imageUrl}
                    alt={newsItem.title}
                    style={{
                      width: "100%",
                      maxHeight: "100px",
                      objectFit: "cover",
                    }}
                  />
                )}
              <a href={newsItem.url}>{newsItem.title}</a>
              <p>{newsItem.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
