import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { ITodoData } from '../typing';


// 读取本地文件
export function readFileFn (path: string) : string {
	return readFileSync(resolve(__dirname, path), 'utf-8')
}


// 修改本地文件, 传入路径和数据, 数据类型是范型 T, 在使用它时才传入类型
export function writeFileFn<T> (path: string, data: T) : void { //⚡️data 是个数组, 但不能定死 data 的类型
	writeFileSync(resolve(__dirname, path), JSON.stringify(data)) //要转为 JSON 格式才能写入,  将一个JavaScript 对象或值转换为JSON 字符串
}


// 抽象出修改文件的固定流程(读取、修改、保存）(可以判断是修改文件开始读取文件))
export function fileOperation (path: string, fn ?: any): string | void {
	//固定流程(读取文件)
	let todoListJSON: ITodoData[] = JSON.parse(readFileFn('../todo.json') || '[]')  //JSON.parse 是将 JSON 数据转为【 对象 】格式

	if(!fn) { //如果没有传入 fn, 就是只读取文件, JSON.stringify 是将对象转为 JSON 格式进行保存
		return JSON.stringify(todoListJSON)
	}

	//固定流程(操作文件, 在调用的函数内去执行)
	todoListJSON = fn(todoListJSON)
	
	
	//固定流程(保存文件)
	writeFileFn<ITodoData[]>(path, todoListJSON)//相当于等上面的函数操作完后, 保存一个新的 todoList 文件

	// 		👇没抽象前的写法
			// 拿到 post 过来的 id
	// 		const id: number = parseInt(req.body._id) 

	// 		// 读取文件
	// 		let todoList: ITodoData[] = JSON.parse(readFileFn('../todo.json') || '[]')  //JSON.parse 是将 JSON 数据转为【 对象 】格式
		
	// 		// 修改文件
	// 		todoList = todoList.filter((todo: ITodoData) => todo.id !== id) 
		
	// 		// 保存修改后的文件
	// 		writeFileFn('../todo.json', todoList)
}