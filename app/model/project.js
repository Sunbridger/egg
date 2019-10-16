module.exports = {
    // 动态创建数据库表
    createTable(tabName) {
        return `CREATE TABLE IF NOT EXISTS ${tabName}(
            id INT NOT NULL AUTO_INCREMENT COMMENT '自增id',
            pid INT NOT NULL COMMENT '父级id',
            level INT NOT NULL COMMENT '层级',
            file_name VARCHAR(100) NOT NULL COMMENT '文件名',
            route_name VARCHAR(200) NOT NULL COMMENT '路由名',
            parent_name VARCHAR(100) COMMENT '父级名称',
            created_at datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
            PRIMARY KEY ( id ),
            INDEX route_name (route_name(200)));`;
    },
};
