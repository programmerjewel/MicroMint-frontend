import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "@/components/ui/section-header";

const faqs = [
  {
    question: "What is MicroMint?",
    answer: "MicroMint is a micro-tasking platform connecting Buyers with Workers to complete small digital tasks like data entry, content moderation, social media engagement, and web research for earnings."
  },
  {
    question: "How long does it take to get paid?",
    answer: "Withdrawals take 24 hours to 5 business days depending on payment method. Earnings are available immediately after task approval."
  },
  {
    question: "How does task approval work?",
    answer: "Buyers review your submission against their requirements and can approve, reject, or request revisions. You'll receive notifications with feedback if revisions are needed."
  },
  {
    question: "What if my task is rejected?",
    answer: "You'll receive specific feedback explaining why. You may resubmit depending on task guidelines. Always read instructions carefully as repeated rejections may affect your account standing."
  },
  {
    question: "How do Buyers purchase coins?",
    answer: "Buyers can purchase coins instantly via credit cards, debit cards, or digital wallets through our secure payment system. Coins can be used immediately to create and fund tasks."
  },
  {
    question: "Can I be both a Worker and a Buyer?",
    answer: "Yes! You can switch between roles anytime - earn by completing tasks or get work done by posting tasks."
  },
  {
    question: "How are disputes resolved?",
    answer: "Both parties can report issues through our platform. Our Admin team reviews evidence impartially and makes fair decisions to maintain platform integrity."
  },
];

const FAQ = () =>{
  return (
    <section className="w-10/12 mx-auto py-12">
      <SectionHeader title="Frequently Asked Questions" subtitle="Clear, straightforward help for workers and earners on MicroMint."/>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/60">
            <AccordionTrigger className="font-semibold text-brand-text">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-brand-text-muted leading-relaxed text-justify tracking-tight">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
export default FAQ;