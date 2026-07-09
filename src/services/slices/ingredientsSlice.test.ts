import { ingredientsReducer, getIngredientsThunk } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const ingredient = {
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
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  it('should handle pending', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredientsThunk.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('should handle fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredientsThunk.fulfilled([ingredient], '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual([ingredient]);
    expect(state.error).toBeNull();
  });

  it('should handle rejected', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredientsThunk.rejected(new Error('Ошибка загрузки'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual([]);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
