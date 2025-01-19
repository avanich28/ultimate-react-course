"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

// Topic: Removing Reservations Immediately: The useOptimistic Hook
function ReservationList({ bookings }) {
  // NOTE Optimistic because we assume that a certain asynchronous operation will be successful before it even finished
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);

      // Adding
      // [...curBookings, newBooking]
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId); // Remove from the UI immediately before the successful
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {/* {bookings.map((booking) => ( */}
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
