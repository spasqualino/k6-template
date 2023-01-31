#!/bin/sh
nerdctl run --rm -i grafana/k6 run - <k6-script.js