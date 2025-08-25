import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Container } from "react-bootstrap";

const Footer1 = () => {
  return (
    <footer className="bg-dark text-white py-5 pb-3">
      <Container>
        <div className="text-center">
          {/* Company Info */}
          <h1 className="text-white mb-3">
            <span className="text-primary">Best Rate</span> Website
          </h1>

          <div className="cta-3  mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="input-box">
                  <input
                    className="me-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="abc@gmail.com"
                  />
                  <button type="button">Submit</button>
                </div>
              </div>
            </div>
          </div>
          <ul
            className="list-unstyled d-flex justify-content-center mt-5"
            style={{ gap: "20px" }}
          >
            <li className="mb-2">
              <a href="#!" className="text-white text-decoration-none">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#!" className="text-white text-decoration-none">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#!" className="text-white text-decoration-none">
                Services
              </a>
            </li>
            <li className="mb-2">
              <a href="#!" className="text-white text-decoration-none">
                Contact
              </a>
            </li>
          </ul>
          <div className="social-links mt-5">
            <a href="#" className="text-white me-3">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white me-3">
              <FaXTwitter />
            </a>
            <a href="#" className="text-white me-3">
              <FaInstagram />
            </a>
            <a href="#" className="text-white me-3">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Copyright */}
      </Container>
      <div className="border-top border-secondary pt-4 mt-4 text-center">
        <p className="text-white mb-0">
          © {new Date().getFullYear()} Best Rate Website. All rights reserved.
        </p>
      </div>
      <style jsx>{`
        .cta-3 .input-box input {
          width: 60%;
          padding: 8px 10px;
          border-radius: 10px;
          background-color: #fff !important;
          box-shadow: none;
          outline: none;
          border: none;
        }
        .cta-3 .input-box button {
          width: 30%;
          padding: 8px 5px;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: none;
          outline: none;
          border: 1px solid #0077be;
          transition: all 0.3s linear;
        }
        .cta-3 .input-box button:hover {
          background-color: #0077be !important;
          box-shadow: 0px 0px 13px #fff;
          color: #fff;
        }
        .best {
          font-weight: 700;
        }
      `}</style>
    </footer>
  );
};

export default Footer1;
