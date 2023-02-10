import {useHistory} from "react-router-dom";
import {
    assetTypeToReadable,
    EDIT_ASSET_DEFINITIONS_ROUTE,
    EDIT_USER_ROUTE,
    NEW_ASSET_DEFINITIONS_ROUTE,
    NEW_USER_ROUTE
} from "../../../constants";
import {Button} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import React, {useEffect, useState} from "react";
import {getAssetDefs} from "../../../services/assetDefs";


export const AssetDefinitions = () => {

    const history = useHistory();


    const [assetDefs, setAssetDefs] = useState([])

    const columns = [{
        dataField: 'name',
        text: 'Наименование',
    }, {
        dataField: 'type',
        text: 'Категория',
        formatter: (cellContent, row, rowIndex) => {
            const assetDef = assetDefs[rowIndex];
            return assetTypeToReadable[assetDef.type];
        }
    }, {
        dataField: 'cost',
        text: 'Стоимость',
        formatter: (cellContent, row, rowIndex) => {
            const assetDef = assetDefs[rowIndex];
            let valuesStr = "";
            for (let i = 0; i < assetDef.cost.length; i++) {
                const costItem = assetDef.cost[i];
                const costAsset = assetDefs.find((a) => a.id == costItem.id);

                if (valuesStr.length != 0) {
                    valuesStr += `, `
                }
                valuesStr += `${costAsset.name} - ${costItem.count}`
            }
            return valuesStr;
        }
    }];

    useEffect(() => {
        getAssetDefs().then((newAssetDefs) => setAssetDefs(newAssetDefs))
    }, [])

    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            const assetDef = assetDefs[rowIndex];
            history.push(EDIT_ASSET_DEFINITIONS_ROUTE(assetDef.id))
        },
    }

    return (
        <div>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => {
                    history.push(NEW_ASSET_DEFINITIONS_ROUTE)
                }}>Добавить определение актива</Button>
            </div>
            <BootstrapTable classes={"table-hover"} keyField='id' data={assetDefs} columns={columns}
                            rowEvents={tableRowEvents}
            />
        </div>
    );
}
