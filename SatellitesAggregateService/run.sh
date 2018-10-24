docker rm -f aggregate-service
docker build -t aggregate-service .

docker run -e "MESSAGE=Aggregate Service instance" -d aggregate-service --net=my_network


