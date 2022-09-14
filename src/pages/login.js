import {Button, Form, Col, InputGroup, Row, Container} from 'react-bootstrap';

import Helmet from "react-helmet"
import {useState} from "react";
import {login} from "../services/auth";
import {useHistory} from "react-router-dom";


export const Login = ({setToken}) => {
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            login(form.login_email.value, form.login_password.value).then((userToken) => {
                if (userToken == null) {
                    console.log("Token is null")
                    // event.preventDefault();
                    // event.stopPropagation();
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("Updating token")

                    setToken(userToken);
                    history.replace("/");
                }
            });
        }

        setValidated(true);
    };

    return (
        <>
            <Helmet>
                <title>Вход | ХУЗА</title>
            </Helmet>
            <Container>
                <h1 className="header">Вход</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Group md="4" controlId="login_email">
                            <Form.Label>Электронная почта</Form.Label>
                            <Form.Control
                                required
                                type="email"
                            />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, введите корректную почту
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group md="4" controlId="login_password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                required
                                type="password"
                            />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, введите пароль
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button type="submit" size="lg">Войти</Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};
