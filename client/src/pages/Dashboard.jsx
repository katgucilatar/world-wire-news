
import * as React from 'react';
import Map from 'react-map-gl';

function Dashboard() {
  return <Map
    mapLib={import('mapbox-gl')}
    initialViewState={{
      longitude: -74.5,
      latitude: 40,
      zoom: 9
    }}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v11"
    mapboxAccessToken="pk.eyJ1Ijoic3dteXRob3MiLCJhIjoiY2xsbXc5MmE1MDRjMjNla3F6bDhueTV5OSJ9.cu9Y3UeEMkFTX45o0UDaSw"
  />;
};

export default Dashboard;
