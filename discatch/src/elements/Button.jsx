// LIBRARY
import React from "react";
import styled from "styled-components";

// STYLE
import { borderBox } from "../shared/style";

const Button = ({ is_float, children, clickEvent,...props }) => {
  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={clickEvent}>{children}</FloatButton>
      </React.Fragment>
    );
  }
  return (
    <ButtonStyle onClick={clickEvent} {...props}>
      {children}
    </ButtonStyle>
  );
};

Button.defaultProps = {
  color: "black",
  bgColor: "white",
  fontSize: "14px",
  padding: "12px 0px",
  addstyle: () => {},
  clickEvent: () => {},
};

const ButtonStyle = styled.button`
  width: ${(props) => props.width};
  background: ${(props) => `rgb(${props.theme.palette[props.bgColor]})`};
  color: ${(props) => `rgb(${props.theme.palette[props.color]})`};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  border: none;
  cursor: pointer;
  ${(props) => borderBox(props.radius, props.padding)}
  ${(props) => props.addstyle()};
  align-items: ${(props) => props.alignItems};
`;

const FloatButton = styled.button`
  z-index: 100;
  width: 45px;
  height: 45px;
  background-color: #b5bb19;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 700;
  position: fixed;
  bottom: 60px;
  margin-left: 350px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 22.5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  @media (max-width: 420px) {
    left: auto;
    right: 20px;
  }
  @media screen and (max-height: 1024px) {
    bottom: 84px;
  }
  @media screen and (max-height: 731px) {
    bottom: 71px;
  }
  @media screen and (max-height: 720px) {
    bottom: 66px;
  }
  @media screen and (max-height: 667px) {
    bottom: 72px;
  }
  @media screen and (max-height: 568px) {
    bottom: 60px;
  }
`;
export default Button;
