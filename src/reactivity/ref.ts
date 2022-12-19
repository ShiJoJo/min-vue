import { isTrackIng, trackEffects, trigerEffects } from "./effect";
import { reactive } from "./reactive";
import { isChange, isObject } from "./share";

class RefImpl {
    public _value;
    private dep;
    private _rawValue: any;
    constructor(val) {
        this._rawValue = val;
        this._value = convert(val);
        this.dep = new Set();
    }

    get value() {
        trackRefValue(this);
        return this._value;
    }

    set value(newValue) {
        // 若为objec类型时  _value为proxy newValue还是object 因此需要_rawValue保存一个初始对象
        if (isChange(this._rawValue, newValue)) {
            this._rawValue = newValue;
            this._value = convert(newValue);
            trigerEffects(this.dep);
        }
    }
}

function convert(val) {
    return isObject(val) ? reactive(val) : val;
}

export function trackRefValue(ref) {
    if (isTrackIng()) {
        trackEffects(ref.dep);
    }
}


export function ref(val) {
    return new RefImpl(val);
};