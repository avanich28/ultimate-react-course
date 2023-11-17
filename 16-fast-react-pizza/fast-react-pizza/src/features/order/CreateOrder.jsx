import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // Topic: Error Handling in Form Actions 🍕
  const navigation = useNavigation();
  // console.log(navigation); // submitting -> loading -> idle
  const isSubmitting = navigation.state === "submitting";

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
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {/* 🍕 */}
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* 🍔 */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* 🍕 */}
          <button disabled={isSubmitting}>
            {isSubmitting ? "Placing order.." : "Order now"}
          </button>
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
    priority: data.priority === "on",
  };
  console.log(order);

  // 🍕
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might to contact you.";

  if (Object.keys(errors).length > 0) return errors; // 💥

  // If everything is okay, create order and redirect
  const newOrder = await createOrder(order); // return data

  // Cannot use navigate from useNavigate() bcs it is a hook
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
