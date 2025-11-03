export function cn(...inputs) {
  const classes = [];
  for (const input of inputs) {
    if (typeof input === 'string') {
      classes.push(input);
    }
  }
  return classes.join(' ');
}