
CREATE TABLE maidian (
    id int(11) NOT NULL AUTO_INCREMENT COMMENT '埋点唯一id',
    `created_at` varchar(255) DEFAULT NULL COMMENT '访问时间',
    `updated_at` varchar(255) DEFAULT NULL COMMENT '访问时间',
    ua varchar(255) DEFAULT NULL COMMENT 'ua',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='这是ua的表';
