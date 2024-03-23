export function randomColor(type='HEX'){
  let color = '#';
  for (let i = 0; i < 6; i++){
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return type === 'HEX' ? color : `rgb(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)})`;
}