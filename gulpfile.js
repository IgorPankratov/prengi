const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const fs = require("fs");
const rimraf = require("rimraf");

const paths = {
  src: "src",
  dist: "dist",
  sass: "src/sass/**/*.+(scss|sass)",
  html: "src/*.html",
  js: "src/js/**/*.js",
  fonts: "src/fonts/**/*",
  icons: "src/icons/**/*",
  img: "src/img/**/*.{jpg,jpeg,png,svg,gif}",
  mailer: "src/mailer/**/*"
};



// Таск для очистки dist
gulp.task("clean", (cb) => {
  if (fs.existsSync("dist")) {
    rimraf("dist", (error) => {
      if (error) {
        console.error("Не удалось удалить dist/:", error);
        return cb(error);
      }
      console.log("Папка dist/ успешно удалена.");
      cb();
    });
  } else {
    console.log("Папка dist/ не существует — пропуск очистки.");
    cb();
  }
});

// Таск для HTML
gulp.task("html", function () {
  return gulp
    .src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist))
    .on("error", console.error);
});

// Таск для стилей
gulp.task("styles", function () {
  return gulp
    .src(paths.sass)
    .pipe(sass().on("error", sass.logError))
    .on("error", console.error)
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(`${paths.dist}/css`))
    .pipe(browserSync.stream());
});

// Таск для скриптов
gulp.task("scripts", function () {
  return gulp
    .src(paths.js)
    .pipe(gulp.dest(`${paths.dist}/js`))
    .on("error", console.error);
});

// Таски для статических ресурсов
gulp.task("fonts", function () {
  return gulp
    .src(paths.fonts)
    .pipe(gulp.dest(`${paths.dist}/fonts`))
    .on("error", console.error);
});

gulp.task("icons", function () {
  return gulp
    .src(paths.icons)
    .pipe(gulp.dest(`${paths.dist}/icons`))
    .on("error", console.error);
});

gulp.task("mailer", function () {
  return gulp
    .src(paths.mailer)
    .pipe(gulp.dest(`${paths.dist}/mailer`))
    .on("error", console.error);
});

// Таск для изображений
gulp.task("images", function () {
  return gulp
    .src(paths.img)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75 }),
        imagemin.pngquant({ quality: [0.65, 0.8] }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest(`${paths.dist}/img`))
    .pipe(browserSync.stream());
});

// Сервер и наблюдение
gulp.task("server", function () {
  browserSync.init({
    server: { baseDir: "dist" },
    port: 5000,
    host: "0.0.0.0",
    open: true,
    ui: false,
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("watch", function () {
  gulp.watch(paths.sass, gulp.series("styles"));
  gulp.watch(paths.html, gulp.series("html"));
  gulp.watch(paths.js, gulp.series("scripts"));
  gulp.watch(paths.fonts, gulp.series("fonts"));
  gulp.watch(paths.icons, gulp.series("icons"));
  gulp.watch(pathas.img, gulp.series("images"));
});

// Сборка и запуск
gulp.task(
  "build",
  gulp.series(
    "clean",
    (cb) => {
      if (!fs.existsSync("src")) {
        console.error("Папка src/ не найдена!");
        return cb(new Error("src/ not found"));
      }
      cb();
    },
    "styles",
    "html",
    "scripts",
    "fonts",
    "icons",
    "images",
    "mailer"
  )
);

gulp.task("default", gulp.parallel("build", "watch", "server"));

//Таск для документации 
gulp.task("help", (cb) => {
  console.log(`
    Доступные команды:
      gulp               - полная сборка + сервер + наблюдение
      gulp build        - только сборка (с очисткой)
      gulp clean        - очистка dist/
      gulp server       - запуск сервера без сборки
      gulp watch        - наблюдение за файлами
  `);
  cb();
});
