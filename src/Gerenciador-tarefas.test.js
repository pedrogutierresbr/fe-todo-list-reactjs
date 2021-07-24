import React from "react";
import { ReactDOM } from "react-dom";
import GerenciadorTarefas from "./GerenciadorTarefas";

it("deve renderizar o projeto sem erros", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GerenciadorTarefas />, div);
    ReactDOM.unmountComponentArNode(div);
});
