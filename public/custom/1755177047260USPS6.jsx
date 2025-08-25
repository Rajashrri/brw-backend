import React from "react";
import { FaAward, FaClock, FaHeadset } from "react-icons/fa";

const USPS6 = () => {
  return (
    <section className="usps py-5">
      <div className="container">
      <div className="text-center mb-5">
          {/* <span className="px-3 py-2 rounded-pill bg-primary text-white mb-2 d-inline-block">
            Our Services
          </span> */}
          <h4 className="display-6 mb-3">
            Solutions That Drive Success
          </h4>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="usps-item p-4 text-center">
              <div className="icon-wrapper mb-3">
                <h1>7K+</h1>
              </div>
              <h3 className="h4 mb-3">Quality Service</h3>
              <p className="mb-0 text-muted">
                We pride ourselves on delivering exceptional quality in
                everything we do.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="usps-item p-4 text-center">
              <div className="icon-wrapper mb-3">
                <h1>24/7</h1>
              </div>
              <h3 className="h4 mb-3">Fast Delivery</h3>
              <p className="mb-0 text-muted">
                Quick turnaround times without compromising on quality.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="usps-item p-4 text-center">
              <div className="icon-wrapper mb-3">
                <h1>3000</h1>
              </div>
              <h3 className="h4 mb-3"> Support</h3>
              <p className="mb-0 text-muted">
                Our dedicated team is always here to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPS6;
