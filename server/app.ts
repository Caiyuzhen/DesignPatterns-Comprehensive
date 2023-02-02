import express, { Application } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import bodyParse from 'body-parser'; //因为还有 post 请求, 所以需要用到 body-parser
import { fileOperation, readFileFn, writeFileFn } from './utils/changeFile';
import { ITodoData } from './typing';


// 这个文件都是构建服务器 api 的文件
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
	// 读取文件(🌟方法一: 通过工具函数读取, 两层抽象)
	const todoList = fileOperation('../todo.json') as string


	// 读取文件(🌟方法二: 通过工具函数读取, 传入路径即可)
	// const todoList: string = readFileFn('../todo.json')


	// 读取文件(🌟方法三: 直接写)
	// const todoList: string = readFileSync(resolve(__dirname, 'todo.json'), 'utf-8') //路径、编码格式
	// console.log(todoList)

	// 响应回前端 send() 方法
	res.send(todoList)
})




// 添加 todo 的 api 
app.post('/add', function (req, res) { //req 里边保存了从请求体中拿到的 todoData 数据

	//把 JSON 字符串解析为对象, 🔥🔥 todo 为从 body 里边拿到从 model 里边传过来的 todo 数据, 拿过来跟原有的 JSON 做比对, 有重复的就不添加！
	const todoData: ITodoData = JSON.parse(req.body.todoData)  //⚡️⚡️ todoData!! 要跟 TodoService.ts 中传入的变量名保持一致！

	fileOperation('../todo.json', function (todoListJSON: ITodoData[]) { //🔥🔥🔥看看 JSON 内是不是存在这条数据
		// 找出重复的 todo (JSON 的 todo 内容是否等于传入的 todo 内容) 
		const _isExist = todoListJSON.find((item: ITodoData) => item.content === todoData.content)

		// 有重复项
		if (_isExist) {
			res.send({
				msg: 'todo 已存在',
				statusCode: 100
			})
			return
		}

		// 没有重复项则添加到 JSON 内
		todoListJSON.push(todoData)

		return todoListJSON //🌟🌟🌟 return 给 changeFile.ts 的 writeFileFn() 方法
	})

	res.send({
		msg: '添加成功',
		statusCode: 200
	})
})




// 移除 Todo 的 api(🔥因为需要 id 所以用 post 请求)
app.post('/remove', function (req, res) {
	// 拿到 post 过来的 id
	const id: number = parseInt(req.body._id) //从请求体中拿到 _id (🔥🔥注意,这里的 id 命名要跟 TodoService.ts 中 removeTodo 的 _id 命名一致！)


	// 👇方法 B （抽象出工具函数）
	fileOperation('../todo.json', function(todoList: ITodoData[]) {
		return todoList.filter((todo: ITodoData) => todo.id !== id) //过滤掉要删除的那项, 然后🔥返回给【工具函数】让它去保存修改后的文件！
	})


	// 👇方法 A （不抽象）
	// // 读取文件(🌟方法一: 通过工具函数读取, 传入路径即可)
	// let todoList: ITodoData[] = JSON.parse(readFileFn('../todo.json') || '[]') //如果没数据内容的话,就是空数组, JSON.parse 是将 JSON 数据转为【 对象 】格式

	// // 修改文件(过滤掉要删除的那项)
	// todoList = todoList.filter((todo: ITodoData) => todo.id !== id) 

	// // 保存修改后的文件(🌟工具函数)
	// writeFileFn('../todo.json', todoList)//路径 + 对象

	// 响应回前端 send() 方法
	res.send({
		msg: 'ok',
		statusCode: 200
	})
})




// checkbox 状态的 api(🔥因为需要 id 所以用 post 请求)
app.post('/toggle', function (req, res) {
	// 拿到 post 过来的 id
	const _id: number = parseInt(req.body._id)

	fileOperation('../todo.json', function (todoList: ITodoData[]) {
		return todoList.map((todo :ITodoData) => {
			if (todo.id === _id) {
				todo.completed = !todo.completed //取反
			}

			// 返回 todo 🔥
			return todo
		})
	})

	// 响应回前端 send() 方法
	res.send({
		msg: 'ok',
		statusCode: 200
	})

})




// 监听端口
app.listen(8080, function () {
	console.log('👀 Listening on port 8080, 监听中')
})