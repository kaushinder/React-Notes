import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
const RestaurantMenu = () => {
 const [resInfo, setResInfo]= useState(null);

    useEffect(() => {
       fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(
  "https://test.cors.workers.dev/?url=" +
  encodeURIComponent(
    "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=29.0219927&lng=77.7709558&restaurantId=709560&catalog_qa=undefined&submitAction=ENTER"
  )
);
const json = await data.json();
console.log(json);
setResInfo(json.data);
};

const {name, cuisines, avgRating, costForTwo, deliveryTime} = resInfo?.cards[0]?.card?.card?.info || {};

  return resInfo === null ? <Shimmer /> : (
    <div className="menu">
        <h1>{name}</h1>
        <h3>{cuisines}</h3>
        <h3>{avgRating}</h3>
        <h3>{costForTwo}</h3>
        <h3>{deliveryTime}</h3>
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