import { formatCurrency } from "../utilities/formatCurrrency";
import { useShoppingCart } from "../context/shoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <>
      <img src={imgUrl} className="itemImg" key={id} />
      <div className="itemNamePrice">
        <label className="itemName">{name}</label>
        <label className="itemPrice">{formatCurrency(price)}</label>
      </div>

      {quantity > 0 ? (
        <div className="countContainer">
          <button className="countButton minusButton" onClick={() => decreaseCartQuantity(id)}>
            –
          </button>
          <h3>{quantity}</h3> in cart
          <button className="countButton" onClick={() => increaseCartQuantity(id)}>
            +
          </button>
        </div>
      ) : (
        <button className="addButton" onClick={() => increaseCartQuantity(id)}>
          Add item
        </button>
      )}

      {quantity > 0 ? (
        <div className="removeButtonContainer">
          <button className="removeButton" onClick={() => removeFromCart(id)}>
            Remove
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
