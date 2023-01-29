// 立即执行函数
import { ITodoData } from './type/typing'

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


	const init = (): void => {
		bind()
	}


	const bind = (): void => {
		oAddBtn.addEventListener('click', handleAddBtnClick, false) 
		oTodoList.addEventListener('click', handleTodoListClick, false) 
	}


	function handleAddBtnClick (): void {
		const val = oInput.value
		if(!val) {
			return
		} else {
			todoData.push({
				// 时间戳
				id: new Date().getTime(),
				content: val,
				completed: false
			})
		}
		console.log(todoData);
	}


	function handleTodoListClick (e: MouseEvent): void {
		// 根据对象类型判断事件对象是 checkbox 还是 删除 btn
		const target = e.target as HTMLElement
		const tagName = target.tagName.toLowerCase()
		// console.log(target);
		if(tagName === 'input' || tagName === 'button') {
			const id = target.dataset.id as string		
		}
	}

	init()
})(document)