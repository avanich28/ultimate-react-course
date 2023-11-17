import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>
      {/* Topic: Fetching Orders (2) */}
      <SearchOrder />
      <p>Jonas</p>
    </header>
  );
}

export default Header;
