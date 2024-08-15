import { useEffect, useState } from "react";
import databaseService from "../appwrite/database";
import { Container, Logo, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state?.auth.isLoggedIn);

  useEffect(() => {
    databaseService.getBlogs().then((posts) => {
      if (posts) {
        setPosts(posts?.documents);
      }
    });
  }, []);

  if (!authStatus) {
    return (
      <div className="w-auto h-screen">
        <Container className="w-auto h-full flex justify-center items-center">
          <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-14">
            <div className="w-auto h-auto">
              <Logo className="w-48 sm:w-64 lg:w-96" />
            </div>
            <div className="w-auto flex flex-col justify-center items-center gap-2">
              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold">Click Write Share</h1>
              <h2 className="text-lg lg:text-2xl italic font-semibold">
                From blank page to the world
              </h2>
              <Link
                to={"/login"}
                className="w-full lg:w-1/2 font-normal text-center text-white rounded-xl bg-[#AC3B61] hover:bg-inherit hover:text-black hover:border hover:border-[#AC3B61] py-2 px-2"
              >
                Start Writing...
              </Link>
              <span>
                <strong>Warning:</strong> May cause blog addiction
              </span>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    if (posts.length === 0) {
      return (
        <Container className="min-w-full min-h-screen flex flex-row items-center justify-center">
          <div className="w-full flex flex-wrap flex-col sm:flex-row justify-around items-center">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold">No posts to show...</h1>
            </div>
          </div>
        </Container>
      );
    } else {
      return (
        <div className="w-full py-8">
          <Container>
            <div className="flex-flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
    }
  }
}

export default Home;
