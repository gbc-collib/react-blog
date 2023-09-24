import React from 'react';
const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <h1>Contact Me</h1>
      <p>
        Hi, I'm Collin Stasiak!
      </p>
      <p>
        If you'd like to get in touch with me, you can reach out via email or connect with me on social media.
      </p>

      <h2>Contact Information</h2>
      <ul className="list-group contact">
        <li className="list-group-item"><i className="bi bi-mailbox"></i> Email: CollinStasiak@gmail.com</li>
        <li className="list-group-item"><i className="bi bi-linkedin"></i> LinkedIn: <a href="https://www.linkedin.com/in/collin-stasiak-2b0529262" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></li>
        <li className="list-group-item"><i className="bi bi-github"></i> Github: <a href="https://github.com/gbc-collib"> Gbc-Collib</a></li>
      </ul>
    </div>
  );
};

export default ContactPage;

