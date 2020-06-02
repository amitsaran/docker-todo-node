const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");
const endpointUrl = "/todos/";
//const connection = require("../../mongodb/mongodb.connect");

let timeout = 20000;
let firstTodo, newTodoId;
const nonExistingTodoId = "5d5fff516bef3c07ecf32f91";
const testData = { title: "Make integration test for PUT", status: "pending" };

afterAll(async (done) => {
    console.log("after all tests are run");
    done();
    setTimeout(() => process.exit(), 1000);
});

describe(endpointUrl, () => {
    test("POST " + endpointUrl, async (done) => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.status).toBe(newTodo.status);
        newTodoId = response.body._id;
        done();
    }, timeout);

    test("should return error 500 on malformed data with POST", async (done) => {
        const response = await request(app)
            .post(endpointUrl)
            .send({"title": "missing status property"});
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            "message":
            "todo validation failed: status: Path `status` is required."
        }, timeout);
        done();
    });
    test("GET " + endpointUrl, async (done) => {
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy(); 
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].status).toBeDefined();
        firstTodo = response.body[0];
        done()
    }, timeout);

    test("GET by Id " + endpointUrl + ":todoId", async (done) => {
        const response = await request(app).get(endpointUrl + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.status).toBe(firstTodo.status);
        done();
    }, timeout);

    test("GET todo by id that doesn't exist" + endpointUrl + ":todoId", async (done) => {
        const response = await request(app).get(
          endpointUrl + "5d5fdf726bef3c07ecf11f77"
        );
        expect(response.statusCode).toBe(404);
        done();
    }, timeout);

    it("PUT " + endpointUrl, async (done) => {
        const res = await request(app)
            .put(endpointUrl + newTodoId)
            .send(testData);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.status).toBe(testData.status);
        done();
    }, timeout);
    it("should return 404 on PUT " + endpointUrl, async (done) => {
        const res = await request(app)
            .put(endpointUrl + nonExistingTodoId)
            .send(testData);
        expect(res.statusCode).toBe(404);
        done();
    }, timeout);
    test("HTTP DELETE 200", async (done) => {
        const res = await request(app)
            .delete(endpointUrl + newTodoId)
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.status).toBe(testData.status);
        done();
    }, timeout);
    test("HTTP DELETE 404", async (done) => {
        const res = await request(app)
            .delete(endpointUrl + nonExistingTodoId)
            .send();
        expect(res.statusCode).toBe(404);
        done()
    }, timeout);
});
