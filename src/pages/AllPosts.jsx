import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/config";
import { Container, PostCard } from "../components";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    databaseService
      .getPosts([])
      .then((response) => {
        if (response) {
          setPosts(response.documents);
          setLoader(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (posts.length === 0) {
    return loader ? (
      <div className="w-full py-8 mt-4 text-center">
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
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts
            .filter((post) => post.status === "active")
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

export default AllPosts;
