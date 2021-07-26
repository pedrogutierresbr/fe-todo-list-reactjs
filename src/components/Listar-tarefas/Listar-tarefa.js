import React, { useState, useEffect } from "react";
import { A } from "hookrouter";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ListarTarefas() {
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

                <tbody></tbody>
            </Table>
        </div>
    );
}

export default ListarTarefas;
