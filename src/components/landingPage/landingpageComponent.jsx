import React from 'react';

import CarouselComponent from "./carouselComponent/carouselComponent";
import CardGroupComponent from "./cardGroupComponent/cardgroupComponent";
import {Col, Container, Row} from "react-bootstrap";
import FooterComponent from "../commonComponents/footerComponent/footer";

function LandingPageComponent() {
    return (
        <div className="LandingPageComponent">
            <CarouselComponent/>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={12}>
                <CardGroupComponent/>
                <br/>
                <br/>
                <CardGroupComponent/>
                <br/>
                <br/>
                <CardGroupComponent/>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

                <FooterComponent />
        </div>
    );
}

export default LandingPageComponent;
