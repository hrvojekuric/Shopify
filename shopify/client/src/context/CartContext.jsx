import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ShopContext = createContext();

export const CartContext = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("storageKey", []);

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item._id === id)?.quantity || 0;
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const increaseCartQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseCartQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <ShopContext.Provider
      value={{
        getItemQuantity,
        addToCart,
        removeFromCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        cartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
