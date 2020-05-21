import ClassNameParser from '@/classNameParser';

describe('ClassNameParser parses', () => {
  it('empty string correctly', () => {
    const className = '';

    const bemModel = ClassNameParser.parse(className);

    expect(bemModel.block).toBeNull();
    expect(bemModel.elements).toHaveLength(0);
    expect(bemModel.modifiers).toHaveLength(0);
  });

  it('lowercase block correctly', () => {
    const className = 'card';

    const bemModel = ClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(0);
    expect(bemModel.modifiers).toHaveLength(0);
  });

  it('uppercase block correctly', () => {
    const className = 'CARD';

    const bemModel = ClassNameParser.parse(className);

    expect(bemModel.block).toEqual('CARD');
    expect(bemModel.elements).toHaveLength(0);
    expect(bemModel.modifiers).toHaveLength(0);
  });

  it('block and element correctly', () => {
    const className = 'card__title';

    const bemModel = ClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(1);
    expect(bemModel.elements[0]).toEqual('title');
    expect(bemModel.modifiers).toHaveLength(0);
  });

  it('block and modifier correctly', () => {
    const className = 'card--disabled';

    const bemModel = ClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(0);
    expect(bemModel.modifiers).toHaveLength(1);
    expect(bemModel.modifiers[0]).toEqual('disabled');
  });

  it('block, element and modifier correctly', () => {
    const className = 'card__title--active';

    const bemModel = ClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(1);
    expect(bemModel.elements[0]).toEqual('title');

    expect(bemModel.modifiers).toHaveLength(1);
    expect(bemModel.modifiers[0]).toEqual('active');
  });
});

