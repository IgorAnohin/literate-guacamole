import {Button} from "react-bootstrap";
import React from "react";
import {WARRIOR_NEW_RECRUIT_ROUTE} from "../../constants";
import {useHistory} from "react-router-dom";
import {RecruitsList} from "../../widgets/RecruitsList";


export const WarriorHome = () => {

    const history = useHistory();

    return (
        <div>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => {
                    history.push(WARRIOR_NEW_RECRUIT_ROUTE)
                }}>Добавить нового рекрута</Button>
            </div>
            <RecruitsList changeAmountAvailable={true} removeAvailable={true}/>
        </div>
    );
}
