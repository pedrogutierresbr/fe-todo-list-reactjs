import React, { useState } from "react";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import { navigate, A } from "hookrouter";
import Tarefa from "../models/tarefa.model";

function CadastrarTarefa() {
    const [tarefa, setTarefa] = useState("");
    const [formValidado, setFormValidado] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);

    function cadastrar(event) {
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true) {
            //obtém tarefa (pego as que estao no localStorage como string, se existirem, converto para objeto)
            const tarefasDb = localStorage["tarefas"];
            const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            //persiste a tarefa (pego a tarefa nova adcionada no array tarefa, converto para string e salvo no LocalStorage)
            tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
            localStorage["tarefas"] = JSON.stringify(tarefas);
            setExibirModal(true);
        }
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value);
    }

    function handleFecharModal() {
        // navigate faz o redirecionamento direto via código para a URL declarada em ()
        navigate("/");
    }

    return (
        <div className="mt-5">
            <h3 className="text-center">Cadastrar</h3>
            <Jumbotron className="mt-5 container">
                <Form validated={formValidado} noValidate onSubmit={cadastrar}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite uma tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            value={tarefa}
                            onChange={handleTxtTarefa}
                            data-testid="txt-tarefa"
                        />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button variant="success" type="submit" data-testid="btn-cadastrar">
                            Cadastrar
                        </Button>
                        <A href="/" className="btn btn-light ml-4">
                            Voltar
                        </A>
                    </Form.Group>
                </Form>

                <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Tarefa adicionada com sucesso!</Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={handleFecharModal}>
                            Continuar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </div>
    );
}

export default CadastrarTarefa;
