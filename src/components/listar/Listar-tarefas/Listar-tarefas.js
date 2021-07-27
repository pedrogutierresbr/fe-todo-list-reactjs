import React, { useState, useEffect } from "react";
import { A } from "hookrouter";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Components
import ItensListaTarefas from "../Itens-lista-tarefas/Itens-lista-tarefas";
import Paginacao from "../Paginacao/Paginacao";

function ListarTarefas() {
    const ITEMS_POR_PAG = 4;

    const [tarefas, setTarefas] = useState([]);
    const [carregarTarefas, setCarregarTarefas] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);

    // Responsavel por carregar as tarefas na tela
    useEffect(() => {
        function obterTarefas() {
            const tarefasDB = localStorage["tarefas"];
            let listaTarefas = tarefasDB ? JSON.parse(tarefasDB) : [];
            setTotalItems(listaTarefas.length);
            setTarefas(listaTarefas.splice((paginaAtual - 1) * ITEMS_POR_PAG, ITEMS_POR_PAG));
        }

        if (carregarTarefas) {
            obterTarefas();
            setCarregarTarefas(false);
        }
    }, [carregarTarefas, paginaAtual]);

    function handleMudarPagina(pagina) {
        setPaginaAtual(pagina);
        setCarregarTarefas(true);
    }

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
            <Paginacao
                totalItems={totalItems}
                itemsPorPagina={ITEMS_POR_PAG}
                paginaAtual={paginaAtual}
                mudarPagina={handleMudarPagina}
            />
        </div>
    );
}

export default ListarTarefas;
