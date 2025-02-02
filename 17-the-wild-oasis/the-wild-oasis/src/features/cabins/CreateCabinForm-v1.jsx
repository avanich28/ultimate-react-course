import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  // Topic: Introducing Another Library: React Hook Form (2)
  // npm i react-hook-form@7
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // Topic: Handling Form Errors (1)
  // (2) in FormRow.jsx
  const { errors } = formState;
  console.log(errors);

  // Topic: Creating a New Cabin (2)
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    // or (newCabin) => createCabin(newCabin)
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset(); // reset form
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    console.log(data.image[0]);
    // Topic: Updating Images to Supabase (1) 🍰
    // (2) in apiCabins.jsx
    mutate({ ...data, image: data.image[0] }); // cannot use .at(0) bcs it is a fileList, not an array
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    // NOTE If there is an error from 'required' in register, handleSubmit will call second function.
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        {/* store 'register' inside the element */}
        {/* NOTE Normally, we need to add useState, value and onChange attribute! */}
        {/* Topic: Handling Form Errors */}
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            // Discount value must not be greater than regular price.
            // NOTE getValues() => get values from entire form
            validate: (value) =>
              value <= +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          // 🍰
          // type="file" NOTE can set this attribute in css style component! (FileInput.jsx)
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
