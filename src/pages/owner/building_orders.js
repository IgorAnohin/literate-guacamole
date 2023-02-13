import {Button, Col, Row} from "react-bootstrap";
import {OWNER_NEW_BUILDING_ORDER_ROUTE} from "../../constants";
import BootstrapTable from "react-bootstrap-table-next";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {
    decreaseBuildingOrderPriority,
    getBuildingOrders,
    increaseBuildingOrderPriority
} from "../../services/building_orders";

export const BuildingOrders = () => {
    const history = useHistory();

    const columns = [{
        dataField: 'name',
        text: 'Здание'
    }, {
        dataField: 'ordinal',
        text: 'Место в очереди строительство'
    }, {
        dataField: 'comment',
        text: 'Комментарий'
    }, {
        dataField: 'status',
        text: 'Статус',
    },];

    const [buildings, setBuildings] = useState(null);
    useEffect(() => {
            getBuildingOrders().then((newBuildings) => setBuildings(newBuildings))
        },
        []
    );

    return <div>
        <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={() => {
                history.push(OWNER_NEW_BUILDING_ORDER_ROUTE)
            }}>Добавить заказ на строительство</Button>
        </div>

        {buildings && <BuildingsTable data={buildings} columns={columns}/>}
    </div>
}

class BuildingsTable extends React.Component {
    constructor(props) {
        super(props);

        console.log(props.data)
        let maxOrder = 0;
        for (const building of props.data) {
            console.log(building.ordinal)
            if (building.ordinal > maxOrder) {
                maxOrder = building.ordinal;
            }
        }

        this.state = {
            gridData: props.data,
            columns: props.columns,

            maxOrder: maxOrder,

            selectedRow: null,
        };
    }

    selectRow = (row, isSelect, rowIndex) => {
        this.setState(curr => ({...curr, selectedRow: row}));
    };

    increasePriority = () => {
        increaseBuildingOrderPriority(this.state.selectedRow.id).then(r => {
        });
    }

    decreasePriority = () => {
        decreaseBuildingOrderPriority(this.state.selectedRow.id).then(r => {
        });
    }


    render() {
        return <div>
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

            <Row>
                <Col>
                    {!!this.state.selectedRow && this.state.selectedRow.ordinal != 1 &&
                    <div className="d-grid gap-2">
                        <Button size="lg" onClick={this.increasePriority}>Повысить приоритет</Button>
                    </div>
                    }
                </Col>
                <Col>
                    {!!this.state.selectedRow && this.state.selectedRow.ordinal != this.state.maxOrder &&
                    <div className="d-grid gap-2">
                        <Button size="lg" onClick={this.decreasePriority}>Понизить приоритет</Button>
                    </div>
                    }
                </Col>
            </Row>
        </div>
    }
}