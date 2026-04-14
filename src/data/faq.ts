export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'What types of gold do you buy?',
    answer:
      'We buy all types of gold: jewelry (rings, chains, earrings, bracelets), gold coins, bullion, dental gold, and broken or damaged pieces. We accept karats from 10k to 24k. If you\'re not sure what you have, bring it in and we\'ll evaluate it in front of you with no obligation.',
  },
  {
    question: 'How do you calculate the price you offer?',
    answer:
      'We use a transparent formula: current spot price of gold × weight in grams × purity percentage based on karat. We do the entire process in front of you — we show you the scale, the purity test result, and the live spot price. No hidden numbers.',
  },
  {
    question: 'Where do we meet for the transaction?',
    answer:
      'We meet at a public, safe location of your choosing in the Phoenix area — a coffee shop, bank lobby, or shopping center. We never ask you to go to a private location. Your safety and comfort are our priority.',
  },
  {
    question: 'How long does the whole process take?',
    answer:
      'The evaluation and payment take between 10 and 20 minutes. We weigh your gold, verify purity with our test kit, and calculate the offer on the spot. If you accept, payment is immediate — no waiting or coming back another day.',
  },
  {
    question: 'How do I get paid?',
    answer:
      'We pay in cash, Zelle, or bank transfer, at the time of the transaction. You choose which you prefer. No checks to wait for, no delays of any kind. The money is yours as soon as we close the deal.',
  },
  {
    question: 'What if I don\'t accept the offer?',
    answer:
      'Absolutely nothing happens. The evaluation is completely free and no-obligation. If the price doesn\'t work for you, you take your pieces back at no cost and with no pressure. We want you to leave satisfied, with or without a sale.',
  },
  {
    question: 'Do I need to bring an ID?',
    answer:
      'Yes, it is a legal requirement in the state of Arizona for all precious metal purchase transactions. You need a valid government-issued photo ID — driver\'s license, passport, or other valid government ID.',
  },
  {
    question: 'Do you buy broken or damaged gold?',
    answer:
      'Yes, absolutely. The value of gold is in its weight and purity, not the shape or condition of the piece. A broken ring, a tangled chain, or a single earring are worth exactly the same as their counterpart in good condition. Don\'t throw anything out without asking first.',
  },
];
