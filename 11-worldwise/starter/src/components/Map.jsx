import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  // Topic: Programmatic Navigation with useNavigate (1)
  // Programmatic navigation basically means to move to a new URL without the user having to click on any link
  // Common use case of this behavior is after submitting a form.
  // const navigate = useNavigate();

  const { cities } = useCities();

  // Topic: Including a Map With the Leaflet Library 🌍
  // npm i react-leaflet leaflet
  const [mapPosition, setMapPosition] = useState([40, 0]);

  //  Topic: Reading and Setting a Query String (2)
  // const [searchParams, setSearchParams] = useSearchParams();
  // Move to useUrlPosition.js 🍊

  // Topic: Setting Map Position With Geolocation 🍿
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // Topic: Fetching City Data in the Form (2) 🍊
  const [mapLat, mapLng] = useUrlPosition();

  // 🍕 useEffect is mostly asynchronous mechanism
  useEffect(
    function () {
      // When go back to list
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // 🍿
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    // Imperative way (<NavLink>Declarative way</NavLink>)
    <div className={styles.mapContainer}>
      {/* 🍿 */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      {/* 🌍 Change color map from '.org' to '.fr/hot' */}
      <MapContainer
        center={mapPosition}
        // Topic: Interactive With the Map 🍕
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {/* Topic: Displaying City Markers on Map */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* 🍕 */}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// NOTE Need to implement onCLick event by our own when using leaflet

// 🍕 Component for update position in each click
function ChangeCenter({ position }) {
  const map = useMap(); // hook from leaflet
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  // hook from leaflet
  useMapEvent({
    click: (e) => {
      // console.log(e);
      // Go to form when clicking on map
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
