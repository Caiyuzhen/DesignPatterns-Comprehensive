import express, { Application } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import bodyParse from 'body-parser'; //因为还有 post 请求, 所以需要用到 body-parser
import { readFn } from './utils/ReadFile';


const app: Application = express()
app.use(bodyParse.urlencoded( { extended: true } )) //使用 body-parser 中间件, 将请求体中的数据以 URL 编码的方式解析为 req.body 对象, extended 选项设置为 true 表示使用更复杂的编码方式解析请求体
app.use(bodyParse.json()) //使用 body-parser 中间件, 将请求体中的数据以 JSON 格式解析为 req.body 对象


// 设置下跨域请求
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*') //* 表示所有请求都可以跨域
	res.header('Access-Control-Allow-methods', 'GET, POST, PUT, DELETE, OPTIONS') //允许的请求方式
	next() //运行一下
})
console.log('Hellow Express')


// 请求所有 todoList 列表的 api
app.get('/todolist', function (req, res) {
	// 读取文件(🌟方法一: 通过工具函数读取, 传入路径即可)
	const todoList: string = readFn('../todo.json')

	// 读取文件(🌟方法二: 直接写)
	// const todoList: string = readFileSync(resolve(__dirname, 'todo.json'), 'utf-8') //路径、编码格式
	// console.log(todoList)

	// 响应回前端 send() 方法
	res.send(todoList)
})



// 添加 todo 的 api [localhost:8080/todolist]
app.get('/add', function (req, res) {

})



// checkbox 状态的 api(🔥因为需要 id 所以用 post 请求)
app.post('/toggle', function (req, res) {

})



// checkbox 状态的 api(🔥因为需要 id 所以用 post 请求)
app.post('/toggle', function (req, res) {
	
})



// 监听端口
app.listen(8080, function () {
	console.log('👀 Listening on port 8080, 监听中')
})