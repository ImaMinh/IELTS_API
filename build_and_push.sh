#!/bin/bash

#export API_VER=1.0.4_$(date '+%Y.%m.%d.%H.%M.%S')

export API_VER=1.0.6_$(date '+%Y.%m.%d.%H.%M.%S')
#export REGISTRY_URL=registry.zabi.tech:5043
export REGISTRY_URL=registryminh.zabi.tech:5099
docker build -t minh-api:${API_VER} -t minh-api:latest .

docker tag minh-api:${API_VER} ${REGISTRY_URL}/minh-api:${API_VER}
docker tag minh-api:${API_VER} ${REGISTRY_URL}/minh-api:latest
docker push ${REGISTRY_URL}/minh-api:${API_VER}
docker push ${REGISTRY_URL}/minh-api:latest

echo ${REGISTRY_URL}/minh-api:${API_VER} >> docker_ver.txt

