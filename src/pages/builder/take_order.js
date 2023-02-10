import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {acceptBuildingOrder, dismissBuildingOrder, getBuildingOrderById} from "../../services/building_orders";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {HOME_ROUTE} from "../../constants";


const Resource = ({text, icon}) => {
    return (
        <div className="border" style={{padding: 10}}>
            <Row>
                <Col md="auto">
                    <Image src={icon} height="48px" width="48px"/>
                </Col>
                <Col>
                    <Container style={{paddingTop: "10px"}}>
                        {text}
                    </Container>
                </Col>
            </Row>

        </div>

    );

}

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
                    <Container>
                        <Row>
                            <Col>
                                <Resource text={1000}
                                          icon={"https://cdn.iconscout.com/icon/free/png-256/stone-12-449919.png"}/>
                            </Col>
                            <Col>
                                <Resource text={2000}
                                          icon={"https://toppng.com/uploads/preview/gold-icon-png-11552723744f0vj8surrx.png"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Resource text={3000}
                                          icon={"https://cdn-icons-png.flaticon.com/512/2701/2701763.png"}/>
                            </Col>
                            <Col>
                                <Resource text={4000}
                                          icon={"https://cdn-icons-png.flaticon.com/512/222/222436.png"}/>
                            </Col>
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
