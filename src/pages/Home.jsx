import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    databaseService
      .getPosts([])
      .then((response) => {
        console.log(response);
        if (response) {
          const filteredPosts = response.documents.filter((post) => {
            return post.userId === userData?.$id;
          });
          setPosts(filteredPosts);
        }
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
  } else if (posts.length === 0) {
    return (
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
    );
  }

  return (
    <div className="h-screen w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
};

export default Home;
