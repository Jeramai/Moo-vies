import MainPromo from '../../src/components/home/MainPromo';

describe('<MainPromo />', () => {
  beforeEach(() => {
    // Grab placeholder image to replace Next.js backend image
    cy.readFile('./public/images/placeholder.jpg', null).then((img) => {
      // Intercept requests to Next.js backend image endpoint
      cy.intercept('_next/image*', {
        statusCode: 200,
        headers: { 'Content-Type': 'image/png' },
        body: img.buffer
      });
    });
  });

  it('renders placehodlers without input', () => {
    cy.mount(<MainPromo />);

    // Some checks for the content
    cy.get('.animate-pulse.text-6xl.grayscale').contains('🐮');
  });

  it('renders error with wrong input', () => {
    const errorMsg = 'Something went wrong.';
    cy.mount(<MainPromo mainPromo={{ Error: errorMsg }} />);

    // Some checks for the content
    cy.get('.text-red-700.font-semibold').contains(errorMsg);
  });

  it('renders with input', () => {
    const mainPromo = { imdbID: 1, Type: 'serie', Title: 'Chucky', Poster: '/', Awards: '3 wins & 13 nominations' };
    cy.mount(<MainPromo mainPromo={mainPromo} />);

    // Some checks for the content
    cy.get(`img[alt=${mainPromo.Title}]`).should('exist').as('img');
    cy.get('a.text-4xl.font-bold').should('exist').should('contain', mainPromo.Title).as('title');
    cy.get('a.font-semibold.text-gray-500').should('exist').should('contain', mainPromo.Awards).as('subtitle');

    // Check if urls are redirecting
    cy.location().then((loc) => {
      cy.get('@img').parent().should('have.attr', 'href').and('not.include', loc.href);
      cy.get('@title').should('have.attr', 'href').and('not.include', loc.href);
      cy.get('@subtitle').should('have.attr', 'href').and('not.include', loc.href);
    });
  });
});
