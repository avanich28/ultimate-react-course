"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

// Topic: Updating the Profile Using a Server Action
export async function updateGuest(formData) {
  // console.log(formData);
  const session = await auth();
  // NOTE In server action, we try not to use try-catch declaration.
  if (!session) throw new Error("You must be logged in"); // Show in error boundary

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };
  // console.log(updateData);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // Topic: Manual Cache Revalidation
  // NOTE There are 2 types to revalidate the cache
  // 1. time-based revalidation
  // 2. manual on-demand validation
  revalidatePath("/account/profile");
}

// Topic: Creating a New Reservation
export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { data, error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

// Topic: Deleting a Reservation
export async function deleteBooking(bookingId) {
  // For testing
  // await new Promise((res) => setTimeout(res, 2000));
  // throw new Error(); // NOTE The deleted element will be back in the UI again if it has an error.

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // NOTE Protect hacking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking.");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

// Topic: CHALLENGE #1: Updating a Reservation
export async function updateBooking(formData) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must logged in");

  // 2) Authorization
  const bookingId = Number(formData.get("bookingId"));

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking.");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error Handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  // BUG Solve cache problem
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

// Topic: Building a Custom Sign In Page
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

// Topic: Building a Custom Sign Out Button
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
