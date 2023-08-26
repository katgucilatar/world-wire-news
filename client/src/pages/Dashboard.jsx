import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Dashboard() {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [news, setNews] = useState([]);

  const getCountryNameFromCoordinates = async (lngLat) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xsbXc5MmE1MDRjMjNla3F6bDhueTV5OSJ9.cu9Y3UeEMkFTX45o0UDaSw`
    );
    const data = await response.json();

    const countryFeature = data.features.find((feature) =>
      feature.id.includes("country")
    );
    if (countryFeature) {
      console.log("Country retrieved from Mapbox:", countryFeature.text);
      return countryFeature.text;
    } else {
      console.log("No country feature found in Mapbox response");
      return null;
    }
  };

  const fetchNewsForCountry = async (country) => {
    console.log("Fetching news for:", country);

    try {
      const response = await fetch(
        `https://api.worldnewsapi.com/search-news?api-key=38d818b814364e2c8cf44be7b62549c5&source-countries=${country}`
      );
      const data = await response.json();

      if (data && Array.isArray(data.news) && data.news.length > 0) {
        console.log("News data retrieved:", data.news);
        setNews(data.news);
      } else {
        console.log("No news data retrieved or unexpected format:", data);
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

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

    map.current.on("click", async (e) => {
      const countryName = await getCountryNameFromCoordinates(e.lngLat);
      if (countryName) fetchNewsForCountry(countryName);
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "800px" }}></div>
      {news.map((newsItem, index) => (
        <div key={index}>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.summary}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
