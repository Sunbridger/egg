
CREATE TABLE hots (
    `text` varchar(100) NOT NULL COMMENT '热搜 primary key',
    `num` int(255) DEFAULT 0 COMMENT '热搜次数',
    PRIMARY KEY (`text`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='hots的数据';
