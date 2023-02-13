import {Button} from "react-bootstrap";
import React from "react";
import {WIZARD_NEW_SPELL_ROUTE} from "../../constants";
import {useHistory} from "react-router-dom";
import {SpellsList} from "../../widgets/SpellsList";


export const WizardHome = () => {
    const history = useHistory();

    return (
        <div>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => {
                    history.push(WIZARD_NEW_SPELL_ROUTE)
                }}>Добавить новое заклинание</Button>
            </div>
            <SpellsList changeAmountAvailable={false} removeAvailable={true}/>
        </div>
    );
}
