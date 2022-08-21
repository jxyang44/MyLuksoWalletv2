export const animateOnEntry = (imgRef, setState) => {
  const top = imgRef.current.getBoundingClientRect().top;
  const height = imgRef.current.getBoundingClientRect().height;
  Math.abs(top) <= height / 2 ? setState(true) : setState(false);
};

export function preventPropagation(fn, defaultOnly) {
  return (e, ...params) => {
      e && e.preventDefault()
      !defaultOnly && e && e.stopPropagation()
      fn(e, ...params)
  }
}
