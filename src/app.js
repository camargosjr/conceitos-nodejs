const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {

  const id = uuid()

  const { title, url, techs } = request.body;
  const newRepository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(newRepository);
  return response.status(201).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const idUpdate = request.params.id;
  const { title, url, techs } = request.body;


  const repository = repositories.find(repository => repository.id === idUpdate);

  if (repository) {
    repository.title = title;
    repository.url = url;
    repository.techs = techs;

    return response.json(repository);
  }
return response.status(400).json({msg:'error update'});

});

app.delete("/repositories/:id", (request, response) => {
  const idDelete = request.params.id;

  const result = repositories.findIndex((repo) => repo.id === idDelete);

  if (result >= 0) {
    repositories.splice(result, 1);
    return response.status(204).json({});
  }
  return response.status(400).json({error: 'not found'});
});

app.post("/repositories/:id/like", (request, response) => {
  const idLike = request.params.id;

  const repository = repositories.find(repository=> repository.id === idLike);

  if (repository){
    repository.likes +=1;
    return response.status(201).json(repository);
  }

  return response.status(400).json({error: 'not found'});
});

module.exports = app;
