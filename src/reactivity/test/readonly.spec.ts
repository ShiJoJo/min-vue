import { readonly } from "../reactive";

describe("readonly", () => {
	it("happy path", () => {
		const foo = { foo: 1, age: 2 };
		const readonlyFoo = readonly(foo);
		expect(readonlyFoo).not.toBe(foo);
		expect(readonlyFoo.foo).toBe(1);
	});
	it("warn then when call", () => {
		console.warn = jest.fn();
		const callWarn = readonly({ age: 1 });
		callWarn.age = 2;
		expect(console.warn).toBeCalled();
	});
});
