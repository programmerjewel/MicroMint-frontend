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
    answer: "MicroMint is a micro-tasking platform that connects task creators (Buyers) with skilled workers who complete small digital tasks in exchange for earnings. Our platform facilitates everything from data entry and content moderation to social media engagement and web research."
  },
  {
    question: "How long does it take to get paid?",
    answer: "Withdrawal processing times vary by payment method, typically ranging from 24 hours to 5 business days. Your earnings are available for withdrawal immediately after task approval."
  },
  {
    question: "How does the task approval process work?",
    answer: "After you submit a completed task, the Buyer reviews your work against their specified requirements. They can approve, reject, or request revisions. You'll receive notifications about your submission status and detailed feedback if revisions are needed."
  },
  {
    question: "What happens if my task submission is rejected?",
    answer: "If a submission is rejected, you'll receive specific feedback explaining why. You may have the opportunity to resubmit depending on the task guidelines. Repeated rejections may affect your account standing, so always read task instructions carefully."
  },
  {
    question: "How do Buyers purchase coins?",
    answer: "Buyers can purchase coins directly through our secure payment system using various payment methods including credit cards, debit cards, and digital wallets. Coins are credited instantly and can be used to create and fund tasks immediately."
  },
  {
    question: "Can I be both a Worker and a Buyer?",
    answer: "Yes! You can switch between roles depending on your needs. Whether you want to earn by completing tasks or get work done by posting tasks, MicroMint accommodates both."
  },
  {
    question: "How are disputes resolved?",
    answer: "Both Workers and Buyers can report issues through our platform. Our Admin team reviews all reports impartially, examines submitted evidence, and makes fair decisions to resolve disputes while maintaining platform integrity."
  },
];

const FAQ = () =>{
  return (
    <section className="container py-16 mx-auto">
      <SectionHeader title="Frequently Asked Question" subtitle="Clear, straightforward help for workers and earners on MicroMint."/>
      <Accordion type="single" collapsible className="md:max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
export default FAQ;