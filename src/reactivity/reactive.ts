import { tick, triger } from "./effect";

export function reactive(inf) {
	return new Proxy(inf, {
		get(target, key) {
			const val = Reflect.get(target, key);
			tick(target, key);
			return val;
		},
		set(target, key, value) {
			const val = Reflect.set(target, key, value);
			triger(target, key);
			return val;
		},
	});
}
