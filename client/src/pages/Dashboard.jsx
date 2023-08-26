import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xsbXc5MmE1MDRjMjNla3F6bDhueTV5OSJ9.cu9Y3UeEMkFTX45o0UDaSw";
const NEWS_API_KEY = "76c92a54c1ed409d97c7ca30981b71e1";

function Dashboard() {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [news, setNews] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);

  const fetchNewsForCountry = async (countryCode) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();

    console.log("NewsAPI Response:", data); // Debugging: Logging NewsAPI response

    if (data && data.status === "ok" && Array.isArray(data.articles)) {
      setNews(data.articles);
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

    console.log("Mapbox Response:", data); // Debugging: Logging Mapbox API response

    if (data && data.features && data.features.length) {
      const placeName = data.features[0].place_name;
      const countryCode = data.features[0].context.find(
        (c) => c.id.indexOf("country") === 0
      )?.short_code; // Extracting the country short code

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
            maxWidth: "500px", // Increased width for better visibility
            zIndex: 1,
            overflowY: "scroll",
            maxHeight: "500px", // Increased height for better visibility
          }}
        >
          <h4>Latest News</h4>
          {news.map((newsItem, index) => (
            <div key={index}>
              {newsItem.urlToImage && (
                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={newsItem.urlToImage}
                    alt={newsItem.title}
                    onError={(e) => {
                      console.error("Failed to load image:", e);
                      e.target.style.display = "none"; // Hide the img element if the image fails to load
                    }}
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
          />
                    </a>
                )}
                <h5>
                    <a
                        href={newsItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {newsItem.title}
                    </a>
                </h5>
                <p>{newsItem.description}</p>
            </div>
        ))}
    </div>
)}
    </div>
  );
}

export default Dashboard;
