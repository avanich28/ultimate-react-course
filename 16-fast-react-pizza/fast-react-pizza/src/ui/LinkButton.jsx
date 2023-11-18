import { Link, useNavigate } from 'react-router-dom';

// Topic: Reusing Styles With React Components
function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    // Topic: Styling Buttons: Element States and Transitions
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
