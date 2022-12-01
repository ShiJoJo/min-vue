import { isReactive, isReadOnly, reactive, readonly } from "../reactive";

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

	it("isReadOnly and isReactive", () => {
		const foo = { age: 1 };
		const isReadOnlyFoo = readonly(foo);
		const isReactiveFoo = reactive(foo);
		expect(isReactive(isReactiveFoo)).toBe(true);
		expect(isReadOnly(isReadOnlyFoo)).toBe(true);
		expect(isReactive(foo)).toBe(false);
	})
	it('nested readonly', () => {
		const original = {
			nested: {
				foo: 1
			},
			arrary: [{ bar: 2 }]
		}
		const observed = readonly(original);
		expect(isReadOnly(observed.nested)).toBe(true);
		expect(isReadOnly(observed.arrary)).toBe(true);
		expect(isReadOnly(observed.arrary[0])).toBe(true);

	});
});
