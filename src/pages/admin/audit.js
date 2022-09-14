import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {BookHalf, Building, PersonBadge, SdCardFill} from 'react-bootstrap-icons';
import {createAudit} from "../../services/audit";
import {ASSET_BUILDING_EN} from "../../constants";

const Resource = ({id, name, icon}) => {
    return (
        <div className="border" style={{padding: 10}}>
            <Row>
                <Col md="auto">
                    {icon}
                </Col>
                <Col>
                    <div>
                        {name}
                    </div>
                </Col>
                <Col lg="1" style={{paddingLeft: 80}}>
                    <Form.Check style={{width: 0, margin: 0, paddingRight: 0, paddingLeft: 0}}
                                type="switch"
                                id={id}
                    />
                </Col>
            </Row>

        </div>

    );

}

export const Audit = () => {
    const [validated, setValidated] = useState(false);
    const history = useHistory();


    const downloadTxtFile = (data) => {
        const element = document.createElement("a");
        const file = new Blob([data], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "audit.csv";
        document.body.appendChild(element);
        element.click();
    };

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log(form.audit_start.value);
            console.log(form.audit_end.value);

            const assetsTypes = [];
            if (form.resources.value == "on") {
                assetsTypes.push(ASSET_BUILDING_EN);
            }
            if (form.recruts.value == "on") {
                assetsTypes.push(ASSET_BUILDING_EN);
            }
            if (form.spells.value == "on") {
                assetsTypes.push(ASSET_BUILDING_EN);
            }
            if (form.buildings.value == "on") {
                assetsTypes.push(ASSET_BUILDING_EN);
            }

            createAudit(form.audit_start.value, form.audit_end.value, assetsTypes, history).then((auditData) => {
                console.log("Audit data:", auditData);
                downloadTxtFile(auditData);
            });
        }

        setValidated(true);
    };

    return (
        <Container>
            <h1 className="header">Сбор аудитных данных по истории изменения активов</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                            <Form.Group md="4" controlId="audit_start">
                                <Form.Label>Дата начала:</Form.Label>
                                <Form.Control
                                    required
                                    type="datetime-local"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, заполните дату начала
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group md="4" controlId="audit_end">
                                <Form.Label>Дата конца:</Form.Label>
                                <Form.Control
                                    required
                                    type="datetime-local"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, заполните дату конца
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div>
                        Укажите активы для получения. Если ни выбран ни один, будут получены все:
                    </div>
                    <Row>
                        <Col>
                            <Resource id="resources" name="Ресурсы" icon={<SdCardFill/>}/>
                        </Col>
                        <Col>
                            <Resource id="recruts" name="Рекруты" icon={<PersonBadge/>}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Resource id="spells" name="Заклинания" icon={<BookHalf/>}/>
                        </Col>
                        <Col>
                            <Resource id="buildings" name="Здания" icon={<Building/>}/>
                        </Col>
                    </Row>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button type="submit" size="lg">Скачать отчёт</Button>
                </div>
            </Form>
        </Container>
    );
}