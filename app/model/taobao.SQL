
CREATE TABLE taobao (
    id int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
    `good_title` varchar(255) DEFAULT NULL COMMENT '商品名称',
    `good_url` text(255) DEFAULT NULL COMMENT '商品url链接',
    `good_img` text(225) DEFAULT NULL COMMENT '商品img链接',
    `tit_price` varchar(15) DEFAULT NULL COMMENT '价格及销量',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='taobao的数据';
