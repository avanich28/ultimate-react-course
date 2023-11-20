import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

/*
const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
*/

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  // Topic: Reading and Updating the User State (4)
  // Topic: Integrating Geolocation 🌏
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  // Topic: Error Handling in Form Actions 🍕
  const navigation = useNavigation();
  // console.log(navigation); // submitting -> loading -> idle
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData(); // 💥
  const dispatch = useDispatch();

  // Topic: Using the Cart for New Orders (1) 🐔
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;

  // No submit handler and JS, React Router will handle for us. 🍔

  return (
    // Topic: Writing Data With React Router "Actions" (1) 🍔
    // (2) in App.js
    // Use React Router form
    // "POST" for create new order
    // We could also use "PATCH" and "DELETE", but not "GET".
    // NOTE 'action' tells the path that this form should be submitted to, but, by default, React Router simply match the closest route!

    // <Form method="POST" action="/order/new">
    // Topic: Styling the Order Form
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        {/* IMPT Style mobile first */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            // BUG cannot use value bcs we can't change it
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {/* 🍕 */}
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              //  Topic: Styling Form Elements
              // Topic: Reusing Styles With @apply (2)
              // (1) in index.css
              className="input w-full"
              type="text"
              name="address"
              // 🌏
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {/* 🌏 */}
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[35px] z-50 sm:top-[3px] md:right-[5px] md:top-[5px]">
              {/* Topic: Redux Thunks With createAsyncThunk (2) 🍖 */}
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            //  Topic: Styling Form Elements
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* 🍔 */}
          <input
            type="hidden"
            name="cart"
            // IMPT Hacky! 🐔
            // Do this bcs we are not able to get the data from Redux in the 'action' function below.
            value={JSON.stringify(cart)}
          />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />

          {/* 🍕 */}
          {/* Topic: Styling Buttons: Element States and Transitions */}
          {/* active:bg-slate-400 */}
          {/* Topic: Reusing Styles With React Components (2) */}
          <Button
            // 🌏
            disabled={isSubmitting || isLoadingAddress}
            type="primary"
          >
            {isSubmitting
              ? 'Placing order..'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// 🍔
// Form submit -> React Router call the action function -> then pass the 'request'
export async function action({ request }) {
  const formData = await request.formData(); // Provide by browser
  // console.log(formData); // FormData {}

  const data = Object.fromEntries(formData); // {customer: 'a', phone: '1', address: '1'}
  // console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true', // checkbox
  };
  console.log(order);

  // 🍕
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might to contact you.';

  if (Object.keys(errors).length > 0) return errors; // 💥

  // If everything is okay, create order and redirect.
  const newOrder = await createOrder(order); // return data

  // Cannot use useDispatch() inside here
  // IMPT HACKY! Do NOT overuse 🐔
  store.dispatch(clearCart());

  // Cannot use navigate from useNavigate() bcs it is a hook
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
