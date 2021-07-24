import React from "react";
import { useRoutes } from "hookrouter";

import "./Gerenciador-tarefas.css";

//Components
import ListarTarefas from "./components/Listar-tarefas/Listar-tarefa";
import CadastrarTarefa from "./components/Cadastrar-tarefa/Cadastrar-tarefa";
import AtualizarTarefa from "./components/Atualizar-tarefa/Atualizar-tarefa";

const routes = {
    "/": () => <ListarTarefas />,
    "/cadastrar": () => <CadastrarTarefa />,
    "/atualizar/:id": ({ id }) => <AtualizarTarefa id={id} />,
};

function GerenciadorTarefas() {
    return useRoutes(routes);
}

export default GerenciadorTarefas;
