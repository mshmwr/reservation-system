import React, { Component } from "react";
import "./Form.css";
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list是要外部傳入的 this.props.formItemList
      // list: [{ label: "name" }, { label: "phone" }, { label: "email" }],
      // list: [
      //   { label: "name", value: "" },
      //   { label: "phone", value: "" },
      //   { label: "email", value: "" },
      //   { label: "test", value: "" },
      // ],
      formInputList: props.formInputList,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(formItem, targetValue) {
    const list = this.state.formInputList.slice();
    for (let i = 0; i < list.length; i++) {
      if (list[i].label === formItem.label) {
        list[i].value = targetValue;
        break;
      }
    }
    this.setState({ list: list });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getMessage();
  }
  getMessage = () => {
    console.log("handleSubmit");
    console.log(this.props.getMessage);
    if (this.props.getMessage !== undefined) {
      this.props.getMessage(this.state.formInputList);
    }
    if (this.props.needSubmitButton !== false) {
      this.clearInput();
    }
  };
  clearInput = () => {
    const list = this.state.formInputList.slice();
    list.forEach((item) => {
      item.value = "";
    });
    this.setState({ list: list });
  };
  render() {
    if (this.props.needSubmitButton === false) {
      this.getMessage();
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.formInputList.map((inputItem) => (
          <div key={inputItem.label} className="form__item">
            <label>{inputItem.label}</label>
            <input
              value={inputItem.value}
              type="text"
              onChange={(e) => this.handleChange(inputItem, e.target.value)}
            ></input>
          </div>
        ))}
        {this.props.needSubmitButton === true ? (
          <input className="common__submit" type="submit" value="新增"></input>
        ) : null}
      </form>
    );
  }
}
