import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';


const { SearchBar } = Search;

export const Resources = () => {

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
    const products = [
        {id: 1, name: "Песок", amount: "12", type: "Ресурс"},
        {id: 2, name: "Капитолий", amount: "11", type: "Здание"},
        {id: 3, name: "Жмых", amount: "1", type: "Рекрутёр"},
    ];

    return <ToolkitProvider
        keyField="id"
        data={ products }
        columns={ columns }
        search
    >
        {
            props => (
                <div>
                    <h3>Поиск по ресурсам:</h3>
                    <SearchBar { ...props.searchProps } srText=""/>
                    <hr />
                    <BootstrapTable
                        { ...props.baseProps }
                    />
                </div>
            )
        }
    </ToolkitProvider>
}