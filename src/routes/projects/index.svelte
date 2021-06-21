<script>
  import { BASE_URL } from "../../stores/backendUrl";
  import { Modal } from "svelte-chota";
  import { Stretch } from "svelte-loading-spinners";
  import { refresh } from "../../stores/refresh";
  import { notify } from "../../stores/notify";
  import { goto } from "$app/navigation";
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import AbstractForm from "../../components/AbstractForm.svelte";
  import FaPencilAlt from "svelte-icons/fa/FaPencilAlt.svelte";

  let standard = "projeto";
  let dataLink = $BASE_URL + "projeto/";
  let openModal = false;
  let edit = false;
  let specifyCreator = true;
  let itemId;

  const getData = async () => {
    $refresh = false;
    const response = await fetch(dataLink);
    return await response.json();
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
    <h1>Projetos</h1>
  </div>
  <div class="add">
    <button
      class="add-button"
      on:click={(event) => {
        openModal = true;
        edit = false;
      }}>Novo Projeto</button
    >
  </div>
  {#key $refresh}
    {#await getData()}
      <Stretch size="60" color="rgb(145, 129, 212)" unit="px" duration="1s" />
    {:then value}
      <div class="content">
        {#each value as item}
          <div class="card">
            <div class="card-icon">
              <div
                class="icon"
                on:click={(event) => {
                  openModal = true;
                  edit = true;
                  itemId = item.id;
                }}
              >
                <FaPencilAlt />
              </div>
            </div>
            <h2
              class="card-title"
              on:click={() => goto("/projects/" + item.id)}
            >
              {item.nome}
            </h2>
            <p class="card-desc">
              {item.descricao}
            </p>
          </div>
        {/each}
      </div>
    {:catch error}
      <h2>Nenhum item encontrado!</h2>
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
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    width: 46.5rem;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    width: 40rem;
    height: 3rem;
  }

  .card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-width: 20rem;
    width: 20rem;
    min-height: 7rem;
    max-height: 7rem;
    padding: 1rem;
    margin: 0.5rem;
    border: 1px solid rgb(157, 145, 206);
    border-radius: 7px;
    background-color: #22272e;
    /* box-shadow: 0 0 20px rgb(119, 112, 144); */
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 300ms;
  }

  .card-title {
    width: fit-content;
    margin: 0;
    transition: 300ms;
    color: rgb(157, 145, 206);
  }

  .card-title:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .card-desc {
    font-size: 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-icon {
    display: flex;
    justify-content: flex-end;
  }

  .icon {
    color: rgb(157, 145, 206);
    width: 1em;
    height: 1em;
    transition: 300ms;
  }

  .icon:hover {
    cursor: pointer;
    transform: scale(1.5);
  }

  button {
    cursor: pointer;
    height: 2.5rem;
    min-width: 6rem;
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
    width: 46.5rem;
    display: flex;
    justify-content: flex-end;
  }

  .add-button {
    color: white;
    background-color: rgb(145, 129, 212);
  }
</style>
