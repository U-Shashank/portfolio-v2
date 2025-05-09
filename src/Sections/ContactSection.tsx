"use client"

import Section from "../components/Section";
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";

// Define form values type
type FormValues = {
  name: string;
  email: string;
  message: string;
};

// Status type for button
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const ContactSection = ({ ref }: { ref: React.RefObject<HTMLElement | null> }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { register, handleSubmit, formState, reset } = useForm<FormValues>();
  const { errors, isSubmitting } = formState;
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  // Initialize EmailJS
  useEffect(() => {    
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_KEY,
    });
  }, []);

  // Reset status after showing success/error message
  useEffect(() => {
    if (submitStatus === "success" || submitStatus === "error") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // SVG animation effect
  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path");
      paths.forEach((path, i) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length.toString();
        path.style.strokeDashoffset = length.toString();
        
        path.animate(
          [
            { strokeDashoffset: length },
            { strokeDashoffset: 0 }
          ],
          {
            duration: 1800,
            delay: i * 400,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            fill: "forwards"
          }
        );
      });
    }
  }, []);

  // Form submission handler using EmailJS
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmitStatus("submitting");
    
    try {
      const templateParams = {
        from_name: data.name,
        reply_to: data.email,
        message: data.message
      };
      
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        templateParams
      );
      
      if (response.status === 200) {
        setSubmitStatus("success");
        reset(); // Reset form after successful submission
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    }
  };

  // Button content based on submit status
  const getButtonContent = () => {
    switch (submitStatus) {
      case "submitting":
        return (
          <span className="inline-flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        );
      case "success":
        return (
          <span className="inline-flex items-center justify-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Message Sent Successfully!
          </span>
        );
      case "error":
        return (
          <span className="inline-flex items-center justify-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            Failed to Send. Try Again.
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center justify-center">
            Send Message
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        );
    }
  };

  return (
    <Section id="contact" title="Get In Touch" ref={ref} className="relative py-24 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-3/7 left-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Have a question or want to work together? Drop me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Contact information - left side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* SVG illustration */}
            <div className="mb-8">
              <svg
                ref={svgRef}
                width="100%"
                height="200"
                viewBox="0 0 400 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-accent"
              >
                <path
                  d="M40 100 C 100 30, 200 170, 360 100"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M80 80 L120 130 L160 70 L200 130 L240 70 L280 130 L320 80"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M40 160 Q200 190 360 160"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>

          {/* Contact form - right side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 rounded-2xl backdrop-blur-md border border-secondary/10 shadow-xl overflow-hidden"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 lg:p-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80 block">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "Please enter your name"
                      })}
                      className="w-full bg-background/30 border border-secondary/20 rounded-lg px-4 py-3 pl-10 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all placeholder:text-foreground/30"
                      placeholder="John Doe"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Please enter your email",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="w-full bg-background/30 border border-secondary/20 rounded-lg px-4 py-3 pl-10 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all placeholder:text-foreground/30"
                      placeholder="hello@example.com"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/80 block">
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      {...register("message", {
                        required: "Please enter a message"
                      })}
                      rows={5}
                      className="w-full bg-background/30 border border-secondary/20 rounded-lg px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all placeholder:text-foreground/30 resize-none"
                      placeholder="Tell me about your project, questions, or anything else..."
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitStatus === "submitting"}
                  whileHover={{ scale: submitStatus === "submitting" ? 1 : 1.02 }}
                  whileTap={{ scale: submitStatus === "submitting" ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-lg font-medium shadow-lg transition-all relative overflow-hidden group cursor-pointer ${
                    submitStatus === "idle" ? "bg-transparent border border-accent text-accent hover:shadow-accent/50" : 
                    submitStatus === "success" ? "border border-green-500" :
                    submitStatus === "error" ? "border border-red-500" :
                    "bg-transparent border border-accent text-accent"
                  }`}
                >
                  {getButtonContent()}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;