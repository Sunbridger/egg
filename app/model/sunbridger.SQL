
CREATE TABLE sunbridger (
    id int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
    ava_url varchar(255) DEFAULT NULL COMMENT '头像',
    name varchar(10) DEFAULT NULL COMMENT '评论者id名称',
    text varchar(255) DEFAULT NULL COMMENT '内容',
    time varchar(15) DEFAULT NULL COMMENT '时间',
    from varchar(15) DEFAULT NULL COMMENT '内容',
    send_num varchar(10) DEFAULT NULL COMMENT '转发数量',
    goods_num varchar(10) DEFAULT NULL COMMENT '点赞数量',
    comment_num varchar(10) DEFAULT NULL COMMENT '评论数量',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='sunbridger的数据';
