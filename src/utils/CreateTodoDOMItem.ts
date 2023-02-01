//🔥抽象出创建 todoDOM 的工具方法, initList 跟 addItemDOM 都会用到

export function createTodoItem (tagName: string, className: string, todoItemDOM: string) : HTMLElement {
	const todoItem: HTMLElement = document.createElement('div') //包裹每一条 todo 的容器
	todoItem.className = 'todo-item'
	todoItem.innerHTML = todoItemDOM //把传入的 todoItemDOM 嵌入回【容器内】

	return todoItem
}
