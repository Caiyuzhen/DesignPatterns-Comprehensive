// 根据类名查找目标元素的父节点

export function FindParentNode (targetDOM: HTMLElement, targetClassName: string) : HTMLElement | undefined {
	console.log(targetDOM, targetClassName);
	// console.log(targetDOM);
	// console.log(targetDOM.parentNode);
	while (targetDOM = targetDOM.parentNode as HTMLElement) {  //🔥不应该有 === !! 而是 = !! 才能去迭代 targetDOM 元素!!
		if(targetDOM.className === targetClassName) {
			return targetDOM
		}
	}
}