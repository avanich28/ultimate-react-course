import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

// Topic: Deleting Cart Items (1)
// (2) in CartItem.jsx
// (3) in MenuItem.jsx
// (4) in cartSlice.jsx
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
