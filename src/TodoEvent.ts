import { ITodoData } from "./type/typing";


class TodoEvent {
	//从上层接收 todoData 数据(以确保 todoData 的唯一性)
	private todoData: ITodoData[] = []

	constructor(todoData: ITodoData[]) {
		this.todoData = todoData
	}

	// app.ts 上层要调用这些方法
	addTodoData(todoData: ITodoData) {
		 // 内容去重
		 const _isExist = this.todoData.find(item =>item.content === todoData.content)

		// 当重复内容不存在时，才添加
		 if(_isExist) {
			 alert('内容已存在')
			 return
		 } 
		 this.todoData.push(todoData)
	}

	removeTodoData(id: string) {
		
	}

	toggleTodoCompleteData(id: string) {
		
	}
}


export default TodoEvent;