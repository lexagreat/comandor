const gulp = require("gulp");
const requireDir = require("require-dir");
const tasks = requireDir("./tasks");

exports.ttf = tasks.ttf;
exports.ttf2 = tasks.ttf2;
exports.fonts_copy = tasks["fonts-copy"];
exports.fonts_gen = tasks.fonts;
exports.fonts = gulp.series(
   gulp.parallel(exports.ttf, exports.ttf2, exports.fonts_copy),
   exports.fonts_gen,
);
exports.style = tasks.style;
exports.dev_js = tasks.dev_js;
exports.html = tasks.html;
exports.rastr = tasks.rastr;
exports.webp = tasks.webp;
exports.bs_html = tasks.bs_html;
exports.watch = tasks.watch;

exports.default = gulp.parallel(
   exports.fonts,
   exports.style,
   exports.dev_js,
   exports.rastr,
   exports.webp,
   exports.html,
   exports.bs_html,
   exports.watch,
);
