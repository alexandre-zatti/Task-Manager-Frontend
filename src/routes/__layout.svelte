<script>
  import { Stretch } from "svelte-loading-spinners";
  import Menu from "../components/Menu.svelte";
  import { goto } from "$app/navigation";

  const getAuthUser = async () => {
    const response = await fetch("http://localhost:1337/login/getAuthUser", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  };
</script>

{#await getAuthUser()}
  <div class="load">
    <Stretch size="60" color="rgb(145, 129, 212)" unit="px" duration="1s" />
  </div>
{:then value}
  {#if value.ok}
    <div class="container">
      <Menu />
      <slot />
    </div>
  {:else}
    {goto("/auth/login")}
  {/if}
{:catch error}
  {goto("/auth/login")}
{/await}

<style>
  .container {
    width: 100%;
    height: 100%;
    background-color: #22272e;
  }
  .load {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #22272e;
    width: 100vw;
    height: 100vh;
  }
</style>
