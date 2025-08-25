import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "motion/react";

const Gallery3 = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "People", "Events", "Trips", "Plants"];

  const images = [
    {
      author: "The Lazy Artist Gallery",
      tag: "People",
      src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/1.jpg?raw=true",
    },
    {
      author: "Daria Shevtsova",
      tag: "Events",
      src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/2.jpg?raw=true",
    },
    {
      author: "Kasuma",
      tag: "Trips",
      src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/3.jpg?raw=true",
    },
    {
      author: "Dominika Roseclay",
      tag: "Plants",
      src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/4.jpg?raw=true",
    },
    {
      author: "Scott Webb",
      tag: "Plants",
      src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/5.jpg?raw=true",
    },
    {
      author: "Jeffrey Czum",
      tag: "People",
      src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/6.jpg?raw=true",
    },
    {
      author: "Dominika Roseclay",
      tag: "Events",
      src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/7.jpg?raw=true",
    },
    {
      author: "Valeria Boltneva",
      tag: "Trips",
      src: "https://github.com/OlgaKoplik/CodePen/blob/master/filterGallery/8.jpg?raw=true",
    },
  ];

  // Filter logic
  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((image) => image.tag === activeFilter);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <Container className="py-5">
      <motion.div
        className="text-center mb-5"
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: -80, opacity: 0 }}
        transition={{ type: "tween", duration: 1, delay: 1 }}
      >
        <span className="px-3 py-2 rounded-pill bg-primary text-white mb-2 d-inline-block">
          Our Gallery
        </span>
        <h2 className="display-5 fw-bold mb-3">Solutions That Drive Success</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: "700px" }}>
          Discover our range of financial services designed to help you achieve
          your goals and secure your future
        </p>
      </motion.div>
      <Row className="text-center mb-4">
        <Col>
          {filters.map((filter) => (
            <Button
              key={filter}
              // variant={activeFilter === filter ? "primary" : "outline-primary"}
              className={
                activeFilter === filter
                  ? "gallery-btn active mx-2"
                  : "gallery-btn mx-2"
              }
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </Col>
      </Row>

      <Row>
        {filteredImages.map((image, index) => (
          <Col key={index} md={3} className="mb-4">
            <div className="gallery-item">
              <img
                src={image.src}
                alt={image.author}
                className="img-fluid rounded"
              />
              <div className="mt-2 text-center">
                <h6>{image.author}</h6>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <style jsx>{`
     .gallery-btn{
        background-color: transparent !important;
        color:#000 ;
        margin-bottom:10px;

     }
     .gallery-btn.active,.gallery-btn:hover{
         background-color: #0077be !important;
         color;#fff !important;
     }
     `}</style>
    </Container>
  );
};

export default Gallery3;
