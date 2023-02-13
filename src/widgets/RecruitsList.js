import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {getRecruits} from "../services/assets";
import {Button} from "react-bootstrap";
import {WARRIOR_NEW_RECRUIT_ROUTE} from "../constants";
import {AssetsTable} from "./AssetsList";
import {imageFormatter} from "./image_formatter";

export const RecruitsList = ({changeAmountAvailable, removeAvailable}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getRecruits().then((data) => setData(data))
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
    }, {
        dataField: 'amount',
        text: 'Количество',
    }];

    return (
        <div>
            {data && <AssetsTable data={data} columns={columns}
                                  changeAmountAvailable={changeAmountAvailable}
                                  removeAvailable={removeAvailable}/>}
        </div>
    );
}
