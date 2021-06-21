<script>
  import { onMount } from "svelte";
  import { refresh } from "../stores/refresh";
  import { notify } from "../stores/notify";
  import { tableStandards } from "../stores/standardTables";
  import { BASE_URL } from "../stores/backendUrl";

  export let openModal; // Bind para o botao cancelar fechar o modal
  export let standard; // Qual dos Standar Models do array abaixo utilizar para montar o form
  export let edit; // True se for form de edicao False para form de criacao
  export let dataLink; // Link do endpoint a ser utilizado para form
  export let itemId; // ID do item que chamou o form
  export let specifyCreator;

  let standardModel = []; // Array com os padroes de cada tabela para construcao dos forms
  let content; // Main DIV onde todos os elementos criados vao ser acomodados
  let getData; // Ancora para fuga de escopo da funcao de busca de dados

  const standardModels = $tableStandards;

  if (edit) {
    let editDataLink = dataLink + itemId;
    getData = async () => {
      const response = await fetch(editDataLink);
      return await response.json();
    };
  }

  const inputField = (element, attr) => {
    element.setAttribute("type", attr.type);
    element.setAttribute("placeholder", attr.placeholder);
    element.setAttribute("name", attr.name);
    element.setAttribute("required", true);
    if (edit) {
      getData().then((result) => {
        element.setAttribute("value", result[attr.name]);
      });
    }
  };

  const textAreaField = (element, attr) => {
    element.setAttribute("placeholder", attr.placeholder);
    element.setAttribute("name", attr.name);
    element.setAttribute("required", true);
    if (edit) {
      getData().then((result) => {
        element.appendChild(document.createTextNode(result[attr.name]));
      });
    }
  };

  const selectField = async (element, attr) => {
    element.setAttribute("id", attr.label);
    element.setAttribute("name", attr.name);
    element.setAttribute("required", true);
    const response = await fetch(attr.tableReference);
    await response.json().then((result) => {
      result.forEach((item) => {
        const option = document.createElement("option");
        if (item.id == itemId) {
          option.setAttribute("selected", true);
        }
        option.setAttribute("id", item.id);
        option.appendChild(document.createTextNode(item.nome));
        element.appendChild(option);
      });
    });
  };

  if (standardModels.hasOwnProperty(standard)) {
    standardModel = standardModels[standard];
    onMount(() => {
      standardModel.forEach((field) => {
        field.forEach((attr) => {
          const child = document.createElement(attr.field);
          const label = document.createElement("label");
          const labelDiv = document.createElement("div");
          labelDiv.setAttribute("class", "label");
          label.setAttribute("for", attr.label);
          label.appendChild(document.createTextNode(attr.label));
          labelDiv.appendChild(label);
          switch (attr.field) {
            case "input":
              inputField(child, attr);
              break;
            case "textArea":
              textAreaField(child, attr);
              break;
            case "select":
              selectField(child, attr);
              break;
          }
          content.appendChild(labelDiv);
          content.appendChild(child);
        });
      });
    });
  } else {
    //TODO erro quando standart nao definido para formulario invocado
  }

  const getAuthUser = async () => {
    const response = await fetch($BASE_URL + "login/getAuthUser", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  };

  const handleSubmit = async (event) => {
    const formData = new FormData(event.target);
    const sendBody = {};

    for (const [k, v] of formData.entries()) {
      sendBody[k] = v;
    }

    if (specifyCreator) {
      const currentUser = await getAuthUser();
      sendBody["criador"] = currentUser.id;
    }

    const res = await fetch(
      edit
        ? $BASE_URL + standard + "/put/" + itemId
        : $BASE_URL + standard + "/post/",
      {
        method: edit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendBody),
      }
    );

    if (res.ok) {
      openModal = false;
      $refresh = true;
      $notify = true;
    }
  };
</script>

<div class="container">
  <form
    id="myform"
    class="content"
    on:submit|preventDefault={handleSubmit}
    bind:this={content}
  >
    <h1>{edit ? "Editar " : "Criar "} {standard}</h1>
  </form>
  <div class="bottom">
    <button
      class="cancel"
      on:click={() => {
        openModal = false;
      }}>Cancelar</button
    >
    <button type="submit" form="myform" class="save">Salvar</button>
  </div>
</div>

<style>
  .container {
    max-width: 35rem;
    min-width: 35rem;
    max-height: 40rem;
    border-radius: 10px;
  }

  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 35rem;
  }

  .bottom {
    display: flex;
    height: 4rem;
    padding-bottom: 1rem;
    justify-content: flex-end;
    align-items: flex-end;
  }

  button {
    cursor: pointer;
    height: 2.5rem;
    width: 6rem;
    margin-right: 1rem;
    font-size: medium;
    border: 2px solid rgb(107, 84, 209);
    border-radius: 5px;
    transition: 300ms;
  }

  button:hover {
    transform: scale(1.1);
  }

  .cancel {
    color: #a8adb3;
    background-color: white;
  }

  .save {
    color: white;
    background-color: rgb(145, 129, 212);
  }

  :global(input) {
    width: 20rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    margin-bottom: 1rem;
    font-size: medium;
    font-family: Roboto;
    border: 2px solid rgb(107, 84, 209);
    border-radius: 5px;
    transition: 300ms;
  }
  :global(input:focus::placeholder) {
    color: white;
  }
  :global(input:focus) {
    background-color: rgb(145, 129, 212);
    outline: none;
    border: 2px solid rgb(107, 84, 209);
    border-radius: 5px;
    color: white;
  }

  :global(textarea) {
    width: 20rem;
    height: 10rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    margin-bottom: 1rem;
    font-size: medium;
    font-family: Roboto;
    border: 2px solid rgb(107, 84, 209);
    border-radius: 5px;
    resize: none;
    transition: 300ms;
  }
  :global(textarea:focus::placeholder) {
    color: white;
  }
  :global(textarea:focus) {
    background-color: rgb(145, 129, 212);
    outline: none;
    border: 2px solid rgb(107, 84, 209);
    border-radius: 5px;
    color: white;
  }

  :global(select) {
    width: 21.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    margin-bottom: 1rem;
    font-size: medium;
    border: 2px solid rgb(107, 84, 209);
    border-radius: 5px;
    transition: 300ms;
  }

  :global(.label) {
    width: 20rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    display: flex;
    justify-items: left;
  }

  :global(label:after) {
    content: ": ";
  }
</style>
