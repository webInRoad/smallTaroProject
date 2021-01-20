import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./dialog.less";
export default class Dialog extends Component {
  render() {
    return <View className="dialog">{this.props.children}</View>;
  }
}
