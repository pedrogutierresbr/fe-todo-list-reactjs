import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import { navigate, A } from "hookrouter";

function AtualizarTarefa(props) {
    const [exibirModal, setExibirModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [tarefa, setTarefa] = useState("");
    const [carregarTarefa, setCarregarTarefa] = useState(true);

    useEffect(() => {
        if (carregarTarefa) {
            const tarefasDb = localStorage["tarefas"];
            const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            const tarefinha = tarefas.filter((t) => t.id === parseInt(props.id))[0];
            setTarefa(tarefinha.nome);
            setCarregarTarefa(false);
        }
    }, [carregarTarefa, props]);

    function voltar(event) {
        event.preventDefault();
        // navigate faz o redirecionamento direto via código para a URL declarada em ()
        navigate("/");
    }

    function handleFecharModal() {
        // navigate faz o redirecionamento direto via código para a URL declarada em ()
        navigate("/");
    }

    function atualizar(event) {
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true) {
            // obter a tarefa selecionada para modificação
            const tarefasDb = localStorage["tarefas"];
            let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            // persistir (salvar) a tarefa atualizada
            tarefas = tarefas.map((tarefaObj) => {
                if (tarefaObj.id === parseInt(props.id)) {
                    tarefaObj.nome = tarefa;
                }
                return tarefaObj;
            });
            localStorage["tarefas"] = JSON.stringify(tarefas);
            // exibir modal
            setExibirModal(true);
        }
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value);
    }

    return (
        <div className="mt-5">
            <h3 className="text-center">Atualizar</h3>
            <Jumbotron className="mt-5 container">
                <Form noValidate onSubmit={atualizar} validated={formValidado}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite uma tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            data-testid="txt-tarefa"
                            value={tarefa}
                            onChange={handleTxtTarefa}
                        />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button variant="success" type="submit" data-testid="btn-cadastrar">
                            Atualizar
                        </Button>
                        <A href="/" className="btn btn-light ml-2" onClick={voltar}>
                            Voltar
                        </A>
                    </Form.Group>
                </Form>

                <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Tarefa atualizada com sucesso!</Modal.Body>

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

AtualizarTarefa.propTypes = {
    id: PropTypes.number.isRequired,
};

export default AtualizarTarefa;
