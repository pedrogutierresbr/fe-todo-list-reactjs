import React, { useState } from "react";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import { navigate, A } from "hookrouter";

function CadastrarTarefa() {
    return (
        <div className="mt-5">
            <h3 className="text-center">Cadastrar</h3>
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
                        />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button variant="success" type="submit">
                            Cadastrar
                        </Button>
                        &nbsp;
                        <A href="/" className=" btn btn-light">
                            Voltar
                        </A>
                    </Form.Group>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default CadastrarTarefa;
