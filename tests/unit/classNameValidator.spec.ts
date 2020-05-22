import ClassNameValidator from '@/classNameValidator';

// TODO: Test if element name contains block name: card__card-title
// TODO: Common HTML tags when the .prefix has not been used: input[type=submit]
// TODO: Nested classes: .form .search  header .form



describe('ClassNameValidator', () => {
  it('returns an error when string is empty', () => {
    const className = '';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toEqual('No CSS class name has been entered.');
  });

  it('returns an error when string is just a dot', () => {
    const className = '.';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toEqual('No CSS class name has been entered.');
  });

  it('returns an error when class name is only 1 character long', () => {
    const className = 'a';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toEndWith('at least 2 characters long.');
  });

  it('returns errors when class name begins with #', () => {
    const className = '#test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toEndWith('BEM uses class names only and not ID selectors.');
  });

  it('returns no errors when class name dot prefix is used', () => {
    const className = '.test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(0);
  });

  it('returns no errors when class name dot prefix is not used', () => {
    const className = 'test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(0);
  });

  it('returns no errors when class name contains leading space', () => {
    const className = ' test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(0);
  });

  it('returns no errors when class name contains trailing space', () => {
    const className = 'test ';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(0);
  });

  it('returns an error when class name starts with a number', () => {
    const className = '1test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toStartWith('The CSS class name starts with a number');
  });

  it('returns an error when class name starts with a hyphen', () => {
    const className = '-test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toContain('starts with a hyphen or underscore');
  });

  it('returns an error when class name starts with a underscore', () => {
    const className = '_test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toContain('starts with a hyphen or underscore');
  });

  it('returns an error when class name starts with other characters', () => {
    const className = '!test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toStartWith('The CSS class name does not start with');
  });

  it('returns an error when class name starts with 2 hyphens', () => {
    const className = '--test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toStartWith('The CSS class name starts with 2 hyphens');
  });

  it('returns an error when class name starts with 2 hyphens', () => {
    const className = '-1test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toStartWith('The CSS class name starts with hyphen and a number');
  });

  it('returns an error when class contains uppercase characters', () => {
    const className = 'Test';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toContain('contains uppercase characters');
  });

  it('returns an error when words are separated by an underscore', () => {
    const className = 'test_name';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toStartWith('Words have been separated by underscores.');
  });

  it('returns an error when words are separated by a space', () => {
    const className = 'test name';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(1);
    expect(validationIssues[0].message).toContain('contains spaces');
  });

  it('returns errors when uppercase words are separated by a space', () => {
    const className = 'TEST NAME';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(2);
    expect(validationIssues[0].message).toContain('contains uppercase characters');
    expect(validationIssues[1].message).toContain('contains spaces');
  });

  it('returns no error when hover separator exists', () => {
    const className = 'card:hover';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(0);
  });








  it('returns no errors for BEM block & element example', () => {
    const className = 'card__title';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(0);
  });

  it('returns no errors for BEM block & modifier example', () => {
    const className = 'card--selected';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(0);
  });

  it('returns no errors for BEM block, element & modifier example', () => {
    const className = 'card--title-highlighted';

    const validationIssues = ClassNameValidator.validate(className);

    expect(validationIssues).toHaveLength(0);
  });




  // it('returns errors when class name begins with a number', () => {
  //   const className = '1';
  //
  //   const validationIssues = ClassNameValidator.validate(className);
  //
  //   expect(validationIssues).toHaveLength(2);
  //   expect(validationIssues[0].message).toEndWith('at least 2 characters long.');
  //   expect(validationIssues[1].message).toEqual('The CSS class starts with a number which is invalid.');
  // });
});

