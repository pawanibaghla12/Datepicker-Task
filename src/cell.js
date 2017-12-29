import React, { Component } from "react";
import styled from "styled-components";

export const TableCell = props => {
  const handleClick = () => {
    console.log("akansha");

    props.onClick(props.day);
  };
  let select = props.active;
  let selectWOT = select.setHours(0, 0, 0, 0);
  let other = props.day;
  let otherWOT = other.setHours(0, 0, 0, 0);
  let selectMonth = select.getMonth();
  let otherMonth = other.getMonth();

  return (
    <td id="cell">
      {selectWOT === otherWOT ? (
        <Cell2
          id="activeCell"
          key={props.key}
          onClick={handleClick}
          primary={otherMonth > props.month || otherMonth < props.month}
        >
          {props.day.getDate()}
        </Cell2>
      ) : (
        <Cell1
          id="nonactiveCell"
          key={props.key}
          onClick={handleClick}
          primary={otherMonth > props.month || otherMonth < props.month}
        >
          {props.day.getDate()}
        </Cell1>
      )}
    </td>
  );
};

const Cell1 = styled.td`color: ${props => (props.primary ? "grey" : "black")};`;
const Cell2 = styled.td`
  color: ${props => (props.primary ? "grey" : "black")};
  border-color: red;
  border-style: solid;
`;
