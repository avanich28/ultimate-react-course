import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  // Topic: Programmatic Navigation with useNavigate (1)
  // Programmatic navigation basically means to move to a new URL without the user having to click on any link
  // Common use case of this behavior is after submitting a form.
  const navigate = useNavigate();

  //  Topic: Reading and Setting a Query String (2)
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    // Imperative way (<NavLink>Declarative way</NavLink>)
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 50 });
        }}
      >
        Change pos
      </button>
    </div>
  );
}

export default Map;
