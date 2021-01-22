import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Input, Textarea, Button } from "@tarojs/components";
import Dialog2 from "./dialog";
import "./addquestion.less";
export default class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      des: "",
    };
  }
  handleOk = () => {
    const { title, des } = this.state;
    if (!title || !des) {
      Taro.showToast({
        title: "标题与描述不能为空",
        icon: "none",
      });
    } else {
      this.props.receiveQuestion(this.state);
    }
  };
  handleCancel = () => {
    this.props.closeQuestion();
  };
  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  onChangeDes = (event) => {
    this.setState({
      des: event.target.value,
    });
  };
  render() {
    return (
      <Dialog2>
        <View className="add-question">
          <View className="question-body">
            <Input
              focus
              onInput={this.onChangeTitle}
              className="question-input"
              placeholder="请输入您的问题标题"
            ></Input>
            <Textarea
              onInput={this.onChangeDes}
              className="question-des"
              placeholder="请输入您的问题描述"
            ></Textarea>
            <View className="question-btn-group">
              <Button onClick={this.handleOk} className="question-btn ok">
                确定
              </Button>
              <Button
                onClick={this.handleCancel}
                className="question-btn cancel"
              >
                取消
              </Button>
            </View>
          </View>
        </View>
      </Dialog2>
    );
  }
}
