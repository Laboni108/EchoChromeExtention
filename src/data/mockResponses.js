const responses = [
  "Here's a clean way to think about that — break it into smaller pieces first, then tackle each one with a focused approach. Want me to go deeper on any part?",
  "Good question. The short answer is it depends on your specific setup, but generally the recommended pattern handles most cases well. Let me know if you want the edge-case version.",
  "I've broken this down into three key points: clarity, structure, and follow-through. Each one builds on the last, so starting with clarity usually gives the best results.",
  "That's a common challenge. One approach that works well is to prototype quickly, test with real feedback, then refine — rather than trying to get it perfect upfront.",
];

export function getMockResponse() {
  return responses[Math.floor(Math.random() * responses.length)];
}