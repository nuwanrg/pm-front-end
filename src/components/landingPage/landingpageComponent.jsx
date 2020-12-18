import React from "react";

import CarouselComponent from "./carouselComponent/carouselComponent";
import CardGroupComponent from "./cardGroupComponent/cardgroupComponent";
import { Col, Container, Row } from "react-bootstrap";

function LandingPageComponent() {
  return (
    <div>
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

      
    </div>
  );
}

export default LandingPageComponent;
