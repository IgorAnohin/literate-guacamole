import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {createUser} from "../../services/users";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {ROLES, roleToReadable} from "../../constants";
import {BookHalf, Building, PersonBadge, SdCardFill} from 'react-bootstrap-icons';

const Resource = ({name, icon}) => {
    return (
        <div className="border" style={{padding: 10}}>
            <Row>
                <Col md="auto">
                    {icon}
                    {/*<Image height="24px" width="24px" src="../Vector.png"/>*/}
                </Col>
                <Col>
                    <div>
                        {name}
                    </div>
                </Col>
                <Col lg="1" style={{paddingLeft: 80}}>
                    <Form.Check style={{width: 0, margin: 0, paddingRight: 0, paddingLeft: 0}}
                                type="switch"
                                id="disabled-custom-switch"
                    />
                </Col>
            </Row>

        </div>

    );

}

export const Audit = () => {
    const [validated, setValidated] = useState(false);
    const history = useHistory();


    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            createUser(form.user_email.value, form.user_password.value, form.user_role.value, history).then((userToken) => {
                if (userToken == null) {
                    // ToDo: show toast with an error
                }
            });
        }

        setValidated(true);

    };

    const [isSelectValid, validateSelect] = useState(false);

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
                            <Resource name="Ресурсы" icon={<SdCardFill/>}/>
                        </Col>
                        <Col>
                            <Resource name="Рекруты" icon={<PersonBadge/>}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Resource name="Заклинания" icon={<BookHalf/>}/>
                        </Col>
                        <Col>
                            <Resource name="Здания" icon={<Building/>}/>
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