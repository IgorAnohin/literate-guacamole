import {Button, Card, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {changeAssetAmount, getRecruits, getResources, removeAsset} from "../../services/assets";
import {NEW_USER_ROUTE, WARRIOR_NEW_RECRUIT_ROUTE} from "../../constants";
import {useHistory} from "react-router-dom";


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
            <Col xs lg="6">
                <Image src={cell} height={100} width={100}/>
            </Col>
        </Row>
    </Container>;
}


export const WarriorHome = () => {
    const [data, setData] = useState(null);

    const history = useHistory();

    useEffect(() => {
        getRecruits().then((data) => setData(data))
    }, [])

    const columns = [{
        dataField: 'name',
        text: 'Наименоавние',
    }, {
        dataField: 'fraction',
        text: 'Фракция',
    }, {
        dataField: 'level',
        text: 'Уровень',
    }, {
        dataField: 'image',
        text: 'Изображение',
        formatter: imageFormatter
    }, {
        dataField: 'amount',
        text: 'Количество',
    }];

    return (
        <div>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => {
                    history.push(WARRIOR_NEW_RECRUIT_ROUTE)
                }}>Добавить нового рекрута</Button>
            </div>
            {data && <RecruitsList data={data} columns={columns}/>}
        </div>
    );
}


class RecruitsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: props.data,
            columns: props.columns,
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

    removeRecruit = () => {
        removeAsset(this.state.selectedRow.id).then(r => {
            window.location.reload(false);
        })
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
                    columns={this.state.columns}
                    hover
                />

                {this.state.selectedRow &&

                <Row>
                    <Col>
                        <div className="d-grid gap-2">
                            <Button size="lg" style={{background: "#DC4C64"}}
                                    onClick={this.removeRecruit}>Удалить</Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2">
                            <Button onClick={this.showEditModal} size="lg">Изменить</Button>
                        </div>
                    </Col>
                </Row>
                }

                <ChangeValueDialog
                    showModal={this.state.displayConfirmationModal}
                    confirmModal={(newAmount) => {
                        changeAssetAmount(this.state.selectedRow.id, newAmount).then(r => {
                            window.location.reload(false);
                        })
                    }}
                    hideModal={this.hideEditModal}
                    message="Укажите новое количество актива"
                    initialValue={!!this.state.selectedRow ? this.state.selectedRow.amount : 0}
                />
            </div>
        );
    }
}
