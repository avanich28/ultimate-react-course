import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    // Topic: Working With Color
    // Topic: Styling text
    // tracking-[5px]
    // Topic: The Box Model: Spacing, Borders, and Display
    // Topic: Using Flexbox
    <header className="font-pizza flex items-center justify-between border-b border-stone-500 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      {/* Topic: Fetching Orders (2) */}
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
