<script>
  import { Stretch } from "svelte-loading-spinners";
  import { Modal } from "svelte-chota";
  import { refresh } from "../stores/refresh";
  import { notify } from "../stores/notify";
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import AbstractForm from "./AbstractForm.svelte";
  import FaPencilAlt from "svelte-icons/fa/FaPencilAlt.svelte";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";

  export let standard;
  export let dataLink;
  export let tableHeaders;

  let openModal = false;
  let edit = false;
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
    />
  </Modal>
  <div class="add">
    <button
      class="add-button"
      on:click={(event) => {
        openModal = true;
        edit = false;
      }}>Criar {standard}</button
    >
  </div>
  {#key $refresh}
    {#await getData()}
      <Stretch size="60" color="rgb(145, 129, 212)" unit="px" duration="1s" />
    {:then value}
      <table class="styled-table">
        <thead>
          <tr>
            {#each tableHeaders as header}
              <th>{header}</th>
            {/each}
            <th>EDITAR</th>
          </tr>
        </thead>
        <tbody>
          {#each value as item}
            <tr>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td
                class="icon"
                on:click={(event) => {
                  openModal = true;
                  edit = true;
                  itemId = item.id;
                }}
                ><FaPencilAlt />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:catch error}
      <h2>Nenhum item encontrado!</h2>
    {/await}
  {/key}
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    width: 100%;
    font-family: Roboto;
    font-weight: 300;
    flex-direction: column;
  }

  .container :global(.modal) {
    color: #a8adb3;
    background-color: #22272e;
    border-radius: 10px;
  }

  .styled-table {
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.9em;
    font-weight: 400;
    min-width: 40rem;
    color: #a8adb3;
    /* box-shadow: 0 0 20px rgb(119, 112, 144); */
  }

  .styled-table thead tr {
    background-color: rgb(157, 145, 206);
    color: #ffffff;
    text-align: left;
  }

  .styled-table th,
  .styled-table td {
    padding: 0.75rem 1rem;
  }

  .styled-table tbody tr {
    border-bottom: 1px solid #a8adb3;
  }

  .styled-table tbody tr:last-of-type {
    border-bottom: 3px solid rgb(157, 145, 206);
  }

  tr:hover {
    background-color: rgb(100, 90, 136);
    color: #ffffff;
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
    width: 42rem;
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  .add-button {
    color: white;
    background-color: rgb(157, 145, 206);
  }
</style>
