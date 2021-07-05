import React, { useState } from "react";
import emailjs from "emailjs-com";

const Result = () => {
  return (
    <div>
      <p className="contactResult">
        Your Message was sent successfully! we will contact you as soon as possible{" "}
      </p>
    </div>
  );
};

const ContactUs = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [theMessage, setTheMessage] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);

  const service_id = "service_hagjeis";
  const template_id = "template_3vpb3q2";
  const user_id = "user_EEJqUUgmDQTKCfowbJZ1T";
  const contactDetails = {
    name: name,
    email: email,
    subject: subject,
    message: theMessage,
  };

  const emailSend = async (e) => {
    e.preventDefault();
    await emailjs.send(service_id, template_id, contactDetails, user_id);
    setMessage(true);
  };

  return (
    <div>
      <div>
        <h1>Contact US </h1>
        <div>
          <div>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />
          <td>
            <textarea
              name="message"
              placeholder="message"
              onChange={(e) => setTheMessage(e.target.value)}
            />
          </td>
          <td>
            <button onClick={emailSend}>send</button>
          </td>
        </div>
        {message ? <p>successfully send </p> : <p>please full all</p>}
      </div>
    </div>
  );
};

export default ContactUs;
