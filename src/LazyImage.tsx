import { useRef, useState, useEffect } from "react";

const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(imgRef.current);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imgRef.current);

    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return <img ref={imgRef} src={isVisible ? src : ""} alt={alt} />;
};

export default LazyImage;
