<script>
  import { BASE_URL } from "../stores/backendUrl";
  import { refresh } from "../stores/refresh";
  import { notify } from "../stores/notify";
  import { Modal } from "svelte-chota";
  import { Stretch } from "svelte-loading-spinners";
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import Board from "../components/TasksBoard.svelte";
  import TaskView from "../components/TaskView.svelte";
  import AbstractForm from "../components/AbstractForm.svelte";

  let standard = "tarefa";
  let dataLink = $BASE_URL + "tarefa/";
  let openModal = false;
  let openTaskModal = false;
  let edit = false;
  let specifyCreator = true;
  let itemId;
  let requestCount = 0;
  let updatedItems = [];
  let taskId;
  let selected;
  let todo = [];
  let doing = [];
  let done = [];

  const getInitialData = async () => {
    $refresh = false;

    let userProjects = [];
    let userTasks = [];

    const responseUser = await fetch($BASE_URL + "login/getAuthUser", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    let currentUser = await responseUser.json();

    const responseProjectsUser = await fetch(
      $BASE_URL + "projeto_usuario/id_usuario/" + currentUser.id
    );
    let projectsUser = await responseProjectsUser.json();

    const responseProjects = await fetch($BASE_URL + "projeto");
    let projects = await responseProjects.json();

    const responseTasks = await fetch($BASE_URL + "tarefa");
    let tasks = await responseTasks.json();

    projectsUser.forEach((projectUser) => {
      projects.forEach((project) => {
        if (projectUser.id_projeto == project.id) {
          userProjects.push(project);
        }
      });
    });

    userProjects.forEach((project) => {
      tasks.forEach((task) => {
        if (project.id == task.id_projeto) {
          userTasks.push(task);
        }
      });
    });

    return { userProjects, userTasks, currentUser };
  };

  const prepareDataForBoard = (tasks, selected) => {
    todo = [];
    doing = [];
    done = [];

    if (selected) {
      tasks.forEach((task) => {
        if (task.id_projeto == selected.id) {
          if (task.id_situacao == 2) {
            todo.push(task);
          }
          if (task.id_situacao == 3) {
            doing.push(task);
          }
          if (task.id_situacao == 4) {
            done.push(task);
          }
        }
      });
    }

    let board = [
      {
        id: 1,
        name: "Fazer",
        items: todo,
      },
      {
        id: 2,
        name: "Fazendo",
        items: doing,
      },
      {
        id: 3,
        name: "Feitas",
        items: done,
      },
    ];
    return board;
  };

  const handleBoardUpdate = (columnItems) => {
    requestCount++;
    updatedItems.push(columnItems);

    if (requestCount == 2) {
      handleBoardFinalize(updatedItems);
      updatedItems = [];
      requestCount = 0;
    }
  };

  const handleTaskView = (task) => {
    taskId = task;
    openTaskModal = true;
  };

  const handleBoardFinalize = (updatedItems) => {
    let source = updatedItems[1];
    let destination = updatedItems[0];

    if (source.id == destination.id) {
      return false;
    }
    if (destination.id == 1) {
      let moved;
      let found = false;
      destination.items.forEach((item) => {
        todo.forEach((task) => {
          if (task.id == item.id) {
            found = true;
          }
        });
        if (!found) {
          moved = item;
        }
        found = false;
      });

      if (moved) {
        updateSituation(moved, 2);
      }
    }

    if (destination.id == 2) {
      let moved;
      let found = false;
      destination.items.forEach((item) => {
        doing.forEach((task) => {
          if (task.id == item.id) {
            found = true;
          }
        });
        if (!found) {
          moved = item;
        }
        found = false;
      });

      if (moved) {
        updateSituation(moved, 3);
      }
    }

    if (destination.id == 3) {
      let moved;
      let found = false;
      destination.items.forEach((item) => {
        done.forEach((task) => {
          if (task.id == item.id) {
            found = true;
          }
        });
        if (!found) {
          moved = item;
        }
        found = false;
      });

      if (moved) {
        updateSituation(moved, 4);
      }
    }
  };

  const updateSituation = async (moved, newSituation) => {
    const res = await fetch($BASE_URL + "tarefa/put/" + moved.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        situacao: newSituation,
      }),
    });
  };

  $: if ($notify == true) {
    notifier.success(
      edit ? "Item editado com sucesso!" : "Item criado com sucesso",
      2000
    );
    $notify = false;
  }
</script>

<div class="container">
  <NotificationDisplay />
  <Modal bind:open={openTaskModal}>
    <TaskView bind:taskId bind:openModal bind:itemId bind:edit />
  </Modal>
  <Modal bind:open={openModal}>
    <AbstractForm
      bind:openModal
      bind:standard
      bind:itemId
      bind:dataLink
      bind:edit
      bind:specifyCreator
    />
  </Modal>
  <div class="header">
    <h1>Tarefas</h1>
  </div>
  {#key $refresh}
    {#await getInitialData()}
      <Stretch size="60" color="rgb(145, 129, 212)" unit="px" duration="1s" />
    {:then value}
      <div class="add">
        <select bind:value={selected}>
          {#each value.userProjects as project}
            <option value={project}>
              {project.nome}
            </option>
          {/each}
        </select>
        <button
          class="add-button"
          on:click={(event) => {
            openModal = true;
            edit = false;
          }}>Criar Tarefa</button
        >
      </div>

      <Board
        columnItems={prepareDataForBoard(value.userTasks, selected)}
        boardUpdate={handleBoardUpdate}
        taskView={handleTaskView}
      />
    {:catch error}
      <h2>Ocorreu um erro!</h2>
    {/await}
  {/key}
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: Roboto;
    color: #a8adb3;
    width: 100%;
    height: 100vh;
  }

  .container :global(.modal) {
    color: #a8adb3;
    background-color: #22272e;
    border-radius: 10px;
    overflow-y: auto;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    width: 45rem;
    height: 3rem;
  }

  select {
    margin-left: 1rem;
    background-color: #22272e;
    color: white;
    width: 10rem;
    height: 3rem;
  }

  button {
    cursor: pointer;
    height: 3rem;
    min-width: 7rem;
    margin-right: 1rem;
    font-size: medium;
    border: 2px solid rgb(107, 84, 209);
    border-radius: 5px;
    transition: 300ms;
  }

  button:hover {
    transform: scale(1.1);
  }

  .add {
    width: 56rem;
    display: flex;
    justify-content: space-between;
  }

  .add-button {
    color: white;
    background-color: #22272e;
  }
</style>
