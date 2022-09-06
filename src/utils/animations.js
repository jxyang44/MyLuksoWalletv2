//animations for images in home page and about lukso page

export const animateOnEntry = (imgRef, setState, factor) => {
  const top = imgRef.current.getBoundingClientRect().top;
  const height = imgRef.current.getBoundingClientRect().height;
  Math.abs(top) <= height * factor ? setState(true) : setState(false);
};
