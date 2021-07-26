import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { A } from "hookrouter";

//Components
import ConcluirTarefa from "../Concluir-tarefa/Concluir-tarefa";
import RemoverTarefa from "../Remover-tarefa/Remover-tarefa";

function ItensListaTarefas(props) {
    return props.tarefas.map((tarefa) => (
        <tr key={tarefa.id} data-testid="tarefa">
            <td
                width="75%"
                data-testid="nome-tarefa"
                style={{ textDecoration: tarefa.concluida ? "line-through" : "none" }}
            >
                {tarefa.nome}
            </td>

            <td className="text-right">
                <ConcluirTarefa
                    tarefa={tarefa}
                    recarregarTarefas={props.recarregarTarefas}
                    className={tarefa.concluida ? "hidden" : null}
                />
                &nbsp;
                <A href={`/atualizar/${tarefa.id}`} className={tarefa.concluida ? "hidden" : "btn btn-warning btn-sm"}>
                    <FontAwesomeIcon icon={faEdit} />
                </A>
                &nbsp;
                <RemoverTarefa tarefa={tarefa} recarregarTarefas={props.recarregarTarefas} />
            </td>
        </tr>
    ));
}

ItensListaTarefas.propTypes = {
    tarefas: PropTypes.array.isRequired,
    recarregarTarefas: PropTypes.func.isRequired,
};

export default ItensListaTarefas;
