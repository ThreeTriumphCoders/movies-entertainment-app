import Link from "next/link";
import { SvgIcon } from "./SvgIcon";

type Props = {
  href: string;
  children: React.ReactNode;
}

export const NavbarLink: React.FC<Props> = (props) => (
  <Link href={props.href} className="block p-2">
    <SvgIcon>
      {props.children}
    </SvgIcon>
  </Link>
);
