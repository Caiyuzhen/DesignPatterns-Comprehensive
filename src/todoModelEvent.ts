import TodoDOM from "./ToDoDOM";
import { getTodoList, removeTodo } from "./TodoService/TodoService";
import { ITodoData } from "./type/typing";


// Model 数据层
class TodoModelEvent extends TodoDOM {
	static toggleTodoCompleteData(target: HTMLElement, todoId: number) {
		throw new Error('Method not implemented.');
	} //🔥里边的方法由上层 app.ts 调用
	//从上层接收 todoData 数据(以确保 todoData 的唯一性)
	private todoData: ITodoData[] = []


	constructor(todoData: ITodoData[], todoWrapper: HTMLElement) {
		super(todoWrapper) //🏓🏓 2.因为子类继承了 TodoDOM, 所以要 super 一下, 然后把 todoWrapper 传给 TodoDOM!!本质上传递的是 app.ts 内的 oTodoList !!
		this.todoData = todoData

		this.initDOM(this.todoData) //🚗🚗🚗 在操作数据前, 把数据中的已有 todo 渲染到 DOM 上!!
	}


	
	// 🔥app.ts 上层要调用这些方法
	// 添加 todo 数据
	public addTodoData(todoData: ITodoData): undefined | number {
		 // 内容去重
		 const _isExist: ITodoData | undefined = this.todoData.find((item: ITodoData) =>item.content === todoData.content)

		// 重复则提醒, 不重复则添加
		if(!_isExist) {
			this.todoData.push(todoData)
			this.addItemDOM(todoData) //🔥调用父类的 addItemDOM 方法（因为有继承关系！）
			return //return 后就是 undefined
		} 

		// alert('内容已存在') //🔥不要在这里 alert, 要在 app.ts 上 alert
		return 404 //返回错误码
	}


	//🚗🚗🚗 在操作数据前, 把数据中的已有 todo 渲染到 DOM 上!!
	@getTodoList //装饰器, 先去请求数据, 把数据传给 initDOM
	private initDOM (newTodoData: ITodoData[]) {
		this.todoData = newTodoData //constructor 中的 this.todoData 重新赋值给 newTodoData (🔥🔥🔥相当于请求完 api 后的数据, 把数据传给 constructor 中的 this.todoData)
		this.initList(this.todoData)//拿到初始化的数据
	}


	// 移除 todo 数据
	@removeTodo
	public removeTodoData(_id: number, targetDelBtn: HTMLElement): void {
		this.todoData = this.todoData.filter((item: ITodoData) => item.id !== _id)
		this.removeItemDOM(targetDelBtn)//🔥调用父类的 removeItemDOM 方法（因为有继承关系！）
	}


	// checkbox 数据
	public toggleTodoCompleteData(_id: number, target: HTMLElement): void {
		this.todoData = this.todoData.map((item: ITodoData) => {
			if(item.id === _id) {
				item.completed = !item.completed
				this.changeCompletedDOM(target, item.completed)//🔥把数据状态传递给 DOM 视图层！🔥调用父类的 addItemDOM 方法（因为有继承关系！）
			}
			return item
		})
	}
}


export default TodoModelEvent;