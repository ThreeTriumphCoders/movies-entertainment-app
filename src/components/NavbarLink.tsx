import Link from "next/link";
import { SvgIcon } from "./SvgIcon";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useThemeContext } from "~/utils/ThemeContext";
import { ThemeType } from "~/types/ThemeType";

type Props = {
  href: string;
  children: React.ReactNode;
}

export const NavbarLink: React.FC<Props> = (props) => {
  const { pathname } = useRouter();
  const { href, children } = props;
  const { themeType } = useThemeContext();

  return (
    <Link href={href} className="block p-2">
      <SvgIcon 
        className={classNames(
          "fill-grey hover:fill-primary transition h-4 w-4 sm:h-5 sm:w-5",
          {
            'fill-light': themeType === ThemeType.Light,
            'fill-primary': pathname === href,
          }
        )}
      >
        {children}
      </SvgIcon>
    </Link>
  );
}
