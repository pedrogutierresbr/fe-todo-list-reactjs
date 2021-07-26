import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

function ConcluirTarefa(props) {
    function handleAbrirModal(event) {
        event.preventDefault();
    }

    return (
        <span className={props.className}>
            <Button className="btn-sm" onClick={handleAbrirModal} data-testid="btn-abrir-modal">
                <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>
        </span>
    );
}

ConcluirTarefa.propTypes = {
    tarefas: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
};

export default ConcluirTarefa;
