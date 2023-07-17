import { useShoppingCart } from "../context/shoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrrency";
type CartIemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function CartItem({ id, name, price, imgUrl }: CartIemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <>
      {quantity > 0 ? (
        <div className="cartItemContainer">
          <img src={imgUrl} key={id} alt={name} className="cartImg"></img>
          <div className="cartNamePrice">
            <p>{name}</p>
            <p>{formatCurrency(price)}</p>
            <p className="cartQuantity">
              {quantity} <label className="cartQuantityLabel">in cart</label>
            </p>
          </div>
          <div className="cartButtonsContainer">
            <div>
              <button className="countButton" onClick={() => decreaseCartQuantity(id)}>
                –
              </button>
              <button className="countButton" onClick={() => increaseCartQuantity(id)}>
                +
              </button>
            </div>
            <div>
              <button className="removeButton" onClick={() => removeFromCart(id)}>
                X
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
