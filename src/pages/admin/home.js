import {Col, Row} from "react-bootstrap";
import React from "react";
import {
    AUDIT_ROUTE,
    ADMIN_RESOURCES_ROUTE,
    USERS_ROUTE,
    ASSET_DEFINITIONS_ROUTE,
    ADMIN_RECRUITS_ROUTE, ADMIN_SPELLS_ROUTE, ADMIN_BUILDINGS_ROUTE
} from "../../constants";
import {PageCardWidget} from "../../widgets/PageCardWidget";

export const AdminHome = () => {
    return (
        <div>
            <Row xs={1} md={3} className="g-3">
                <Col>
                    <PageCardWidget pageRoute={USERS_ROUTE} imageSrc="/users.png" text="Управление пользователями"/>
                </Col>
                <Col>
                    <PageCardWidget pageRoute={AUDIT_ROUTE} imageSrc="/collect_audit_data.png"
                                    text="Сбор аудитных данных по истории изменения активов"/>
                </Col>
                <Col>
                    <PageCardWidget pageRoute={ASSET_DEFINITIONS_ROUTE} imageSrc="/asset_definitions.png"
                                    text="Определения активов"/>
                </Col>
            </Row>
            <div style={{height: "20px"}}/>
            <Row xs={1} md={4} className="g-4">
                <Col>
                    <PageCardWidget pageRoute={ADMIN_RESOURCES_ROUTE} imageSrc="/resources.png" text="Ресурсы замка"/>
                </Col>
                <Col>
                    <PageCardWidget pageRoute={ADMIN_RECRUITS_ROUTE} imageSrc="/recruits.png" text="Рекруты замка"/>
                </Col>
                <Col>
                    <PageCardWidget pageRoute={ADMIN_SPELLS_ROUTE} imageSrc="/spells.png" text="Заклинания замка"/>
                </Col>
                <Col>
                    <PageCardWidget pageRoute={ADMIN_BUILDINGS_ROUTE} imageSrc="/buildings.png" text="Здания замка"/>
                </Col>
            </Row>
        </div>
    );
}
