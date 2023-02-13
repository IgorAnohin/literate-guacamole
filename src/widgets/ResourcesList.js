import React, {useEffect, useState} from "react";
import {getResources} from "../services/assets";
import {AssetsTable} from "./AssetsList";
import {imageFormatter} from "./image_formatter";

export const ResourcesList = ({changeAmountAvailable,  onlyDecrease = false}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getResources().then((data) => setData(data))
    }, [])

    const columns = [{
        dataField: 'name',
        text: 'Наименоавние',
    }, {
        dataField: 'image',
        text: 'Изображение',
        formatter: imageFormatter
    }, {
        dataField: 'amount',
        text: 'Количество',
    }];

    return (
        <div>
            {data && <AssetsTable data={data} columns={columns}
                                  changeAmountAvailable={changeAmountAvailable}
                                  removeAvailable={false}
                                  onlyDecrease={onlyDecrease}
            />}
        </div>
    );
}
