"use client";
import RHFTextField from "@/ui/RHFTextField";
import RHFSelect from "@/ui/RHFSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useCategories } from "@/hooks/useCategories";
import FileInput from "@/ui/FileInput";
import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonIcon from "@/ui/ButtonIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/ui/Button";
import useCreatePost from "./useCreatePost";
import SpinnerMini from "@/ui/SpinnerMini";
import { useRouter } from "next/navigation";
import useEditPost from "./useEditPost";
import { imageUrlToFile } from "@/utils/fileFormatter";

const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),
  })
  .required();
export default function CreatePostForm({ postToEdit = {} }) {
  const {
    _id: editId,
    title,
    text,
    slug,
    briefText,
    readingTime,
    category,
    coverImage,
    coverImageUrl: defaultCoverImageUrl,
  } = postToEdit;
  const [coverImageUrl, setCoverImageUrl] = useState(
    defaultCoverImageUrl || null,
  );
  const { categories } = useCategories();
  const { createPost, isCreating } = useCreatePost();
  const { editPost, isEditing } = useEditPost();
  const router = useRouter();
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: editId
      ? {
          title,
          text,
          slug,
          briefText,
          readingTime,
          category: category._id,
          coverImage,
        }
      : {},
  });

  useEffect(() => {
    if (defaultCoverImageUrl) {
      // convert preve link to file
      async function fetchMyApi() {
        const file = await imageUrlToFile(defaultCoverImageUrl);
        setValue("coverImage", file);
      }
      fetchMyApi();
    }
  }, [editId, defaultCoverImageUrl, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (Boolean(editId)) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts");
          },
        },
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
        },
      });
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name="title"
        label="عنوان"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name="briefText"
        label="متن کوتاه"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name="text"
        label="متن"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name="slug"
        label="اسلاگ"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name="readingTime"
        label="زمان مطالعه"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFSelect
        name="category"
        label="دسته بندی"
        errors={errors}
        register={register}
        isRequired
        options={categories}
      />
      <Controller
        name="coverImage"
        control={control}
        rules={{ required: "کاور پست الزامی است" }}
        render={({ field: { value, onChange, ...rest } }) => {
          return (
            <FileInput
              type="file"
              label="کاور پست"
              name="coverImage"
              isRequired
              errors={errors}
              {...rest}
              value={value?.fileName}
              onChange={(event) => {
                const file = event.target.files[0];
                onChange(file);
                setCoverImageUrl(URL.createObjectURL(file));
                event.target.value = null;
              }}
            />
          );
        }}
      />
      {coverImageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            fill
            alt="cover-image"
            src={coverImageUrl}
            className="object-cover object-center"
          />
          <ButtonIcon
            onClick={() => {
              setCoverImageUrl(null);
              setValue("coverImage", null);
            }}
            variant="red"
            className="w-6 h-6 absolute left-0"
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}
      <div>
        {isCreating || isEditing ? (
          <SpinnerMini />
        ) : (
          <Button variant="primary" type="submit" className="w-full">
            تایید
          </Button>
        )}
      </div>
    </form>
  );
}
