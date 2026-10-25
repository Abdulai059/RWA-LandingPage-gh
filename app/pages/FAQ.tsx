"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    number: "01",
    question: "What is ARWATS 2027?",
    answer:
      "ARWATS 2027 is a conference focused on business, entrepreneurship, and leadership. It is designed to create space for meaningful conversations, fresh perspectives, and connections that can support professional and business growth.",
  },
  {
    number: "02",
    question: "Who should attend?",
    answer:
      "The conference is intended for professionals, entrepreneurs, business owners, emerging leaders, and others interested in developing their ideas, strengthening their leadership, and exploring new opportunities.",
  },
  {
    number: "03",
    question: "When and where will it take place?",
    answer:
      "The official event date and venue will be announced once they are confirmed. Register your interest to stay informed about important announcements.",
  },
  {
    number: "04",
    question: "Who will be speaking at the conference?",
    answer:
      "The speaker lineup will be announced as details are confirmed. Check the website for updates on speakers and contributors.",
  },
  {
    number: "05",
    question: "How can I register?",
    answer:
      "Use the Register Your Interest section on this website to express your interest. Registration instructions and any further event details will be shared when available.",
  },
  {
    number: "06",
    question: "What topics will the conference cover?",
    answer:
      "ARWATS 2027 focuses on business, entrepreneurship, and leadership. More information about the programme, sessions, and specific discussion themes will be published as the event plans are confirmed.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faqs"
      className="bg-white px-5 py-20 text-[#171812] sm:px-8 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]">
              <span className="h-2.5 w-2.5 bg-[#D9F72B]" />
              Good questions
            </span>

            <p className="mt-5 max-w-xs text-sm leading-6 text-black/60">
              Everything you need to know before taking the next step.
            </p>
          </div>

          <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.07em] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Frequently
            <br />
            <span className="text-[#85867C]">asked</span>
            <br />
            questions<span className="text-[#D9F72B]">.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="border-t border-black">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={faq.number} className="border-b border-black/20">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group grid w-full grid-cols-[2.5rem_1fr_2.5rem] items-start gap-3 py-6 text-left sm:grid-cols-[4rem_1fr_3rem] sm:gap-5 sm:py-8"
                >
                  <span className="pt-1 text-xs font-bold tracking-wider text-black/40 sm:text-sm">
                    {faq.number}
                  </span>

                  <span className="pr-2 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-black/60 sm:text-2xl lg:text-3xl">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 items-center justify-center justify-self-end transition-colors sm:h-11 sm:w-11 ${
                      isOpen
                        ? "bg-[#D9F72B] text-black"
                        : "border border-black/20 text-black group-hover:border-black"
                    }`}
                  >
                    {isOpen ? (
                      <Minus size={18} strokeWidth={1.8} />
                    ) : (
                      <Plus size={18} strokeWidth={1.8} />
                    )}
                  </span>
                </button>

                <div
                  id={answerId}
                  hidden={!isOpen}
                  className="grid grid-cols-[2.5rem_1fr_2.5rem] gap-3 pb-7 sm:grid-cols-[4rem_1fr_3rem] sm:gap-5 sm:pb-9"
                >
                  <span aria-hidden="true" />

                  <p className="max-w-2xl text-sm leading-7 text-black/65 sm:text-base sm:leading-8">
                    {faq.answer}
                  </p>

                  <span aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div className="mt-16 flex flex-col gap-6 border-t border-black/15 pt-8 sm:mt-20 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/50">
              Still have questions?
            </p>

            <h3 className="mt-3 max-w-xl text-3xl font-black uppercase leading-tight tracking-[-0.05em] sm:text-4xl">
              Stay connected.
              <br />
              <span className="text-black/40">
                Be part of the conversation.
              </span>
            </h3>
          </div>

          <a
            href="#register"
            className="group inline-flex min-h-14 w-fit items-center justify-between gap-8 bg-[#D9F72B] px-6 py-4 text-sm font-bold transition-colors hover:bg-black hover:text-white"
          >
            Register your interest
            <ArrowUpRight
              size={19}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
