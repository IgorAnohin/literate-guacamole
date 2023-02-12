import {Button, Card, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {changeAssetAmount, getResources} from "../../services/assets";


const ChangeValueDialog = ({showModal, hideModal, confirmModal, message, initialValue}) => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {

        console.log("KIKIKI");

        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            confirmModal();
        }

        setValidated(true);
    };

    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-info">{message}</div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group md="4" controlId="newValue">
                        <Form.Control
                            type="number"
                            defaultValue={initialValue}
                            min={0}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={hideModal}>
                    Отмена
                </Button>
                <Button variant="info" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


function imageFormatter(cell, row) {
    return <Container>
        <Row className="justify-content-md-center">
            <Col xs lg="4">
                <Image src={cell}/>
            </Col>
        </Row>
    </Container>;
}


const columns = [{
    dataField: 'name',
    text: 'Наименоавние',
}, {
    dataField: 'image',
    text: 'Изображение',
    formatter: imageFormatter
}, {
    dataField: 'amount',
    text: 'Количество',
}];


export const PaymasterHome = () => {
    const [resources, setResources] = useState(null);

    useEffect(() => {
        getResources().then((data) => setResources(data))
    }, [])

    return (
        <div>
            {resources && <ResourcesList data={resources}/>}
        </div>
    );
}


class ResourcesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: props.data,
            selectedRow: null,
            displayConfirmationModal: false,
        };
    }

    selectRow = (row, isSelect, rowIndex) => {
        this.setState(curr => ({...curr, selectedRow: row}));
    };

    hideEditModal = () => {
        this.setState(curr => ({...curr, displayConfirmationModal: false}));
    };

    showEditModal = () => {
        this.setState(curr => ({...curr, displayConfirmationModal: true}));
    };

    render() {
        return (
            <div>
                <BootstrapTable
                    keyField="id"
                    data={this.state.gridData}
                    selectRow={{
                        mode: "radio",
                        hideSelectColumn: true,
                        clickToSelect: true,
                        bgColor: "#99ccff",
                        selected: !!this.state.selectedRow && [this.state.selectedRow.id],
                        onSelect: this.selectRow
                    }}
                    columns={columns}
                    hover
                />

                {this.state.selectedRow &&
                <div className="d-grid gap-2">
                    <Button size="lg" onClick={this.showEditModal}>Изменить</Button>
                </div>
                }

                <ChangeValueDialog showModal={this.state.displayConfirmationModal}
                                   confirmModal={(newAmount) => {
                                       changeAssetAmount(this.state.selectedRow.id, newAmount).then(r => {
                                           window.location.reload(false);
                                       })
                                   }}
                                   hideModal={this.hideEditModal}
                                   message="Укажите новое количество ресурса"
                                   initialValue={!!this.state.selectedRow ? this.state.selectedRow.amount : 0}
                />
            </div>
        );
    }
}
