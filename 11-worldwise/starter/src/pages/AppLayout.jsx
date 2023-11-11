import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css"; // csm from setting snippets
import User from "../components/User";

// Main application
function AppLayout() {
  return (
    <div className={styles.app}>
      {/* Topic: Building the App Layout */}
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
