#!/usr/bin/env bash
docker rm -f load-balance-nginx
docker build -t load-balance-nginx .
docker run --network="host" --name=load-balance-nginx -d load-balance-nginx