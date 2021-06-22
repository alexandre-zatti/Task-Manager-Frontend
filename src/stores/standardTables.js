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
          tableReference: "https://backend-dev-web.herokuapp.com/projeto",
        },
        {
          label:"Atribuido",
          name: "dev",
          field: "select",
          tableReference: "https://backend-dev-web.herokuapp.com/usuario",
        },
        {
          label:"Tipo",
          name: "tipo",
          field: "select",
          tableReference: "https://backend-dev-web.herokuapp.com/tipo",
        },
        {
          label:"Status",
          name: "status",
          field: "select",
          tableReference: "https://backend-dev-web.herokuapp.com/status",
        },
        {
          label:"Prioridade",
          name: "prioridade",
          field: "select",
          tableReference: "https://backend-dev-web.herokuapp.com/prioridade",
        },
        {
          label:"Complexidade",
          name: "complexidade",
          field: "select",
          tableReference: "https://backend-dev-web.herokuapp.com/complexidade",
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