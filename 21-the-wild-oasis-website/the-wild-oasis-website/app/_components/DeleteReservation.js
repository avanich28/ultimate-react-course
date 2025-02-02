// Topic: Deleting a Reservation
"use client"; // NOTE onClick needs JS, so this code needs to be run on client. That's why, we cannot declare server action.

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  // Topic: Deleting a Reservation
  // function deleteReservation() {
  //   "use server"; // NOTE We don't surely know whether this component is an server or client component. So, we need to make sure that this server action is an server component
  //   // code
  // }

  // Topic: Another Loading Indicator: The useTransition Hook
  // NOTE This button is not in the form, so we need to use useTransition instead of useFormStatus.
  // useTransition allows us to mark a state update as a transition without blocking the UI or stay responsive during re-render and also get an indication that a state transition is happening.
  // In Next.js, we can use this hook to mark a server action as a transition too.
  // In Next.js, all navigation are wrapped into transitions automatically.
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      // startTransition(() => deleteReservation(bookingId));
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      // Topic: Deleting a Reservation
      // onClick={() => deleteReservation(bookingId)}
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
