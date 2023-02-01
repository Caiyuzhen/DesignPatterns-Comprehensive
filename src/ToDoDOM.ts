import TodoTemplate from "./TodoTemplate";
import { ITodoData } from "./type/typing";
import { FindParentNode } from "./utils/FindParentNode";
import { createTodoItem } from "./utils/CreateTodoDOMItem";


//视图层 用于渲染 todo 列表
class TodoDOM extends TodoTemplate{//🔥里边的方法由 TodoEvent 调用
	private allTodoWrapper: HTMLElement //放置所有 todo 的容器

	constructor(allTodoWrapper: HTMLElement) {
		super()
		this.allTodoWrapper = allTodoWrapper //🏓🏓 3.把 app.ts 内的 oTodoList 先传递给了 TodoModelEvent 再传给 TodoDOM 的 this.todoWrapper!!
	}



	//⚡️⚡️⚡️提供给 TodoModelEvent.ts 用的方法, 用来接收一开始请求回来的数据!!
	//注意, 这里不能给已经存在的 allTodoWrapper 添加子节点, 🔥因为这样会导致重复渲染(影响性能！)
	protected initList (todoData: ITodoData[]) {
		if(todoData.length) { //有数据才执行
			const oFrag: DocumentFragment = document.createDocumentFragment() //🔥🔥🔥创建文档碎片, 用来存放当前正准备加入的 todoList

			// 遍历 todoData 数据, 生成 todoItem DOM, 并添加到文档碎片中
			todoData.map((todo: ITodoData) => {
				//🌟方法一: 抽象并调用抽象出来的公共方法
				const oItem = createTodoItem('div', 'todo-item', this.todoViewTemp(todo))
				oFrag.appendChild(oItem)


				//🌟方法二: 不抽象, 直接写
				// const todoItem: HTMLElement = document.createElement('div') //包裹每一条 todo 的容器
				// todoItem.className = 'todo-item'
				// todoItem.innerHTML = this.todoViewTemp(todo) //传入 todo 数据!! 【todoViewTemp】继承自 TodoTemplate 父类
				// oFrag.appendChild(todoItem) //🔥🔥🔥把临时的 todoItem 先存放在文档碎片中
			})

			this.allTodoWrapper.appendChild(oFrag) //🔥🔥🔥把文档碎片中的 todoItem 一次性添加到 DOM 中, 不然每次 map 都会操作到 DOM!
		}
	}



	//🔥protected 只暴露给子类!! //操作 DOM 都是没有返回值的
	// 添加 todo DOM (🔥底层的 todoModelEvent.ts 在数据更改完成后回调用此方法来修改视图！)（因为有继承关系！）
	protected addItemDOM (todo: ITodoData) { //todo 数据
		//🌟方法一: 抽象并调用抽象出来的公共方法
		const oItem = createTodoItem('div', 'todo-item', this.todoViewTemp(todo))
		this.allTodoWrapper.appendChild(oItem)

		//🌟方法二: 不抽象, 直接写
		// const todoItem: HTMLElement = document.createElement('div') //包裹每一条 todo 的容器
		// todoItem.className = 'todo-item'
		// todoItem.innerHTML = this.todoViewTemp(todo) //传入 todo 数据!! 【todoViewTemp】继承自 TodoTemplate 父类
		// this.allTodoWrapper.appendChild(todoItem)
	}

	

	// 删除 todo DOM (🔥底层的 todoModelEvent.ts 在数据更改完成后回调用此方法来修改视图！)（因为有继承关系！）
	protected removeItemDOM (targetDeleteBtn: HTMLElement) { //target 就是删除按钮
		const oParentNode: HTMLElement = FindParentNode(targetDeleteBtn, 'todo-item')!
		if(oParentNode) {
			console.log(oParentNode);
			oParentNode.remove() //移除掉父节点（相当于删除掉这一项）
		}
	}



	// 🔥修改 todo DOM 的 checkbox 样式 (🔥底层的 todoModelEvent.ts 在数据更改完成后回调用此方法来修改视图！)（因为有继承关系！）
	protected changeCompletedDOM (target: HTMLElement, completed: boolean) {//🔥记住要把 completed 状态传进去, 用来判断样式
		const oParentNode: HTMLElement = FindParentNode(target, 'todo-item')!
		const oContent: HTMLElement = oParentNode.getElementsByTagName('span')[0]//获得 DOM

		oContent.style.textDecoration = completed ? 'line-through' : 'none' //🔥修改样式
	}
}


export default TodoDOM;