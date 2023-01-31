#!/bin/sh
nerdctl run --rm -i grafana/k6 run -e MY_HOSTNAME=httpbin.test.k6.io - <k6-script.js