import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Dashboard() {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [news, setNews] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);

  const fetchNewsForCountry = async (country) => {
    try {
      const response = await fetch(
        `https://api.worldnewsapi.com/search-news?api-key=38d818b814364e2c8cf44be7b62549c5&source-countries=${country}`
      );
      const data = await response.json();
      if (data && Array.isArray(data.news)) {
        setNews(data.news);
      } else {
        console.error("Unexpected data format from API:", data);
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const onMapClick = useCallback(async (e) => {
    const lngLat = e.lngLat;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xsbXc5MmE1MDRjMjNla3F6bDhueTV5OSJ9.cu9Y3UeEMkFTX45o0UDaSw`
    );
    const data = await response.json();
    if (data && data.features && data.features.length) {
      const placeName = data.features[0].place_name; // Using place_name instead of place_formatted
      setLocationDetails(placeName);

      const country = data.features[0].properties.context.find((item) =>
        item.id.startsWith("country")
      ).text;
      fetchNewsForCountry(country);
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
      accessToken:
        "pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xsbXc5MmE1MDRjMjNla3F6bDhueTV5OSJ9.cu9Y3UeEMkFTX45o0UDaSw",
    });

    map.current.on("click", onMapClick);
  }, [onMapClick]);

  return (
    <div style={{ position: "relative", width: "100%", height: "800px" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "800px" }}></div>
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
      <div style={{ width: "100%" }}>
        {news.map((newsItem, index) => (
          <div key={index}>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
