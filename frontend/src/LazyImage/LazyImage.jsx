import { useEffect, useRef, useState } from "react";

import React from "react";

const LazyImage = ({ className, src, alt }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        console.log("view b4", inView);
        setInView(true);
        console.log("view after", inView);
      }
    });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 1 });
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (inView) {
    return <img className={className} src={src} alt={alt} />;
  } else if (alt === "food-item-image") {
    return <div ref={ref} className="placeholder-food-item"></div>;
  } else {
    return <div ref={ref} className="placeholder-menu"></div>;
  }
};

export default LazyImage;
