import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaChartLine, FaHandshake, FaShieldAlt } from "react-icons/fa";
import { motion } from "motion/react";
import hero from "./../../assets/images/hero.jpg";

function Hero3() {
  return (
    <section id="home" className="hero-section hero-3 section">
      <div className="hero-wrapper">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="order-2 order-lg-1">
              <div className="hero-content">
                <motion.div
                  className="badge bg-primary px-3 py-2 rounded-pill mb-3"
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: -80, opacity: 0 }}
                  transition={{ type: "tween", duration: 1, delay: 1 }}
                >
                  Trusted Financial Partner
                </motion.div>
                <motion.h1
                  className="display-4 fw-bold text-white mb-4"
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: -80, opacity: 0 }}
                  transition={{ type: "tween", duration: 1, delay: 1.1 }}
                >
                  Smart Solutions for Your{" "}
                  <span className="text-primary">Financial Growth</span>
                </motion.h1>
                <motion.p
                  className="lead text-light mb-5"
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: -80, opacity: 0 }}
                  transition={{ type: "tween", duration: 1, delay: 1.2 }}
                >
                  We provide comprehensive financial planning and investment
                  strategies to help secure your future and maximize your wealth
                  potential.
                </motion.p>

                <div className="hero-features mb-5">
                  <Row className="g-4">
                    <Col md={4}>
                      <motion.div
                        className="feature-card bg-white bg-opacity-10 p-4 rounded-3 text-white"
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0, opacity: 0 }}
                        transition={{ type: "tween", duration: 1, delay: 1.3 }}
                      >
                        <FaChartLine
                          className="feature-icon mb-3 text-primary"
                          size={24}
                        />
                        <h5 className="mb-2">Investment</h5>
                        <p className="small mb-0 text-light-alt">
                          Strategic portfolio management
                        </p>
                      </motion.div>
                    </Col>
                    <Col md={4}>
                      <motion.div
                        className="feature-card bg-white bg-opacity-10 p-4 rounded-3 text-white"
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0, opacity: 0 }}
                        transition={{ type: "tween", duration: 1, delay: 1.4 }}
                      >
                        <FaHandshake
                          className="feature-icon mb-3 text-primary"
                          size={24}
                        />
                        <h5 className="mb-2">Guidance</h5>
                        <p className="small mb-0 text-light-alt">
                          Professional consultation
                        </p>
                      </motion.div>
                    </Col>
                    <Col md={4}>
                      <motion.div
                        className="feature-card bg-white bg-opacity-10 p-4 rounded-3 text-white"
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0, opacity: 0 }}
                        transition={{ type: "tween", duration: 1, delay: 1.5 }}
                      >
                        <FaShieldAlt
                          className="feature-icon mb-3 text-primary"
                          size={24}
                        />
                        <h5 className="mb-2">Secure Future</h5>
                        <p className="small mb-0 text-light-alt">
                          Risk management solutions
                        </p>
                      </motion.div>
                    </Col>
                  </Row>
                </div>

                <motion.div
                  className="d-flex gap-3 flex-column flex-sm-row"
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: -80, opacity: 0 }}
                  transition={{ type: "tween", duration: 1, delay: 1.6 }}
                >
                  <button className="btn btn-primary btn-lg px-4 py-3 rounded-3">
                    Schedule Consultation
                  </button>
                  <button className="btn btn-outline-light btn-lg px-4 py-3 rounded-3">
                    View Services
                  </button>
                </motion.div>
              </div>
            </Col>
            <Col lg={5} className="order-1 order-lg-2 mb-5 mb-lg-0">
              <div className="hero-image-wrapper">
                <motion.div
                  className="hero-image-content text-center"
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: 80, opacity: 0 }}
                  transition={{ type: "tween", duration: 1, delay: 1.5 }}
                >
                  <img
                    src={hero}
                    rel="preload"
                    alt="Financial Analysis"
                    className="img-fluid rounded-4 shadow-sm"
                  />
                </motion.div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-wrapper {
          position: relative;
          z-index: 2;
        }

        .hero-wrapper h1 {
          content-visibility: auto;
        }

        .hero-wrapper::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle,
            rgba(var(--bs-primary-rgb), 0.1) 0%,
            transparent 70%
          );
          z-index: -1;
        }

        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .feature-icon {
          color: var(--bs-primary);
        }

        .hero-image-wrapper {
          position: relative;
        }

        .hero-image-content img {
          max-width: 100%;
          height: auto;
        }

        @media (max-width: 991.98px) {
          .hero-image-content {
            margin-bottom: 2rem;
          }
        }

        .btn {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
}

export default Hero3;
