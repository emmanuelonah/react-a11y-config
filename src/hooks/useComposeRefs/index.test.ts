import React from 'react';
import { renderHook } from '@testing-library/react';

import { useComposeRefs } from './index';

describe('useComposeRefs', () => {
  it('should compose multiple refs into one', () => {
    const ref1 = React.createRef<HTMLDivElement>();
    const ref2 = React.createRef<HTMLDivElement>();
    const callbackRef = jest.fn();

    const { result } = renderHook(() =>
      useComposeRefs(ref1, ref2, callbackRef)
    );

    const composedRef = result.current;

    const div = document.createElement('div');
    composedRef(div);

    expect(ref1.current).toBe(div);
    expect(ref2.current).toBe(div);
    expect(callbackRef).toHaveBeenCalledWith(div);
  });

  it('should handle null and undefined refs', () => {
    const ref1 = React.createRef<HTMLDivElement>();
    const ref2 = null;
    const ref3 = undefined;
    const callbackRef = jest.fn();

    const { result } = renderHook(() =>
      useComposeRefs(ref1, ref2, ref3!, callbackRef)
    );

    const composedRef = result.current;

    const div = document.createElement('div');
    composedRef(div);

    expect(ref1.current).toBe(div);
    expect(callbackRef).toHaveBeenCalledWith(div);
  });
});
