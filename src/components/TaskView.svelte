<script>
  import { BASE_URL } from "../stores/backendUrl";
  import { Stretch } from "svelte-loading-spinners";
  import { refresh } from "../stores/refresh";

  export let taskId;

  const getTask = async () => {
    $refresh = false;
    const responseTask = await fetch($BASE_URL + "tarefa/" + taskId);
    let task = await responseTask.json();

    const responseUsers = await fetch($BASE_URL + "usuario");
    let users = await responseUsers.json();

    const responseProjeto = await fetch(
      $BASE_URL + "projeto/" + task.id_projeto
    );
    let projeto = await responseProjeto.json();

    const responseTipo = await fetch($BASE_URL + "tipo/" + task.id_tipo);
    let tipo = await responseTipo.json();

    const responseStatus = await fetch($BASE_URL + "status/" + task.id_status);
    let status = await responseStatus.json();

    const responsePrioridade = await fetch(
      $BASE_URL + "prioridade/" + task.id_prioridade
    );
    let prioridade = await responsePrioridade.json();

    const responseComplexidade = await fetch(
      $BASE_URL + "complexidade/" + task.id_complexidade
    );
    let complexidade = await responseComplexidade.json();

    let criador = users.find((user) => user.id == task.id_criador);

    let atribuido = users.find((user) => user.id == task.id_dev);

    return {
      task,
      criador,
      atribuido,
      projeto,
      tipo,
      status,
      prioridade,
      complexidade,
    };
  };
</script>

<div class="container">
  {#key $refresh}
    {#await getTask()}
      <Stretch size="60" color="rgb(145, 129, 212)" unit="px" duration="1s" />
    {:then value}
      <div class="content">
        <div class="header">
          <div class="title">
            <h1>#{value.task.id} - {value.task.titulo}</h1>
          </div>
        </div>
        <div class="info-container">
          <div class="info">
            <h3>Tipo: <span class="special">{value.tipo.nome}</span></h3>
            <h3>
              Complexidade: <span class="special"
                >{value.complexidade.nome}</span
              >
            </h3>
            <h3>
              Prioridade: <span class="special">{value.prioridade.nome}</span>
            </h3>
            <h3>
              Status: <span class="special">{value.status.nome}</span>
            </h3>
          </div>
          <div class="info">
            <h3>Projeto: <span class="special">{value.projeto.nome}</span></h3>
            <h3>
              Criador: <span class="special">{value.criador.nome}</span>
            </h3>
            <h3>
              Atribuido: <span class="special">{value.atribuido.nome}</span>
            </h3>
          </div>
        </div>
        <p>{value.task.descricao}</p>
      </div>
    {/await}
  {/key}
</div>

<style>
  .container {
    width: 50rem;
    height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    width: 90%;
    height: 100%;
  }

  .info {
    width: 50%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .info-container {
    width: 100%;
    display: flex;
  }
  .special {
    text-decoration: underline;
  }
  h3 {
    margin: 0.5rem;
  }

  .header {
    display: flex;
    width: 100%;
  }

  .title {
    width: 50%;
  }
</style>
