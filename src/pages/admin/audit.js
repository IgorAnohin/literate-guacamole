import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {BookHalf, Building, PersonBadge, SdCardFill} from 'react-bootstrap-icons';
import {createAudit} from "../../services/audit";
import {ASSET_BUILDING_EN, ASSET_RECRUIT_EN, ASSET_RESOURCE_EN, ASSET_SPELL_EN} from "../../constants";


var spell_checked = false;
var recrut_checked = false;
var building_checked = false;
var resources_checked = false;


const Resource = ({id, name, icon}) => {
    return (
        <div className="border" style={{padding: 10}}>
            <Row>
                <Col md="auto">
                    {icon}
                </Col>
                <Col>
                    <div>
                        {name}
                    </div>
                </Col>
                <Col lg="1" style={{paddingLeft: 80}}>
                    <Form.Check style={{width: 0, margin: 0, paddingRight: 0, paddingLeft: 0}}
                                type="switch"
                                id={id}
                                onChange={(e) => {

                                    if (id == "resources") {
                                        spell_checked = !spell_checked;
                                    } else if (id == "recruts") {
                                        recrut_checked = !recrut_checked;
                                    } else if (id == "spells") {
                                        building_checked = !building_checked;
                                    } else if (id == "buildings") {
                                        resources_checked = !resources_checked;
                                    }

                                }}
                    />
                </Col>
            </Row>

        </div>

    );

}

export const Audit = () => {
    const [validated, setValidated] = useState(false);
    const history = useHistory();


    const downloadTxtFile = (data) => {
        const element = document.createElement("a");
        const file = new Blob([data], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "audit.csv";
        document.body.appendChild(element);
        element.click();
    };

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            const assetsTypes = [];
            console.log(spell_checked)
            if (spell_checked) {
                assetsTypes.push(ASSET_RESOURCE_EN);
            }
            console.log(recrut_checked)
            if (recrut_checked) {
                assetsTypes.push(ASSET_RECRUIT_EN);
            }
            console.log(building_checked)
            if (building_checked) {
                assetsTypes.push(ASSET_SPELL_EN);
            }
            console.log(resources_checked)
            if (resources_checked) {
                assetsTypes.push(ASSET_BUILDING_EN);
            }

            createAudit(form.audit_start.value, form.audit_end.value, assetsTypes, history).then((auditData) => {
                console.log("Audit data:", auditData);
                downloadTxtFile(auditData);
            });
        }

        setValidated(true);
    };

    return (
        <Container>
            <h1 className="header">???????? ???????????????? ???????????? ???? ?????????????? ?????????????????? ??????????????</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                            <Form.Group md="4" controlId="audit_start">
                                <Form.Label>???????? ????????????:</Form.Label>
                                <Form.Control
                                    required
                                    type="datetime-local"
                                />
                                <Form.Control.Feedback type="invalid">
                                    ????????????????????, ?????????????????? ???????? ????????????
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group md="4" controlId="audit_end">
                                <Form.Label>???????? ??????????:</Form.Label>
                                <Form.Control
                                    required
                                    type="datetime-local"
                                />
                                <Form.Control.Feedback type="invalid">
                                    ????????????????????, ?????????????????? ???????? ??????????
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div>
                        ?????????????? ???????????? ?????? ??????????????????. ???????? ???? ???????????? ???? ????????, ?????????? ???????????????? ??????:
                    </div>
                    <Row>
                        <Col>
                            <Resource id="resources" name="??????????????" icon={<SdCardFill/>}/>
                        </Col>
                        <Col>
                            <Resource id="recruts" name="??????????????" icon={<PersonBadge/>}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Resource id="spells" name="????????????????????" icon={<BookHalf/>}/>
                        </Col>
                        <Col>
                            <Resource id="buildings" name="????????????" icon={<Building/>}/>
                        </Col>
                    </Row>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button type="submit" size="lg">?????????????? ??????????</Button>
                </div>
            </Form>
        </Container>
    );
}