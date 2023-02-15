import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {acceptBuildingOrder, dismissBuildingOrder, getBuildingOrderById} from "../../services/building_orders";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {HOME_ROUTE, RECRUIT_ASSET_RESOURCES} from "../../constants";
import {Resource} from "../../widgets/ResourceWidget";
import {ResourcesGrid} from "../admin/assetDefs/edit_asset_definition";

export const TakeOrder = () => {

    let {orderId} = useParams();
    console.log(orderId)


    const [order, setOrder] = useState(null);

    useEffect(() => {
            getBuildingOrderById(parseInt(orderId)).then((orderData) => {
                setOrder(orderData);
            })
        },
        []
    );

    const history = useHistory();

    return (
        (order != null && <Container fluid>
            <Row>
                <Col><h1 className="mb-3" style={{textAlign: "center"}}>{order.building.name}</h1></Col>
            </Row>

            <Row>
                <Col style={{display: "flex"}} className="justify-content-center">
                    <Image src={order.building.imgOrigUrl} rounded/>
                </Col>
                <Col>
                    <ResourcesGrid availableResources={[]} defaultValues={order.building.cost}/>
                </Col>
            </Row>

            <div style={{height: "20px"}}/>

            <Card body>{order.order.comment}</Card>

            <div style={{height: "20px"}}/>

            <Row>
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="secondary" size="lg" onClick={event => {
                            dismissBuildingOrder(orderId).then(() => {
                                history.replace(HOME_ROUTE)
                            });
                        }}>
                            Отклонить
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={event => {
                            acceptBuildingOrder(orderId).then(() => {
                                history.replace(HOME_ROUTE)
                            });
                        }}>Взять в работу</Button>
                    </div>
                </Col>
            </Row>

        </Container>)
    );
}
