import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';


// 读取本地文件
export function readFileFn (path: string) : string {
	return readFileSync(resolve(__dirname, path), 'utf-8')
}


// 修改本地文件, 传入路径和数据, 数据类型是范型 T, 在使用它时才传入类型
export function writeFileFn<T> (path: string, data: T) : void { //data 是个数组
	writeFileSync(resolve(__dirname, path), JSON.stringify(data)) //要转为 JSON 格式才能写入
}