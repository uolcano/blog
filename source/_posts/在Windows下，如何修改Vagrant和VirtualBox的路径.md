---
title: 在Windows下，如何修改Vagrant和VirtualBox的路径
date: 2016-08-17 11:20:04
categories:
- Environment Configuration
tags:
- Vagrant
- VirtualBox
- PuTTY
---
由于Vagrant和VirtualBox实在太占空间了，用WinDirStat检测，单文件最占空间的是虚拟机文件，所以决定改下路径。有两个路径要修改，Vagrant的VAGRANT_HOME和VirtualBox的文件默认生成路径。我是直接全部重装，把程序也都换了路径了。

## 修改Vagrant BOX路径
设置单个**用户**的环境变量
```
setx VAGRANT_HOME "X:/your/path"
```

设置**系统**的环境变量
```
setx VAGRANT_HOME "X:/your/path" /M
```

或者可以从系统视图中找到：控制面板->所有控制面板项目->系统->高级系统设置->环境变量，上面是**用户**环境变量，下面是**系统**环境变量。

注意：还需要把`%userprofile%/.vagrant.d/`路径下的所有文件移动到前面环境变量设置的路径`X:/your/path`中。

## 修改虚拟机文件的默认生成路径
VirtualBox，管理->全局设定(Ctrl+G)，修改**默认虚拟电脑位置**

## PuTTY免密码
这里顺便把之前没完成的PuTTY的自动登录来完成了。当然先开Vagrant是免不了的。
注意：每次刚打开PAGEANT时，都需要PAGEANT->Add Key(如果设置了passphrase，还需要输入passphrase)。如果觉得麻烦还是skip吧。
1. 首先打开PuTTYGEN，点击Load，在
Vagrant安装目录的子目录`.vagrant\machines\default\virtualbox`找到private_key(注意要手动选择文件类型,`All Files(*.*)`)，打开。
2. 可以修改`Key comment`来作为这个Key的描述，键入`Key passphrase`和`Comfirm passphrase`作为这个Key文件的加密密钥(如果设置了passphrase，后面用PAGEANT时会需要用到，文件夹下的.chm文档是说建议用随机字符串作为这个密钥，但是一定要自己另外记下来)，然后点击`Save private key`，生成扩展名为`.ppk`的私钥，自己取名。公钥存不存都无所谓(暂时用不到)，因为这个生成的私钥里已经包含了，如有需要，直接在PuTTYGEN再`load->Save public key`就好了。
3. 打开PAGEANT，在任务栏图标上找到一个戴帽子的电脑的图标，右键->View Keys->Add Key，选择刚才生成的`.ppk`私钥文件
4. 以后要打开虚拟机，直接找到PAGEANT，右键->Saved Sessions，选择一个虚拟机。需要关闭PAGEANT，直接右键->Exit

这样一来，之后只要PAGEANT没`Exit`，登录虚拟机时就只需要输入用户名不需要输入密码了。

Vagrant自动生成的登录密钥文件通过命令行`vagrant ssh-config`输出的`IdentityFile`字段可以看到。

## 参考资料
- http://urouge.github.io/how-to-change-vagrant-box-directory-in-Windows/
- http://awezome.net/1995/