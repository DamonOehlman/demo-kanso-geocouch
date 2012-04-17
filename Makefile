SHELL := /bin/bash

build:
	@bake src/geocouch-demo.js --output dist
	
test:
	@mocha --reporter spec

.PHONY: test