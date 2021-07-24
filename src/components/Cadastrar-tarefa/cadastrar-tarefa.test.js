import React from "react";
import ReactDOM from "react-dom";
import CadastrarTarefa from "./Cadastrar-tarefa";

describe("Teste do componente de cadastro de tarefas", () => {
    it("deve renderizar o componente sem erros", () => {
        const div = document.createElement("div");
        ReactDOM.render(<CadastrarTarefa />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
