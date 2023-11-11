import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// Topic: Implementing the Cities List (3)
function CityItem({ city }) {
  // Topic: Finishing the City View 🍁 (3)
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  // console.log(position);

  // Topic: Deleting a City ❌
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      {/* Topic: Dynamic Route with URL Parameters (2) - add <Link> and to={`${id}} */}
      {/* Topic: Reading and Setting a Query String (1) - add ?lat=${position.lat}&lng=${position.lng} */}
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          // ❌
          onClick={handleClick}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
