import React, { Component } from "react";
import FormItem from "../ui/FormItem";
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list: [
      //   { label: "name", value: "" },
      //   { label: "phone", value: "" },
      //   { label: "email", value: "" },
      //   { label: "test", value: "" },
      // ],
      formInputList: props.formInputList,
      isFirstInput: props.isFirstInput,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
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

    if (this.state.isFirstInput) {
      this.setState({ isFirstInput: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getMessage();
  }

  getMessage = () => {
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
  handleInputClick = () => {
    if (this.props.setInputClick !== undefined) {
      this.props.setInputClick(true);
    }
  };

  render() {
    if (this.props.needSubmitButton === false) {
      this.getMessage();
    }

    return (
      <FormItem
        formList={this.state.formInputList}
        handleInputClick={this.handleInputClick}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        needSubmitButton={this.props.needSubmitButton}
        isFirstInput={this.state.isFirstInput}
        borderRadius={this.props.borderRadius}
      />
    );
  }
}
