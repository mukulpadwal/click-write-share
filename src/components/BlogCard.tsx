import storageService from "../appwrite/storage";
import { Link } from "react-router-dom";
import { ShareButton } from "./";
import conf from "../conf/conf";

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
    <div className="w-auto h-full bg-[#EEE2DC] rounded-xl p-4 flex flex-col justify-between gap-2">
      <Link to={`/blog/${$id}`}>
        <div>
          <div className="w-full min-h-60 sm:min-h-80 border border-[#AC3B61]/50 mb-4 rounded-xl flex flex-row justify-center items-center">
            <img
              src={storageService
                .previewThumbnail({ fileId: featuredImage })
                .toString()}
              alt={title}
              className="rounded-xl bg-current max-h-60 sm:max-h-80 text-center"
            />
          </div>
          <h3 className="text-xl font-bold text-center">{title}</h3>
        </div>
      </Link>
      <ShareButton shareUrl={`${conf.developmentURL || conf.productionURL}/blog/${$id}`} />
    </div>
  );
}

export default BlogCard;
