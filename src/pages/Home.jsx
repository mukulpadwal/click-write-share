import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    databaseService
      .getPosts()
      .then((response) => {
        setPosts(response.documents);
        setLoader(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (authStatus === false) {
    return (
      <div className="h-screen w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap justify-center items-center">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (
    authStatus &&
    posts.filter((post) => post.userId === userData?.$id).length === 0
  ) {
    return loader ? (
      <div className="h-screen w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts found! Kindly add some posts.
              </h1>
            </div>
          </div>
        </Container>
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }

  return loader ? (
    <div className="h-screen w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts
            .filter((post) => post.userId === userData?.$id)
            .map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Home;
