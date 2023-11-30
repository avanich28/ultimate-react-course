import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        {/* Topic: API-Side Filtering: Filtering Bookings (1) */}
        <BookingTableOperations />
      </Row>

      {/* Topic: Building the Bookings Table (2) */}
      <BookingTable />
    </>
  );
}

export default Bookings;
