import React, { useState } from "react";
import emailjs from 'emailjs-com';
import { contactConfig } from "../content_option"; // Adjust the path based on the location of content_option.js


export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_USER_ID'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setIsSent(true);
      setError(null);
    }, (err) => {
      console.error('FAILED...', err);
      setError('Failed to send message. Please try again later.');
    });
  };

  return (
      <div className="contact-form">
        <div className="">
          <div lg="8">
            <h1 className="display-4 mb-4">Send Us With Message</h1>
            
          </div>
        </div>
        <div className="sec_sp">
          {/*
          <div lg="5" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                <p>
                  <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                </p>
              ) : (
                ""
              )}
            </address>
            <p>{contactConfig.description}</p>
          </div>
          */}
          <div lg="7" className="d-flex align-items-center">
            <form className="contact__form w-100" onSubmit={handleSubmit}>
              <div>
                <div lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <br />
              <div>
                <div lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    Send
                  </button>
                </div>
              </div>
              {isSent && <p className="text-success">Message sent successfully!</p>}
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
      </div>
  );
}
