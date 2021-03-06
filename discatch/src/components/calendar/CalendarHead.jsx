// LIBRARY
import React from "react";

// STYLE
import styled from "styled-components";

// ICON
import { Gitlab } from "react-feather";

const CalendarHead = (props) => {
  const { year, month, goToday, setMonth, setYear } = props;
  const DAY = ["일", "월", "화", "수", "목", "금", "토"];

  const next = () => {
    setYear(month === 12 ? year + 1 : year);
    setMonth(month === 12 ? 1 : month + 1);
  };
  const previous = () => {
    setYear(month === 1 ? year - 1 : year);
    setMonth(month === 1 ? 12 : month - 1);
  };
  
  return (
    <Form>
      <Nav>
        <Year>
          {year}년 {month}월
        </Year>
        <BtnBox>
          <Btn onClick={previous}>&lt;</Btn>
          <Btn style={{ width: "50px" }} onClick={() => goToday()}>
            오늘
          </Btn>
          <Btn onClick={next}>&gt;</Btn>
        </BtnBox>
      </Nav>
      <Dots>
        <Gitlab width="10px" />
        <p>발견</p>
        <Dot background="#D19B61" />
        <p>먹이</p>
        <Dot background="skyblue" />
        <p>급수</p>
        <Dot background="#CBCF52" />
        <p>간식</p>
      </Dots>
      <Days>
        {DAY.map((elm, idx) => {
          return <Day key={idx}>{elm}</Day>;
        })}
      </Days>
    </Form>
  );
};

const Dots = styled.div`
  display: flex;
  justify-content: flex-end;
  line-height: 20px;
  p {
    font-size: 12px;
    line-height: 20px;
    margin: 0px;
  }
`;
const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${(props) => props.background};
  margin: 5px;
  line-height: 20px;
`;
const Form = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #b5bb19;
  border-radius: 2px;
`;
const Nav = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.7vw;
`;
const Year = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100px;
`;
const Btn = styled.li`
  list-style: none;
  padding: auto;
  width: 30px;
  border: 0.5px solid #e4e3e6;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
`;
const Days = styled.div`
  display: flex;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const Day = styled.li`
  list-style: none;
  text-align: center;
  font-size: 12px;
  :nth-child(7n + 1),
  :nth-child(7n) {
    color: #969696;
  }
`;

export default CalendarHead;
