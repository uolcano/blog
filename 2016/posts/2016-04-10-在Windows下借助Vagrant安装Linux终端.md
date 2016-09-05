---
title: 在Windows下借助Vagrant安装Linux终端
date: 2016-04-10
update: 2016-08-17
author: uolcano
categories: 
- Env Config
tags: 
- Vagrant
- VirtualBox
- PuTTY
- Windows
- Linux Terminal
---

**近几天着手在Windows下通过[GitHub Pages](https://pages.github.com/)搭建个人博客，但由于国内网络问题和Windows下安装ruby和bundler的各种证书问题，安装jekyll折腾了好久。无奈，经朋友介绍，通过使用VirtualBox+Vagrant+PuTTY终于可以安装好jekyll并成功搭建示范站点了。本文作为安装记录方便以后有需要的时候再次安装，如能对其他读者有所帮助，不胜荣幸。**


## “食材”准备
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)  
- [Vagrant](https://www.vagrantup.com/downloads.html)
- [PuTTY和PuTTYGen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)


## “食材”选择
1. VirtualBox选“VirtualBox 5.0.16 for Windows hosts”下载，我装的时候5.0.16是最新的，并且一定要下载“VirtualBox 5.0.16 Oracle VM VirtualBox Extension Pack”。都是双击安装，win下都是无脑双击了；

2. Vagrant选择Windows通用版，下载安装就好了；

3. PuTTY和PuTTYGen(后面生成私钥，避免每次登陆都要输密码用的，实际上我用的每次都不成功，所以觉得可以接收每次都手动输入密码的，可以忽略这个)，我是直接下载的putty.zip，里面包含了PuTTY和PuTTYGen。

**注意：**考虑到国内网络情况，下载box的时候可能会有问题，建议使用迅雷之类的下载工具手动下载box压缩镜像。这里是[参考问题](http://laravel.io/forum/05-06-2015-how-to-download-vagrant-box-manually)和[box清单](https://atlas.hashicorp.com/boxes/search?utm_source=vagrantcloud.com&vagrantcloud=1)，我这里选择安装的是ubuntu/trusty64系统，版本号是清单中对应的v20160323.1.0，可用的下载链接地址就是：
https://atlas.hashicorp.com/ubuntu/boxes/trusty64/versions/20160323.1.0/providers/virtualbox.box

## “烹调”方式
### VirtualBox
1. 必须先安装好了VirtualBox，才能保证成功装载vagrant虚拟系统；

2. 无脑安装VirtualBox和扩展包。

### Vagrant
1. 安装；

2. 开启cmd或者powershell，最好是以管理员权限打开，防止后面`vagrant up`的时候出状况；

3. 由于不确定init过程中是否会有其他文件释放出来，最好先转到vagrant安装目录下执行（`cd ./vagrant`），输入以下命令：

	```
	vagrant init ubuntu/trusty64
	vagrant box add --name BOX virtualbox.box # virtualbox.box是手动下载好的压缩镜像，我是放在vagrant目录下的，如果放在其他地方还要补充完整路径，网络好的情况下可以skip这条
	vagrant up # 需要等待挺久的，可以放着干别的事了
	```

4. vagrant添加box成功后，可以通过`vagrant box list`查看已经装载的虚拟系统；vagrant装载成功后，可以通过`vagrant status`查看状态，“running virtualbox”表示正在运行服务，“poweroff”表示已经终止；

5. 使用`vagrant ssh-config`来查看已经开启的ssh的相关信息，注意一定要是使用`vagrant up`以后，才会开启服务。记录下相关信息，或者保持这个页面，后面的PuTTY设置需要用。

Vagrant常用命令

```posh
vagrant up #启动虚拟机
vagrant halt #关闭虚拟机
vagrant status #查看虚拟机运行状态
```

更多命令可查看[Vagrant文档](https://www.vagrantup.com/docs/cli/)

### PuTTY和PuTTYGen
PuTTY只是一个开启虚拟终端的平台，vagrant可能会推荐使用cygwin/mingw/git等工具，可自己选择，不过我不知道怎么设置主机名和端口。

1. 打开PuTTY，Session->Host Name，输入127.0.0.1，Port输入2222。这两个都是vagrant自动分配的，信息来自`vagrant ssh-config`打印的结果；

2. 在Session->Saved Sessions下输入一个自定义的名称如“VM-trusty64”，然后Save。这一步的作用是以后每次开启PuTTY时只需要选择“VM-trusty64”，然后Load，就可以直接Open了。其他都可以不设置；

3. 如果你需要设置自动登录，也就是面输入密码，请到页面最下面查看第一条参考链接。因为我没有尝试成功，在这里就不描述了；

4. Open以后，就是跳转出终端，首先就是输入用户名和密码，两者都是`vagrant`，密码不会显示出来，输入完后enter即可。

打开终端后，即可使用ubuntu下的linux命令了。如果要使用其他虚拟系统，可以对应box清单，下载对应版本虚拟系统的压缩镜像。

最后，感谢@[X!aoTian](https://github.com/xiaotian777)给与的耐心帮助。

## 后记
1. 因为虚拟机会占用较大空间建议修改安装路径以及配置BOX的存放路径，详情可参考我的另一篇[文章](2016-09-05-在Windows下如何修改Vagrant和VirtualBox的路径.md)

2. 其实VirtualBox是可以单独载入安装镜像，安装完整的系统

	新建虚拟电脑（<kbd>Ctrl</kbd>+<kbd>N</kbd>），一直下一步；选择新建的虚拟电脑，设置（<kbd>Ctrl</kbd>+<kbd>S</kbd>），存储->存储树->控制器->添加虚拟光驱（那个有个`+`号的光碟样图标），从你的电脑里选择一个系统安装盘镜像（ISO）文件添加。最后，最好配置一下，存储空间、内存、显存等等，否则可能会很卡的。

	要使用时，只需要打开VirtualBox，选择一个虚拟机打开就可以了。

## 参考链接
- [Getting Started with Vagrant on Windows](http://www.sitepoint.com/getting-started-vagrant-windows/)
- [how to download vagrant box manually?](http://laravel.io/forum/05-06-2015-how-to-download-vagrant-box-manually)