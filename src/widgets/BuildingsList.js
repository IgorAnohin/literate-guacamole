import React, {useEffect, useState} from "react";
import {getBuildings, getResources} from "../services/assets";
import {AssetsTable} from "./AssetsList";

export const BuildingsList = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getBuildings().then((data) => setData(data))
    }, [])

    const columns = [{
        dataField: 'name',
        text: 'Наименоавние',
    }, {
        dataField: 'description',
        text: 'Описание',
    }];

    return (
        <div>
            {data && <AssetsTable data={data} columns={columns}
                                  changeAmountAvailable={false}
                                  removeAvailable={false}
            />}
        </div>
    );
}
