import { useSelector, useDispatch } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {

// Access the entire Redux store
const cartItems = useSelector((store) => store.cart.items);

  // const store = useSelector((store) => store);
  // console.log("Store:", store);

  // const cartItems = store.cart.items;
  // console.log("Cart Items:", cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-10">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800">🛒 Your Cart</h1>
          <p className="mt-1 text-gray-500">
            Review your items before checkout
          </p>
        </div>

        {/* Cart Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          {/* Sticky Checkout Bar */}
          <div className="sticky top-0 z-10 mb-4 flex items-center justify-between rounded-xl bg-orange-100 p-4">
            <span className="font-medium text-gray-700">
              {cartItems.length} item{cartItems.length !== 1 && "s"} in cart
            </span>

            <button
              onClick={handleClearCart}
              className="rounded-lg bg-green-500 px-6 py-2 font-semibold text-white transition hover:bg-green-600 active:scale-95"
            >
              Checkout
            </button>
          </div>

          {/* Empty State */}
          {cartItems.length === 0 && (
            <div className="py-10 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Your cart is empty 😔
              </h2>
              <p className="mt-2 text-gray-500">
                Add some delicious food to get started!
              </p>
            </div>
          )}

          {/* Item List */}
          <ItemList items={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
