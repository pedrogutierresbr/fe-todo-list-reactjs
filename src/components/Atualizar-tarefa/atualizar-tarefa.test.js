import React from "react";
import ReactDOM from "react-dom";
import AtualizarTarefa from "./Atualizar-tarefa";
import Tarefa from "../models/tarefa.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Teste do componente de atualização de tarefas", () => {
    const tarefaId = 1;
    const tarefa = new Tarefa(tarefaId, "Nova tarefa", false);

    beforeEach(() => {
        localStorage["tarefas"] = JSON.stringify([tarefa]);
    });
    //não existe necessidade por estar sobrescrevendo/redefinindo as tarefas

    it("deve renderizar o componente sem erros", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AtualizarTarefa id={tarefaId} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("deve exibir a modal de sucesso ao atualizar uma tarefa", () => {
        const { getByTestId } = render(<AtualizarTarefa id={tarefaId} />);
        fireEvent.click(getByTestId("btn-atualizar"));
        expect(getByTestId("modal")).toHaveTextContent("Sucesso");
    });

    it("deve atualizar uma tarefa", () => {
        const tarefaAtualizada = "Tarefa atualizadinha";
        const { getByTestId } = render(<AtualizarTarefa id={tarefaId} />);
        fireEvent.change(getByTestId("txt-tarefa"), { target: { value: tarefaAtualizada } });
        fireEvent.click(getByTestId("btn-atualizar"));
        const tarefasDb = JSON.parse(localStorage["tarefas"]);
        expect(tarefasDb[0].nome).toBe(tarefaAtualizada);
    });
});
