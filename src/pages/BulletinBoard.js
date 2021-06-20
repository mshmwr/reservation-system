import React, { Component } from "react";
import Form from "../components/Form";
import "./BulletinBoard.css";
import { Button } from "../components/Button";
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
  addToList = (message) => {
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
      console.log(`item.num=${item.num}`);
      const listInfos = this.state.listInfos.slice();
      this.setState({
        listInfos: listInfos.filter((info) => info.num !== item.num),
      });
    };
  };
  render() {
    return (
      <div className="bulletinBoard">
        <div>BulletinBoard</div>
        <div className="bulletinBoard__form">
          <Form
            formInputList={this.formInputList}
            addToList={this.addToList}
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
        <div></div>
        <Link to="/" className="">
          <Button text="返回首頁"></Button>
        </Link>
      </div>
    );
  }
}
