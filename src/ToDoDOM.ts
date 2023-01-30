
//视图层 用于渲染 todo 列表
class TodoDOM {//🔥里边的方法由 TodoEvent 调用
	private todoWrapper: HTMLElement //放置 todo 的容器

	constructor(todoWrapper: HTMLElement) {
		this.todoWrapper = todoWrapper
	}
}

export default TodoDOM;