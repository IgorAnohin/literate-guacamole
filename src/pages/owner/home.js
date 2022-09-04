
import {useHistory} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import React from "react";
import {OWNER_BUILDING_ROUTE, OWNER_RECRUITMENT_ROUTE, OWNER_RESOURCES_ROUTE} from "../../constants";
import {BookHalf, Building, PersonBadge, SdCardFill} from 'react-bootstrap-icons';

export const OwnerHome = () => {
    const history = useHistory();

    return (
        <Row xs={1} md={3} className="g-3">
            <Col>
                <Card onClick={() => {
                    history.push(OWNER_BUILDING_ROUTE)
                }} style={{cursor: "pointer"}}>
                    <Building className="card-img-top" size="200" style={{textAlign: "center"}}/>
                    <Card.Body>
                        <Card.Title style={{textAlign: "center"}}>
                            Строительство
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card onClick={() => {
                    history.push(OWNER_RECRUITMENT_ROUTE)
                }} style={{cursor: "pointer"}}>
                    <PersonBadge className="card-img-top" size="200" style={{textAlign: "center"}}/>
                    <Card.Body>
                        <Card.Title style={{textAlign: "center"}}>
                            Рекруты
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card onClick={() => {
                    history.push(OWNER_RESOURCES_ROUTE)
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
