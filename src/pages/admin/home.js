import {useHistory} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import React from "react";
import {AUDIT_ROUTE, RESOURCES_ROUTE, USERS_ROUTE} from "../../constants";

export const AdminHome = () => {
    const history = useHistory();

    return (
        <Row xs={1} md={3} className="g-3">
            <Col>
                <Card onClick={() => {
                    history.push(USERS_ROUTE)
                }} style={{cursor: "pointer"}}>
                    <Card.Img variant="top" src="./Vector.png" style={{objectFit: "scale-down", maxHeight: "200px",}}/>
                    <Card.Body>
                        <Card.Title style={{textAlign: "center"}}>
                            Управление пользователями
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card onClick={() => {
                    history.push(AUDIT_ROUTE)
                }} style={{cursor: "pointer"}}>
                    <Card.Img variant="top" src="./Vector.png" style={{objectFit: "scale-down", maxHeight: "200px",}}/>
                    <Card.Body>
                        <Card.Title style={{textAlign: "center"}}>
                            Сбор аудитных данных по истории изменения активов
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card onClick={() => {
                    history.push(RESOURCES_ROUTE)
                }} style={{cursor: "pointer"}}>
                    <Card.Img variant="top" src="./Vector.png" style={{objectFit: "scale-down", maxHeight: "200px",}}/>
                    <Card.Body>
                        <Card.Title style={{textAlign: "center"}}>
                            Активы замка
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
