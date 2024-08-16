import { useEffect, useState } from "react";
import databaseService from "../appwrite/database";
import { Container, PostCard } from "../components";
import { LoaderPinwheel } from "lucide-react";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    databaseService
      .getBlogs([])
      .then((posts: any) => {
        if (posts.total > 0) {
          setPosts(posts.documents);
        }
      })
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
        <div className="w-auto">
          <Container className="flex flex-wrap">
            {posts.map((post: any) => (
              <div key={post?.$id} className="p-2 w-full md:w-1/4">
                <PostCard
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

export default AllPosts;
