import { ITodoData } from "./type/typing";


// Model 数据层
class TodoModelEvent { //🔥里边的方法由上层 app.ts 调用
	//从上层接收 todoData 数据(以确保 todoData 的唯一性)
	private todoData: ITodoData[] = []

	constructor(todoData: ITodoData[]) {
		this.todoData = todoData
	}

	// app.ts 上层要调用这些方法
	addTodoData(todoData: ITodoData): undefined | number {
		 // 内容去重
		 const _isExist: ITodoData | undefined = this.todoData.find((item: ITodoData) =>item.content === todoData.content)

		// 重复则提醒, 不重复则添加
		if(_isExist) {
			alert('内容已存在')
			return 404
		} 

		 this.todoData.push(todoData)
		 return //return 后就是 undefined
	}


	removeTodoData(_id: number): void {
		this.todoData = this.todoData.filter((item: ITodoData) => item.id !== _id)
	}


	toggleTodoCompleteData(_id: number): void {
		this.todoData = this.todoData.map((item: ITodoData) => {
			if(item.id === _id) {
				item.completed = !item.completed
			}
			return item
		})
	}
}


export default TodoModelEvent;