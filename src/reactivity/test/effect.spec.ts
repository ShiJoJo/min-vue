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
});
