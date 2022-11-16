import { mutableHandlers, readonlyHandlers } from "./baseHandle";


export function reactive(inf) {
	return creatObjectReactive(inf, mutableHandlers);
}

export function readonly(inf) {
	return creatObjectReactive(inf, readonlyHandlers);
}

function creatObjectReactive(inf, fuc) {
	return new Proxy(inf, fuc);
}