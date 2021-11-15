clean:
	rm -rf node_modules
	rm -rf dist

build: clean
	npm install
	npm run build
	cd dist && zip pi.zip app.js && cd ..