import React from "react";
import { Form } from "@/components/Form";
import Image from "next/image";
import Contact from "@/public/contact1.jpg"
const ContactPage = () => {
  return <div >
    <Image src={Contact} alt="contact img" className="h-80 w-full"/>
    <Form/>
  </div>;
};
export default ContactPage;
