BABEL_CMD = node_modules/.bin/babel
ESLINT_CMD = node_modules/.bin/eslint
WEBPACK_CMD = node_modules/.bin/webpack
SASS_CMD = sassc
WATCH_CMD = node_modules/.bin/watch
AUTOPREFIXER_CMD = node_modules/.bin/autoprefixer
CLEANCSS_CMD = node_modules/.bin/cleancss
JSON_SASS_CMD = node_modules/.bin/json-sass

BABEL_ARGS = --experimental --external-helpers --source-maps-inline --blacklist regenerator,es6.blockScoping --optional asyncToGenerator

SRC_JS = $(shell find src -name "*.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

# Build application
build: build-dev minify-css

build-dev: js webpack css slides

# Build application quickly
# Faster on first build, but not after that
fast-build: fast-js build

# Watch for changes
watch: minify-css
	@NODE_ENV=development $(MAKE) -j5 dev-server webpack-server watch-css watch-js watch-slides

dev-server: $(LIB_JS)
	nodemon ./lib/server | bunyan

webpack-server: $(LIB_JS)
	node ./lib/server/webpack

slides: public/slides.json

public/slides.json: js slides.yaml
	node ./lib/scripts/buildSlides.js

watch-slides:
	$(WATCH_CMD) "node ./lib/scripts/buildSlides.js" slides

# Clean up
clean:
	rm -rf lib
	rm -rf public/js/
	rm -rf public/css/
	rm -f sass/_theme.scss
	rm -f public/slides.json

webpack: public/js/app.js

public/js/app.js: $(SRC_JS)
	$(WEBPACK_CMD)

# Transpile JavaScript using Babel
js: $(LIB_JS)

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@) && $(BABEL_CMD) $< -o $@ $(BABEL_ARGS)

fast-js:
	$(BABEL_CMD) src -d lib $(BABEL_ARGS)

watch-js:
	$(BABEL_CMD) src -d lib $(BABEL_ARGS) -w

# Compile Sass
css: public/css/app.css

minify-css: css public/css/app.min.css

public/css/app.css: sass/app.scss theme
	mkdir -p $(dir $@) && $(SASS_CMD) -m $< | $(AUTOPREFIXER_CMD) > $@

public/css/app.min.css: public/css/app.css
	$(CLEANCSS_CMD) $< > $@

watch-css:
	$(WATCH_CMD) "mkdir -p public/css && $(SASS_CMD) -m sass/app.scss | $(AUTOPREFIXER_CMD) > public/css/app.css" sass

theme: sass/dependencies/_theme.scss

sass/dependencies/_theme.scss: lib/shared/theme.js
	mkdir -p $(dir $@) && $(JSON_SASS_CMD) -i $< \
	| sed '1s/^/$$theme: /' \
	> $@

.PHONY: build build-dev test fast-build watch dev-server webpack-server clean
.PHONY: webpack js fast-js weatch-js css minify-css watch-css theme
