import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Testimonials4 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // For devices with width < 768px
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
          centerMode: false, // Disable center mode on mobile
          focusOnSelect: false, // Disable focus on select on mobile
        },
      },
      {
        breakpoint: 1024, // For devices with width < 1024px
        settings: {
          slidesToShow: 3, // Show 2 slides on tablet
        },
      },
    ],
  };

  const testimonials = [
    {
      name: "John Smith",
      text: "Best-Rate has completely transformed how I manage my finances. Their expert guidance and personalized service made all the difference.",
      role: "Business Owner",
    },
    {
      name: "Sarah Johnson",
      text: "I'm extremely satisfied with the professional and thorough service provided by Best-Rate. They helped me achieve my financial goals.",
      role: "Entrepreneur",
    },
    {
      name: "Michael Brown",
      text: "The team at Best-Rate goes above and beyond. Their knowledge and dedication to client success is unmatched in the industry.",
      role: "Real Estate Investor",
    },
  ];

  return (
    <section className="testimonials bg-light-alt section">
      <Container>
        {/* <Row className="justify-content-center text-center mb-5">
          <Col lg={6}>
            <span className="subtitle">Testimonials</span>
            <h2 className="title">What Our Clients Say</h2>
            <p className="text-muted">
              Read what our valued clients have to say about their experience
              working with us
            </p>
          </Col>
        </Row> */}
        <div className="text-center mb-5">
          {/* <span className="px-3 py-2 rounded-pill bg-primary text-white mb-2 d-inline-block">
            Our Testimonial
          </span> */}
          <h2 className="display-5 fw-bold mb-3">
            Solutions That Drive Success
          </h2>
          <p className="text-muted lead mx-auto" style={{ maxWidth: "700px" }}>
            Discover our range of financial services designed to help you
            achieve your goals and secure your future
          </p>
        </div>

        <Row className="justify-content-center">
          <Col lg={11}>
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-3">
                  <div className="testimonial-card text-center p-4 bg-white shadow-sm rounded">
                    <div className="testimonial-content">
                      <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                        <figure
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            style={{
                              borderRadius: "50%",
                              height: "100px",
                              width: "100px",
                              overflow: "hidden",
                            }}
                            src="data:image/png;base64,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"
                            alt=""
                          />
                        </figure>
                        <p className="mb-4">{testimonial.text}</p>
                        <h4 className="mb-1">{testimonial.name}</h4>
                        <p className="text-muted mb-0">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .testimonial-card {
          margin-top: 60px;
        }
        .testimonial-card .testimonial-content {
        }
        .testimonial-card .testimonial-content figure {
          position: absolute;
          top: 12%;
          transform: translate(54%, -40%);
        }
        @media (max-width: 786px) {
          .testimonial-card .testimonial-content figure {
            transform: translate(85%, -30%);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials4;
