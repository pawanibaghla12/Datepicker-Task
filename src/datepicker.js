import React, { Component } from "react";
import styled from "styled-components";
import { TableCell } from "./cell";
type State = {
  cal: string[][],
  month: string,
  year: string,
  selection: Date
};
type Props = {
  dateSelected?: string,
  save?: () => {},
  cancel?: () => {}
};
let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const monthName = [
  "January",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const cal = [
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
];
export default class DatePickerComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    let inc = 0;

    let updatedCal = cal.map(week => {
      const datepassed = this.props.dateSelected
        ? this.props.dateSelected
        : new Date();

      let w = week.map(day => {
        let firstDay = new Date(
          datepassed.getFullYear(),
          datepassed.getMonth(),
          1
        );
        let dayOfWeek = firstDay.getDay();
        let noOfDaysInLastMOnth = new Date(
          firstDay.getFullYear(),
          firstDay.getMonth(),
          0
        ).getDate();
        let lastMonthWeekDay = dayOfWeek - 1;
        let lastMonthDateToStartWith = new Date(
          firstDay.getFullYear(),
          firstDay.getMonth() - 1,
          noOfDaysInLastMOnth - lastMonthWeekDay
        );
        let a = lastMonthDateToStartWith.setDate(
          lastMonthDateToStartWith.getDate() + inc
        );
        let y = new Date(a);
        inc++;
        return y;
      });

      return w;
    });
    this.state.cal = updatedCal;
  }
  state = {
    cal: [
      [undefined],
      [undefined],
      [undefined],
      [undefined],
      [undefined],
      [undefined]
    ],
    month: this.props.dateSelected
      ? this.props.dateSelected.getMonth()
      : new Date().getMonth(),
    year: this.props.dateSelected
      ? this.props.dateSelected.getFullYear()
      : new Date().getFullYear(),
    selection: this.props.dateSelected ? this.props.dateSelected : new Date()
  };
  handleNext = () => {
    console.log("called");
    let datepassed = new Date(this.state.year, this.state.month, 1);
    let inc = 0;

    if (this.state.month === 11) {
      datepassed = new Date(this.state.year + 1, 0, 1);
    } else {
      datepassed = new Date(this.state.year, datepassed.getMonth() + 1, 1);
    }
    let month = datepassed.getMonth();
    let year = datepassed.getFullYear();

    let updatedCal = cal.map(week => {
      let w = week.map(day => {
        let firstDay = new Date(
          datepassed.getFullYear(),
          datepassed.getMonth(),
          1
        );
        let dayOfWeek = firstDay.getDay();
        let noOfDaysInLastMOnth = new Date(
          firstDay.getFullYear(),
          firstDay.getMonth(),
          0
        ).getDate();

        let lastMonthWeekDay = dayOfWeek - 1;
        let lastMonthDateToStartWith = new Date(
          firstDay.getFullYear(),
          firstDay.getMonth() - 1,
          noOfDaysInLastMOnth - lastMonthWeekDay
        );
        let a = lastMonthDateToStartWith.setDate(
          lastMonthDateToStartWith.getDate() + inc
        );
        let y = new Date(a);
        inc++;
        return y;
      });

      return w;
    });
    this.setState({
      month: month,
      year: year,
      cal: updatedCal
    });
  };
  handlePrevious = () => {
    let datepassed = new Date(this.state.year, this.state.month, 1);
    let inc = 0;

    if (this.state.month === 0) {
      datepassed = new Date(this.state.year - 1, 11, 1);
    } else {
      datepassed = new Date(this.state.year, datepassed.getMonth() - 1, 1);
    }
    let month = datepassed.getMonth();
    let year = datepassed.getFullYear();

    let updatedCal = cal.map(week => {
      let w = week.map(day => {
        let firstDay = new Date(
          datepassed.getFullYear(),
          datepassed.getMonth(),
          1
        );
        let dayOfWeek = firstDay.getDay();
        let noOfDaysInLastMOnth = new Date(
          firstDay.getFullYear(),
          firstDay.getMonth(),
          0
        ).getDate();

        let lastMonthWeekDay = dayOfWeek - 1;
        let lastMonthDateToStartWith = new Date(
          firstDay.getFullYear(),
          firstDay.getMonth() - 1,
          noOfDaysInLastMOnth - lastMonthWeekDay
        );
        let a = lastMonthDateToStartWith.setDate(
          lastMonthDateToStartWith.getDate() + inc
        );
        let y = new Date(a);
        inc++;
        return y;
      });

      return w;
    });
    this.setState({
      month: month,
      year: year,
      cal: updatedCal
    });
  };
  handleSelectClick = date => {
    this.setState({
      selection: date
    });
    this.selected = date;
    console.log("called");
  };
  handleSave = () => {
    this.props.save(this.selected);
    console.log("inside datepicker: ", this.selected);
  };
  handleCancel = () => {
    this.props.cancel("cancelled");
  };
  render() {
    let selected;

    let dateClicked = new Date(
      this.state.selection.getFullYear(),
      this.state.selection.getMonth(),
      this.state.selection.getDate()
    );

    return (
      <div>
        <table>
          <th>
            <button id="previous" onClick={this.handlePrevious}>
              previous
            </button>
            <span id="month">{monthName[this.state.month]}</span>
            <span id="year">{this.state.year}</span>
            <button id="next" onClick={this.handleNext}>
              next
            </button>
          </th>
          <tr>
            {weekDay.map((day, i) => {
              return (
                <td id="weekDayCell" key={i} day={day}>
                  {day}
                </td>
              );
            })}
          </tr>
          {this.state.cal.map((week, ind) => {
            return (
              <tr key={ind}>
                {week.map((date, index) => {
                  return (
                    <td>
                      {dateClicked.getDate() === date.getDate() &&
                      dateClicked.getMonth() === date.getMonth() &&
                      dateClicked.getFullYear() === date.getFullYear() ? (
                        <Cell1 id="highlighted">
                          <TableCell
                            id="dateCell"
                            key={index}
                            day={date}
                            onClick={this.handleSelectClick}
                            active={
                              this.props.dateSelected
                                ? this.props.dateSelected
                                : new Date()
                            }
                            month={this.state.month}
                          />
                        </Cell1>
                      ) : (
                        <Cell2 id="nothighlighted">
                          <TableCell
                            id="dateCell"
                            key={index}
                            day={date}
                            onClick={this.handleSelectClick}
                            active={
                              this.props.dateSelected
                                ? this.props.dateSelected
                                : new Date()
                            }
                            month={this.state.month}
                          />
                        </Cell2>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
        <button
          id="save"
          onClick={this.props.save ? this.handleSave : undefined}
        >
          Save
        </button>
        <button
          id="cancel"
          onClick={this.props.cancel ? this.handleCancel : undefined}
        >
          Cancel
        </button>
      </div>
    );
  }
}

const Cell1 = styled.div`background-color: yellow;`;
const Cell2 = styled.div`background-color: white;`;
