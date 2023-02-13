import {Col, Row} from "react-bootstrap";
import React from "react";
import {AUDIT_ROUTE, ADMIN_RESOURCES_ROUTE, USERS_ROUTE, ASSET_DEFINITIONS_ROUTE} from "../../constants";
import {PageCardWidget} from "../../widgets/PageCardWidget";

export const AdminHome = () => {
    return (
        <Row xs={1} md={3} className="g-3">
            <Col>
                <PageCardWidget pageRoute={USERS_ROUTE} imageSrc="./Vector.png" text="Управление пользователями"/>
            </Col>
            <Col>
                <PageCardWidget pageRoute={AUDIT_ROUTE} imageSrc="./Vector.png"
                                text="Сбор аудитных данных по истории изменения активов"/>
            </Col>
            <Col>
                <PageCardWidget pageRoute={ADMIN_RESOURCES_ROUTE} imageSrc="./Vector.png" text="Активы замка"/>
            </Col>
            <Col>
                <PageCardWidget pageRoute={ASSET_DEFINITIONS_ROUTE} imageSrc="./Vector.png" text="Определения активов"/>
            </Col>
        </Row>
    );
}
