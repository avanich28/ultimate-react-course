"use client";

import { useState } from "react";
import { updateGuest } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

// Topic: Advanced: Server Components in Client Components
function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState();

  // Topic: Updating the Profile Using a Server Action
  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  // Topic: Displaying a Loading Indicator: The useFormStatus Hook
  // NOTE IMPT So in this situation, if the hook was here, it wouldn't know about the status of this form whether it is currently submitting or doing some asynchronous work or not.
  // useFormStatus();

  return (
    <form
      // NOTE Server action can use inside form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      {/* Topic: Manual Cache Revalidation */}
      {/* BUG Old stale data still be shown or still in the browser cache -> We need to revalidate the cache or clear the cache */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        {/* IMPT When using useFormStatus hook, it need to be render inside the form */}
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

// Topic: Displaying a Loading Indicator: The useFormStatus Hook
// IMPT Need to be render inside the form
// This useFormStatus hook always needs to be inside client component
// function Button() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
//       disabled={pending}
//     >
//       {pending ? "Updating..." : "Update profile"}
//     </button>
//   );
// }

export default UpdateProfileForm;
