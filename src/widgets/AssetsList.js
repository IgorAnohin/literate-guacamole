import React, {useRef, useState} from "react";
import {changeAssetAmount, removeAsset} from "../services/assets";
import BootstrapTable from "react-bootstrap-table-next";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {toast} from "react-toastify";


const ChangeValueDialog = ({showModal, hideModal, confirmModal, message, maxValue, initialValue}) => {

    const [validated, setValidated] = useState(false);
    const formRef = useRef();

    const handleSubmit = (event) => {
        const form = formRef.current;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            if (maxValue == initialValue) {
                toast.error("Неправильное значение. Вы можете только уменьшать количество, не уводя его в отрицательные значения");
            } else {
                toast.error("Неправильное значение. Значение не может быть отрицательным");
            }
        } else {
            confirmModal(form.newValue.value);
        }

        setValidated(true);
    };

    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Подтверждение изменений</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-info">{message}</div>
                <Form ref={formRef} noValidate validated={validated}>
                    <Form.Group md="4" controlId="newValue">
                        <Form.Control
                            type="number"
                            defaultValue={initialValue}
                            max={maxValue}
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


export class AssetsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: props.data,
            columns: props.columns,

            changeAmountAvailable: props.changeAmountAvailable,
            onlyDecrease: props.onlyDecrease == null ? false : props.onlyDecrease,

            removeAvailable: props.removeAvailable,

            selectedRow: null,
            displayEditModal: false,
        };

        console.log(this.state.onlyDecrease);
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
            // window.location.reload(false);
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
                    maxValue={this.state.onlyDecrease && !!this.state.selectedRow ? this.state.selectedRow.quantity : 100000}
                    initialValue={!!this.state.selectedRow ? this.state.selectedRow.quantity : 0}
                />
            </div>
        );
    }
}
