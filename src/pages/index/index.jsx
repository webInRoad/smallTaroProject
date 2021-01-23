import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import AddQuestion from './addQuestion'
import './index.less'
import yes from '../../img/yes.png'
import no from '../../img/no.png'
function setStorage(key, value) {
	let str = value
	if (typeof str == 'object') {
		str = JSON.stringify(str)
	}
	Taro.setStorageSync(key, str)
}

function getStorage(key) {
	let str = Taro.getStorageSync(key)
	if (!str) {
		return []
	}
	return JSON.parse(str)
}

// let arr = getStorage('question').map((question) => {
// 	question.id = parseInt(Math.random() * 1000)
// 	return question
// })
// setStorage('question', arr)
export default class Index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			questionList: getStorage('question'),
			showQuestionModal: false
		}
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() {}

	showQuestion = () => {
		this.setState({
			showQuestionModal: true
		})
	}
	receiveQuestion = (options) => {
		this.setState(({ questionList }) => {
			questionList.push({ id: parseInt(Math.random() * 1000), ...options })
			return {
				questionList
			}
		})
		console.info(this.state.questionList)
		setStorage('question', this.state.questionList)
		this.closeQuestion()
	}
	closeQuestion = () => {
		this.setState({
			showQuestionModal: false
		})
	}
	addVote = (item) => {
		this.setState(({ questionList }) => {
			const currentQuestion = questionList.filter(
				(question) => question.id == item.id
			)
			if (currentQuestion && currentQuestion.length) {
				currentQuestion[0].vote = currentQuestion[0].vote
					? ++currentQuestion[0].vote
					: 1
			}
			return { questionList }
		})
		setStorage('question', this.state.questionList)
	}
	cutVote = (item) => {
		this.setState(({ questionList }) => {
			const currentQuestion = questionList.filter(
				(question) => question.id == item.id
			)
			if (currentQuestion && currentQuestion.length) {
				//减完之后也不能小于0
				currentQuestion[0].vote = currentQuestion[0].vote
					? --currentQuestion[0].vote
						? currentQuestion[0].vote
						: 0
					: 0
			}
			return { questionList }
		})
		setStorage('question', this.state.questionList)
	}
	render() {
		const { showQuestionModal, questionList } = this.state
		console.info(questionList, 'questionList')
		questionList.sort((a, b) => b.vote - a.vote) // 正确的
		// questionList.sort((a, b) => b.vote > a.vote) //错误的,sort的函数参数要求返回1，-1，0而不是boolean类型
		return (
			<View className="index">
				<View className="title">Taro问答实例</View>
				<View className="question-list">
					{questionList.map((item) => {
						return (
							<View className="question" key={item.id}>
								<View className="question-left">
									<View className="question-title">{item.title}</View>
									<View className="question-des">{item.des}</View>
								</View>
								<View className="question-right">
									<Image
										// onClick={this.addVote.bind(this, item)}
										onClick={() => this.addVote(item)}
										className="img"
										src={yes}
									/>
									<Text>{item.vote || 0}</Text>
									<Image
										onClick={() => this.cutVote(item)}
										className="img"
										src={no}
									/>
								</View>
							</View>
						)
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
		)
	}
}
