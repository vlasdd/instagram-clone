import generateRandom from "./generateRandom";

describe("randomizer tests", () => {
    it("expect the result to be never equal to the second param", () => {
        for(let i = 0; i < 1000; i++){
            expect(generateRandom(0, 10)).not.toBe(10)
        }
    })
})