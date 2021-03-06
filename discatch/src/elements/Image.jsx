// LIBRARY
import React from "react";

// STYLE
import styled from "styled-components";

const Image = ({ src, width, clickEvent, height, ...props }) => {
  return (
    <React.Fragment>
      <AspectInner
        {...props}
        src={src}
        width={width}
        height={height}
        onClick={clickEvent}
      ></AspectInner>
    </React.Fragment>
  );
};

Image.defaultProps = {
  src: "https://cdn.pixabay.com/photo/2021/08/10/18/32/cat-6536684_1280.jpg",
  width: "50px",
  height: "50px",
  addstyle: () => {},
};

const AspectInner = styled.div`
  position: relative;
  background-image: url("${(props) => props.src}");
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  margin: ${(props) => props.margin};
  background-position: center;
  background-size: cover;
  ${(props) => props.addstyle()};
`;

export default Image;
