import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

// Topic: Fetching Data With React Router "Loaders": Pizza Menu (2) -> 3 steps
function Menu() {
  // Step 3
  const menu = useLoaderData();
  console.log(menu);

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// NOTE The convention seems to be placing the loader for the data of a certain page inside the file of that page.
// NOTE React Router starts fetching the data at the same time as it starts rendering the correct route.
// (while useEffect always fetch after the component render. This creates data loading waterfalls.)
// Step 1
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
