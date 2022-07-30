import { reactivity } from "../reactivity";
import { effect } from "../effect";
describe("effect", () => {
	it("effect", () => {
		const map = reactivity({
			age: 20,
		});

		let effectAge;
		effect(() => {
			effectAge = map.age + 1;
		});
		expect(effectAge).toBe(21);
		map.age++;
		expect(effectAge).toBe(22);
	});

	it("should return runner when call effect", () => {
		let foo = 10;
		const runner = effect(() => {
			foo++;
			return "foo";
		});
		expect(foo).toBe(11);
		const r = runner();
		expect(foo).toBe(12);
		expect(r).toBe("foo");
	});

	it("scheduler", () => {
		let dummy;
		let run;
		const scheduler = jest.fn(() => {
			run = runner;
		});
		const obj = reactivity({ foo: 1 });
		const runner = effect(
			() => {
				dummy = obj.foo;
			},
			{
				scheduler,
			}
		);

		expect(scheduler).not.toHaveBeenCalled();
		expect(dummy).toBe(1);
		obj.foo++;
		expect(scheduler).toHaveBeenCalledTimes(1);
		expect(dummy).toBe(1);
		run();
		expect(dummy).toBe(2);
		obj.foo++;
		expect(scheduler).toHaveBeenCalledTimes(2);
		expect(dummy).toBe(2);
	});
});
