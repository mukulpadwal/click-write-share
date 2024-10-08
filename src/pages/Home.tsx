import { useEffect, useState } from "react";
import { Container, Logo, BlogCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoaderPinwheel } from "lucide-react";
import databaseService from "../appwrite/database";

function Home() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state: any) => state.auth.isLoggedIn);
  const authData = useSelector((state: any) => state.auth.userData);

  useEffect(() => {
    databaseService
      .getBlogs()
      .then((blogs: any) => {
        if (blogs.documents.length > 0) {
          const filteredBlogs = blogs.documents.filter(
            (blog: any) => blog.userId === authData.userId
          );
          setUserBlogs(filteredBlogs);
        }
      })
      .catch((error: any) => {
        console.error(error.message);
      })
      .finally(() => setLoading(false));
  }, [authData]);

  return authStatus ? (
    loading ? (
      <div className="border min-w-screen min-h-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <LoaderPinwheel className="h-20 w-20 animate animate-spin text-[#AC3B61]" />
        </div>
      </div>
    ) : userBlogs.length === 0 ? (
      <Container className="min-w-full min-h-screen flex flex-row items-center justify-center">
        <div className="w-full flex flex-wrap flex-col sm:flex-row justify-around items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">No blogs to show...</h1>
          </div>
        </div>
      </Container>
    ) : (
      <div className="w-auto h-full m-4 p-2 flex flex-col justify-center items-center gap-2">
        <h1 className="w-auto text-center text-xl sm:text-3xl font-bold">
          Welcome{" "}
          <span className="underline underline-offset-2">
            {authData.providerUid}
          </span>
          !!!
        </h1>
        <h2 className="w-auto text-center text-lg sm:text-2xl font-semibold">
          Your Blogs
        </h2>
        <Container className="rounded-xl my-4 w-auto flex flex-wrap flex-row justify-center items-start gap-4">
          {userBlogs?.map((post: any) => (
            <div key={post.$id} className="w-80">
              <BlogCard
                $id={post?.$id}
                title={post?.title}
                featuredImage={post?.thumbnail}
              />
            </div>
          ))}
        </Container>
      </div>
    )
  ) : (
    <div className="w-auto h-screen">
      <Container className="w-auto h-full flex justify-center items-center">
        <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-14">
          <div className="w-auto h-auto">
            <Logo className="w-48 sm:w-64 lg:w-96" />
          </div>
          <div className="w-auto flex flex-col justify-center items-center gap-2">
            <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold">
              Click Write Share
            </h1>
            <h2 className="text-lg lg:text-2xl italic font-semibold">
              From blank page to the world
            </h2>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <Link
                to={"/login"}
                className="w-full lg:w-1/2 font-medium text-center text-white rounded-xl bg-[#AC3B61] py-2 px-2"
              >
                Start Writing...
              </Link>
              <Link
                to={"/all-blogs"}
                className="w-full lg:w-1/2 font-medium text-center text-black rounded-xl border border-[#AC3B61] py-2 px-2"
              >
                Read...
              </Link>
            </div>

            <span>
              <strong>Warning:</strong> May cause blog addiction
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
