// 根据类名查找目标元素的父节点

export function FindParentNode (targetDOM: HTMLElement, targetClassName: string) : HTMLElement | undefined {
	// console.log(targetDOM, targetClassName);
	// console.log(targetDOM);
	// console.log(targetDOM.parentNode);
	while (targetDOM === targetDOM.parentNode) { 
		if(targetDOM.className === targetClassName) {
			return targetDOM
		}
	}
}