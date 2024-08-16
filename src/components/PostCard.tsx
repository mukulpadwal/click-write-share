import storageService from "../appwrite/storage";
import { Link } from "react-router-dom";

function PostCard({
  $id,
  title,
  featuredImage,
}: {
  $id?: string;
  title?: string;
  featuredImage?: any;
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={storageService
              .previewThumbnail({ fileId: featuredImage })
              .toString()}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
