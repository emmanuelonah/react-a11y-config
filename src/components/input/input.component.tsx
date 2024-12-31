import React from 'react';

type InputProps = React.ComponentPropsWithoutRef<'input'>;
type InputElement = React.ElementRef<'input'>;

export const Input = React.forwardRef<InputElement, InputProps>(function Input(
  props,
  forwardedRef
) {
  return <input {...props} ref={forwardedRef} />;
});
