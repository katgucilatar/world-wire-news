import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Dashboard() {
  const map = useRef(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/swmythos/cllq0tvmh00jm01p9d4q123ar",
      center: [-74.5, 40],
      zoom: 9,
      pitch: 10,
      bearing: 0,
      projection: "globe",
      accessToken:
        "pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xsbXc5MmE1MDRjMjNla3F6bDhueTV5OSJ9.cu9Y3UeEMkFTX45o0UDaSw",
    });
  }, []);

  return (
    <div ref={mapContainer} style={{ width: "100%", height: "800px" }}></div>
  );
}

export default Dashboard;
