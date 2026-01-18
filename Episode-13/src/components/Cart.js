import { useSelector, useDispatch } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          <p className="mt-1 text-gray-500">
            Review your items before checkout
          </p>
        </div>

        {/* Cart Box */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          {/* Top Bar */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              {cartItems.length} item{cartItems.length !== 1 && "s"}
            </span>

            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-95"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* Empty State */}
          {cartItems.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              <h2 className="text-lg font-semibold">Your cart is empty</h2>
              <p className="mt-1">Add some food to get started 🍔</p>
            </div>
          ) : (
            <ItemList items={cartItems} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
