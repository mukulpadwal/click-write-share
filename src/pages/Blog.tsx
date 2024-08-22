import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import { Loader2, LoaderPinwheel } from "lucide-react";
import { Button, Container, ShareButton } from "../components";
import storageService from "../appwrite/storage";
import parse from "html-react-parser";
import conf from "../conf/conf";

function Blog() {
  const [post, setPost] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state: any) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.userId : false;

  useEffect(() => {
    if (slug) {
      databaseService
        .getBlog(slug)
        .then((response) => setPost(response))
        .catch((error) => console.error(error.message))
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const handleDeletePost = async () => {
    setDeleting(true);
    databaseService
      .deleteBlog(post.$id)
      .then((status) => {
        if (status) {
          storageService.deleteThumbnail({ fileId: post.thumbnail });
          navigate("/");
        }
      })
      .catch((error) => console.error(error.message))
      .finally(() => setDeleting(false));
  };

  return loading ? (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <LoaderPinwheel className="h-20 w-20 animate animate-spin text-[#AC3B61]" />
      </div>
    </div>
  ) : (
    <div>
      <Container className="relative w-auto h-full flex flex-col items-center justify-center gap-4 p-4">
        <div className="relative w-full flex flex-col items-center justify-center gap-2">
          {isAuthor && (
            <div className="w-full md:w-auto flex flex-row items-center justify-center gap-2 md:absolute md:top-0 md:right-0">
              <Link className="w-1/2 md:w-auto" to={`/edit-blog/${post.$id}`}>
                <Button bgColor="w-full md:w-auto bg-green-500">Edit</Button>
              </Link>
              <Button
                className="w-1/2 md:w-auto text-center "
                bgColor={`${loading ? "bg-red-200" : "bg-red-500"}`}
                onClick={handleDeletePost}
                disabled={deleting}
              >
                {deleting ? (
                  <div className="flex flex-row justify-center items-center gap-1">
                    <Loader2 className="w-5 h-5 animate-spin" /> Deleting...
                  </div>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          )}

          <img
            src={storageService
              .previewThumbnail({ fileId: post.thumbnail })
              .toString()}
            alt={post.title}
            className="rounded-xl w-auto"
          />
        </div>
        <div className="p-4 w-full flex flex-col justify-center items-start gap-4">
          <h1 className="text-3xl md:text-5xl font-bold">{post.title}</h1>
          <p className="w-auto">{parse(post.content)}</p>
        </div>
        <ShareButton
          shareUrl={`${conf.productionURL}/blog/${slug}`}
        />
      </Container>
    </div>
  );
}

export default Blog;
