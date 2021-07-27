import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import { navigate, A } from "hookrouter";

function AtualizarTarefa(props) {
    function voltar(event) {
        event.preventDefault();
        // navigate faz o redirecionamento direto via código para a URL declarada em ()
        navigate("/");
    }

    return (
        <div className="mt-5">
            <h3 className="text-center">Atualizar</h3>
            <Jumbotron className="mt-5 container">
                <Form>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite uma tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            data-testid="txt-tarefa"
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

                <Modal show={false} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Tarefa adicionada com sucesso!</Modal.Body>

                    <Modal.Footer>
                        <Button variant="success">Continuar</Button>
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
