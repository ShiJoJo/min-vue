import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandle";

export enum isReactiveFlag {
	Is_Reactive = '__v_reactive',
	Is_ReadOnly = '__v_readonly'
}

export function reactive(inf) {
	return creatObjectReactive(inf, mutableHandlers);
}

export function readonly(inf) {
	return creatObjectReactive(inf, readonlyHandlers);
}

export function shallowReadonly(inf) {
	return creatObjectReactive(inf, shallowReadonlyHandlers);
}

export function isReactive(foo) {
	return !!foo[isReactiveFlag.Is_Reactive];
}
export function isReadOnly(foo) {
	return !!foo[isReactiveFlag.Is_ReadOnly];
}

function creatObjectReactive(inf, fuc) {
	return new Proxy(inf, fuc);
}