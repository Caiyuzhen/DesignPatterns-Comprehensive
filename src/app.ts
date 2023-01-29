// 立即执行函数
import { ITodoData } from './type/typing'
import TodoModelEvent  from './todoModelEvent'


// Event 事件层
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
	const todoModelEvent = new TodoModelEvent(todoData)//🔥🔥把 todoData 数据传给 TodoEvent 类！让它去修改数据!!


	// 总开关
	const init = (): void => {
		bind()
	}


	const bind = (): void => {
		oAddBtn.addEventListener('click', handleAddBtnClick, false) 
		oTodoList.addEventListener('click', handleTodoListClick, false) 
	}


	// 添加
	function handleAddBtnClick (): void {
		const val = oInput.value
		if(!val) {
			return
		} else {
			// 添加数据
			todoModelEvent.addTodoData(<ITodoData>{
				id: new Date().getTime(),// 时间戳
				content: val,
				completed: false
			}) 
			oInput.value = ''
		}
		console.log(todoData);
	}


	// 修改 (checkbox 和 删除 btn)
	function handleTodoListClick (e: MouseEvent): void {
		// 根据对象类型判断事件对象是 checkbox 还是 删除 btn
		const target = e.target as HTMLElement //HTMLElement 才有 target 属性！
		const tagName = target.tagName.toLowerCase()
		
		// console.log(target);
		if(tagName === 'input' || tagName === 'button') { //是这两个元素才触发
			switch(tagName)	{ //判断 tagName 是 input 还是 button
				case 'input':
					break
				case 'button':
					break
				default:
					break
			}
		}
	}

	init()
})(document)