import DOMPurify from 'isomorphic-dompurify';

export default function highlightText (text: string, highlight?: string): string {
  if(!highlight) {
    return text;
  }

  // XSS sanitizer
  const cleanHighlight = DOMPurify.sanitize(highlight);

  // Escape special characters in the highlight string
  const escapedHighlight = cleanHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a case-insensitive regular expression
  const regex = new RegExp(escapedHighlight, 'gi');

  return text.replace(regex, '<mark>$&</mark>');
}