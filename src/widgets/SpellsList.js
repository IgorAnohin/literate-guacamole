import React, {useEffect, useState} from "react";
import {getSpells} from "../services/assets";
import {AssetsTable} from "./AssetsList";
import {imageFormatter} from "./image_formatter";
import {EARTH_MAGIC_SCHOOL, FIRE_MAGIC_SCHOOL, WATER_MAGIC_SCHOOL} from "../constants";
import {Col, Container, Image, Row} from "react-bootstrap";


function magicSchoolToImage(magicSchool) {
    if (magicSchool == FIRE_MAGIC_SCHOOL) {
        return "/fire_school.png";
    } else if (magicSchool == EARTH_MAGIC_SCHOOL) {
        return "/earth_school.png";
    } else if (magicSchool == WATER_MAGIC_SCHOOL) {
        return "/water_school.png";
    } else {
        return "/wing_school.png";
    }
}

function magicSchoolImage(cell, row) {
    return <Container>
        <Row className="justify-content-md-center">
            <Col xs lg="6">
                <Image src={magicSchoolToImage(cell)} height={100} width={200}/>
            </Col>
        </Row>
    </Container>;
}

export const SpellsList = ({changeAmountAvailable, removeAvailable}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getSpells().then((data) => setData(data))
    }, [])

    const columns = [{
        dataField: 'name',
        text: 'Наименоавние',
    }, {
        dataField: 'magicSchool',
        text: 'Школа магии',
        formatter: magicSchoolImage
    }, {
        dataField: 'level',
        text: 'Уровень',
    }, {
        dataField: 'image',
        text: 'Изображение',
        formatter: imageFormatter
    }];

    return (
        <div>
            {data && <AssetsTable data={data} columns={columns}
                                  changeAmountAvailable={changeAmountAvailable}
                                  removeAvailable={removeAvailable}/>}
        </div>
    );
}
