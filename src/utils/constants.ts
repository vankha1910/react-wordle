export const KEYBOARD_LAYOUT = `
q w e r t y u i o p
 a s d f g h j k l 
⏎ z x c v b n m ⌫
`
  .trim()
  .split('\n')
  .map((row) => row.split(' '));

export const specialKeys = ['⌫', '⏎'];
