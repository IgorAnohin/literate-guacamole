import React, {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {createUser} from "../../services/users";
import { ROLES, roleToReadable} from "../../constants";

export const NewUser = () => {

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
            <h1 className="header">Новый пользователь</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
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
                    <Form.Group md="4" controlId="user_password_confirmed">
                        <Form.Label>Подтверждение пароля</Form.Label>
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

                <div className="d-grid gap-2">
                    <Button type="submit" size="lg">Создать</Button>
                </div>
            </Form>
        </Container>
    );
}