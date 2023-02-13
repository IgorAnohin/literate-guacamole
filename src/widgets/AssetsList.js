import React, {useState} from "react";
import {changeAssetAmount, removeAsset} from "../services/assets";
import BootstrapTable from "react-bootstrap-table-next";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";


const ChangeValueDialog = ({showModal, hideModal, confirmModal, message, minValue, initialValue}) => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
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
                            min={minValue}
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


export class AssetsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: props.data,
            columns: props.columns,

            changeAmountAvailable: props.changeAmountAvailable,
            removeAvailable: props.removeAvailable,

            selectedRow: null,
            displayEditModal: false,
        };
    }

    selectRow = (row, isSelect, rowIndex) => {
        this.setState(curr => ({...curr, selectedRow: row}));
    };

    hideEditModal = () => {
        this.setState(curr => ({...curr, displayEditModal: false}));
    };

    showEditModal = () => {
        this.setState(curr => ({...curr, displayEditModal: true}));
    };

    removeAsset = () => {
        removeAsset(this.state.selectedRow.id).then(r => {
            window.location.reload(false);
        })
    };

    render() {
        const rowSelectingAvailable = this.state.changeAmountAvailable || this.state.removeAvailable;

        return (
            <div>
                <BootstrapTable
                    keyField="id"
                    data={this.state.gridData}
                    selectRow={rowSelectingAvailable ? {
                        mode: "radio",
                        hideSelectColumn: true,
                        clickToSelect: true,
                        bgColor: "#99ccff",
                        selected: !!this.state.selectedRow && [this.state.selectedRow.id],
                        onSelect: this.selectRow
                    } : {
                        mode: "ROW_SELECT_DISABLED",
                        selected: [],
                        hideSelectColumn: true
                    }}
                    columns={this.state.columns}
                    hover
                />

                {this.state.selectedRow &&

                <Row>
                    <Col>
                        {this.state.removeAvailable &&
                        <div className="d-grid gap-2">
                            <Button size="lg" style={{background: "#DC4C64"}}
                                    onClick={this.removeAsset}>Удалить</Button>
                        </div>
                        }
                    </Col>
                    <Col>
                        {this.state.changeAmountAvailable &&
                        <div className="d-grid gap-2">
                            <Button onClick={this.showEditModal} size="lg">Изменить</Button>
                        </div>
                        }
                    </Col>
                </Row>
                }

                <ChangeValueDialog
                    showModal={this.state.displayEditModal}
                    confirmModal={(newAmount) => {
                        changeAssetAmount(this.state.selectedRow.id, newAmount).then(r => {
                            window.location.reload(false);
                        })
                    }}
                    hideModal={this.hideEditModal}
                    message="Укажите новое количество актива"
                    minValue={0}
                    initialValue={!!this.state.selectedRow ? this.state.selectedRow.amount : 0}
                />
            </div>
        );
    }
}
