import {Greeter} from "../index";

test('My Greeter', ()=>{
    expect(Greeter("carl")).toBe("Hello carl")
})