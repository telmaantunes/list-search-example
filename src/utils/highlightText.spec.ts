import highlightText from './highlightText';
import { describe, it, expect } from 'vitest';

describe('highlightText', () => {
  it('should return the original text if no highlight is provided', () => {
    const inputText = 'This is a sample text.';
    const result = highlightText(inputText);
    expect(result).toBe(inputText);
  });

  it('should highlight the exact match of the provided highlight string', () => {
    const inputText = 'This is a sample text.';
    const highlight = 'sample';
    const result = highlightText(inputText, highlight);
    expect(result).toBe('This is a <mark>sample</mark> text.');
  });

  it('should highlight all occurrences of the provided highlight string', () => {
    const inputText = 'Sample text with sample repeated.';
    const highlight = 'sample';
    const result = highlightText(inputText, highlight);
    expect(result).toBe('<mark>Sample</mark> text with <mark>sample</mark> repeated.');
  });

  it('should be case-insensitive when highlighting', () => {
    const inputText = 'Sample text with SAMPLE repeated.';
    const highlight = 'sample';
    const result = highlightText(inputText, highlight);
    expect(result).toBe('<mark>Sample</mark> text with <mark>SAMPLE</mark> repeated.');
  });

  it('should return the original text if the highlight string is not found', () => {
    const inputText = 'This is a sample text.';
    const highlight = 'notfound';
    const result = highlightText(inputText, highlight);
    expect(result).toBe(inputText);
  });

  it('should handle special characters in the highlight string', () => {
    const inputText = 'Special characters like $ and * need handling.';
    const highlight = '$';
    const result = highlightText(inputText, highlight);
    expect(result).toBe('Special characters like <mark>$</mark> and * need handling.');
  });

  it('should escape special characters in the highlight string for regex safety', () => {
    const inputText = 'Characters like ( and ) are tricky.';
    const highlight = '(';
    const result = highlightText(inputText, highlight);
    expect(result).toBe('Characters like <mark>(</mark> and ) are tricky.');
  });

  it('should return an empty string if the input text is empty', () => {
    const inputText = '';
    const highlight = 'sample';
    const result = highlightText(inputText, highlight);
    expect(result).toBe('');
  });

  it('should return the input text if the highlight string is empty', () => {
    const inputText = 'This is a sample text.';
    const highlight = '';
    const result = highlightText(inputText, highlight);
    expect(result).toBe(inputText);
  });
});