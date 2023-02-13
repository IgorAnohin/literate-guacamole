
import {useHistory} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import React from "react";
import {
    OWNER_BUILDING_ROUTE,
    OWNER_RECRUITMENT_ROUTE, OWNER_RECRUITS_ROUTE,
    OWNER_RESOURCES_ROUTE,
    OWNER_SPELLS_ROUTE
} from "../../constants";
import {Building, PersonBadge, CollectionFill} from 'react-bootstrap-icons';


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
                    history.push(OWNER_RECRUITS_ROUTE)
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
                    <CollectionFill className="card-img-top" size="200" style={{textAlign: "center"}}/>
                    <Card.Body>
                        <Card.Title style={{textAlign: "center"}}>
                            Ресурсы
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card onClick={() => {
                    history.push(OWNER_SPELLS_ROUTE)
                }} style={{cursor: "pointer"}}>
                    <CollectionFill className="card-img-top" size="200" style={{textAlign: "center"}}/>
                    <Card.Body>
                        <Card.Title style={{textAlign: "center"}}>
                            Заклинания
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
