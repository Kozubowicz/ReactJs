import { StoreItem } from "../components/StoreItem";
import storeItems from "./../data/items.json";

export function Store() {
  return (
    <>
      <h1>Store</h1>
      <div className="primaryContainer">
        {storeItems.map((e) => (
          <div className="itemContainer" key={e.id}>
            <StoreItem {...e} />
          </div>
        ))}
      </div>
    </>
  );
}
