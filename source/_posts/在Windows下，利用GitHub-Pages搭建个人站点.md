---
title: 在Windows下，利用GitHub Pages搭建个人站点
date: 2016-04-10 23:52:04
categories:
- Building Site
tags:
- GitHub Pages
- Windows
---
<!-- toc -->
## 搭建项目的demo页面

1. 将项目的展示页面文件放在repo的根目录下，并且命名为`index.html`，必须的.html为扩展名。

2. 然后打开git shell，执行以下命令：
  ```
git checkout -b gh-pages
  ```
PS：这里创建了一个名叫gh-pages的分支，因为github pages默认是为这个分支的创建页面的

[√]done！自此即可通过 http://userName.github.io/repoName 访问你的项目demo页面了。


## 搭建个人博客

**你可以选择GitHub网页版傻瓜式地搭建，但是文字编辑和本地测试肯定没有本地的方便，所以一般都是通过jekyll(github官方推荐的，适合Mac和Linux，Windows下会很麻烦)或者hexo(比较容易搭建)来自动生成静态页面，而博客作者只需要编辑MarkDown文本，以及少数的几条命令行即可将自己的文章快速部署到GitHub Pages上去。**

### 利用jekyll搭建
#### 方法一：Windows下通过rubygems安装jekyll
**建议在对自己的网络状况有信心的情况下采用。我是顺利安装完rubygems后，bundle install出问题，后面的内容有参考其他指引性文章，只能转而用vagrant虚拟机装了ubuntu系统后配置的jekyll。觉得这个方法不靠谱的可以skip到方法三或者改用hexo**

1. 去 http://rubyinstaller.org/downloads/ 下载rubyinstaller.exe和DevKit,两个要对应版本，且对应操作系统

2. 执行rubyinstaller.exe，安装ruby

3. 将DevKit执行，并解到一个指定命名文件夹，如：RubyDevKit；管理员权限打开cmd执行`ruby dk.rb init`；执行`dk.rb install`

4. 去 https://rubygems.org/pages/download 下载RubyGems，解压缩出来的文件夹，如：rubygems；管理员权限重新打开cmd，执行`cd rubygems`，执行`ruby setup.rb`

5. 修改rubygems的源为淘宝源：
  `gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/`
  淘宝的源不行的话就用ruby-china的源 https://gems.ruby-china.org/

6. 如果出现证书失败，就去下载一个curl，放在一个目录下，cmd执行`curl http://curl.haxx.se/ca/cacert.pem -o cacert.pem`
  将下载的cacert.pem移到ruby的安装目录下的bin文件夹里，并且在环境变量中（应该是系统变量）新建SSL_CERT_FILE，值为移动后的cacert.pem的绝对路径

7. 安装bundler
  ```
gem install bundler
  ```

8. 在创建好的作为博客的repo下，新建一个文件，命名为Gemfile，里面的内容是：
  ```
source 'https://ruby.taobao.org'
gem 'github-pages', group: :jekyll_plugins
  ```
  国内使用淘宝的源 https://ruby.taobao.org 比较快，故未使用 https://rubygems.org 。当然国内的用 https://gems.ruby-china.org 也是一个选择。
  要注意，这里要保证在本地已经安装并登录了GitHub，可以直接下载[GitHub Desketop](https://desktop.github.com/)安装登陆即可。

9. 安装jekyll和相关依赖
  ```
bundle install
  ```
  安装完成后，会提示`Thank you for installing github-pages!`等

10. 将本地页面部署到github上去，执行`bundle update`或者`bundle update github-pages`
  
11. 在Ruby\lib\ruby\gems类似这样的目录下找到对应版本下的gems目录，找到jekyll目录的lib\site_template，这里有个_config.yml文件，用文本编辑器（建议用notepad++等，而不是系统自带的notedpad）打开，在# Build settings字段下添加：
  ```
markdown: kramdown
highlighter: rouge
  ```
  高亮需要安装**rouge**
  ```
gem install rouge
  ```
  另外，如果要以**pygments**作为高亮风格，还需要安装[python](http://www.python.org/download/)，以及[pip](https://bootstrap.pypa.io/get-pip.py)，转到get-pip.py的下载目录执行：
  ```
python get-pip.py
  ```
  安装pygments
  ```
python -m pip install Pygments
  ```
  然后在_config.yml文件中，设置为`highlighter: pygments`。
  
  jekyll的高亮使用语法如下：
  ```
{% highlight bash %}
$ gem install bundler
{% endhighlight %}
  ```

#### 方法二：Windows下通过chocolatey快速安装jekyll
- [在Windows下，利用chocolatey快速安装jekyll（无bundler）](/blog/2016/04/10/在Windows下，利用chocolatey快速安装jekyll（无bundler）/)
**注意**：要确保在本地已经安装并登录了GitHub。

#### 方法三：Windows下通过vagrant虚拟Linux系统安装jekyll
- [Install Linux Terminal using Vagrant under Windows](/blog/2016/04/10/Install-Linux-Terminal-using-Vagrant-under-Windows/)
- [Build Site on GitHub Pages by jekyll under Linux](/blog/2016/04/10/Build-Site-on-GitHub-Pages-by-jekyll-under-Linux/)

### 利用hexo搭建
- [在Windows下，利用hexo+GitHub Pages快速搭建个人站点](/blog/2016/04/10/在Windows下，利用hexo-GitHub-Pages快速搭建个人站点/)


## 参考资料
- [一步步在GitHub上创建博客主页-最新版](http://www.pchou.info/web-build/2014/07/04/build-github-blog-page-08.html)
- [Run Jekyll on Windows](http://jekyll-windows.juthilo.com/)
- [Setting up your GitHub Pages site locally with Jekyll
](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)