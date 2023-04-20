import Link from "next/link";
import { SvgIcon } from "./SvgIcon";
import { useRouter } from "next/router";
import classNames from "classnames";

type Props = {
  href: string;
  children: React.ReactNode;
}

export const NavbarLink: React.FC<Props> = (props) => {
  const { pathname } = useRouter();
  const { href, children } = props;

  return (
    <Link href={href} className="block p-2">
      <SvgIcon 
        className={classNames(
          "fill-grey hover:fill-primary transition h-4 w-4 sm:h-5 sm:w-5",
          { 'fill-light': pathname === href }
        )}
      >
        {children}
      </SvgIcon>
    </Link>
  );
}
