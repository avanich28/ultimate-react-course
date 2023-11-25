// Topic: Connecting Supabase With Our React App

import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// Topic: Creating a New Cabin (1)
// (2) in CreateCabinForm.jsx
// Topic: Updating Images to Supabase (2) 🍰
export async function createEditCabin(newCabin, id) {
  // Topic: Editing a Cabin (3) 🌶
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    // If superbase found any slash, it will create folder based on that.
    "/",
    ""
  );

  // NOTE path to bucket itself and unique cabin name
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://sycmhowhjburigblhtbn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create/edit cabin 🌶
  let query = supabase.from("cabins");
  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  // eq = equal operation
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  // NOTE .select().single() - return newly create obj (if don't put this, it will return empty data!);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data; // 🌶

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // File {name: 'cabin-004.jpg', lastModified: 1693995377857, lastModifiedDate: Wed Sep 06 2023 17:16:17 GMT+0700 (Indochina Time), webkitRelativePath: '', size: 250312, …}

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

// Topic: Mutations: Deleting a Cabin (1)
// (2) in CabinRow.jsx
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
