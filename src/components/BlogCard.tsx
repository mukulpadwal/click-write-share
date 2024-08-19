import storageService from "../appwrite/storage";
import { Link } from "react-router-dom";

function BlogCard({
  $id,
  title,
  featuredImage,
}: {
  $id?: string;
  title?: string;
  featuredImage?: any;
}) {
  return (
    <Link to={`/blog/${$id}`}>
      <div className="w-auto h-full bg-[#EEE2DC] rounded-xl p-4 flex flex-col justify-between">
        <div className="w-full min-h-60 sm:min-h-80 border border-[#AC3B61]/50 mb-4 rounded-xl flex flex-row justify-center items-center">
          <img
            src={storageService
              .previewThumbnail({ fileId: featuredImage })
              .toString()}
            alt={title}
            className="rounded-xl bg-current max-h-60 sm:max-h-80 text-center"
          />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
    </Link>
  );
}

export default BlogCard;
