import SearchModal from '../../src/components/Search/Modal';

describe('<SearchModal />', () => {
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

  it('No render without show prop', () => {
    cy.mount(<SearchModal />);

    cy.get('#searchModal').should('not.exist');
  });

  it('background click hides modal', () => {
    const onHideSpy = cy.spy().as('onHideSpy');

    cy.mount(<SearchModal show={true} onHide={onHideSpy} />);
    cy.get('#searchModal').should('exist');

    // Modal should call onHide function on background click
    cy.get('#searchModal').children().first().click({ force: true });
    cy.get('@onHideSpy').should('have.been.called');
  });

  it('hide on esc press', () => {
    const onHideSpy = cy.spy().as('onHideSpy');

    cy.mount(<SearchModal show={true} onHide={onHideSpy} />);
    cy.get('#searchModal').should('exist');

    // Modal should call onHide function on background click
    cy.get('body').type('{esc}');
    cy.get('@onHideSpy').should('have.been.called');
  });

  it('Input', () => {
    const onHideSpy = cy.spy().as('onHideSpy');

    cy.mount(<SearchModal show={true} onHide={onHideSpy} />);
    cy.get('#searchModal').should('exist');

    // See if the searchbar is autofocused
    cy.get('input[placeholder="Search OMDb.."]').should('be.focused').as('input');

    // See if input value gets updated
    const input = 'test';
    cy.get('@input').type(input);
    cy.get('@input').should('have.value', input);

    // See if there are results
    cy.get('#searchResults').should('be.visible').should('not.contain', `No results found for ${input}.`);

    // Search for something that does not exist
    const wrongInput = Date.now();
    cy.get('input[placeholder="Search OMDb.."]').clear().type(wrongInput);
    cy.get('#searchResults').should('be.visible').should('contain', `No results found for ${wrongInput}.`);
  });
});
