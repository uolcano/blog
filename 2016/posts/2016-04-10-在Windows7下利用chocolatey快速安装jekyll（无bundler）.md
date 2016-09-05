---
title: 在Windows 7下利用chocolatey快速安装jekyll（无bundler）
date: 2016-04-10
author: uolcano
categories:
- Env Config
tags:
- Windows
- chocolatey
- jekyll
---

因为国内网络管制的问题，gem的源经常连不上，会出现各种问题，所以可以考虑使用这个方案。

## 安装
1. 安装chocolatey，以管理员权限开启cmd/PowerShell

	```posh
	@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
	```

2. 安装ruby，以管理员权限重启cmd/PowerShell

	```posh
	choco install ruby -y # 自动安装ruby2.2.4
	```

3. 安装jekyll，管理员权限重启cmd/PowerShell

	```posh
	gem install jekyll
	```

至此，可以使用jekyll命令行：

```posh
jekyll new myblog
cd myblog
jekyll build # 生成页面文件
jekyll serve # 本地预览
```

## 参考链接
- [Easily install Jekyll on Windows with 2 command prompt entries and Chocolatey](https://davidburela.wordpress.com/2015/11/28/easily-install-jekyll-on-windows-with-3-command-prompt-entries-and-chocolatey/)
- [Keeping your site up to date with the GitHub Pages gem](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/#keeping-your-site-up-to-date-with-the-github-pages-gem)
