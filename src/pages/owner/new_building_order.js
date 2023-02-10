import React, {useEffect, useState} from "react";
import {Button, Container, Form, InputGroup, Tabs} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {Tab} from "bootstrap";
import {getBuildings} from "../../services/assets";
import {createBuildingOrder} from "../../services/building_orders";

export const NewBuildingOrder = () => {

    const [validated, setValidated] = useState(false);
    const history = useHistory();

    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        getBuildings().then((newBuildings) => setBuildings(newBuildings));
    }, [])


    let comment = "";
    let toBeginningQueue = false;

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            createBuildingOrder(toBeginningQueue, form.buildingSelector.value, comment, history).then((userToken) => {
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
                className="mb-3"
                fill
                onSelect={e => {
                    toBeginningQueue = e === "home";
                }}
            >
                <Tab eventKey="home" title="В начало очереди"/>
                <Tab eventKey="profile" title="В конец очереди"/>
            </Tabs>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Group md="4" controlId="buildingSelector">
                        <Form.Label>Здание</Form.Label>
                        <Form.Select isValid={isSelectValid} size="lg" aria-label="Default select example">
                            {
                                buildings.map((building) => {
                                    return (<option key={building.id} value={building.id}>{building.name}</option>);
                                })
                            }
                        </Form.Select>

                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, Выберите роль
                        </Form.Control.Feedback>
                    </Form.Group>
                    <InputGroup>
                        <InputGroup.Text>Комментарий</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="Комментарий" onChange={e => comment = e.target.value}/>
                    </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button type="submit" size="lg">Создать</Button>
                </div>
            </Form>
        </Container>
    );
}
