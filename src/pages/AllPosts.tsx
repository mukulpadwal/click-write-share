import { useEffect, useState } from "react";
import databaseService from "../appwrite/database";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseService.getBlogs([]).then((posts: any) => {
      if (posts) {
        setPosts(posts?.documents);
      }
    });
  }, []);

  return (
    <div>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post: any) => (
            <div key={post?.$id} className="p-2 w-1/4">
              <PostCard
                $id={post?.$id}
                title={post?.title}
                featuredImage={post?.thumbnail}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
