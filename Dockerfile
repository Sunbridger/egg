FROM node:12.6.0-alpine

# 创建app目录
RUN mkdir -p /usr/src/eggapp

# 设置容器内工作目录
WORKDIR /usr/src/eggapp

COPY package.json /usr/src/eggapp/

RUN npm install

# 拷贝所有源代码到工作目录
COPY . /usr/src/eggapp

# 暴露容器端口
EXPOSE 7001

# 启动node应用
ENTRYPOINT ["npm", "run"]
