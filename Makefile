.PHONY: dc-up mk-docker test

dc-up: mk-docker
	docker-compose up

mk-docker:
	docker build . -t yisty_webservice:latest

test:
	npm run test2
