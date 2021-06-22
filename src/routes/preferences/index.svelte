<script>
  import { BASE_URL } from "../../stores/backendUrl";
  import AbstractTable from "../../components/AbstractTable.svelte";

  let active = 0;

  const setTab = (event) => {
    active = event.target.id;
  };
</script>

<div class="container">
  <div class="header">
    <h1>Configurações</h1>
  </div>
  <div class="tabs">
    <div class={active == 0 ? "tab-selected" : "tab"} id="0" on:click={setTab}>
      <span id="0">Complexidades</span>
    </div>
    <div class={active == 1 ? "tab-selected" : "tab"} id="1" on:click={setTab}>
      <span id="1">Prioridades</span>
    </div>
    <div class={active == 2 ? "tab-selected" : "tab"} id="2" on:click={setTab}>
      <span id="2">Status</span>
    </div>
    <div class={active == 3 ? "tab-selected" : "tab"} id="3" on:click={setTab}>
      <span id="3">Tipos</span>
    </div>
  </div>
  <div class="content">
    {#if active == 0}
      <AbstractTable
        standard="complexidade"
        dataLink={$BASE_URL + "complexidade/"}
        tableHeaders={["ID", "NOME"]}
      />
    {/if}
    {#if active == 1}
      <AbstractTable
        standard="prioridade"
        dataLink={$BASE_URL + "prioridade/"}
        tableHeaders={["ID", "NOME"]}
      />
    {/if}
    {#if active == 2}
      <AbstractTable
        standard="status"
        dataLink={$BASE_URL + "status/"}
        tableHeaders={["ID", "NOME"]}
      />
    {/if}
    {#if active == 3}
      <AbstractTable
        standard="tipo"
        dataLink={$BASE_URL + "tipo/"}
        tableHeaders={["ID", "NOME"]}
      />
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }

  .content {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    width: 50rem;
    height: 40rem;
  }

  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    width: 40rem;
    height: 3rem;
  }

  .tab {
    margin: 0.5rem;
    padding: 0.5rem;
    border-bottom: 3px solid rgb(157, 145, 206);
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    font-family: Roboto;
    font-weight: 300;
    color: #a8adb3;
    font-size: 1.25em;
    transition: 400ms;
  }

  .tab:hover {
    background-color: rgb(157, 145, 206);
    color: white;
    cursor: context-menu;
  }

  .tab-selected {
    margin: 0.5rem;
    padding: 0.5rem;
    border-bottom: 3px solid rgb(107, 84, 209);
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    font-family: Roboto;
    font-weight: 300;
    font-size: 1.25em;
    transition: 400ms;
    background-color: rgb(157, 145, 206);
    color: white;
    cursor: context-menu;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #a8adb3;
    font-family: Roboto;
    margin-top: 10rem;
    width: 40rem;
    height: 3rem;
  }
</style>
