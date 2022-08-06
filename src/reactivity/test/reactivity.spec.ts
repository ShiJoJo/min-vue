import { reactive } from "../reactive";

describe("reactive", () => {
	it("reactive", () => {
		const foo = { foo: 1 };
		const newFoo = reactive(foo);
		expect(newFoo).not.toBe(foo);
		expect(newFoo.foo).toBe(1);
	});
});
