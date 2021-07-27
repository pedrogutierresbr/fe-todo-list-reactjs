import React, { useState, useEffect } from "react";
import { A } from "hookrouter";
import { Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Components
import ItensListaTarefas from "../Itens-lista-tarefas/Itens-lista-tarefas";
import Paginacao from "../Paginacao/Paginacao";
import Ordenacao from "../Ordenacao/Ordenacao";

function ListarTarefas() {
    const ITEMS_POR_PAG = 4;

    const [tarefas, setTarefas] = useState([]);
    const [carregarTarefas, setCarregarTarefas] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [ordenarAsc, setOrdenarAsc] = useState(false);
    const [ordenarDesc, setOrdenarDesc] = useState(false);
    const [filtroTarefa, setFiltroTarefa] = useState("");

    // Responsavel por carregar as tarefas na tela
    useEffect(() => {
        function obterTarefas() {
            //obter tarefas salvas
            const tarefasDB = localStorage["tarefas"];
            let listaTarefas = tarefasDB ? JSON.parse(tarefasDB) : [];
            //filtrar
            listaTarefas = listaTarefas.filter(
                (tarefa) => tarefa.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
            );
            //ordenar
            if (ordenarAsc) {
                listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1));
            } else if (ordenarDesc) {
                listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1));
            }
            //paginas
            setTotalItems(listaTarefas.length);
            setTarefas(listaTarefas.splice((paginaAtual - 1) * ITEMS_POR_PAG, ITEMS_POR_PAG));
        }

        if (carregarTarefas) {
            obterTarefas();
            setCarregarTarefas(false);
        }
    }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa]);

    function handleMudarPagina(pagina) {
        setPaginaAtual(pagina);
        setCarregarTarefas(true);
    }

    function handleOrdenar(event) {
        event.preventDefault();
        if (!ordenarAsc && !ordenarDesc) {
            setOrdenarAsc(true);
            setOrdenarDesc(false);
        } else if (ordenarAsc) {
            setOrdenarAsc(false);
            setOrdenarDesc(true);
        } else {
            setOrdenarAsc(false);
            setOrdenarDesc(false);
        }
        setCarregarTarefas(true);
    }

    function handleFiltrar(event) {
        setFiltroTarefa(event.target.value);
        setCarregarTarefas(true);
    }

    return (
        <div className="text-center container mt-5">
            <h3>Tarefas a fazer</h3>
            <Table className="mt-3" striped bordered hover responsive data-testid="table">
                <thead>
                    <tr>
                        <th>
                            <a href="/" onClick={handleOrdenar}>
                                Tarefa &nbsp;
                                <Ordenacao ordenarAsc={ordenarAsc} ordenarDesc={ordenarDesc} />
                            </a>
                        </th>

                        <th>
                            <A href="/cadastrar" className="btn btn-success btn-sm" data-testid="btn-nova-tarefa">
                                <FontAwesomeIcon className="mr-2" icon={faPlus} />
                                Nova tarefa
                            </A>
                        </th>
                    </tr>

                    <tr>
                        <th>
                            <Form.Control
                                className="filtro-tarefa"
                                type="text"
                                value={filtroTarefa}
                                onChange={handleFiltrar}
                                data-testid="filtro-tarefa"
                            />
                        </th>

                        <th>&nbsp;</th>
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
