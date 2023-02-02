import $ from 'jquery'
import { ITodoData } from '../type/typing'

/** 
 * ✈️ 这个文件专门用来发送服务端请求
 * 🌟在 todoModelEvent 中 initDOM() 要执行的渲染所有 todolist 的【装饰器】
 * 🚗🚗🚗 在操作数据前, 把数据中的已有 todo 渲染到 DOM 上!!
*/



// 发送请求, 添加数据
export function addTodoJSON (
	target: any,
	methodName: string,
	descriptor: PropertyDescriptor
): void {
	// 首先保存一下原有的 addTodoData() 方法
	const _origin = descriptor.value

	// 重写 addTodoData() 方法
	descriptor.value = function (todoData: ITodoData): void {
		//JSON.stringify 是将一个JavaScript 对象或值转换为 JSON 字符串, 🔥🔥记得传入 {todoData} 数据！
		$.post('http://localhost:8080/add', { todoData: JSON.stringify(todoData) }).then((res) => {

			if(res.statusCode === 100) {
				alert('💔 添加失败, todo 已存在!')
				return
			}
			_origin.call(this, todoData)
		}) 
	}
}




// 发送请求, 获取全部数据
export function getTodoListJSON (
	target: any, //目标对象（函数）的原型属性 （class 类）
	methodName: string,  //目标对象（函数）的名称
	descriptor: PropertyDescriptor //描述器, 其中 value 就是函数本身, 最主要的也是用这个
): void {
	// 首先保存一下原有的 initDOM() 方法
	const _origin = descriptor.value

	// 重写原有的 initDOM() 方法
	descriptor.value = function (todoData: ITodoData[]): void {
		$.get('http://localhost:8080/todolist').then((res) => {
			if(!res){ //如果没有数据
				return
			}
			//如果有, 则接收返回回来的数据
			todoData = JSON.parse(res) //把 api 请求回来的数据转成 json 数据
		}).then(() => {
			// ⚡️这里的 this 指向 todoModelEvent, 因为我们这里改写了它; 但是上面定义的 _origin 并没有指向 todoModelEvent, 所以我们要把 this 指向传给它不然 initDOM() 那边的 this 指向会 undefined!!
			_origin.call(this, todoData) //🔥🔥🔥这个 todoData 相当于传进了 initDOM() 方法的参数中!!
		})
	}
}



// 发送请求, 移除数据
export function removeTodoJSON ( //重写的时候记得传入参数(原有函数的参数不能漏！）
	target: any, 
	methodName: string,  
	descriptor: PropertyDescriptor 
): void {
	// 首先保存一下原有的 removeTodoData() 方法
	const _origin = descriptor.value

	// 重写原有的 removeTodoData() 方法
	descriptor.value = function (_id: number, targetDelBtn: HTMLElement): void {
		$.post('http://localhost:8080/remove', { _id }).then((res) => { //路由 传入 id, 让服务器删除掉数据库内的数据

			// 可以通过 res 判断 状态码 成不成功...

			// 不用接收返回值, 就直接传回参数给到原来的函数, 重写完函数就好了
			_origin.call(this, _id, targetDelBtn) //🔥🔥🔥这个 id 相当于传进了 removeTodoData() 方法的参数中!!
		})
	}
}



// 发送请求, 修改数据
export function toggleTodoJSON (
	target: any, 
	methodName: string,  
	descriptor: PropertyDescriptor 
): void {
	// 首先保存一下原有的 toggleTodoData() 方法
	const _origin = descriptor.value

	descriptor.value = function (_id: number, target: HTMLElement): void {
		$.post('http://localhost:8080/toggle', { _id }).then(res => {

			// 可以通过 res 判断 状态码 成不成功...
			
			// 不用接收返回值, 就直接传回参数给到原来的函数, 重写完函数就好了
			_origin.call(this, _id, target)
		})
	}
}