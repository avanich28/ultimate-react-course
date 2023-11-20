import { useSelector } from 'react-redux';

function Username() {
  // Topic: Modeling the 'User' State With Redux Toolkit (2)
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  // Topic: The Box Model: Spacing, Borders, and Display - hidden
  // Topic: Using Flexbox -> md:block
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
