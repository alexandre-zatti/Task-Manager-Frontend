<script>
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  export let columnItems;
  export let boardUpdate;

  const flipDurationMs = 200;

  const handleDndConsiderColumns = (e) => {
    columnItems = e.detail.items;
  };
  const handleDndFinalizeColumns = (e) => {
    columnItems = e.detail.items;
  };

  const handleDndConsiderCards = (cid, e) => {
    const colIdx = columnItems.findIndex((c) => c.id === cid);
    columnItems[colIdx].items = e.detail.items;
    columnItems = [...columnItems];
  };

  const handleDndFinalizeCards = (cid, e) => {
    const colIdx = columnItems.findIndex((c) => c.id === cid);
    columnItems[colIdx].items = e.detail.items;
    columnItems = [...columnItems];
    boardUpdate(columnItems[colIdx]);
  };

  function transformDraggedElement(draggedEl, data, index) {
    draggedEl.querySelector(".card").classList.add("card");
  }
</script>

<section
  class="board"
  use:dndzone={{
    items: columnItems,
    flipDurationMs,
    type: "columns",
  }}
  on:consider={handleDndConsiderColumns}
  on:finalize={handleDndFinalizeColumns}
>
  {#each columnItems as column (column.id)}
    <div class="column" animate:flip={{ duration: flipDurationMs }}>
      <div class="column-title">{column.name}</div>
      <div
        class="column-content"
        use:dndzone={{
          items: column.items,
          flipDurationMs,
          transformDraggedElement,
        }}
        on:consider={(e) => handleDndConsiderCards(column.id, e)}
        on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
      >
        {#each column.items as item (item.id)}
          <div animate:flip={{ duration: flipDurationMs }}>
            <div class="card">
              {item.nome}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>

<style>
  .board {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5em;
  }
  .column {
    height: 100%;
    width: 250px;
    padding: 0.5em;
    padding-bottom: 0;
    margin: 1em;
    margin-bottom: 0;
    float: left;
    border: 2px solid #5a5a5a;
    border-radius: 7px;
    overflow-y: auto;
  }
  .column-content {
    height: 35rem;
  }
  .column-title {
    margin-bottom: 1em;
    font-weight: 600;
    text-decoration: underline;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card {
    height: 3rem;
    width: 100%;
    margin: 0.4em 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #22272e;
    border: 1px solid #5a5a5a;
    border-radius: 4px;
  }
</style>
