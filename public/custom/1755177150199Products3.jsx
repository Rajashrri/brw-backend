import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaChartLine, FaShieldAlt, FaRegHandshake } from "react-icons/fa";
import { motion } from "motion/react";

const Products3 = () => {
  const services = [
    {
      icon: <FaChartLine />,
      title: "Financial Planning",
      description:
        "Comprehensive financial planning tailored to your goals and future aspirations",
      features: [
        "Custom Investment Strategy",
        "Retirement Planning",
        "Tax Optimization",
      ],
    },
    {
      icon: <FaRegHandshake />,
      title: "Investment Strategy",
      description:
        "Expert investment advice and portfolio management to maximize your returns",
      features: ["Portfolio Management", "Market Analysis", "Risk Assessment"],
    },
    {
      icon: <FaShieldAlt />,
      title: "Risk Management",
      description:
        "Protect your assets and minimize risks with our proven strategies",
      features: ["Asset Protection", "Insurance Planning", "Estate Planning"],
    },
  ];

  return (
    <section className="products-section py-6">
      <Container>
        <Row className="justify-content-start mb-5">
          <Col lg={8} className="text-start">
            <motion.div
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -80, opacity: 0 }}
              transition={{ type: "tween", duration: 1, delay: 0.5 }}
            >
              <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
                Our Services
              </span>
              <h2 className="display-4 fw-bold mb-4">
                Comprehensive Financial Solutions
              </h2>
              <p className="lead text-muted">
                We offer a wide range of financial services designed to help you
                build, manage and protect your wealth for a secure future.
              </p>
            </motion.div>
          </Col>
        </Row>

        <Row className="g-4">
          {services.map((service, index) => (
            <Col lg={4} md={6} key={index}>
              <motion.div
                className="service-card h-100"
                whileInView={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                transition={{ type: "tween", duration: 1, delay: 1 }}
              >
                <div className="service-icon bg-primary">{service.icon}</div>
                <h3 className="h4 mb-3">{service.title}</h3>
                <p className="text-muted mb-4">{service.description}</p>
                <ul className="feature-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="check text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary mt-auto">Learn More</button>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .products-section {
          background-color: #f8f9fa;
        }
        .py-6 {
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        .service-card {
          background: #fff;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }
        .service-icon {
          width: 60px;
          height: 60px;
          background: var(--bs-primary);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 1.5rem;
        }
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }
        .feature-list li {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          color: #6c757d;
        }
        .check {
          color: var(--bs-primary);
          margin-right: 0.75rem;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default Products3;
