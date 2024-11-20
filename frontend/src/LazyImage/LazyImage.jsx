import { useEffect, useRef, useState } from "react";

const LazyImage = ({ id, className, src, alt }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };
  useEffect(() => {
    let observer = new IntersectionObserver(callback);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  //   return inView ? (
  //     <img className={className} src={src} alt={alt} />
  //   ) : (
  //     <div id={id} ref={ref} className="placeholder-menu"></div>
  //   );
  // };

  if (inView) {
    return <img className={className} src={src} alt={alt} />;
  } else {
    return <div id={id} ref={ref} className="placeholder-menu"></div>;
  }
};

export default LazyImage;
