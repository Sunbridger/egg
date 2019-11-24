
CREATE TABLE taobao (
    `good_url` varchar(100) COMMENT '商品url链接',
    `good_title` varchar(255) DEFAULT NULL COMMENT '商品名称',
    `good_img` varchar(500) DEFAULT NULL COMMENT '商品img链接',
    `tit_price` varchar(15) DEFAULT NULL COMMENT '价格及销量',
    `new_price` varchar(500) DEFAULT NULL COMMENT '价格及销量',
    PRIMARY KEY (good_url)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='taobao的数据';
