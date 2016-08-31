---
title: 在Windows下，利用chocolatey快速安装jekyll（无bundler）
date: 2016-04-10 23:58:07
categories:
- Building Site
tags:
- Windows
- GitHub Pages
- chocolatey
- jekyll
---
<!-- toc -->
## 安装步骤
1. 安装chocolatey。管理员权限的cmd下，执行如下命令：  
  ```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
  ```

2. 安装ruby。以管理员权限重启cmd，执行`choco install ruby -y`，自动安装ruby2.2.4。

3. 安装jekyll。管理员权限重启cmd，执行`gem install jekyll`。

至此，可以使用jekyll命令行：
```
jekyll new myblog
cd myblog
jekyll serve
```

最后，据GitHub Help的指南，通过以下命令可以在不安装bundler的情况下直接将本地页面部署到github上（**尚未测试可行性**）
```
gem update github-pages
```

## 参考资料
- [Easily install Jekyll on Windows with 2 command prompt entries and Chocolatey](https://davidburela.wordpress.com/2015/11/28/easily-install-jekyll-on-windows-with-3-command-prompt-entries-and-chocolatey/)
- [Keeping your site up to date with the GitHub Pages gem](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/#keeping-your-site-up-to-date-with-the-github-pages-gem)
