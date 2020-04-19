import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get("repositories").then(res => {
      setRepositories(res.data);
    })
  },[])



  async function handleAddRepository() {

    const response = await api.post("repositories", {
      title: `Texto novo ${Date.now()}`,
      url: "www.meurepo.com.br",
      techs: [
        "node",
        "php"
      ]
    })

    setRepositories([ ...repositories, response.data]);
  }



  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (

    <>
      <ul data-testid="repository-list">

        { repositories.map(repo => (
           
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
