//const {MongoClient} = require("mongodb");
const { connect } = require("../../mongodb/mongodb.connect");

let timeout = 20000;

describe("mongodb", () => {
    let connection;

    beforeAll(async () => {
        connection = await connect();
    }, timeout);

    afterAll(async () => {
        await connection.close();
    });

    it("should have a successful connection", () => {
        expect(connection).toBeDefined();
        expect(connection).not.toBeNull();
    });

    it("should throw error", async () => {
        try{
            await connect("abc");
        }catch(e){
            expect(e).toBeDefined();
            expect(e).not.toBeNull();
        }
    });
});