import express, { request, response } from "express";

const app = express();
const port = 3000;

//to receive data from frontend

app.use(express.json()); //it means we will accept any data that comes in json format
let teaData = [];
let nextId = 1;

//add a tea
app.post("/teas", (request, response) => {
  const { name, price } = request.body;

  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  response.status(200).send(newTea);
});

//update tea
app.put("/teas/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const { name, price } = request.body;

  if (id < 0 || id > teaData.length) {
    console.log("INvalid Id", id);
    response.status(401).send({
      status: 401,
      message: `Invalid id. your array is ${teaData.length}`,
    });
  }

  const tea = teaData.find((t) => t.id == id);


  if (!tea) {
    console.log("cannot found tea");
    response.status(404).send({
      status: 404,
      message: "Cannot find tea",
    });
  }

    tea.name = name;
  tea.price = price;

  response.status(200).send({
    status: 200,
    message: "updated successfull",
    data: tea,
  });
});

// route to all tea
app.get("/teas", (request, response) => {
  response.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (request, response) => {
  const id = parseInt(request.params.id);

  console.log("id from url", id);

  if (id < 0 || id > teaData.length) {
    console.log("INvalid Id", id);
    response.status(401).send({
      status: 401,
      message: `Invalid id. your array is ${teaData.length}`,
    });
  }

  const tea = teaData.find((t) => t.id == id);

  if (!tea) {
    console.log("cannot found tea");
    response.status(404).send({
      status: 404,
      message: "Cannot find tea",
    });
  }

  console.log("found tea", id);
  response.status(200).send({
    status: 200,
    data: tea,
    message: "successfull",
  });
});

app.delete("/teas/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const index = teaData.findIndex(t => t.id == id);
    teaData.pop(index);

    response.status(200).send({
    status: 200,
    data: teaData,
    message: "removed successfull",
  });
});

app.listen(port, () => {
  console.log("server is running on ", port);
});
