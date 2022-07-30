class ReactiveEffect {
	private _fn: any;
	constructor(fn, public scheduler?) {
		this._fn = fn;
	}

	run() {
		activeEffect = this;
		return this._fn();
	}
}

const newMap = new Map();

export function tick(target, key) {
	let depsMap = newMap.get(target);
	if (!depsMap) {
		depsMap = new Map();
		newMap.set(target, depsMap);
	}
	let dep = depsMap.get(key);
	if (!dep) {
		dep = new Set();
		depsMap.set(key, dep);
	}
	dep.add(activeEffect);
}

export function triger(target, key) {
	let targetMap = newMap.get(target);
	let dep = targetMap.get(key);

	for (let fn of dep) {
		if (fn.scheduler) {
			fn.scheduler();
		} else {
			fn.run();
		}
	}
}

let activeEffect;
export function effect(fn, options?) {
	const newActiveEffect = new ReactiveEffect(fn, options?.scheduler);
	newActiveEffect.run();
	return newActiveEffect.run.bind(newActiveEffect);
}
