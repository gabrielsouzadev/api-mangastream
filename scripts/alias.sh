#!/bin/bash

alias api-build='docker-compose up --build'

alias api-dev='docker-compose up'

alias api-test='docker-compose -f docker-compose.yml -f docker-compose.test.yml up'

alias api-prod='docker-compose -f docker-compose.yml -f docker-compose.prod.yml up'
