import React from "react";
import CardDeck from "react-bootstrap/CardDeck"
import CardComponent from "./cardComponent/cardComponent";

function CardGroupComponent() {
    return (
        <div>
            <div>
                <h1>Header 1</h1>
            </div>
            <br/>
            <CardDeck>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
            </CardDeck>
        </div>
    );
}

export default CardGroupComponent;