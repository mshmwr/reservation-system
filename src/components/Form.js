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
    let message = "";
    this.state.formInputList.forEach((item, index) => {
      if (index !== 0) message += ",";
      message += [item.value];
    });
    this.props.addToList(message);
    this.clearInput();
  };
  clearInput = () => {
    const list = this.state.formInputList.slice();
    list.forEach((item) => {
      item.value = "";
    });
    this.setState({ list: list });
  };
  render() {
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

        <input className="common__submit" type="submit" value="新增"></input>
      </form>
    );
  }
}
