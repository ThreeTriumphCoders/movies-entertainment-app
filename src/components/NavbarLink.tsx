import Link from "next/link";
import NavbarIcon from "./NavbarIcon";

type Props = {
  href: string;
  children: React.ReactNode;
}

export const NavbarLink: React.FC<Props> = (props) => (
  <Link href={props.href} className="block p-2">
    <NavbarIcon>
      {props.children}
    </NavbarIcon>
  </Link>
);