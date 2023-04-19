import * as React from "react"
import type { SVGProps } from "react"

const NavbarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fillRule="evenodd"
    clipRule="evenodd"
    className="fill-grey hover:fill-primary transition h-4 w-4 sm:h-5 sm:w-5"
  >
    {props.children}
  </svg>
)
export default NavbarIcon;