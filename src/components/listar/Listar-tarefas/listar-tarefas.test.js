import React from "react";
import ReactDOM from "react-dom";
import ListarTarefas from "./Listar-tarefas";
import Tarefa from "../../models/tarefa.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Teste do componente de listagem de tarefas", () => {
    const nomePrimeiraTarefa = "Primeira tarefa";
    const nomeSegundaTarefa = "Segunda tarefa";
    const nomeTerceitaTarefa = "Terceira tarefa";

    beforeEach(() => {
        localStorage["tarefas"] = JSON.stringify([
            new Tarefa(1, nomePrimeiraTarefa, false),
            new Tarefa(2, nomeSegundaTarefa, false),
            new Tarefa(3, nomeTerceitaTarefa, false),
        ]);
    });

    afterEach(() => {
        delete localStorage["tarefa"];
    });

    it("deve renderizar o componente sem erros", () => {
        const div = document.createElement("div");
        ReactDOM.render(<ListarTarefas />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("deve exibir uma tabela contendo 3 tarefas", () => {
        const { getByTestId } = render(<ListarTarefas />);
        const tabela = getByTestId("table");
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).toHaveTextContent(nomeTerceitaTarefa);
    });

    it("deve filtrar os dados da tabela de tarefas", () => {
        const { getByTestId } = render(<ListarTarefas />);
        fireEvent.change(getByTestId("filtro-tarefa"), { target: { value: nomePrimeiraTarefa } });
        const tabela = getByTestId("table");
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).not.toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).not.toHaveTextContent(nomeTerceitaTarefa);
    });
});
