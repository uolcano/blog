---
title: Fedora 23 下使用gae_proxy，libssl.so.1.0.0 无法分享对象文件问题
date: 2015-12-26
author: uolcano
categories: 
- Over the wall
tags:
- Fedora
---

从网易博客搬运过来，原链接：http://blog.163.com/yucan_unique/blog/static/1738993692015112625256486/

本人是fedora23新手，最近在使用ubuntu和windows下屡试不爽的chrome + XX-Net方案“科学”上网时，在解压后的的文件夹中执行start.sh文件，如下：

```bash
sudo chmod +a start.sh
./start.sh
```

遇到libssl.so.1.0.0 无法分享文件对象的问题，如下提示：

libssl.so.1.0.0 cannot open shared object file

并且还会提示要安装nofity_python。

网上都说是没有安装libssl或者libopessl的问题，但是在fedora下的yum（已被yum2dnf）和dnf都找不到libssl or libopenssl，如下：

```bash
sudo dnf install libssl 或者$ sudo dnf install libopenssl
```

均无法找到目标文件下载，

并且尝试在Yum Extender下或者终端下查找下载python有关文件并安装后，问题仍旧未解决。

最后在一个外文网上看到了安装python openssl的正确“姿势”，如下：

```bash
sudo dnf install pyOpenSSL
```

记住了，该大写的地方一定要大写！

至此，goagent的证书导入自动完成，XX-Net程序已最小化运行。

之后只需要在XX-Net的gae appip部署和配置了（chrome)。

firefox下，安装一个autoproxy（那个福利的“福“，嗯）配置即可。

最新版本的XX-Net推荐在firefox上使用pan做为代理插件。