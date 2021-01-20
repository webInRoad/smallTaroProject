import React, { Component } from "react";
import { View, Text, Input, Textarea } from "@tarojs/components";
import Dialog2 from "./dialog";
import "./addquestion.less";
export default class AddQuestion extends Component {
  render() {
    return (
      <Dialog2>
        <View className="add-question">
          <View className="question-body">
            <Input
              className="question-input"
              placeholder="请输入您的问题标题"
            ></Input>
            <Textarea
              className="question-des"
              placeholder="请输入您的问题描述"
            ></Textarea>
          </View>
        </View>
      </Dialog2>
    );
  }
}
