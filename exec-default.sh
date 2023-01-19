#!/bin/sh

docker run --rm -i grafana/k6 run - <scripts/k6-script.js