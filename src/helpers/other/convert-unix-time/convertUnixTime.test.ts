import convertUnixTime from "./convertUnixTime";

describe("time tests", () => {
    it("expect current date to be 'Now'", () => {
        expect(convertUnixTime(new Date().getTime())).toBe("Now")
    })
    
    it("expect current date minus 1 minute to be '1 minutes'", () => {
        expect(convertUnixTime(new Date().getTime() - 60000)).toBe("1 minutes")
    })
    
    it("expect current date minus 10 minutes to be '10 minutes'", () => {
        expect(convertUnixTime(new Date().getTime() - 60000 * 10)).toBe("10 minutes")
    })
    
    it("expect current date minus 1 hour to be '1 hour'", () => {
        expect(convertUnixTime(new Date().getTime() - 60000 * 60)).toBe("1 hour")
    })
        
    it("expect current date minus 12 hour to be '12 hour'", () => {
        expect(convertUnixTime(new Date().getTime() - 60000 * 60 * 12)).toBe("12 hour")
    })

    it("expect current date minus 48 hour to be '2 day'", () => {
        expect(convertUnixTime(new Date().getTime() - 60000 * 60 * 12 * 4)).toBe("2 day")
    })

    it("expect current date minus 8 days to be '1 week'", () => {
        expect(convertUnixTime(new Date().getTime() - 60000 * 60 * 12 * 4 * 4)).toBe("1 week")
    })

    it("expect current date minus 32 days to be '1 month'", () => {
        expect(convertUnixTime(new Date().getTime() - 60000 * 60 * 12 * 4 * 4 * 4)).toBe("1 month")
    })

    it("expect current date minus 64 days to be '2 month'", () => {
        expect(convertUnixTime(new Date().getTime() - 60000 * 60 * 12 * 4 * 4 * 4 * 2)).toBe("2 month")
    })

    it("expect current date minus 400 days to be '1 year'", () => {
        expect(convertUnixTime(new Date().getTime() - 60000 * 60 * 24 * 400)).toBe("1 year")
    })
})