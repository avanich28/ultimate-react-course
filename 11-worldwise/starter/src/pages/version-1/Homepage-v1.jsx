import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Homepage() {
  return (
    <div>
      {/* Topic: Linking Between Routes with <Link /> and <NavLink /> 🐔 */}
      <PageNav />
      <AppNav />

      {/* className="test" -> Want to access CSS in PageNav.module.css -> fill :global(.test) in CSS */}
      <h1>WorldWise</h1>

      {/* We don't want to refresh all pages -> Use Link instead! */}
      {/* <a href="/pricing">Pricing</a> */}

      {/* NOTE No new request, just DOM got replaced -> Component Tree changed */}
      <Link to="/app">Go to the app</Link>
    </div>
  );
}

export default Homepage;
