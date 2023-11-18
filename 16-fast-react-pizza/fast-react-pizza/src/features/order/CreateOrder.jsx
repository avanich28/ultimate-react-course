import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  // Topic: Error Handling in Form Actions 🍕
  const navigation = useNavigation();
  // console.log(navigation); // submitting -> loading -> idle
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData(); // 💥

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart; // This cart will come from Redux

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
          <input className="input grow" type="text" name="customer" required />
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

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              //  Topic: Styling Form Elements
              // Topic: Reusing Styles With @apply (2)
              // (1) in index.css
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            //  Topic: Styling Form Elements
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* 🍔 */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* 🍕 */}
          {/* Topic: Styling Buttons: Element States and Transitions */}
          {/* active:bg-slate-400 */}
          {/* Topic: Reusing Styles With React Components (2) */}
          <Button type="primary">
            {isSubmitting ? 'Placing order..' : 'Order now'}
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
    priority: data.priority === 'on',
  };
  console.log(order);

  // 🍕
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might to contact you.';

  if (Object.keys(errors).length > 0) return errors; // 💥

  // If everything is okay, create order and redirect
  // const newOrder = await createOrder(order); // return data

  // Cannot use navigate from useNavigate() bcs it is a hook
  // return redirect(`/order/${newOrder.id}`);

  return null;
}

export default CreateOrder;
