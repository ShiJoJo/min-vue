import { tick, triger } from "./effect";
const get = createGetter();
const set = createSetter();
const readGet = createGetter(true);


function createGetter(readonly = false) {
	return function get(target, key) {
		const val = Reflect.get(target, key);
		if (!readonly) {
			tick(target, key);
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