import React, {useEffect, useState} from "react";
import {getSpells} from "../services/assets";
import {AssetsTable} from "./AssetsList";
import {imageFormatter} from "./image_formatter";

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
