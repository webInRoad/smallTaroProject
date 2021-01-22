import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import AddQuestion from "./addQuestion";
import "./index.less";
import yes from "../../img/yes.png";
import no from "../../img/no.png";
function setStorage(key, value) {
  let str = value;
  if (typeof str == "object") {
    str = JSON.stringify(str);
  }
  Taro.setStorageSync(key, str);
}

function getStorage(key) {
  let str = Taro.getStorageSync(key);
  if (!str) {
    return [];
  }
  return JSON.parse(str);
}
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: getStorage("question"),
      showQuestionModal: false,
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  showQuestion = () => {
    this.setState({
      showQuestionModal: true,
    });
  };
  receiveQuestion = (options) => {
    this.setState(({ questionList }) => {
      questionList.push(options);
      return {
        questionList,
      };
    });
    console.info(this.state.questionList);
    setStorage("question", this.state.questionList);
    this.closeQuestion();
  };
  closeQuestion = () => {
    this.setState({
      showQuestionModal: false,
    });
  };
  render() {
    const { showQuestionModal, questionList } = this.state;
    console.info(questionList, "questionList");
    return (
      <View className="index">
        <View className="title">Taro问答实例</View>
        <View className="question-list">
          {questionList.map((item) => {
            return (
              <View className="question">
                <View className="question-left">
                  <View className="question-title">{item.title}</View>
                  <View className="question-des">{item.des}</View>
                </View>
                <View className="question-right">
                  <Image className="img" src={yes} />
                  <Text>1</Text>
                  <Image className="img" src={no} />
                </View>
              </View>
            );
          })}
        </View>
        {/* taro3版本在小程序并不会显示true,taro1估计会 */}
        {!showQuestionModal || <AddQuestion />}
        {/* 建议都用三目运算符，而不用|| */}
        {showQuestionModal ? (
          <AddQuestion
            receiveQuestion={this.receiveQuestion}
            closeQuestion={this.closeQuestion}
          />
        ) : null}
        <Button className="btn" onClick={this.showQuestion}>
          提问
        </Button>
      </View>
    );
  }
}
