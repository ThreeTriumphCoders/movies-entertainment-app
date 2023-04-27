import classNames from "classnames";
import { useEffect, useState } from "react";
import { SvgIcon } from "./SvgIcon";
import { IconName, getIconByName } from "~/utils/getIconByName";

export const ScrollUpButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button 
      type="button"
      className={classNames(
        "fixed bottom-10 right-10 w-12 h-12 transition-all",
        {
          'scale-0': !isEnabled, 
        }
      )}
      onClick={() => window.scrollTo(0, 0)}
    >
      <SvgIcon 
        className="h-12 w-12 rounded-full bg-semi-dark hover:bg-primary transition-colors fill-dark" 
        viewBox="0 0 48 48"
      >
        {getIconByName(IconName.ARROW_UP)}
      </SvgIcon>
    </button>
  );
};
