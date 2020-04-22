const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repositorie);
  response.json(repositorie);
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const respositorieIndex = repositories.findIndex(
    (respositorie) => respositorie.id === id
  );

  if (respositorieIndex < 0) {
    return response.status(400).json({ erro: "ID not found." });
  }

  const { title, url, techs } = request.body;

  const respositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[respositorieIndex].likes,
  };

  repositories[respositorieIndex] = respositorie;

  response.json(respositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const respositorieIndex = repositories.findIndex(
    (respositorie) => respositorie.id === id
  );

  if (respositorieIndex < 0) {
    return response.status(400).json({ erro: "ID not found." });
  }

  repositories.splice(respositorieIndex, 1);

  response.status(204).json([]);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const respositorieIndex = repositories.findIndex(
    (respositorie) => respositorie.id === id
  );

  if (respositorieIndex < 0) {
    return response.status(400).json({ erro: "ID not found." });
  }

  repositories[respositorieIndex].likes++;

  response.json(repositories[respositorieIndex]);
});

module.exports = app;
