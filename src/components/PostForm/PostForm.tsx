import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RTE, Input } from "../";
import databaseService from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import storageService from "../../appwrite/storage";

function PostForm({ post }: { post?: any }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || true,
        image: post?.thumbnailImage || "",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state: any) => state?.auth?.userData);

  const handleBlogSubmit = async (data: any) => {
    if (post) {
      const thumbnail = data.image[0]
        ? await storageService.uploadThumbnail(data.image[0])
        : null;

      if (thumbnail) {
        await storageService.deleteThumbnail(post.thumbnail);
      }

      const dbPost = await databaseService.editBlog(post.$id, {
        ...data,
        thumbnail: thumbnail ? thumbnail.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const thumbnail = data.image[0]
        ? await storageService.uploadThumbnail(data.image[0])
        : null;

      if (thumbnail) {
        const thumbnailId = thumbnail.$id;
        data.thumbnail = thumbnailId;

        const dbPost: any = await databaseService.createBlog(data.slug, {
          ...data,
          userId: userData.$id,
        });

        if (dbPost !== undefined) {
          navigate(`/post/${dbPost?.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value) {
      return value.trim().toLowerCase().replace(/[\s]+/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(handleBlogSubmit)}
      className="w-auto h-screen flex flex-col md:flex-row flex-wrap px-3"
    >
      <div className="w-full md:w-2/3 px-3">
        <Input
          label="Title : "
          type="text"
          placeholder="Blog Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug : "
          className="mb-4"
          type="text"
          onInput={(e: any) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
          {...register("slug", { required: true })}
        />
      </div>
      <div className="w-full md:w-1/3 px-3">
        <Input
          label="Thumbnail"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && <div></div>}
      </div>
      <div className="w-full px-3">
        <RTE
          label="Content : "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
    </form>
  );
}

export default PostForm;
