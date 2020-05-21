import BemClassNameParser from '@/bemClassNameParser';

describe('BemClassNameParser parses', () => {
  it('empty string correctly', () => {
    const className = '';

    const bemModel = BemClassNameParser.parse(className);

    expect(bemModel.block).toBeNull();
    expect(bemModel.elements).toHaveLength(0);
    expect(bemModel.modifiers).toHaveLength(0);
  });

  it('lowercase block correctly', () => {
    const className = 'card';

    const bemModel = BemClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(0);
    expect(bemModel.modifiers).toHaveLength(0);
  });

  it('uppercase block correctly', () => {
    const className = 'CARD';

    const bemModel = BemClassNameParser.parse(className);

    expect(bemModel.block).toEqual('CARD');
    expect(bemModel.elements).toHaveLength(0);
    expect(bemModel.modifiers).toHaveLength(0);
  });

  it('block and element correctly', () => {
    const className = 'card__title';

    const bemModel = BemClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(1);
    expect(bemModel.elements[0]).toEqual('title');
    expect(bemModel.modifiers).toHaveLength(0);
  });

  it('block and modifier correctly', () => {
    const className = 'card--disabled';

    const bemModel = BemClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(0);
    expect(bemModel.modifiers).toHaveLength(1);
    expect(bemModel.modifiers[0]).toEqual('disabled');
  });

  it('block, element and modifier correctly', () => {
    const className = 'card__title--active';

    const bemModel = BemClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(1);
    expect(bemModel.elements[0]).toEqual('title');

    expect(bemModel.modifiers).toHaveLength(1);
    expect(bemModel.modifiers[0]).toEqual('active');
  });

  it('block, element 1 and element 2 correctly', () => {
    const className = 'card__element1__element2';

    const bemModel = BemClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(2);
    expect(bemModel.elements[0]).toEqual('element1');
    expect(bemModel.elements[1]).toEqual('element2');

    expect(bemModel.modifiers).toHaveLength(0);
  });

  it('block, modifier 1 and modifier 2 correctly', () => {
    const className = 'card--modifier1--modifier2';

    const bemModel = BemClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(0);

    expect(bemModel.modifiers).toHaveLength(2);
    expect(bemModel.modifiers[0]).toEqual('modifier1');
    expect(bemModel.modifiers[1]).toEqual('modifier2');
  });

  it('block, element 1, modifier 1 and element 2, modifier 2 correctly', () => {
    const className = 'card__element1--modifier1__element2--modifier2';

    const bemModel = BemClassNameParser.parse(className);

    expect(bemModel.block).toEqual('card');
    expect(bemModel.elements).toHaveLength(2);
    expect(bemModel.elements[0]).toEqual('element1');
    expect(bemModel.elements[1]).toEqual('element2');

    expect(bemModel.modifiers).toHaveLength(2);
    expect(bemModel.modifiers[0]).toEqual('modifier1');
    expect(bemModel.modifiers[1]).toEqual('modifier2');
  });
});

