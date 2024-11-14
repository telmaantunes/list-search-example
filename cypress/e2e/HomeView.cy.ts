describe('HomeView E2E Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home view correctly', () => {
    cy.contains('h1', 'Top books of all time');
  });

  it('should display a list of books', () => {
    cy.get('.book-item').should('have.length.greaterThan', 2);
  });

  it('should navigate to the book details page on clicking a book', () => {
    cy.get('.book-item').first().within(() => {
      cy.get('img').click();
    });

    cy.url().should('include', '/book/in-search-of-lost-time');
    cy.contains('h1', 'In Search of Lost Time');
  });

  it('should handle pagination', () => {
    cy.get('.pagination-section__button').contains('Next').click();
    cy.get('.book-item').should('exist');
  });

  it('should filter books based on search input', () => {
    cy.get('.books-list__search input').type('moby');

    cy.get('.book-item').should('have.length', 1);
    cy.contains('.book-item', 'Moby Dick');
  });
});