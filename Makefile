dc-up: mk-docker
	docker-compose up

mk-docker:
	docker build . -t yisty_webservice:latest


