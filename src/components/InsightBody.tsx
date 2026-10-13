export default function InsightBody({ paragraphs }: { paragraphs: string[] }) {
  return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
}
