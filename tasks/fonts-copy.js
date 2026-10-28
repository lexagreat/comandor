const { src, dest } = require("gulp");

module.exports = function fontsCopy() {
   return src(["src/fonts/*.{woff,woff2}"], { allowEmpty: true }).pipe(
      dest("build/fonts"),
   );
};
