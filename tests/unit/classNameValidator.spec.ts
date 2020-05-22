import ClassNameValidator from '@/utils/classNameValidator';
import MessageType from '@/enums/messageType';

describe('ClassNameValidator', () => {
  it('returns critical message when string is empty', () => {
    const className = '';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.critical);
    expect(messages[0].text).toEqual('No CSS class name has been entered.');
  });

  it('returns critical message when string is just a dot', () => {
    const className = '.';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.critical);
    expect(messages[0].text).toEqual('No CSS class name has been entered.');
  });

  it('returns critical message when class name is only 1 character long', () => {
    const className = 'a';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.critical);
    expect(messages[0].text).toEndWith('at least 2 characters long.');
  });

  it('returns error message when class name begins with #', () => {
    const className = '#test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.error);
    expect(messages[0].text).toEndWith('BEM uses class names only and not ID selectors.');
  });

  it('returns no messages when class name dot prefix is used', () => {
    const className = '.test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(0);
  });

  it('returns no messages when class name dot prefix is not used', () => {
    const className = 'test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(0);
  });

  it('returns no messages when class name contains leading space', () => {
    const className = ' test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(0);
  });

  it('returns no messages when class name contains trailing space', () => {
    const className = 'test ';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(0);
  });

  it('returns critical message when class name starts with a number', () => {
    const className = '1test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.critical);
    expect(messages[0].text).toStartWith('The CSS class name starts with a number');
  });

  it('returns warning message when class name starts with a hyphen', () => {
    const className = '-test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toContain('starts with a hyphen or underscore');
  });

  it('returns critical message when class name starts with a underscore', () => {
    const className = '_test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toContain('starts with a hyphen or underscore');
  });

  it('returns critical message when class name starts with other characters', () => {
    const className = '!test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.critical);
    expect(messages[0].text).toStartWith('The CSS class name does not start with');
  });

  it('returns critical message when class name starts with 2 hyphens', () => {
    const className = '--test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.critical);
    expect(messages[0].text).toStartWith('The CSS class name starts with 2 hyphens');
  });

  it('returns critical message when class name starts with hyphen and number', () => {
    const className = '-1test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.critical);
    expect(messages[0].text).toStartWith('The CSS class name starts with hyphen and a number');
  });

  it('returns warning message when class contains uppercase characters', () => {
    const className = 'Test';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toContain('contains uppercase characters');
  });

  it('returns warning message when words are separated by an underscore', () => {
    const className = 'test_name';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.warning);
    expect(messages[0].text).toStartWith('Words have been separated by underscores.');
  });

  it('returns critical message when words are separated by a space', () => {
    const className = 'test name';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(1);
    expect(messages[0].messageType).toEqual(MessageType.critical);
    expect(messages[0].text).toContain('contains spaces');
  });

  it('returns warning and critical messages when uppercase words are separated by a space', () => {
    const className = 'TEST NAME';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(2);
    expect(messages[0].messageType).toEqual(MessageType.critical);
    expect(messages[0].text).toContain('contains spaces');
    expect(messages[1].messageType).toEqual(MessageType.warning);
    expect(messages[1].text).toContain('contains uppercase characters');
  });

  it('returns no error when hover separator exists', () => {
    const className = 'card:hover';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(0);
  });





  it('returns no errors for BEM block & element example', () => {
    const className = 'card__title';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(0);
  });

  it('returns no errors for BEM block & modifier example', () => {
    const className = 'card--selected';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(0);
  });

  it('returns no errors for BEM block, element & modifier example', () => {
    const className = 'card--title-highlighted';

    const messages = ClassNameValidator.validate(className);

    expect(messages).toHaveLength(0);
  });




  // it('returns errors when class name begins with a number', () => {
  //   const className = '1';
  //
  //   const messages = ClassNameValidator.validate(className);
  //
  //   expect(messages).toHaveLength(2);
  //   expect(messages[0].message).toEndWith('at least 2 characters long.');
  //   expect(messages[1].message).toEqual('The CSS class starts with a number which is invalid.');
  // });
});

