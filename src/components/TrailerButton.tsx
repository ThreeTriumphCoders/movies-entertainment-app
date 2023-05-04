import { IconName, getIconByName } from "~/utils/getIconByName";
import { SvgIcon } from "./SvgIcon";
import { FC } from "react";

type Props = {
  handlePopup: () => void;
}

export const TrailerButton: FC<Props> = ({ handlePopup }) => {
  return (
    <button
      className="
        text-md relative flex h-10 w-full items-center justify-center gap-2
        rounded-lg  bg-[#ff0000] text-light transition hover:bg-semi-dark
        sm:w-[48%] lg:w-full 
        xl:w-[48%]
        "
      onClick={handlePopup}
    >
      <SvgIcon className="h-7 w-7 fill-light" viewBox="0 0 32 32">
        {getIconByName(IconName.YT)}
      </SvgIcon>
      Watch&nbsp;trailer
    </button>
  );
}