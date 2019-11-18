
CREATE TABLE imgs (
    id int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
    `url` varchar(255) DEFAULT NULL COMMENT '图片地址',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='imgs的数据';
