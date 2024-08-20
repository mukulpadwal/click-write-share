import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RTE, Input, Select, Button } from "..";
import databaseService from "../../appwrite/database";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import storageService from "../../appwrite/storage";
import { Eye, Loader2 } from "lucide-react";
import { addBlog } from "../../store/blogSlice";
import toast from "react-hot-toast";

function BlogForm({ blog }: { blog?: any }) {
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: blog?.title || "",
        slug: blog?.$id || "",
        content: blog?.content || "",
        published: blog?.published || true,
        thumbnail: blog?.thumbnail || "",
      },
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.userData);

  const handleBlogSubmit = async (data: any) => {
    setSubmitting(true);

    try {
      if (validateData(data)) {
        if (blog !== undefined) {
          // Case 1 : The user wants to edit the current Blog
          let thumbnail = undefined;
          if (typeof data.thumbnail === "object") {
            thumbnail = data?.thumbnail[0]
              ? await storageService.uploadThumbnail({
                  file: data.thumbnail[0],
                })
              : null;

            if (thumbnail) {
              await storageService.deleteThumbnail({ fileId: blog.thumbnail });
            }
          }

          const editedBlog = await databaseService.editBlog(blog.$id, {
            ...data,
            published: Boolean(data.published),
            thumbnail: thumbnail ? thumbnail.$id : data.thumbnail,
          });

          if (editedBlog !== undefined) {
            navigate(`/blog/${editedBlog.$id}`);
          }
        } else {
          // Case 2 : The user is creating a new blog
          const thumbnail = data.thumbnail[0]
            ? await storageService.uploadThumbnail({ file: data.thumbnail[0] })
            : null;

          if (thumbnail) {
            const thumbnailId = thumbnail.$id;
            data.thumbnail = thumbnailId;

            const newBlog: any = await databaseService.createBlog(data.slug, {
              ...data,
              published: Boolean(data.published),
              userId: userData.userId,
            });

            if (newBlog !== undefined) {
              dispatch(addBlog({ blog: newBlog }));
              navigate(`/blog/${newBlog?.$id}`);
            }
          }
        }
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const validateData = (data: any) => {
    const { title, published, thumbnail, content } = data;
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9._\- ]{0,35}$/;
    if (regex.test(title) === false) {
      toast.error(
        "Valid chars for title are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char..."
      );
      return false;
    } else if (published === undefined) {
      toast.error(
        "Make sure that the published status is selected to wither true or false..."
      );
      return false;
    } else if (thumbnail === undefined) {
      toast.error("Kindly upload a valid thumbnail...");
      return false;
    } else if (content.length > 20000) {
      toast.error(
        `Make sure that length of content is equal to or less than 20000 characters... Current length ${content.length}`
      );
      return false;
    }

    return true;
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
      className="w-auto h-auto m-2 p-2"
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
            <div className="w-full flex flex-col sm:flex-row sm:justify-center sm:items-end gap-4 sm:gap-1">
              <Input
                label="Thumbnail* : "
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("thumbnail", { required: !blog })}
              />
              {blog && (
                <div className="w-full sm:w-2/12 lg:w-1/12 flex flex-row justify-center items-center">
                  <div className="sm:hidden">
                    <img
                      src={storageService
                        .previewThumbnail({ fileId: blog.thumbnail })
                        .toString()}
                      alt={blog.title}
                    />
                  </div>
                  <div className="hidden sm:block" title="Preview Thumbnail...">
                    <Link
                      to={storageService
                        .previewThumbnail({ fileId: blog.thumbnail })
                        .toString()}
                      target="_blank"
                    >
                      <Eye className="h-10 w-10 text-[#AC3B61]" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
          <Button
            type="submit"
            bgColor="bg-[#AC3B61]"
            className="w-full"
            disabled={submitting}
          >
            {blog ? (
              <>
                {submitting ? (
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Loader2 className="animate animate-spin h-5 w-5" />
                    Updating...
                  </div>
                ) : (
                  "Update"
                )}
              </>
            ) : (
              <>
                {submitting ? (
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Loader2 className="animate animate-spin h-5 w-5" />
                    Publishing...
                  </div>
                ) : (
                  "Publish"
                )}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default BlogForm;
