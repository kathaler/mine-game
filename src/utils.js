export function convertToGridPosition(x, y, gridSize) {
   return {
     x: x * gridSize,
     y: y * gridSize
   };
 }

 export function convertToScreenPosition(x, y, gridSize) {
   return {
     x: x / gridSize,
     y: y / gridSize
   };
 }