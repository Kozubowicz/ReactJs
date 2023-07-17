import { useState, useEffect } from "react";
import { useShoppingCart } from "../context/shoppingCartContext";
import { CartItem } from "./CartItem";

import { formatCurrency } from "../utilities/formatCurrrency";
import storeItems from "./../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const [itemsPrice, setItemsPrice] = useState<number>(0);
  const { getItemQuantity, closeCart, cartItems } = useShoppingCart();

  useEffect(() => {
    let totalPrice = 0;
    storeItems.forEach((item) => {
      if (cartItems.some((cartItem) => cartItem.id === item.id)) {
        totalPrice += getItemQuantity(item.id) * item.price;
      }
    });
    setItemsPrice(totalPrice);
  }, [cartItems, getItemQuantity]);

  return (
    <>
      {isOpen && (
        <div id="offcanvas">
          <button className="closeOffcanvasButton" onClick={() => closeCart()}>
            X
          </button>
          {storeItems
            .filter((e) => cartItems.some((f) => e.id === f.id))
            .map((e) => (
              <CartItem {...e} key={e.id} />
            ))}

          {
            <div>
              <h2>Total price: {formatCurrency(itemsPrice)}</h2>
            </div>
          }
        </div>
      )}
    </>
  );
}
