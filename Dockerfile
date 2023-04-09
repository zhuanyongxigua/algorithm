FROM golang:1.20

ENV VSCODE_GOLANG_GIT_NAME default
ENV VSCODE_GOLANG_GIT_EMAIL default@default.io
ENV HTTP_PROXY "http://host.docker.internal:7890"
ENV HTTPS_PROXY "http://host.docker.internal:7890"
ENV GOPATH /usr/local/bin:/usr/local/go/bin:/usr/local/go:/usr/local:/usr

ARG GO_BIN_URL
ARG GO_PROXY=https://goproxy.cn,direct

RUN apt-get update > /dev/null\
&& apt-get install -y -q wget git vim > /dev/null

RUN /usr/local/go/bin/go env -w GOPROXY=$GO_PROXY \
&& /usr/local/go/bin/go install -v github.com/uudashr/gopkgs/v2/cmd/gopkgs@latest \
&& /usr/local/go/bin/go install -v github.com/ramya-rao-a/go-outline@latest \
&& /usr/local/go/bin/go install -v github.com/cweill/gotests/gotests@latest \
&& /usr/local/go/bin/go install -v github.com/fatih/gomodifytags@latest \
&& /usr/local/go/bin/go install -v github.com/josharian/impl@latest \
&& /usr/local/go/bin/go install -v github.com/haya14busa/goplay/cmd/goplay@latest \
&& /usr/local/go/bin/go install -v github.com/go-delve/delve/cmd/dlv@latest \
&& /usr/local/go/bin/go install -v golang.org/x/tools/gopls@latest \
&& /usr/local/go/bin/go install -v github.com/sergi/go-diff/...@latest
