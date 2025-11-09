const Img = (props) => {
  // Check if src is a full URL or Firebase Storage URL
  const isFullUrl =
    props.src?.startsWith("http") || props.src?.startsWith("https");
  const newProps = {
    ...props,
    src: isFullUrl ? props.src : props.src,
  };
  return <img {...newProps} alt={props.alt || ""} />;
};
