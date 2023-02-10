import {Card} from "react-bootstrap";
import {ClipboardData, CollectionFill} from "react-bootstrap-icons";
import React from "react";
import {useHistory} from "react-router-dom";

export const PageCardWidget = ({pageRoute, imageSrc, text}) => {
    const history = useHistory();

    return <Card onClick={() => {
        history.push(pageRoute)
    }} style={{cursor: "pointer", minHeight: "300px"}}>
        <Card.Img variant="top" src={imageSrc} style={{objectFit: "scale-down", maxHeight: "200px",}}/>
        <Card.Body>
            <Card.Title style={{textAlign: "center"}}>
                {text}
            </Card.Title>
        </Card.Body>
    </Card>

}