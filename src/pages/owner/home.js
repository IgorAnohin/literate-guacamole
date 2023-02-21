import {Col, Row} from "react-bootstrap";
import React from "react";
import {
    OWNER_BUILDING_ORDERS_ROUTE, OWNER_BUILDINGS_ROUTE,
    OWNER_RECRUITS_ROUTE,
    OWNER_RESOURCES_ROUTE,
    OWNER_SPELLS_ROUTE
} from "../../constants";
import {PageCardWidget} from "../../widgets/PageCardWidget";


export const OwnerHome = () => {

    return (
        <div>
            <Row xs={1} md={3} className="g-3">
                <Col>
                    <PageCardWidget pageRoute={OWNER_BUILDING_ORDERS_ROUTE} imageSrc="/build_orders.png"
                                    text="Строительство"/>
                </Col>
                <Col>
                    <PageCardWidget pageRoute={OWNER_RECRUITS_ROUTE} imageSrc="/recruits.png"
                                    text="Рекруты"/>
                </Col>
                <Col>
                    <PageCardWidget pageRoute={OWNER_RESOURCES_ROUTE} imageSrc="/resources.png"
                                    text="Ресурсы"/>
                </Col>
            </Row>
            <div style={{height: "20px"}}/>
            <Row xs={1} md={2} className="g-3">
                <Col>
                    <PageCardWidget pageRoute={OWNER_SPELLS_ROUTE} imageSrc="/spells.png"
                                    text="Заклинания"/>
                </Col>
                <Col>
                    <PageCardWidget pageRoute={OWNER_BUILDINGS_ROUTE} imageSrc="/buildings.png"
                                    text="Здания"/>
                </Col>
            </Row>
        </div>
    );
}
