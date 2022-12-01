import { isProxy, isReactive, reactive } from "../reactive";

describe("reactive", () => {
	it("reactive", () => {
		const foo = { foo: 1 };
		const newFoo = reactive(foo);
		expect(newFoo).not.toBe(foo);
		expect(newFoo.foo).toBe(1);
	});

	test('nested reactive', () => {
		const original = {
			nested: {
				foo: 1
			},
			arrary: [{ bar: 2 }]
		}
		const observed = reactive(original);
		expect(isReactive(observed.nested)).toBe(true);
		expect(isReactive(observed.arrary)).toBe(true);
		expect(isReactive(observed.arrary[0])).toBe(true);
		expect(isProxy(observed)).toBe(true);

	});
});
