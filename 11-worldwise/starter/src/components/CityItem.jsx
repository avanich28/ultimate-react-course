import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// Topic: Implementing the Cities List (3)
function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;

  console.log(position);

  return (
    <li>
      {/* Topic: Dynamic Route with URL Parameters (2) - add <Link> and to={`${id}} */}
      {/* Topic: Reading and Setting a Query String (1) - add ?lat=${position.lat}&lng=${position.lng} */}
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
