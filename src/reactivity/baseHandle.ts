import { track, triger } from "./effect";
import { isReactiveFlag } from "./reactive";
const get = createGetter();
const set = createSetter();
const readGet = createGetter(true);


function createGetter(readonly = false) {
	return function get(target, key) {
		const val = Reflect.get(target, key);
		if (key === isReactiveFlag.Is_Reactive) {
			return !readonly;
		} else if (key === isReactiveFlag.Is_ReadOnly) {
			return readonly;
		}
		if (!readonly) {
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