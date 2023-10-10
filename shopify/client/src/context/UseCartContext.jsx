import { useContext } from "react";
import { ShopContext } from "./CartContext";

export const useCart = () => {
  return useContext(ShopContext);
};
