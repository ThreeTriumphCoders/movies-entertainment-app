import { getIconByName, IconName } from "~/utils/getIconByName";
import { Loader } from "./Loader";
import { SvgIcon } from "./SvgIcon";

type Props = {
  trailerKey: string;
  onClose: () => void;
}

export const MovieTrailerPopup = ({
  trailerKey,
  onClose,
}: Props) => (
  <div 
    className="
      absolute top-0 bottom-0 left-0 right-0 
    bg-dark bg-opacity-75
      flex items-center justify-center p-4 sm:p-20 lg:p-40
    "
    onClick={onClose}
  >
    <button
      className="absolute top-4 right-4"
    >
      <SvgIcon className="w-8 h-8 fill-light" viewBox="0 0 30 30">
        {getIconByName(IconName.CLOSE)}
      </SvgIcon>
    </button>

    <div className="relative w-full pt-[56.25%]">
      <Loader />

      <iframe
        className="absolute h-full w-full top-0"
        src={`https://www.youtube.com/embed/${trailerKey}?showinfo=0&autoplay=1&controls=0&enablejsapi=1&modestbranding=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  </div>
)