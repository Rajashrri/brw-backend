import React from "react";
import { IoLocationSharp, IoMail, IoCall } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import contactbg from "./../../assets/images/contact-bg.webp"

const Contact2 = () => {
  return (
    <section
      className="contact-section section bg-light-alt"
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundImage:`url(${contactbg})`, // Adjust opacity (0.5 is 50% opacity)
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: 0.1,
        }}
      ></div>
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 111,
        }}
      >

        <div className="text-center mb-5" data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom">
          <span className="px-3 py-2 rounded-pill bg-primary text-white mb-2 d-inline-block">
            Contact Us
          </span>
          <h2 className="display-5 fw-bold mb-3">
            Solutions That Drive Success
          </h2>
          <p className="text-muted lead mx-auto" style={{ maxWidth: "700px" }}>
            Discover our range of financial services designed to help you
            achieve your goals and secure your future
          </p>
        </div>

        <div className="row align-items-stretch justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form bg-white p-4 rounded-3 shadow" data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine">
              <h3 className="mb-4">Send us a Message</h3>
              <form name="contactForm" method="post" action="contact.php">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        required
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        required
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        required
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        style={{ height: "150px" }}
                        required
                      ></textarea>
                      <label htmlFor="message">Your Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    {/* <button
                      type="submit"
                      className="btn btn-primary btn-lg px-5"
                    >
                      Send Message
                    </button> */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-pill px-5 hover-scale"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact2;
