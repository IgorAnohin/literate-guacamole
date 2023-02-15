import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {ROLES, roleToReadable} from "../../../constants";
import {createUser} from "../../../services/users";

export const NewUser = () => {

    const [preview, setPreview] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [validated, setValidated] = useState(false);
    const [isSelectValid, validateSelect] = useState(false);

    const history = useHistory();
    const fileFormRef = useRef(null);

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            createUser(
                form.user_name.value,
                form.user_email.value,
                form.user_password.value,
                form.user_role.value,
                form.user_avatar.value,
                history
            ).then((userToken) => {});
        }

        setValidated(true);
    };

    const handleCancel = (event) => {
        console.log("Cancel!");
        history.go(-1);
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    return (
        <Container>
            <h1 className="header">Новый пользователь</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="user_avatar" className="mb-3">
                            <Form.Control ref={fileFormRef} type="file" onChange={onSelectFile} style={{opacity: 0, display: "none"}}/>
                            {selectedFile &&
                            <div className={"d-flex align-items-center justify-content-center"}>
                                <Image src={preview} onClick={() => fileFormRef.current.click()} style={{ width: "400px", height: "400px", cursor: "pointer", background: "#dedede" }}/>
                            </div>}

                            {!selectedFile &&
                            <div className={"d-flex align-items-center justify-content-center"}>
                                <Card style={{ width: "400px", height: "400px", cursor: "pointer", background: "#dedede" }} onClick={() => fileFormRef.current.click()}>
                                    <div className={"border d-flex align-items-center justify-content-center"} style={{height: "400px"}}>
                                        Добавить изображение
                                    </div>

                                </Card>
                            </div>}

                        </Form.Group>
                    </Col>


                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Group md="4" controlId="user_name">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите имя пользователя
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="user_email">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите корректную почту
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="user_password">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите пароль
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="user_role">
                                <Form.Label>Роль</Form.Label>
                                <Form.Select isValid={isSelectValid} onChange={(event) => {
                                    validateSelect(ROLES.includes(event.target.value));
                                }} size="lg" aria-label="Default select example">
                                    {ROLES.map((role) => <option value={role}>{roleToReadable[role]}</option>)}
                                </Form.Select>

                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, Выберите роль
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                    <Col>

                        <div className="d-grid gap-2">
                            <Button size="lg" style={{background: "grey"}} onClick={handleCancel}>Отмена</Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2">
                            <Button type="submit" size="lg">Создать</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}