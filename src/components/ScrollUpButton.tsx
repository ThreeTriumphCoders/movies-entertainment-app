import classNames from "classnames";
import { useEffect, useState } from "react";

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
        "fixed bottom-10 right-10 bg-arrow-up w-12 h-12 hover:bg-arrow-hover transition-all",
        {
          'scale-0': !isEnabled, 
        }
      )}
      onClick={() => window.scrollTo(0, 0)}
    >
    </button>
  );
};
