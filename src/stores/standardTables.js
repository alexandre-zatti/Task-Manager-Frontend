import { readable } from "svelte/store";

export const tableStandards = readable({
    complexidade: [
      [
        {
          label:"Nome",
          name: "nome",
          field: "input",
          type: "text",
          placeholder: "Digite o nome...",
        },
      ],
    ],
    prioridade: [
      [
        {
          label:"Nome",
          name: "nome",
          field: "input",
          type: "text",
          placeholder: "Digite o nome...",
        },
      ],
    ],
    grupo: [
      [
        {
          label:"Nome",
          name: "nome",
          field: "input",
          type: "text",
          placeholder: "Digite o nome...",
        },
      ],
    ],
    status: [
      [
        {
          label:"Nome",
          name: "nome",
          field: "input",
          type: "text",
          placeholder: "Digite o nome...",
        },
      ],
    ],
    tipo: [
      [
        {
          label:"Nome",
          name: "nome",
          field: "input",
          type: "text",
          placeholder: "Digite o nome...",
        },
      ],
    ],
    projeto: [
        [
          {
            label:"Nome",
            name: "nome",
            field: "input",
            type: "text",
            placeholder: "Digite o nome...",
          },
          {
            label:"Descricao",
            name: "descricao",
            field: "textArea",
            placeholder: "Digite uma descricao...",
          },
        ],
    ],
    tarefa: [
      [
        {
          label:"Titulo",
          name: "titulo",
          field: "input",
          type: "text",
          placeholder: "Digite o nome...",
        },
        {
          label:"Descricao",
          name: "descricao",
          field: "textArea",
          placeholder: "Digite uma descricao...",
        },
        {
          label:"Projeto",
          name: "projeto",
          field: "select",
          tableReference: "http://localhost:1337/projeto",
        },
        {
          label:"Atribuido",
          name: "dev",
          field: "select",
          tableReference: "http://localhost:1337/usuario",
        },
        {
          label:"Tipo",
          name: "tipo",
          field: "select",
          tableReference: "http://localhost:1337/tipo",
        },
        {
          label:"Status",
          name: "status",
          field: "select",
          tableReference: "http://localhost:1337/status",
        },
        {
          label:"Prioridade",
          name: "prioridade",
          field: "select",
          tableReference: "http://localhost:1337/prioridade",
        },
        {
          label:"Complexidade",
          name: "complexidade",
          field: "select",
          tableReference: "http://localhost:1337/complexidade",
        },
        {
          label:"Tempo gasto",
          name: "tempo_gasto",
          field: "input",
          type: "text",
          placeholder: "Selecione o tempo gasto em horas...",
        },
      ],
      
  ],
  })