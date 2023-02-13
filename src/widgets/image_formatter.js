import {Col, Container, Image, Row} from "react-bootstrap";

export function imageFormatter(cell, row) {
    return <Container>
        <Row className="justify-content-md-center">
            <Col xs lg="6">
                <Image src={cell} height={100} width={100}/>
            </Col>
        </Row>
    </Container>;
}


