import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Container, Form, Image, InputGroup, Modal, Row} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {
    ALL_RESOURCES,
    ASSETS_FOR_CREATION,
    assetTypeToReadable,
    BUILDING_ASSET,
    BUILDING_ASSET_RESOURCES, CRYSTAL_RESOURCE, GEM_RESOURCE, GOLD_RESOURCE,
    MERCURY_RESOURCE,
    RECRUIT_ASSET,
    RECRUIT_ASSET_RESOURCES,
    SPELL_ASSET,
    SPELL_ASSET_RESOURCES,
    STONE_RESOURCE,
    WOOD_RESOURCE
} from "../../../constants";
import {getAssetDef, updateAssetDef} from "../../../services/assetDefs";

const ChangeConfirmation = ({showModal, hideModal, confirmModal, message}) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-info">{message}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={hideModal}>
                    Отмена
                </Button>
                <Button variant="info" onClick={() => confirmModal()}>
                    Сохранить!
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export const EditAssetDefinition = () => {

    let {assetDefinitionId} = useParams();

    const [assetDefinition, setAssetDefinition] = useState(null);

    useEffect(() => {
            getAssetDef(parseInt(assetDefinitionId)).then((data) => {
                setAssetDefinition(data);
            })
        },
        []
    );

    return (assetDefinition && <EditAssetDefinitionForm assetDefinition={assetDefinition}/>)
}


const EditAssetDefinitionForm = ({assetDefinition}) => {

    const [preview, setPreview] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [validated, setValidated] = useState(false);
    const [isSelectValid, validateSelect] = useState(false);
    const [assetDefType, setAssetDefType] = useState(ASSETS_FOR_CREATION[0]);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

    const history = useHistory();
    const fileFormRef = useRef(null);
    const formRef = useRef(null);

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setDisplayConfirmationModal(true);
        }

        setValidated(true);
    };



    const submitSave = (event) => {
        const form = formRef.current;
        const availableResources = assetDefType == BUILDING_ASSET ? BUILDING_ASSET_RESOURCES : assetDefType == SPELL_ASSET ? SPELL_ASSET_RESOURCES : RECRUIT_ASSET_RESOURCES;

        const notAvailableResources = ALL_RESOURCES.filter(x => !availableResources.includes(x));

        let oneOfAvailableNotZero = false;
        for (const resource of availableResources) {
            if (form[`cost_${resource}`].value != 0) {
                oneOfAvailableNotZero = true;
            }
        }


        let allNotAvailableZero = true;
        for (const resource of notAvailableResources) {
            if (form[`cost_${resource}`].value != 0) {
                allNotAvailableZero = false;
            }
        }

        if (!allNotAvailableZero || !oneOfAvailableNotZero) {
            alert("Хотя бы одно значение доступаного ресурса должно быть больше 0 и все недоступные должны быть равны 0")
            event.stopPropagation();
            return;
        }

        const costs = {}
        for (const resource of ALL_RESOURCES) {
            costs[resource.toLowerCase()] = Number(form[`cost_${resource}`].value);
        }

        updateAssetDef(
            assetDefinition.id,
            form.asset_def_name.value,
            form.asset_def_type.value,
            form.asset_def_description.value,
            costs,
            form.asset_def_image.value,
            history
        ).then((userToken) => {
        });
        setDisplayConfirmationModal(false);
    }

    const handleCancel = (event) => {
        console.log("Cancel!");
        history.go(-1);
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    useEffect(() => {
        setPreview(assetDefinition.image);
        setAssetDefType(assetDefinition.type);
    }, [])

    return (
        <Container>
            <h1 className="header">Редактирование определения актива</h1>
            <Form ref={formRef}  noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="asset_def_image" className="mb-3">
                            <Form.Control
                                ref={fileFormRef} type="file" onChange={onSelectFile}
                                style={{opacity: 0, display: "none"}}/>
                            {preview &&
                            <div className={"d-flex align-items-center justify-content-center"}>
                                <Image src={preview} onClick={() => fileFormRef.current.click()} style={{
                                    width: "400px",
                                    height: "400px",
                                    cursor: "pointer",
                                    background: "#dedede"
                                }}/>
                            </div>}

                            {!preview &&
                            <div className={"d-flex align-items-center justify-content-center"}>
                                <Card
                                    style={{width: "400px", height: "400px", cursor: "pointer", background: "#dedede"}}
                                    onClick={() => fileFormRef.current.click()}>
                                    <div className={"border d-flex align-items-center justify-content-center"}
                                         style={{height: "400px"}}>
                                        Добавить изображение
                                    </div>

                                </Card>
                            </div>}

                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, установите фото
                            </Form.Control.Feedback>


                        </Form.Group>
                    </Col>


                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Group md="4" controlId="asset_def_name">
                                <Form.Label>Имя ресурса</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={assetDefinition.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите имя ресурса
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="asset_def_description">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="4"
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group md="4" controlId="asset_def_type">
                                <Form.Label>Тип</Form.Label>
                                <Form.Select isValid={isSelectValid} onChange={(event) => {
                                    validateSelect(ASSETS_FOR_CREATION.includes(event.target.value));
                                    setAssetDefType(event.target.value);
                                }} size="lg" aria-label="Default select example"
                                >
                                    {ASSETS_FOR_CREATION.map((role) => <option
                                        value={role}>{assetTypeToReadable[role]}</option>)}
                                </Form.Select>

                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, Выберите тип актива
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Group>
                    </Col>

                </Row>

                {assetDefType === BUILDING_ASSET &&
                <ResourcesGrid availableResources={BUILDING_ASSET_RESOURCES} defaultValues={assetDefinition.cost}/>}
                {assetDefType === SPELL_ASSET &&
                <ResourcesGrid availableResources={SPELL_ASSET_RESOURCES} defaultValues={assetDefinition.cost}/>}
                {assetDefType === RECRUIT_ASSET &&
                <ResourcesGrid availableResources={RECRUIT_ASSET_RESOURCES} defaultValues={assetDefinition.cost}/>}

                <div style={{height: "30px"}}/>


                <Row>
                    <Col>

                        <div className="d-grid gap-2">
                            <Button size="lg" style={{background: "grey"}} onClick={handleCancel}>Отмена</Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2">
                            <Button type="submit" size="lg">Создать</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            <ChangeConfirmation showModal={displayConfirmationModal} confirmModal={submitSave}
                                hideModal={hideConfirmationModal}
                                message="Вы уверены, что хотите удалить пользователя?"/>
        </Container>
    );
}

const getCountFromDefaultValues = (defaultValues, name) => {
    const defaultValue = defaultValues.find(v=>v.name == name.toLowerCase());
    if (defaultValue === undefined) {
        return 0;
    }

    return  defaultValue.count;
}

const ResourcesGrid = ({availableResources, defaultValues}) => {
    return <Container>
        <Row>
            <Col>
                <ResourceForm name={"Камень"} controlId={`cost_${STONE_RESOURCE}`} icon={"/stone.png"}
                              defaultValue={getCountFromDefaultValues(defaultValues, STONE_RESOURCE)}
                              enabled={availableResources.includes(STONE_RESOURCE)}/>
            </Col>
            <Col>
                <ResourceForm name={"Дерево"} controlId={`cost_${WOOD_RESOURCE}`} icon={"/wood.png"}
                              defaultValue={getCountFromDefaultValues(defaultValues, WOOD_RESOURCE)}
                              enabled={availableResources.includes(WOOD_RESOURCE)}/>
            </Col>
            <Col>
                <ResourceForm name={"Золото"} controlId={`cost_${GOLD_RESOURCE}`} icon={"/gold.png"}
                              defaultValue={getCountFromDefaultValues(defaultValues, GOLD_RESOURCE)}
                              enabled={availableResources.includes(GOLD_RESOURCE)}/>
            </Col>
        </Row>
        <div style={{height: "20px"}}/>
        <Row>
            <Col>
                <ResourceForm name={"Самоцветы"} controlId={`cost_${GEM_RESOURCE}`} icon={"/gem.png"}
                              defaultValue={getCountFromDefaultValues(defaultValues, GEM_RESOURCE)}
                              enabled={availableResources.includes(GEM_RESOURCE)}/>
            </Col>
            <Col>
                <ResourceForm name={"Кристалы"} controlId={`cost_${CRYSTAL_RESOURCE}`} icon={"/crystal.png"}
                              defaultValue={getCountFromDefaultValues(defaultValues, CRYSTAL_RESOURCE)}
                              enabled={availableResources.includes(CRYSTAL_RESOURCE)}/>
            </Col>
            <Col>
                <ResourceForm name={"Ртуть"} controlId={`cost_${MERCURY_RESOURCE}`} icon={"/mercury.png"}
                              defaultValue={getCountFromDefaultValues(defaultValues, MERCURY_RESOURCE)}
                              enabled={availableResources.includes(MERCURY_RESOURCE)}/>
            </Col>
        </Row>
    </Container>

}

const ResourceForm = ({controlId, name, icon, enabled, defaultValue}) => {
    return <Container>
        <Row>
            <Form.Label style={{textAlign: "center", fontWeight: "bold", fontSize: 20}}>
                {name}
            </Form.Label>
        </Row>
        <Row>
            <Col md="auto">
                <Image src={icon} height="48px" width="48px"/>
            </Col>
            <Col>
                <Container style={{paddingTop: "10px"}}>
                    <Form.Group md="4" controlId={controlId}>
                        <Form.Control
                            type="number"
                            defaultValue={defaultValue}
                            min={0}
                            disabled={!enabled}
                        />
                    </Form.Group>
                </Container>
            </Col>
        </Row>

    </Container>

}