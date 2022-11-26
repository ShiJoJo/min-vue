import { extend } from "./share";
let activeEffect;
let shouldTrack = false;

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
		if (!this.active) {
			return this._fn();
		}
		shouldTrack = true;
		activeEffect = this;
		const result = this._fn();
		shouldTrack = false;


		return result;
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
	effect.deps.length = 0;
}

const newMap = new Map();

export function track(target, key) {
	if (!isTrackIng()) return;
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

	if (dep.has(activeEffect)) return;
	dep.add(activeEffect);
	activeEffect.deps.push(dep);
}

function isTrackIng() {
	return shouldTrack && activeEffect !== undefined;
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
