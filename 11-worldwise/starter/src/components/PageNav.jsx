import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    // Show unique string in DOM ex. className="_nav_d7iu7_1"
    <nav className={styles.nav}>
      <Logo />

      <ul>
        {/* Topic: Linking Between Routes with <Link /> and <NavLink /> 🐔 */}
        {/* NavLink tells us which is the currently visited page. -> In DOM, it shows class="active" */}
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
