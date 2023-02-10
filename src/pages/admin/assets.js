import React, {useEffect, useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import {getResources} from "../../services/assets";

const {SearchBar} = Search;


export const Assets = () => {

    const columns = [{
        dataField: 'name',
        text: 'Название',
    }, {
        dataField: 'amount',
        text: 'Количество',
        sort: true,
    }, {
        dataField: 'type',
        text: 'Тип',
        sort: true,
    }];

    const [resources, setResources] = useState([])

    useEffect(() => {
        getResources().then((newResources) => setResources(newResources))
    }, [])

    return <ToolkitProvider
        keyField="id"
        data={resources}
        columns={columns}
        search
    >
        {
            props => (
                <div>
                    <h3>Поиск по ресурсам:</h3>
                    <SearchBar {...props.searchProps} srText=""/>
                    <hr/>
                    <BootstrapTable
                        {...props.baseProps}
                    />
                </div>
            )
        }
    </ToolkitProvider>
}