import { ITodoData } from "./type/typing";

// 负责视图的模板
class TodoTemplate {
	// 解构方法一
	// protected todoViewTemp (todo: ITodoData): string { //也是只暴露给 TodoDOM 这个子类!!
	// 	const {id, content, completed} = todo
	//  	return `
	// 		...
	//  	`
	// }

	// // 解构方法二
	// protected todoViewTemp ({ id, content, completed }: ITodoData): string { //也是只暴露给 TodoDOM 这个子类!!
	// 	return `
	// 		...
	// 	`
	// }

	protected todoViewTemp ({ id, content, completed }: ITodoData): string { //也是只暴露给 TodoDOM 这个子类!!
		return `
			<input type="checkbox" ${ completed ? 'checked' : ''} data-id="${ id }" />
			<span style="text-decoration: ${ completed ? 'line-through' : 'none' }" > ${ content } </span>
			<button data-id="${ id }">删除</button>
		`
	}
}


export default TodoTemplate;