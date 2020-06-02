const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");
const endpointUrl = "/todos/";

let timeout = 20000;
let firstTodo, newTodoId;
const nonExistingTodoId = "5d5fff516bef3c07ecf32f91";
const testData = { title: "Make integration test for PUT", status: "pending" };

afterAll((done) => {
    done();
});

describe(endpointUrl, () => {
    test("POST " + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.status).toBe(newTodo.status);
        newTodoId = response.body._id;
    });

    test("should return error 500 on malformed data with POST", async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({"title": "missing status property"});
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            "message":
            "todo validation failed: status: Path `status` is required."
        });
    });
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy(); 
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].status).toBeDefined();
        firstTodo = response.body[0];
    }, timeout);

    test("GET by Id " + endpointUrl + ":todoId", async () => {
        const response = await request(app).get(endpointUrl + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.status).toBe(firstTodo.status);
    }, timeout);

    test("GET todo by id that doesn't exist" + endpointUrl + ":todoId", async () => {
        const response = await request(app).get(
          endpointUrl + "5d5fdf726bef3c07ecf11f77"
        );
        expect(response.statusCode).toBe(404);
    });

    it("PUT " + endpointUrl, async () => {
        const res = await request(app)
            .put(endpointUrl + newTodoId)
            .send(testData);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.status).toBe(testData.status);
    });
    it("should return 404 on PUT " + endpointUrl, async () => {
        const res = await request(app)
            .put(endpointUrl + nonExistingTodoId)
            .send(testData);
        expect(res.statusCode).toBe(404);
    });
    test("HTTP DELETE 200", async () => {
        const res = await request(app)
            .delete(endpointUrl + newTodoId)
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.status).toBe(testData.status);
    });
    test("HTTP DELETE 404", async () => {
        const res = await request(app)
            .delete(endpointUrl + nonExistingTodoId)
            .send();
        expect(res.statusCode).toBe(404);
    });
});
