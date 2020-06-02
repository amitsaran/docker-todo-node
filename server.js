const app = require("./app");

app.get("/", (req, res) => {
    res.json({"data": "Hello World!!!"})
});

app.listen(3000, () => {
    console.log("Server is up and running");
});
