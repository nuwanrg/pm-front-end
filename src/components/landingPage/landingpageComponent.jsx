import React from "react";

import CarouselComponent from "./carouselComponent/carouselComponent";
import CardGroupComponent from "./cardGroupComponent/cardgroupComponent";
import { Col, Container, Row } from "react-bootstrap";
import FooterComponent from "../commonComponents/footerComponent/footer";

function LandingPageComponent() {
  return (
    <div className="LandingPageComponent">
      <CarouselComponent />

      <Container>
        <Row>
          <Col></Col>
          <Col xs={12}>
            <CardGroupComponent />
            <CardGroupComponent />
          </Col>
          <Col></Col>
        </Row>
      </Container>

      <FooterComponent />
    </div>
  );
}

export default LandingPageComponent;
