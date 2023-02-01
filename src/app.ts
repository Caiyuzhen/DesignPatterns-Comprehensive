// 立即执行函数
import { ITodoData } from './type/typing'
import TodoModelEvent  from './todoModelEvent'


// Event 事件层 (就负责用来调用 数据操作跟 DOM 操作的方法)
((doc) => {
	const oInput: HTMLInputElement = doc.querySelector('input') as HTMLInputElement
	const oAddBtn: HTMLButtonElement = doc.querySelector('.add-btn') as HTMLButtonElement
	const oTodoList: HTMLElement = doc.querySelector('.todo-list') as HTMLElement

	const todoData: ITodoData[] = [
		{
			id: 1,
			content: '123',
			completed: false
		},
		{
			id: 2,
			content: '456',
			completed: true
		},
		{
			id: 3,
			content: '789',
			completed: false
		}
	]


	// 实例化 TodoEvent
	const todoModelEventIns = new TodoModelEvent(//🔥🔥把 todoData 数据、oTodoList 传给 TodoEvent 类！让它去修改数据以及修改视图！
		todoData, 
		oTodoList //🏓🏓 1.父类传递给 TodoModelEvent 子类!
	)


	// 总开关
	const init = (): void => {
		bind()
		// console.log(todoModelEventIns.removeTodoData);
	}


	const bind = (): void => {
		oAddBtn.addEventListener('click', handleAddBtnClick, false) 
		oTodoList.addEventListener('click', handleTodoListClick, false) 
	}



	// ⚡️总的添加的事件（执行 添加数据 跟 构建 DOM 视图 两个方法）
	function handleAddBtnClick (): void {
		const val: string = oInput.value //获取输入框内的值
		if(val.length) {
			// 添加执行下层添加数据的方法
			const res = todoModelEventIns.addTodoData(<ITodoData>{ //🔥通过 todoModelEvent 的【实例】调用 TodoModelEvent 内的方法
				id: new Date().getTime(),// 时间戳
				content: val,
				completed: false
			}) 
			oInput.value = ''

			//🔥todoModelEvent.ts 如果报错会返回 404 错误码（在 todoModelEvent.ts 中有定义）
			if(res && res === 404){
				alert('💔 添加失败, todo 已存在!')
			}
			
		} else {
			return
		}
		console.log(todoData);
	}


	
	// ⚡️总的【修改】跟【删除】事件 (checkbox 和 删除 btn)
	function handleTodoListClick (e: MouseEvent): void {
		// 根据对象类型判断事件对象是 checkbox 还是 删除 btn
		const target = e.target as HTMLElement //HTMLElement 才有 target 属性！
		const tagName = target.tagName.toLowerCase()
		

		// console.log(target);
		if(tagName === 'input' || tagName === 'button') { //是这两个元素才触发
			const todoId: number = parseInt((target.dataset.id)!)

			switch(tagName)	{ //判断 tagName 是 input 还是 button
				case 'button': //🔥删除按钮
					todoModelEventIns.removeTodoData(todoId, target)  //🔥通过 todoModelEvent 的【实例】调用 TodoModelEvent 内的方法
					break
				case 'input': //🔥修改 checkbox
					todoModelEventIns.toggleTodoCompleteData(todoId, target) //🔥通过 todoModelEvent 的【实例】调用 TodoModelEvent 内的方法
					break
				default:
					break
			}
		}
	}

	init()
})(document)