import { track, triger } from "./effect";
import { isReactiveFlag, reactive, readonly } from "./reactive";
import { extend, isObject } from "./share";
const get = createGetter();
const set = createSetter();
const readGet = createGetter(true);
const shallowGet = createGetter(true, true);


function createGetter(isReadonly = false, isShallow = false) {
	return function get(target, key) {
		const val = Reflect.get(target, key);
		if (key === isReactiveFlag.Is_Reactive) {
			return !isReadonly;
		} else if (key === isReactiveFlag.Is_ReadOnly) {
			return isReadonly;
		}

		if (isShallow) {
			return val;
		}

		if (isObject(val)) {
			return isReadonly ? readonly(val) : reactive(val);
		}


		if (!isReadonly) {
			track(target, key);
		}
		return val;
	};
}
function createSetter() {
	return function set(target, key, value) {
		const val = Reflect.set(target, key, value);
		triger(target, key);
		return val;
	};
}

export const mutableHandlers = {
	get,
	set
};

export const readonlyHandlers = {
	get: readGet,
	set(target, key, value) {
		console.warn(`该target${key}为只读`, target);
		return true;
	},
};

export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
	get: shallowGet
})