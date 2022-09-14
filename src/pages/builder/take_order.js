import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getBuildingOrderById} from "../../services/building_orders";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";

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

    console.log("order", order);

    return (
        (order != null && <Container fluid>
            <Row>
                <Col><h1 className="mb-3" style={{textAlign: "center"}}>{order.building.name}</h1></Col>
            </Row>

            <Row>
                <Col>
                    <Image src={order.building.imgOrigUrl} rounded/>
                </Col>
                <Col>
                    <Container>
                        <Row>
                            <Col>1 of 2</Col>
                            <Col>2 of 2</Col>
                        </Row>
                        <Row>
                            <Col>1 of 2</Col>
                            <Col>2 of 2</Col>
                        </Row>
                    </Container>
                </Col>
            </Row>

            <div style={{height: "20px"}}/>

            <Card body>{order.order.comment}</Card>

            <div style={{height: "20px"}}/>

            <Row>
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="secondary" size="lg">
                            Отклонить
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg">Взять в работу</Button>
                    </div>
                </Col>
            </Row>

        </Container>)
    );
}
