export type AssistantMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export const assistantStarters = [
  'What does a website cost?',
  'What can Tanu build?',
  'How do I start a project?',
];

const answers = [
  {
    matches: ['price', 'cost', '₹', '4999', '3499', '9999', 'package', 'pricing'],
    response:
      'There are three clear starting points: Basic Frontend at ₹3,499, Professional Frontend at ₹4,999, and Admin + Frontend at ₹9,999. Custom websites are quoted after a quick conversation. Domain charges are separate and usually around ₹1,100 per year.',
  },
  {
    matches: ['admin', 'dashboard', 'backend', 'full stack', 'full-stack'],
    response:
      'The Admin + Frontend package is ₹9,999. It is a good fit when your website also needs an admin experience, content updates, or a connected backend.',
  },
  {
    matches: ['technology', 'tech stack', 'react', 'typescript', 'next', 'firebase', 'postgres', 'node'],
    response:
      'Tanu works with React, TypeScript, Next.js, Tailwind CSS, Firebase, Git, PostgreSQL, and Node.js — choosing the stack around the project instead of forcing every brief into one template.',
  },
  {
    matches: ['project', 'business', 'build', 'website', 'custom', 'service'],
    response:
      'Yes. Tanu builds custom websites, portfolios, product interfaces, dashboards, and full-stack experiences for businesses, creators, and teams. The best first step is to share what you are making and what the site needs to do.',
  },
  {
    matches: ['work', 'portfolio', 'project examples', 'projects', 'show'],
    response:
      'The portfolio includes work for advertising, healthcare, dental, animal rescue, restaurants, gaming, fitness, fashion, and e-commerce. Browse the Work section to open the live projects.',
  },
  {
    matches: ['contact', 'call', 'whatsapp', 'talk', 'reach', 'email', 'start'],
    response:
      'You can call Tanu at +91 84335 53501, message on WhatsApp, or use the enquiry form below. Tell him what you are building, where it is stuck, and what a good result looks like.',
  },
];

export function getTanuAssistantReply(message: string): string {
  const normalized = message.toLowerCase().trim();
  const match = answers.find(({ matches }) =>
    matches.some((keyword) => normalized.includes(keyword)),
  );

  return (
    match?.response ??
    'I can help with Tanu’s services, pricing, projects, technologies, and getting started. Try asking “What does a website cost?” or “How do I start a project?”'
  );
}

/**
 * Integration point for a future secure AI endpoint.
 * Keep provider credentials on the server; the browser should only call
 * a same-origin route such as /api/chat when a real model is connected.
 */
export type AssistantTransport = (
  messages: AssistantMessage[],
) => Promise<string>;