import { useEffect } from "react";

const RestaurantMenu = () => {

 useEffect(() => {
  fetchMenu();
}, []);

const fetchMenu = async () => {

  const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=27.1774553&lng=78.0077653&restaurantId=74352&catalog_qa=undefined&submitAction=ENTER");

  const json = await data.json();

  console.log(json);
};

  return (
    <div className="menu">
      <h1>Restaurant Menu Page</h1>
      <h2>Menu</h2>
      <ul>
        <li>Biryani</li>
        <li>Thali</li>
        <li>Ice Cream</li>
      </ul>
    </div>
  )
}

export default RestaurantMenu;