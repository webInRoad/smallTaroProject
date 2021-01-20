import React, { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import AddQuestion from "./addQuestion";
import "./index.less";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View className="title">Taro问答实例</View>
        <AddQuestion />
        <Button className="btn">提问</Button>
      </View>
    );
  }
}
