import React, { Component } from "react";
import Form from "../../components/features/Form";
import "./BulletinBoard.css";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

export default class BulletinBoard extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      listInfos: [],
    };
  }
  formInputList = [
    { label: "name", value: "" },
    { label: "phone", value: "" },
    { label: "email", value: "" },
  ];
  getMessage = (formInputList) => {
    let message = "";
    formInputList.forEach((item, index) => {
      if (index !== 0) message += ",";
      message += [item.value];
    });

    const listInfos = this.state.listInfos.slice();
    listInfos.push({ num: `id${this.state.id}`, message: message });
    this.setState((state) => ({
      id: state.id + 1,
      listInfos: listInfos,
    }));
  };
  removeInfo = (item) => {
    return (e) => {
      e.preventDefault();
      const listInfos = this.state.listInfos.slice();
      this.setState({
        listInfos: listInfos.filter((info) => info.num !== item.num),
      });
    };
  };
  backClick = () => {
    this.props.history.go(-1);
  };
  render() {
    return (
      <div className="bulletinBoard">
        <div>BulletinBoard</div>
        <div className="bulletinBoard__form">
          <Form
            formInputList={this.formInputList}
            getMessage={this.getMessage}
            needSubmitButton={true}
          ></Form>
        </div>
        <div className="bulletinBoard__messageList">
          {this.state.listInfos.map((info) => (
            <div key={info.num} className="bulletinBoard__messageList__message">
              <p>{info.message}</p>
              <input
                type="submit"
                value="delete"
                onClick={this.removeInfo(info)}
                className="common__submit"
              ></input>
            </div>
          ))}
        </div>
        <Link to="/" className="">
          <Button text="返回首頁"></Button>
        </Link>
        <button className={`btn`} onClick={this.backClick}>
          返回上一頁
        </button>
      </div>
    );
  }
}
