import { useEffect, useState } from "react";
import { Container, BlogCard } from "../components";
import { LoaderPinwheel } from "lucide-react";
import databaseService from "../appwrite/database";

function AllBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<[]>([]);

  useEffect(() => {
    databaseService
      .getBlogs()
      .then((blogs: any) => setBlogs(blogs.documents))
      .catch((error) => console.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className="border min-w-screen min-h-screen flex justify-center items-center">
          <div className="flex justify-center items-center">
            <LoaderPinwheel className="h-20 w-20 animate animate-spin text-[#AC3B61]" />
          </div>
        </div>
      ) : (
        <>
          {blogs.length === 0 ? (
            <Container className="min-w-full min-h-screen flex flex-row items-center justify-center">
              <div className="w-full flex flex-wrap flex-col sm:flex-row justify-around items-center">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-3xl font-bold">No blogs to show...</h1>
                </div>
              </div>
            </Container>
          ) : (
            <div className="w-auto h-full m-4 p-2 flex flex-col justify-center items-center gap-2">
              <h1 className="w-auto text-center text-2xl sm:text-3xl font-bold">
                All Blogs
              </h1>
              <Container className="rounded-xl my-4 w-auto flex flex-wrap flex-row justify-center items-start gap-4">
                {blogs?.map((post: any) => (
                  <div key={post?.$id} className="w-80">
                    <BlogCard
                      $id={post?.$id}
                      title={post?.title}
                      featuredImage={post?.thumbnail}
                    />
                  </div>
                ))}
              </Container>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AllBlogs;
