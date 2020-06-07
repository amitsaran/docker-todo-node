//const {MongoClient} = require("mongodb");
const { connect } = require("../../mongodb/mongodb.connect");

describe("mongodb", () => {
    let collection;
    //let db;

    beforeAll(async () => {
        //connection = await MongoClient.connect("mongodb+srv://amit:amit@cluster0-sw1lq.mongodb.net/todo-tdd?retryWrites=true&w=majority",
        //{
        //    useUnifiedTopology: true,
        //    useNewUrlParser: true
        //});



        //db = await connection.db();
        connection = await connect();
    });

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