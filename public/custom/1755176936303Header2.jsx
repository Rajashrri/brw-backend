import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Header2 = () => {
  return (
    <>
      {/* Top Mini Header */}
      <div className="bg-dark py-2">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex text-white top-head-menu">
              <div className="me-4">
                <FaPhone className="me-2 call" />
                <small>+1 234 567 890</small>
              </div>
              <div className="">
                <FaEnvelope className="me-2" />
                <small>info@bestrate.com</small>
              </div>
            </div>
            <div className="d-flex">
              <a href="#" className="text-white me-3">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white me-3">
                <FaTwitter />
              </a>
              <a href="#" className="text-white">
                <FaInstagram />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <Navbar expand="lg" className="bg-white shadow-sm py-3">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            {/* <img
              src="/logo.png"
              alt="Best Rate Logo"
              height="40"
              className="me-2"
            /> */}
            <span className="fw-bold fs-4">
              <span className="text-primary">Best</span> Rate
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />

          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto me-4">
              <Link to="#home" className="nav-link px-3 fw-medium">
                Home
              </Link>
              <Link to="#about" className="nav-link px-3 fw-medium">
                About
              </Link>
              <NavDropdown
                title="Services"
                id="services-dropdown"
                className="px-2"
              >
                <NavDropdown.Item href="#products" className="py-2">
                  <i className="bi bi-box me-2"></i>
                  Products
                </NavDropdown.Item>
                <NavDropdown.Item href="#testimonials" className="py-2">
                  <i className="bi bi-chat-quote me-2"></i>
                  Testimonials
                </NavDropdown.Item>
                <NavDropdown.Item href="#gallery" className="py-2">
                  <i className="bi bi-images me-2"></i>
                  Gallery
                </NavDropdown.Item>
              </NavDropdown>
              <Link to="#contact" className="nav-link px-3 fw-medium">
                Contact
              </Link>
              <Link to="/" className="nav-link px-3 fw-medium">
                Template1
              </Link>
            </Nav>

            {/* <button className="btn btn-primary rounded-pill px-4 py-2">
              <i className="bi bi-telephone-fill me-2"></i>
              Get Quote
            </button> */}
          </Navbar.Collapse>
        </Container>
        <style jsx>{`
        .call{
            transform: rotate(90deg);
        }
          @media (max-width: 786px){
          .top-head-menu{
            flex-direction: column;
          }
              

          }
        `}</style>
      </Navbar>
    </>
  );
};

export default Header2;
