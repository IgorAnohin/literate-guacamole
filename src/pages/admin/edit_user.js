import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {deleteUser, getUser, updateUser} from "../../services/users";
import {ROLES, roleToReadable} from "../../constants";
import {getBuildingOrderById} from "../../services/building_orders";

const DeleteConfirmation = ({showModal, hideModal, confirmModal, message}) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-danger">{message}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={hideModal}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={() => confirmModal()}>
                    Удалить!
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export const EditUser = () => {

    let {userId} = useParams();
    console.log(userId);


    const [user, setUser] = useState(null);

    useEffect(() => {
            getUser(parseInt(userId)).then((userDat) => {
                setUser(userDat);
            })
        },
        []
    );

    return (user && <EditUserForm user={user}/>)
}

const EditUserForm = (params) => {

    const user = params.user;

    const [preview, setPreview] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [validated, setValidated] = useState(false);
    const [isSelectValid, validateSelect] = useState(false);
    const [editShown, setEditShown] = useState(false);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);


    const history = useHistory();
    const formRef = useRef(null);
    const fileFormRef = useRef(null);

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const handleFieldChanges = (event) => {
        const form = formRef.current;
        setEditShown(
            form.user_name.value != user.name ||
            form.user_email.value != user.email ||
            form.user_password.value != "" ||
            form.user_role.value != user.role ||
            form.user_avatar.value != ""
        );
    }

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            updateUser(user.id, {
                email: form.user_email.value,
                password: form.user_password.value,
                role: form.user_role.value,
            }, form.user_avatar.value, user.image, history).then((userToken) => {
            });
        }

        setValidated(true);
    };

    const submitDelete = () => {
        deleteUser(user.id, history).then(r => {})
        setDisplayConfirmationModal(false);
    };


    const onDeleteClick = (event) => {
        setDisplayConfirmationModal(true);
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        handleFieldChanges();
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
        console.log(user);
        console.log(user.image);
        setPreview(user.image);
    }, [])

    return (
        <Container>
            <h1 className="header">Новый пользователь</h1>
            <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="user_avatar" className="mb-3">
                            <Form.Control ref={fileFormRef} type="file" onChange={onSelectFile}
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

                        </Form.Group>
                    </Col>


                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Group md="4" controlId="user_name">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={user.name}
                                    onChange={handleFieldChanges}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите имя пользователя
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="user_email">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    defaultValue={user.email}
                                    onChange={handleFieldChanges}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите корректную почту
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="user_password">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    defaultValue={user.password}
                                    onChange={handleFieldChanges}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите пароль
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4" controlId="user_role">
                                <Form.Label>Роль</Form.Label>
                                <Form.Select isValid={isSelectValid} onChange={(event) => {
                                    validateSelect(ROLES.includes(event.target.value));
                                    handleFieldChanges();
                                }} size="lg" aria-label="Default select example" defaultValue={user.role}>
                                    {ROLES.map((role) => <option value={role}>{roleToReadable[role]}</option>)}
                                </Form.Select>

                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, Выберите роль
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                    <Col>

                        <div className="d-grid gap-2">
                            <Button size="lg" style={{background: "#DC4C64"}} onClick={onDeleteClick}>Удалить</Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2">
                            {(editShown &&
                                <Button type="submit" size="lg">Создать</Button>)}
                        </div>
                    </Col>
                </Row>
            </Form>
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete}
                                hideModal={hideConfirmationModal}
                                message="Вы уверены, что хотите удалить пользователя?"/>
        </Container>
    );
}
