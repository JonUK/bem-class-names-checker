import BemClassNameParser from '@/utils/bemClassNameParser';
import BemPartType from '@/enums/bemPartType';

describe('BemClassNameParser parses', () => {
  it('empty string correctly', () => {
    const className = '';

    const bemParts = BemClassNameParser.parse(className);

    // Assert
    expect(bemParts).toHaveLength(1);

    const block = bemParts[0];
    expect(block.partType).toEqual(BemPartType.block);
    expect(block.value).toEqual('');
  });

  it('lowercase block correctly', () => {
    const className = 'card';

    const bemParts = BemClassNameParser.parse(className);

    // Assert
    expect(bemParts).toHaveLength(1);

    const block = bemParts[0];
    expect(block.partType).toEqual(BemPartType.block);
    expect(block.value).toEqual('card');
  });

  it('uppercase block correctly', () => {
    const className = 'CARD';

    const bemParts = BemClassNameParser.parse(className);

    // Assert
    expect(bemParts).toHaveLength(1);

    const block = bemParts[0];
    expect(block.partType).toEqual(BemPartType.block);
    expect(block.value).toEqual('CARD');
  });

  it('block and element correctly', () => {
    const className = 'card__title';

    const bemParts = BemClassNameParser.parse(className);

    // Assert
    expect(bemParts).toHaveLength(2);

    const block = bemParts[0];
    expect(block.partType).toEqual(BemPartType.block);
    expect(block.value).toEqual('card');

    const element = bemParts[1];
    expect(element.partType).toEqual(BemPartType.element);
    expect(element.value).toEqual('title');
  });

  it('block and modifier correctly', () => {
    const className = 'card--disabled';

    const bemParts = BemClassNameParser.parse(className);

    // Assert
    expect(bemParts).toHaveLength(2);

    const block = bemParts[0];
    expect(block.partType).toEqual(BemPartType.block);
    expect(block.value).toEqual('card');

    const modifier = bemParts[1];
    expect(modifier.partType).toEqual(BemPartType.modifier);
    expect(modifier.value).toEqual('disabled');
  });

  it('block, element and modifier correctly', () => {
    const className = 'card__title--active';

    const bemParts = BemClassNameParser.parse(className);

    // Assert
    expect(bemParts).toHaveLength(3);

    const block = bemParts[0];
    expect(block.partType).toEqual(BemPartType.block);
    expect(block.value).toEqual('card');

    const element = bemParts[1];
    expect(element.partType).toEqual(BemPartType.element);
    expect(element.value).toEqual('title');

    const modifier = bemParts[2];
    expect(modifier.partType).toEqual(BemPartType.modifier);
    expect(modifier.value).toEqual('active');
  });

  it('block, element 1 and element 2 correctly', () => {
    const className = 'card__element1__element2';

    const bemParts = BemClassNameParser.parse(className);

    // Assert
    expect(bemParts).toHaveLength(3);

    const block = bemParts[0];
    expect(block.partType).toEqual(BemPartType.block);
    expect(block.value).toEqual('card');

    const element1 = bemParts[1];
    expect(element1.partType).toEqual(BemPartType.element);
    expect(element1.value).toEqual('element1');

    const element2 = bemParts[2];
    expect(element2.partType).toEqual(BemPartType.element);
    expect(element2.value).toEqual('element2');
  });

  it('block, modifier 1 and modifier 2 correctly', () => {
    const className = 'card--modifier1--modifier2';

    const bemParts = BemClassNameParser.parse(className);

    // Assert
    expect(bemParts).toHaveLength(3);

    const block = bemParts[0];
    expect(block.partType).toEqual(BemPartType.block);
    expect(block.value).toEqual('card');

    const modifier1 = bemParts[1];
    expect(modifier1.partType).toEqual(BemPartType.modifier);
    expect(modifier1.value).toEqual('modifier1');

    const modifier2 = bemParts[2];
    expect(modifier2.partType).toEqual(BemPartType.modifier);
    expect(modifier2.value).toEqual('modifier2');
  });

  it('block, element 1, modifier 1 and element 2, modifier 2 correctly', () => {
    const className = 'card__element1--modifier1__element2--modifier2';

    const bemParts = BemClassNameParser.parse(className);

    // Assert
    expect(bemParts).toHaveLength(5);

    const block = bemParts[0];
    expect(block.partType).toEqual(BemPartType.block);
    expect(block.value).toEqual('card');

    const element1 = bemParts[1];
    expect(element1.partType).toEqual(BemPartType.element);
    expect(element1.value).toEqual('element1');

    const modifier1 = bemParts[2];
    expect(modifier1.partType).toEqual(BemPartType.modifier);
    expect(modifier1.value).toEqual('modifier1');

    const element2 = bemParts[3];
    expect(element2.partType).toEqual(BemPartType.element);
    expect(element2.value).toEqual('element2');

    const modifier2 = bemParts[4];
    expect(modifier2.partType).toEqual(BemPartType.modifier);
    expect(modifier2.value).toEqual('modifier2');
  });
});

