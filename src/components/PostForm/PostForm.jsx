import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import databaseService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  if (post) {
    var { title, content, $id, featuredImage } = post;
  }

  const { register, handleSubmit, watch, setValue, control } = useForm();

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      // update
      const file = data.image[0]
        ? databaseService.uploadFile(data.image[0])
        : false;

      if (file) {
        databaseService
          .deleteFile(featuredImage)
          .then((response) => {
            console.log("file uploaded", response);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }

      const dbPost = await databaseService.updatePost($id, {
        featuredImage: file ? file.$id : undefined,
        ...data,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // create
      const file = await databaseService.uploadFile(data.image[0]);
      //TODO: handle error

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          defaultValue={title || ""}
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          defaultValue={$id || ""}
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          defaultValue={content || ""}
          label="Content :"
          name="content"
          className="mb-4"
          control={control}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: featuredImage ? "false" : "true" })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={databaseService.getFilePreview(featuredImage || "")}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
