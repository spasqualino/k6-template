#!/bin/sh

docker run --rm -i grafana/k6 run -e MY_HOSTNAME=httpbin.test.k6.io - <scripts/k6-script-with-scenarios.js