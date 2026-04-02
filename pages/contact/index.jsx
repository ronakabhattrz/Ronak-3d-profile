import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";

import { fadeIn } from "../../variants";
import { siteMeta } from "../../lib/site";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    try {
      const res = await fetch(`https://formspree.io/f/${siteMeta.formspreeId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          message,
          _replyto: email,
        }),
      });

      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        console.error("Formspree error", data);
        alert("Something went wrong. Please email ronakabhattrz@gmail.com directly.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please email ronakabhattrz@gmail.com directly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto py-24 xl:py-32 text-center xl:text-left">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-16 max-w-6xl mx-auto items-start justify-center">
          <div className="flex-1 w-full max-w-[700px] mx-auto xl:mx-0">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 text-center xl:text-left mb-8"
            >
              Let&apos;s <span className="text-accent">connect.</span>
            </motion.h2>

            <motion.div
              variants={fadeIn("up", 0.25)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-white/70 mb-8 text-sm sm:text-base space-y-3 text-center xl:text-left"
            >
              <p className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-2 justify-center xl:justify-start">
                <a
                  href="mailto:ronakabhattrz@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  ronakabhattrz@gmail.com
                </a>
                <span className="hidden sm:inline text-white/40">·</span>
                <a
                  href="tel:+18179475211"
                  className="hover:text-accent transition-colors"
                >
                  +1 (817) 947-5211
                </a>
              </p>
              <p>Ahmedabad, Gujarat, India</p>
              <p>
                <a
                  href={siteMeta.resumeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent hover:underline"
                >
                  Download resume (PDF)
                </a>
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-10 rounded-lg overflow-hidden border border-white/10 aspect-[4/3] max-h-[280px] w-full"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1293.2179044765537!2d72.60228228016206!3d23.002012688884378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1720529801638!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "260px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ronak Bhatt — location map"
              />
            </motion.div>
          </div>

          <div className="flex-1 w-full max-w-[700px] mx-auto xl:mx-0">
            <motion.h3
              variants={fadeIn("up", 0.35)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-lg font-semibold mb-6 text-center xl:text-left"
            >
              Contact form
            </motion.h3>

            {sent ? (
              <motion.div
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                animate="show"
                className="rounded-lg border border-accent/40 bg-white/5 p-8 text-center"
              >
                <p className="text-accent font-medium mb-2">
                  Message sent successfully.
                </p>
                <p className="text-white/70 text-sm mb-6">
                  Thank you — I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  className="btn rounded-full border border-white/50 px-8 py-3 hover:border-accent transition-colors"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="flex-1 flex flex-col gap-6 w-full mx-auto"
                onSubmit={handleSubmit}
                autoComplete="on"
              >
                <div className="flex flex-col sm:flex-row gap-6 w-full">
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Full name"
                    className="input flex-1"
                    disabled={isLoading}
                    required
                    aria-required
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    className="input flex-1"
                    disabled={isLoading}
                    required
                    aria-required
                  />
                </div>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Your message"
                  className="textarea min-h-[160px]"
                  disabled={isLoading}
                  required
                  aria-required
                />
                <button
                  type="submit"
                  className="btn rounded-full border border-white/50 max-w-[200px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                >
                  <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                    {isLoading ? "Sending…" : "Send message"}
                  </span>
                  <BsArrowRight
                    className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]"
                    aria-hidden
                  />
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
