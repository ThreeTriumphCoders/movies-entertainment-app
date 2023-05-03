import classNames from "classnames";
import { SvgIcon } from "./SvgIcon";
import { useThemeContext } from "~/utils/ThemeContext";
import { ThemeType } from "~/types/ThemeType";
import { IconName, getIconByName } from "~/utils/getIconByName";
import { FC } from "react";

const separator = (
  <p className="-translate-y-1/4 select-none font-semibold opacity-60">.</p>
);

type Props = {
  year: string;
  type: string;
  icon: IconName;
}

export const InfoCut: FC<Props> = ({ year, type, icon }) => {
  const { themeType } = useThemeContext();

  return (
    <div className="flex gap-1.5 text-[11px] font-light leading-[14px] opacity-75 sm:mb-4 sm:text-[13px] sm:leading-4">
      <p>{year}</p>
      {separator}
      <div className="flex items-center gap-1">
        <SvgIcon
          className={classNames('h-2.5 w-2.5', {
            'fill-light': themeType === ThemeType.Dark,
          })}
        >
          {getIconByName(icon)}
        </SvgIcon>

        <p>{type}</p>
      </div>
    </div>
  );
}