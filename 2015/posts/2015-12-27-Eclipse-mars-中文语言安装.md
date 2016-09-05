---
title: Eclipse mars 中文语言安装
date: 2015-12-27
author: uolcano
categories: 
- Env Config
tags:
- Eclipse
---

从网易博客搬运过来，原链接：http://blog.163.com/yucan_unique/blog/static/173899369201511276477414/

##　下载Eclipse mars中文语言包
http://download.eclipse.org/technology/babel/babel_language_packs/R0.13.0/mars/mars.php

## 安装方法
1. 在eclipse根目录下创建一个Extensions文件夹和Links文件夹，将语言包解压至Extensions文件夹

2. 在Links文件夹下创建一个文本文件，里面填：

```text
path=Extensions\\BabelLanguagePack-eclipse-zh_4.5.0.v20150804081228
```

文本保存后，重命名为BabelLanguagePack-eclipse-zh_4.5.0.v20150804081228.link（跟Extensions文件夹中的中文包文件夹名字对应。重启eclipse即可。

## 参考链接
- [Eclipse中文语言包安装和设置中文Doc](http://www.cnblogs.com/IPrograming/archive/2012/12/17/Eclipse_Config.html)