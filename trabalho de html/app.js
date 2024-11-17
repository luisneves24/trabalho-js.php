document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = "https://run.mocky.io/v3/404a6d49-8763-45d3-9ff0-990f51fb2eed";  // URL da API mock
  const dogTableBody = document.querySelector('#dog-table tbody');
  const dogForm = document.getElementById('dog-form');

  // Função para buscar e exibir os dados da API
  async function fetchData() {
      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          populateTable(data);
      } catch (error) {
          console.error('Erro ao buscar os dados:', error);
      }
  }

  // Função para preencher a tabela com os dados
  function populateTable(dogs) {
      dogTableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

      dogs.forEach(dog => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td><img src="${dog.foto}" alt="Foto do cachorro" width="50" height="50"></td>
              <td>${dog.nomeCachorro}</td>
              <td>${dog.nomeDono}</td>
              <td>${dog.telefone}</td>
              <td>${dog.email}</td>
              <td>
                  <button class="edit-btn" data-id="${dog.id}">Editar</button>
                  <button class="delete-btn" data-id="${dog.id}">Excluir</button>
              </td>
          `;
          dogTableBody.appendChild(tr);
      });
  }

  // Função para adicionar um novo cachorro
  dogForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nomeCachorro = document.getElementById('nomeCachorro').value;
      const nomeDono = document.getElementById('nomeDono').value;
      const telefone = document.getElementById('telefone').value;
      const email = document.getElementById('email').value;
      const foto = document.getElementById('foto').value;

      const newDog = {
          foto,
          nomeCachorro,
          nomeDono,
          telefone,
          email,
          id: Date.now() // Gerando um ID único
      };

      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td><img src="${newDog.foto}" alt="Foto do cachorro" width="50" height="50"></td>
          <td>${newDog.nomeCachorro}</td>
          <td>${newDog.nomeDono}</td>
          <td>${newDog.telefone}</td>
          <td>${newDog.email}</td>
          <td>
              <button class="edit-btn" data-id="${newDog.id}">Editar</button>
              <button class="delete-btn" data-id="${newDog.id}">Excluir</button>
          </td>
      `;
      dogTableBody.appendChild(tr);

      // Limpa o formulário
      dogForm.reset();
  });

  // Função para editar um cachorro
  dogTableBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-btn')) {
          const dogId = event.target.getAttribute('data-id');
          const dogRow = event.target.closest('tr');
          const dogName = prompt('Novo nome do cachorro:', dogRow.children[1].textContent);
          const ownerName = prompt('Novo nome do dono:', dogRow.children[2].textContent);

          if (dogName) dogRow.children[1].textContent = dogName;
          if (ownerName) dogRow.children[2].textContent = ownerName;
      }
  });

  // Função para excluir um cachorro
  dogTableBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
          const dogRow = event.target.closest('tr');
          dogRow.remove();
      }
  });

  // Carregar os dados da API
  fetchData();
});
