import {Button, Col, Container, Image, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {changeAssetAmount, createAsset, getRecruits, removeAsset} from "../../services/assets";
import {WARRIOR_NEW_RECRUIT_ROUTE} from "../../constants";
import BootstrapTable from "react-bootstrap-table-next";
import {useHistory} from "react-router-dom";
import {getRecruitAssetDefs} from "../../services/assetDefs";

function imageFormatter(cell, row) {
    return <Container>
        <Row className="justify-content-md-center">
            <Col xs lg="6">
                <Image src={cell} height={100} width={100}/>
            </Col>
        </Row>
    </Container>;
}


export const NewRecruit = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getRecruitAssetDefs().then((data) => setData(data))
    }, [])

    const columns = [{
        dataField: 'name',
        text: 'Наименоавние',
    }, {
        dataField: 'fraction',
        text: 'Фракция',
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
            {data && <RecruitsList data={data} columns={columns}/>}
        </div>
    );
}


class RecruitsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: props.data,
            columns: props.columns,
            selectedRow: null,
        };
    }

    selectRow = (row, isSelect, rowIndex) => {
        this.setState(curr => ({...curr, selectedRow: row}));
    };

    createAsset = () => {
        const history = useHistory();
        createAsset(this.state.selectedRow.id).then(r => {
            history.go(-1);
        })
    };

    render() {
        return (
            <div>
                <BootstrapTable
                    keyField="id"
                    data={this.state.gridData}
                    selectRow={{
                        mode: "radio",
                        hideSelectColumn: true,
                        clickToSelect: true,
                        bgColor: "#99ccff",
                        selected: !!this.state.selectedRow && [this.state.selectedRow.id],
                        onSelect: this.selectRow
                    }}
                    columns={this.state.columns}
                    hover
                />

                {this.state.selectedRow &&

                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2">
                            <Button onClick={this.createAsset} size="lg">Добавить</Button>
                        </div>
                    </Col>
                </Row>
                }
            </div>
        );
    }
}
