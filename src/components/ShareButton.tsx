import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

function ShareButton({ shareUrl }: { shareUrl: string }) {
  return (
    <div className="flex flex-row flex-wrap justify-start items-center gap-2 p-1">
      <EmailShareButton url={shareUrl}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <RedditShareButton url={shareUrl}>
        <RedditIcon size={32} round={true} />
      </RedditShareButton>
      <TelegramShareButton url={shareUrl}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton url={shareUrl}>
        <XIcon size={32} round={true} />
      </TwitterShareButton>
    </div>
  );
}

export default ShareButton;
