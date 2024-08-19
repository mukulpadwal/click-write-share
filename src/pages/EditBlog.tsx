import { useEffect, useState } from "react";
import { Container, BlogForm } from "../components";
import databaseService from "../appwrite/database";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderPinwheel } from "lucide-react";

function EditBlog() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseService
        .getBlog(slug)
        .then((post: any) => {
          if (post) {
            setPost(post);
          }
        })
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return loading ? (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <LoaderPinwheel className="h-20 w-20 animate animate-spin text-[#AC3B61]" />
      </div>
    </div>
  ) : (
    <div>
      <Container>
        <BlogForm blog={post} />
      </Container>
    </div>
  );
}

export default EditBlog;
