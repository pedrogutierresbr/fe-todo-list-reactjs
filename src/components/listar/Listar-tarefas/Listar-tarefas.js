import React, { useState, useEffect } from "react";
import { A } from "hookrouter";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Components
import ItensListaTarefas from "../Itens-lista-tarefas/Itens-lista-tarefas";
import ConcluirTarefa from "../concluir-tarefa/Concluir-tarefa";

function ListarTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [carregarTarefas, setCarregarTarefas] = useState(true);

    // Responsavel por carregar as tarefas na tela
    useEffect(() => {
        function obterTarefas() {
            const tarefasDB = localStorage["tarefas"];
            let listarTarefas = tarefasDB ? JSON.parse(tarefasDB) : [];
            setTarefas(listarTarefas);
            console.log(listarTarefas);
        }

        if (carregarTarefas) {
            obterTarefas();
            setCarregarTarefas(false);
        }
    }, [carregarTarefas]);

    return (
        <div className="text-center container mt-5">
            <h3>Tarefas a fazer</h3>
            <Table className="mt-3" striped bordered hover responsive data-testid="table">
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>
                            <A href="/cadastrar" className="btn btn-success btn-sm" data-testid="btn-nova-tarefa">
                                <FontAwesomeIcon className="mr-2" icon={faPlus} />
                                Nova tarefa
                            </A>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <ItensListaTarefas tarefas={tarefas} recarregarTarefas={setCarregarTarefas} />
                </tbody>
            </Table>
        </div>
    );
}

export default ListarTarefas;
