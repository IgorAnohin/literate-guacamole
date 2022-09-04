import React, {useEffect, useState} from "react";
import {Button, Container, Form, InputGroup, Tabs} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {createUser} from "../../services/users";
import { ROLES, roleToReadable} from "../../constants";
import {Tab} from "bootstrap";
import {getBuildings} from "../../services/resources";
import {createBuildingOrder} from "../../services/building_orders";

export const NewBuildingOrder = () => {

    const [validated, setValidated] = useState(false);
    const history = useHistory();

    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        getBuildings().then((newBuildings) => setBuildings(newBuildings));
    }, [])


    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            createBuildingOrder(form.building.value, form.building.value, form.building.value, history).then((userToken) => {
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
            <h1 className="header">Новый заказ на строительство</h1>
            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3"
                fill
            >
                <Tab eventKey="home" title="В начало очереди"/>
                <Tab eventKey="profile" title="В конец очереди"/>
            </Tabs>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    {/*<Form.Group md="4" controlId="building">*/}
                    {/*    <Form.Label>Строение</Form.Label>*/}
                    {/*    <Form.Control*/}
                    {/*        required*/}
                    {/*    />*/}
                    {/*    <Form.Control.Feedback type="invalid">*/}
                    {/*        Пожалуйста, введите корректное название строения*/}
                    {/*    </Form.Control.Feedback>*/}
                    {/*</Form.Group>*/}
                    <Form.Group md="4" controlId="building">
                        <Form.Label>Здание</Form.Label>
                        <Form.Select isValid={isSelectValid} onChange={(event) => {
                            validateSelect(ROLES.includes(event.target.value));
                        }} size="lg" aria-label="Default select example">
                            {buildings.map((building) => <option value={building.id}>{building.name}</option>)}
                        </Form.Select>

                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, Выберите роль
                        </Form.Control.Feedback>
                    </Form.Group>
                    <InputGroup>
                        <InputGroup.Text>Комментарий</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="Комментарий" />
                    </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button type="submit" size="lg">Создать</Button>
                </div>
            </Form>
        </Container>
    );
}
