import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    // Topic: Responsive Design
    // @media (min-width: 64opx) {...}
    // Tailwind looks for mobile first or my-10.
    // If width is greater than 640px, my-10 will be my-16.
    <div className="my-10 px-4 text-center sm:my-16">
      {/* Topic: The Box Model: Spacing, Borders, and Display */}
      {/* text-[300px] */}
      {/* Topic: Using Flexbox -> md:text-3xl */}
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      <CreateUser />
    </div>
  );
}

export default Home;
