import { useEffect, useState } from "react";
import { Container, BlogCard } from "../components";
import { LoaderPinwheel } from "lucide-react";
import { useSelector } from "react-redux";

function AllBlogs() {
  const [loading, setLoading] = useState(true);
  const blogs = useSelector((state: any) => state.blog.blogs);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
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
        <div className="w-auto h-full m-4 p-2 flex flex-col justify-center items-center gap-2">
          <h1 className="w-auto text-center text-2xl sm:text-3xl font-bold">
            All Blogs
          </h1>
          <Container className="rounded-xl my-4 w-auto flex flex-wrap flex-row justify-center items-start gap-4">
            {blogs.map((post: any) => (
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
  );
}

export default AllBlogs;
