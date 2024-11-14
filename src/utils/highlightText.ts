export default function highlightText (text: string, highlight?: string): string {
  if(!highlight) {
    return text;
  }

  // Escape special characters in the highlight string
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a case-insensitive regular expression
  const regex = new RegExp(escapedHighlight, 'gi');

  return text.replace(regex, '<mark>$&</mark>');
}