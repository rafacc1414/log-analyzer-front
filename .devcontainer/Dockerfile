
ARG VARIANT="20-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:1-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
RUN su node -c "npm install -g @angular/cli npm"

RUN apt-get update && apt-get install -y protobuf-compiler
RUN su node -c "npm install -g ts-protoc-gen @improbable-eng/grpc-web @types/google-protobuf google-protobuf npm"

ENV DEV_PATH=/code/dev
WORKDIR $DEV_PATH

RUN useradd -ms /bin/bash dev
RUN chown -R dev:dev $DEV_PATH
USER dev

CMD ["/bin/bash"]