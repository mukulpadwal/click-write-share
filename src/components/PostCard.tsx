import { useEffect, useState } from "react";
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
  const [thumbnailSrc, setThumbnailSrc] = useState<any>();
  useEffect(() => {
    const src: URL = storageService.previewThumbnail(featuredImage);
    if (src) {
      setThumbnailSrc(src);
    }
  }, [featuredImage]);
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={thumbnailSrc} alt={title} className="rounded-xl" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
