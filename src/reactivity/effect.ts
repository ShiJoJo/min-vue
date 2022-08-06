import { extend } from "./share";

class ReactiveEffect {
	private _fn: any;
	_stop: any;
	onStop?: () => void;
	deps = [];
	active = true;
	constructor(fn, public scheduler?) {
		this._fn = fn;
	}

	run() {
		activeEffect = this;
		return this._fn();
	}
	stop() {
		if (this.active) {
			this.active = false;
			if (this.onStop) {
				this.onStop();
			}
			cleanupEffect(this);
		}
	}
}

function cleanupEffect(effect) {
	effect.deps.forEach((deep: any) => {
		deep.delete(effect);
	});
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
	if (!activeEffect) return;
	dep.add(activeEffect);
	activeEffect.deps.push(dep);
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
	const _effect = new ReactiveEffect(fn, options?.scheduler);
	_effect.run();
	extend(_effect, options);
	const runner: any = _effect.run.bind(_effect);
	runner.effect = _effect;

	return runner;
}

export function stop(runner: any) {
	runner.effect.stop();
}
