---
title: Build Site on GitHub Pages by jekyll under Linux
date: 2016-04-10 23:42:39
categories:
- Building Site
tags:
- Linux
- GitHub Pages
- jekyll
---
<!-- toc -->

## 前序安装
1. 安装ruby
2. 安装rubygems
3. 安装bundler
4. 安装和配置git
5. 安装nodejs

可以参考我的这篇文章[Install rvm, ruby, rails, nvm, nodejs and git under Ubuntu 14.04](/blog/2016/04/10/Install-rvm-ruby-rails-nvm-nodejs-and-git-under-Ubuntu-14-04/)

## 创建本地repo和分支
切换到用于存git repo的目录下，初始化一个用于jekyll搭建静态页面的repo
  ```
cd ./git
git init blog-by-jekyll # 本地创建并初始化一个repo
cd blog-by-jekyll # 切换到这个repo
git checkout -b gh-pages # 创建并切换到gh-pages分支，用于默认在github自动搭建页面
  ```

## 配置Gemfile
在这个repo下，使用`vim Gemfile`命令，创建一个叫做Gemfile的文件，注意无扩展名，输入一下内容
  ```
source 'https://ruby.taobao.org'
gem 'github-pages', group: :jekyll_plugins
  ```
  国内使用淘宝的源https://ruby.taobao.org比较快，故未使用https://rubygems.org。当然国内的用https://gems.ruby-china.org也是一个选择。

## 安装jekyll和其他依赖
  ```
bundle install
  ```
  安装完成后，会提示`Thank you for installing github-pages!`blablablabla~

## 生成jekyll静态页面的模版
  ```
bundle exec jekyll new . --force
  ```

## 开启静态站的本地http服务
用于在本地查看站点效果
  ```
bundle exec jekyll serve
  ```

## 在GitHub创建repo并上传内容
在GitHub的页面New repository，只需要给repo取名为本地git下的repo名同名，如：blog-by-jekyll，其他都不选，直接Create repository。回到终端，以此输入一下命令：
  ```
git remote add origin git@github.com:uolcano/blog-by-jekyll.git
git add .
git commit -m 'first blog by jekyll'
git push origin gh-pages
  ```
  由于在Linux下的git是通过生成ssh密钥来与GitHub账号关联的，所以需要用SSH来push。什么，你说SSH协议的git地址在哪拷贝？就在repo主页的HTTPS选项的旁边或者通过下拉菜单选择

## 将本地页面部署到GitHub
  ```
bundle update github-pages
  ```
  可以简写为`bundle update`

最后，通过 http://uolcano.github.io/blog-by-jekyll/ 就可以访问jekyll自动生成的页面了。


## 参考资料
[一步步在GitHub上创建博客主页-最新版](http://www.pchou.info/web-build/2014/07/04/build-github-blog-page-08.html)
[Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
[Configuring Jekyll](https://help.github.com/articles/configuring-jekyll/)