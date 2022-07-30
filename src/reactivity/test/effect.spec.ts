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
});
