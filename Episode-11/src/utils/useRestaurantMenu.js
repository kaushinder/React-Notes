import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const res = await fetch(MENU_API + resId);
      const json = await res.json();
      setResInfo(json?.data);
    } catch (err) {
      console.error("Menu fetch failed", err);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
