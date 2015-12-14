// (function (root, factory) {
//   if (typeof define === 'function' && define.amd) {
//     define(['react'], factory);
//   } else if (typeof exports === 'object') {
//     module.exports = factory(require('react'));
//   } else {
//     root.ReactSlider = factory(root.React);
//   }
// }(this, function (React) {

//   /**
//    * To prevent text selection while dragging.
//    * http://stackoverflow.com/questions/5429827/how-can-i-prevent-text-element-selection-with-cursor-drag
//    */
//   function pauseEvent(e) {
//     if (e.stopPropagation) e.stopPropagation();
//     if (e.preventDefault) e.preventDefault();
//     e.cancelBubble = true;
//     e.returnValue = false;
//     return false;
//   }

//   function stopPropagation(e) {
//     if (e.stopPropagation) e.stopPropagation();
//     e.cancelBubble = true;
//   }

//   /**
//    * Spreads `count` values equally between `min` and `max`.
//    */
//   function linspace(min, max, count) {
//     var range = (max - min) / (count - 1);
//     var res = [];
//     for (var i = 0; i < count; i++) {
//       res.push(min + range * i);
//     }
//     return res;
//   }

//   function ensureArray(x) {
//     return x == null ? [] : Array.isArray(x) ? x : [x];
//   }

//   function undoEnsureArray(x) {
//     return x != null && x.length === 1 ? x[0] : x;
//   }
// }));
