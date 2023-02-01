import $ from 'jquery'
import { ITodoData } from '../type/typing'

/** 
 * 🌟在 todoModelEvent 中 initDOM() 要执行的渲染所有 todolist 的【装饰器】
 * 🚗🚗🚗 在操作数据前, 把数据中的已有 todo 渲染到 DOM 上!!
*/
export function getTodoList (
	target: any, //目标对象（函数）的原型属性 （class 类）
	methodName: string,  //目标对象（函数）的名称
	descriptor: PropertyDescriptor //描述器, 其中 value 就是函数本身, 最主要的也是用这个
) {
	// 首先保存一下原有的 initDOM() 方法
	const _origin = descriptor.value

	// 重写原有的 initDOM() 方法
	descriptor.value = function (todoData: ITodoData[]) {
		$.get('http://localhost:8080/todolist').then((res: string) => {
			if(!res){ //如果没有数据
				return
			}

			todoData = JSON.parse(res) //把 api 请求回来的数据转成 json 数据

		}).then(() => {
			// ⚡️这里的 this 指向 todoModelEvent, 因为我们这里改写了它; 但是上面定义的 _origin 并没有指向 todoModelEvent, 所以我们要把 this 指向传给它不然 initDOM() 那边的 this 指向会 undefined!!
			_origin.call(this, todoData) //🔥🔥🔥这个 todoData 相当于传进了 initDOM() 方法的参数中!!
		})
	}
}