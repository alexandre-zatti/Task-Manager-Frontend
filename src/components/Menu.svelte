<script>
  import FaHome from "svelte-icons/fa/FaHome.svelte";
  import FaDiceD6 from "svelte-icons/fa/FaDiceD6.svelte";
  import FaSignOutAlt from "svelte-icons/fa/FaSignOutAlt.svelte";
  import { goto } from "$app/navigation";

  const logout = async () => {
    const response = await fetch(
      "https://backend-dev-web.herokuapp.com/logout/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    await goto("/auth/login");
  };
</script>

<div class="container">
  <div
    class="item"
    on:click={() => {
      goto("/");
    }}
  >
    <span>Home</span>
  </div>
  <div
    class="item"
    on:click={() => {
      goto("/projects");
    }}
  >
    <span>Projetos</span>
  </div>
  <div
    class="item"
    on:click={() => {
      goto("/preferences");
    }}
  >
    <span>Configurações</span>
  </div>
  <div
    class="item"
    on:click={() => {
      logout();
    }}
  >
    <span>Sair</span>
  </div>
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    height: fit-content;
    background-color: #22272e;
    position: absolute;
    font-family: Roboto;
    margin-top: 5rem;
  }
  .item {
    display: flex;
    justify-content: center;
    height: fit-content;
    width: 12rem;
    font-size: 1.75em;
    color: rgb(119, 112, 144);
    transition: 300ms;
  }

  .item:hover {
    color: white;
    cursor: pointer;
    transform: scale(1.1);
    text-decoration: underline;
  }
</style>
