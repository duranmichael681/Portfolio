// src/components/ContactForm.jsx
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fxuawxo", // from EmailJS
        "template_dloochw", // from EmailJS
        form.current,
        "dOqk3XZaRf8wnsle1" // from EmailJS
      )
      .then(() => {
        alert("Message sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send message.");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col "
    >
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-300 m flex flex-col gap-2"
      >
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="text-black w-full p-2 border rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          className="w-full p-2 border rounded text-black"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows="5"
          required
          className="w-full p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="w-full bg-teal-400 text-white p-2 rounded hover:bg-teal-700"
        >
          Send
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
