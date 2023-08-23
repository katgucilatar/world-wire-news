import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

function Dashboard() {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40], // starting position [lng, lat] ! IMPORTANT TO REMEMBER !
      zoom: 9, // starting zoom
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}

export default Dashboard;
