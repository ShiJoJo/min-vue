class ReactiveEffect {
	private _fn: any;
	constructor(fn) {
		this._fn = fn;
	}

	run() {
		activeEffect = this;
		this._fn();
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
		fn.run();
	}
}

let activeEffect;
export function effect(fn) {
	const newActiveEffect = new ReactiveEffect(fn);
	newActiveEffect.run();
}
