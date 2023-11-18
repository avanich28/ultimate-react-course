import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    // Topic: The Box Model: Spacing, Borders, and Display -> space-x-4
    // Topic: Responsive Design
    //sm:px-6
    // Change p-4 to px-4 py-4 for overriding
    // Topic: Using Flexbox
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
