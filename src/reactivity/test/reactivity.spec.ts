import { reactivity } from "../reactivity";

describe("reactivity", () => {
	it("reactivity", () => {
		const foo = { foo: 1 };
		const newFoo = reactivity(foo);
		expect(newFoo).not.toBe(foo);
		expect(newFoo.foo).toBe(1);
	});
});
