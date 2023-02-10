import {Col, Container, Image, Row} from "react-bootstrap";
import React from "react";


export const Resource = ({text, icon}) => {
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
