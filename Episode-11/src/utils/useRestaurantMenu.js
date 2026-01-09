// Custom Hook to fetch restaurant menu details


import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (resId) fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      const json = await data.json();
      setResInfo(json.data);
    } catch (err) {
      console.error("Menu fetch failed", err);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
