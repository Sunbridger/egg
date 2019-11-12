
CREATE TABLE bangjie (
    id int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
    name varchar(255) DEFAULT NULL COMMENT '评论者id名称',
    ava_url varchar(255) DEFAULT NULL COMMENT '评论者头像',
    text varchar(255) DEFAULT NULL COMMENT '评论内容',
    goods varchar(255) DEFAULT NULL COMMENT '点赞数量',
    intr varchar(255) DEFAULT NULL COMMENT '评论者简介',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='这是榜姐的表';
