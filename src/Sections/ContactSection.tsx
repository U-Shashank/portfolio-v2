import Section from "../components/Section";
import * as motion from "motion/react-client";
import { useRef, useEffect, useState } from "react";

const ContactSection = ({ ref }: { ref: React.RefObject<HTMLElement | null> }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    loading: false
  });

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

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate form submission
    setTimeout(() => {
      setFormState(prev => ({ 
        ...prev, 
        loading: false,
        submitted: true 
      }));
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
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
            {formState.submitted ? (
              <div className="p-12 flex flex-col items-center justify-center text-center h-full">
                <div className="bg-accent/10 p-4 rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-foreground/70 mb-8">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}
                  className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/80 block">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
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
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
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
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/80 block">
                      Your Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-background/30 border border-secondary/20 rounded-lg px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all placeholder:text-foreground/30 resize-none"
                        placeholder="Tell me about your project, questions, or anything else..."
                      ></textarea>
                    </div>
                  </div>

                    <motion.button
                    type="submit"
                    disabled={formState.loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-transparent border border-accent text-accent py-4 rounded-lg font-medium shadow-lg hover:shadow-accent/50 transition-all relative overflow-hidden group"
                    >
                    <span className={`inline-flex items-center justify-center transition-all ${formState.loading ? 'opacity-0' : 'opacity-100'}`}>
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                    
                    {formState.loading && (
                      <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      </span>
                    )}
                    </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;