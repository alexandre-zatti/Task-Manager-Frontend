<script context="module">
  export const load = async (ctx) => {
    let slug = ctx.page.params.slug;
    const projectResponse = await fetch(
      "https://backend-dev-web.herokuapp.com/projeto/" + slug
    );
    let project = await projectResponse.json();

    const usersResponse = await fetch(
      "https://backend-dev-web.herokuapp.com/usuario/"
    );
    let users = await usersResponse.json();

    const participantsResponse = await fetch(
      "https://backend-dev-web.herokuapp.com/projeto_usuario/id_projeto/" + slug
    );
    let participants = await participantsResponse.json();

    return {
      props: {
        slug,
        project,
        users,
        participants,
      },
    };
  };
</script>

<script>
  import { BASE_URL } from "../../stores/backendUrl";
  import Board from "../../components/ProjectsBoard.svelte";

  export let slug;
  export let project;
  export let users;
  export let participants;

  let requestCount = 0;
  let projectParticipants;
  let updatedItems = [];

  const findProjetParticipants = (participants, users) => {
    let projectParticipants = [];
    participants.forEach((participant) => {
      let projectParticipant = users.find(
        (user) => user.id == participant.id_usuario
      );
      projectParticipants.push(projectParticipant);
    });
    return projectParticipants;
  };

  if (participants) {
    projectParticipants = findProjetParticipants(participants, users);
  }

  const findNonProjetParticipants = (projectParticipants) => {
    let removeIds = [];
    projectParticipants.forEach((participant) => {
      removeIds.push(participant.id);
    });
    return removeIds;
  };

  if (participants) {
    const removeIds = findNonProjetParticipants(projectParticipants);
    users = users.filter((user) => !removeIds.includes(user.id));
  }

  const handleBoardFinalize = async (updatedItems) => {
    let source = updatedItems[1];
    let destination = updatedItems[0];

    if (source.id == destination.id) {
      return false;
    }

    if (destination.id == 2) {
      let removed = [];
      let found = false;
      participants.forEach((participant) => {
        source.items.forEach((item) => {
          if (participant.id_usuario == item.id) {
            found = true;
          }
        });
        if (!found) {
          removed.push(participant);
        }
        found = false;
      });

      const res = await fetch(
        $BASE_URL + "projeto_usuario/delete/" + removed[0].id,
        {
          method: "DELETE",
        }
      );

      removed = [];
    } else {
      let added = [];
      let found = false;

      destination.items.forEach((item) => {
        participants.forEach((participant) => {
          if (participant.id_usuario == item.id) {
            found = true;
          }
        });
        if (!found) {
          added.push(item);
        }
        found = false;
      });

      const res = await fetch($BASE_URL + "projeto_usuario/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: parseInt(added[0].id),
          projeto: parseInt(slug),
        }),
      });

      added = [];
    }

    const participantsResponse = await fetch(
      $BASE_URL + "projeto_usuario/id_projeto/" + slug
    );
    participants = await participantsResponse.json();
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

  let board = [
    {
      id: 1,
      name: "Participantes",
      items: participants ? projectParticipants : [],
    },
    {
      id: 2,
      name: "Usuarios",
      items: users,
    },
  ];
</script>

<div class="container">
  <div class="content">
    <div class="header">
      <h1 class="card-title">{project.nome}</h1>
    </div>
    <div class="card-desc">
      <h2>Readme</h2>
      <p>
        {project.descricao}
      </p>
    </div>

    <Board columnItems={board} boardUpdate={handleBoardUpdate} />
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: Roboto;
    background-color: #22272e;
    color: #a8adb3;
    width: 100%;
  }

  .content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    width: 50rem;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    width: 40rem;
    height: 3rem;
  }

  .card-title {
    width: fit-content;
    margin: 0;
    transition: 300ms;
    color: #a8adb3;
  }

  .card-desc {
    width: 34rem;
    border: 2px solid #5a5a5a;
    border-radius: 7px;
    margin-top: 1rem;
    padding: 0.75rem;
    font-size: 1em;
    text-align: justify;
    text-justify: inter-word;
  }
</style>
