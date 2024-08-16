import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RTE, Input, Select, Button } from "../";
import databaseService from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import storageService from "../../appwrite/storage";

function PostForm({ blog }: { blog?: any }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: blog?.title || "",
        slug: blog?.slug || "",
        content: blog?.content || "",
        published: blog?.published || true,
        thumbnail: blog?.thumbnail || "",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state: any) => state?.auth?.userData);

  const handleBlogSubmit = async (data: any) => {
    // Here we have 2 cases
    if (blog !== undefined) {
      // Case 1 : The user wants to edit the current Blog
      const thumbnail = data.thumbnail[0]
        ? await storageService.uploadThumbnail({ file: data.thumbnail[0] })
        : null;

      if (thumbnail) {
        await storageService.deleteThumbnail(blog.thumbnail);
      }

      const dbPost = await databaseService.editBlog(blog.$id, {
        ...data,
        published: Boolean(data.published),
        thumbnail: thumbnail ? thumbnail.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // Case 2 : The user is creating a new blog
      const thumbnail = data.thumbnail[0]
        ? await storageService.uploadThumbnail({ file: data.thumbnail[0] })
        : null;

      if (thumbnail) {
        const thumbnailId = thumbnail.$id;
        data.thumbnail = thumbnailId;

        const dbPost: any = await databaseService.createBlog(data.slug, {
          ...data,
          published: Boolean(data.published),
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
      className="w-auto h-auto mx-3"
    >
      <div className="w-auto flex flex-col gap-4">
        <div className="w-auto flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="w-full flex flex-col justify-center items-center gap-4 h-auto px-3">
            <Input
              label="Title : "
              type="text"
              placeholder="Blog Title"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug : "
              type="text"
              onInput={(e: any) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
              disabled
              {...register("slug", { required: true })}
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-4 h-auto px-3">
            <Input
              label="Thumbnail : "
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("thumbnail", { required: !blog })}
            />
            {blog && (
              <div>
                <img
                  src={storageService
                    .previewThumbnail(blog.thumbnail)
                    .toString()}
                  alt={blog.title}
                />
              </div>
            )}
            <Select
              options={["true", "false"]}
              label="Published Status : "
              {...register("published", { required: true })}
            />
          </div>
        </div>

        <div className="w-full px-3">
          <RTE
            label="Content : "
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-full px-3 text-center my-2">
          <Button type="submit" bgColor="bg-[#AC3B61]" className="w-full">
            {blog ? "Update" : "Publish"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
