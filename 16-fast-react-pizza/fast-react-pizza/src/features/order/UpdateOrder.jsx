import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

// Topic: Updating Data Without Navigation (1)
// (2) in Order.jsx
// (3) in App.js
function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // Both submit the form
    // <Form>Navigate away</Form>
    // <fetcher.Form>Not navigate away, but revalidate the page</fetcher.Form>
    <fetcher.Form method="PATCH" className="text-right">
      {/* Can also put the <input /> */}
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// NOTE Re-validation means that React Router knows that the data has changed as a result of this action. When there is sth happens, it will automatically re-fetch the data in the background and the re-render the page with that new data. That is was so helpful about this fetcher.Form> (update data without causing navigation)
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
