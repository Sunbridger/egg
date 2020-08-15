
CREATE TABLE hots (
    `text` varchar(100) NOT NULL COMMENT '热搜 primary key',
    `num` int(255) DEFAULT 0 COMMENT '热搜次数',
    `link` varchar(500) COMMENT '热搜 primary key',
    `icon` varchar(500) COMMENT 'icon',
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`text`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='hots的数据';
