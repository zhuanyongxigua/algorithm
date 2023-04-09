docker build -t go-dev-env -f Dockerfile .
docker run -it --name algorithm -v $PWD:/usr/local/algorithm go-dev-env