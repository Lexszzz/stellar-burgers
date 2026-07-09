import {
  constructorReducer,
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './constructorSlice';

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => 'test-id')
  }
});

describe('constructorSlice', () => {
  const bun = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('should return initial state for unknown action', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('should set bun', () => {
    const state = constructorReducer(undefined, setBun(bun));

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([]);
  });

  it('should add ingredient', () => {
    const ingredient = {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 100,
      price: 150,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const state = constructorReducer(undefined, addIngredient(ingredient));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(ingredient);
    expect(state.ingredients[0].id).toBe('test-id');
  });

  it('should remove ingredient', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          id: '1',
          _id: '2',
          name: 'Котлета',
          type: 'main',
          proteins: 10,
          fat: 20,
          carbohydrates: 30,
          calories: 100,
          price: 150,
          image: '',
          image_mobile: '',
          image_large: ''
        }
      ]
    };

    const newState = constructorReducer(state, removeIngredient('1'));

    expect(newState.ingredients).toHaveLength(0);
  });

  it('should move ingredient up', () => {
    const state = {
      bun: null,
      ingredients: [
        { id: '1', _id: '1', name: 'A', type: 'main' } as any,
        { id: '2', _id: '2', name: 'B', type: 'main' } as any,
        { id: '3', _id: '3', name: 'C', type: 'main' } as any
      ]
    };

    const newState = constructorReducer(state, moveIngredientUp(1));

    expect(newState.ingredients.map((i) => i.id)).toEqual(['2', '1', '3']);
  });

  it('should move ingredient down', () => {
    const state = {
      bun: null,
      ingredients: [
        { id: '1', _id: '1', name: 'A', type: 'main' } as any,
        { id: '2', _id: '2', name: 'B', type: 'main' } as any,
        { id: '3', _id: '3', name: 'C', type: 'main' } as any
      ]
    };

    const newState = constructorReducer(state, moveIngredientDown(1));

    expect(newState.ingredients.map((i) => i.id)).toEqual(['1', '3', '2']);
  });

  it('should clear constructor', () => {
    const state = {
      bun,
      ingredients: [
        {
          id: '1',
          _id: '2',
          name: 'Котлета',
          type: 'main',
          proteins: 10,
          fat: 20,
          carbohydrates: 30,
          calories: 100,
          price: 150,
          image: '',
          image_mobile: '',
          image_large: ''
        }
      ]
    };

    const newState = constructorReducer(state, clearConstructor());

    expect(newState).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
