import TodoTemplate from "./TodoTemplate";
import { ITodoData } from "./type/typing";

//视图层 用于渲染 todo 列表
class TodoDOM extends TodoTemplate{//🔥里边的方法由 TodoEvent 调用
	private todoWrapper: HTMLElement //放置 todo 的容器

	constructor(todoWrapper: HTMLElement) {
		super()
		this.todoWrapper = todoWrapper //🏓🏓 3.把 app.ts 内的 oTodoList 先传递给了 TodoModelEvent 再传给 TodoDOM 的 this.todoWrapper!!
	}
	

	//🔥protected 只暴露给子类!!
	protected addItemDOM (todo: ITodoData) { //操作 DOM 都是没有返回值的
		const oItem: HTMLElement = document.createElement('div')
	}
}


export default TodoDOM;