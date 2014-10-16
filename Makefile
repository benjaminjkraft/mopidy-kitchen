BROWSERIFY_ARGS=run.jsx -t [ reactify --es6 ] -o bundle.js -d

build:
	browserify $(BROWSERIFY_ARGS)

watch:
	watchify $(BROWSERIFY_ARGS) -v
