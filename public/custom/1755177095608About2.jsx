import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import about2 from "./../../assets/images/about2.webp"
const About2 = () => {
  return (
    <section className="about section bg-light-alt about-3">
      <Container>
        <div className="text-center mb-5" data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom">
          <span className="px-3 py-2 rounded-pill bg-primary text-white mb-2 d-inline-block">
            About Us
          </span>
          <h2 className="display-5 fw-bold mb-3">Our Story</h2>
          <p className="text-muted lead mx-auto" style={{ maxWidth: "700px" }}>
            Delivering excellence in financial services for over 15 years
          </p>
        </div>

        <Row className="g-4">
          <Col lg={6}>
            <div className="about-image position-relative mb-4 mb-lg-0"  data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine">
              <div className="img-container rounded-3 overflow-hidden shadow-lg">
                <img
                  src={about2}
                  alt="Office team meeting"
                  className="img-fluid w-100"
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </div>
              <div
                className="stats-card position-absolute bg-white p-4 shadow-lg rounded-3"
                style={{ maxWidth: "225px" }}
              >
                <div className="d-flex align-items-center mb-3">
                  <div className="stats-icon bg-primary text-white rounded-circle p-3 me-3">
                    <h3 className="mb-0">15+</h3>
                  </div>
                  <p className="fw-bold mb-0">Years of Excellence</p>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="about-content ps-lg-4"  data-aos="fade-left"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine">
              <h3 className="h4 mb-4">
                We're Committed to Your Financial Success
              </h3>
              <p className="text-muted mb-4">
                At Best-Rate, we understand that every financial decision shapes
                your future. Our team of expert advisors combines industry
                knowledge with personalized attention to help you achieve your
                financial goals.
              </p>
              <div className="features mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="feature-icon text-primary me-3">✓</div>
                  <p className="mb-0">Expert Financial Guidance</p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="feature-icon text-primary me-3">✓</div>
                  <p className="mb-0">Personalized Solutions</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="feature-icon text-primary me-3">✓</div>
                  <p className="mb-0">Proven Track Record</p>
                </div>
              </div>
              <div>
                <button className="btn btn-primary btn-lg rounded-pill px-4 hover-scale">
                  Learn More
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .about-3 .stats-icon {
          height: 60px;
          width: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .about-3 .stats-icon h3 {
          font-size: 25px;
        }
        .about-image .stats-card{
          bottom: 30px;
          right: -30px;
        }
        @media (max-width: 786px){
          .about-image .stats-card{
            right: 0 !important;
            top: -85px;
            bottom: auto;
          }
         .about-image{
          margin-top:50px
          }
        }
        
      `}</style>
    </section>
  );
};

export default About2;
