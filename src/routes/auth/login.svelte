<script>
  import { goto } from "$app/navigation";

  let usuario = "";
  let senha = "";
  let loginOk = true;

  const login = async () => {
    const res = await fetch("https://backend-dev-web.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        nome: usuario,
        senha: senha,
      }),
    });
    if (!res.ok) {
      loginOk = false;
    } else {
      goto("/");
    }
  };
</script>

<div class="container">
  <div class="content">
    <h1>Entrar</h1>
    <input type="text" placeholder="Usuario" bind:value={usuario} />
    <input type="password" placeholder="Senha" bind:value={senha} />
    {#if !loginOk}
      <span class="erro">usuario ou senha incorretos!</span>
    {/if}
    <button on:click={() => login()}>Entrar</button>
    <h5>
      Ainda não tem uma conta?<span on:click={() => goto("/auth/register")}
        >Registrar</span
      >
    </h5>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    font-family: Roboto;
    background-color: #22272e;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20rem;
    height: 22rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgb(119, 112, 144);
    background-color: white;
  }

  span {
    cursor: pointer;
    text-decoration: underline;
    color: rgb(107, 84, 209);
    margin-left: 0.25rem;
  }

  button {
    cursor: pointer;
    height: 2.5rem;
    width: 6rem;
    font-size: medium;
    border: 2px solid rgb(107, 84, 209);
    border-radius: 5px;
    transition: 300ms;
    color: white;
    background-color: rgb(145, 129, 212);
  }

  button:hover {
    transform: scale(1.1);
  }

  input {
    width: 15rem;
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
  input:focus::placeholder {
    color: white;
  }
  input:focus {
    background-color: rgb(145, 129, 212);
    outline-color: rgb(107, 84, 209);
    color: white;
  }

  .erro {
    color: red;
    text-decoration: solid;
    margin-bottom: 1rem;
  }
</style>
