---
title: 利用GitHub-Pages建立项目或个人网站
date: 2016-09-01
author: uolcano
categories: 
- Site Building
tags:
- GitHub Pages
- jekyll
- hexo
---

关于GitHub Pages建站的文章我以前写过，不过，写的比较乱，今天整理了一下。

## 背景
为了更好地学习和记录自己的前端经历，搭建一个便捷、稳定的个人站点挺有必要的；而通过GitHub Pages来展示自己的作品，更是不错的选择。

**注意：**需要保证已经安装好git并且已经关联到git远程平台账户

## 搭建项目的展示页面
1. 打开git shell，创建一个名为`gh-pages`的分支，GitHub Pages默认为这个分支创建页面

	```bash
	git checkout --orphan gh-pages
	```

2. 将项目的展示页面文件放在项目仓库的`gh-pages`分支的根目录下，并且命名为`index.html`，必须以`html`为扩展名。

- [X] Done! 自此，即可通过`http://userName.github.io/repoName`访问你的项目demo页面了。

**补充：**
- 自2016年6月开始，部署在GitHub Pages上的站点开始支持https协议[GitHub Blog](https://github.com/blog/2186-https-for-github-pages)
- 自2016年8月开始，GitHub Pages开始支持master分支创建页面[GitHub Blog](https://github.com/blog/2228-simpler-github-pages-publishing)

## 搭建个人网站
因为GitHub Pages上托管的页面都是静态页面，所有有服务器响应需求的页面无法实现。但是可以通过插入第三方代码来实现，诸如评论、分享、代码示例等动态的木块。

GitHub Pages官方是推荐使用[jekyll](https://jekyllrb.com/)来部署个人网站的，而比较简单上手的则是[hexo](https://hexo.io)，各有其优点和缺点

| 对比   | jekyll                                                                 | hexo                                         |
| ------ | ---------------------------------------------------------------------- | -------------------------------------------- |
| 文档   | 只有英文                                                               | 多语言，有中文                               |
| 操作   | 需要手动push到GitHub                                                   |               文章模板，生成，部署，自动push |
| 自定义 | 结构清晰，较少的说明，也能理解某些功能的作用和文件位置，适合深入自定义 | 适合拿现有的模板直接用，但是新手自定义有难度 |
| 功能   | 插件多，功能完整，但略有bug                                            | 有更多更能待补充，比如post相对引用           |
| 安装   | 因为需要ruby，在大陆可能会有网络限制                                   | 需要node，大陆的网络环境似乎没问题           |

## 使用jekyll
1. 安装ruby
	在Windows下，从 http://rubyinstaller.org/downloads/ 下载`rubyinstaller.exe`和`DevKit ，两个要对应版本，且对应操作系统。
	执行rubyinstaller.exe，安装ruby。
	将DevKit执行，并解到一个指定命名文件夹，如：RubyDevKit
	管理员权限打开cmd/PowerShell

	```posh
	ruby dk.rb init
	dk.rb install
	```

	从 https://rubygems.org/pages/download/ 下载RubyGems，解压缩出来的文件夹，如：rubygems
	管理员权限打开cmd/PowerShell

	```posh
	cd rubygems
	ruby setup.rb
	```

	在Ubuntu下，安装ruby比较简单，可参考我的另一篇[文章](2016-04-10-在Ubuntu14.04下安装rvm，nvm，git等常见环境.md)
	```bash
	gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
	curl -L https://get.rvm.io | bash -s stable --autolibs=enabled --ruby
	sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
	source ~/.rvm/scripts/rvm
	```

2. 配置ruby
	由于国内网络受限，可能需要修改ruby的源为国内的镜像：淘宝镜像(https://ruby.taobao.org/)或者ruby中国镜像(https://gems.ruby-china.org/)。

	依次执行以下命令，在Ubuntu和Windows下都如此，以下如未特别说明，命令都是两平台均适用

	```posh
	gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
	gem sources -l
	```

	在Windows下，如果出现证书失败，就去下载一个证书

	```posh
	curl http://curl.haxx.se/ca/cacert.pem -o cacert.pem
	```

	将下载的`cacert.pem`移到ruby安装目录的`/bin`这个目录下，并且在系统环境变量中新建SSL_CERT_FILE，值为刚才的`/bin`目录的绝对路径，管理员权限打开cmd/PowerShell

	```posh
	SETX /M SSL_CERT_FILE "/bin目录的绝对路径"
	```

	[bundler](http://bundler.io/)是一款ruby工具，可以通过配置Gemfile文件来快速安装gems包或者解决已安装包的依赖。

	```posh
	gem install bundler
	```

	在Windows下，如果网络环境不允许，可以选择不安装bundler，或者安装虚拟机VirtualBox。如果连ruby安装都困难可以选择使用chocolatey来装jekyll。

3. 安装jekyll

	```posh
	gem install jekyll
	```

	创建一个名为Gemfile的文件，无扩展名，添加如下行

	```text
	source 'https://rubygems.org'
	gem 'github-pages', group: :jekyll-plugins
	```

	然后在需要的时候就可以执行以下命令

	```posh
	bundle install # 自动安装gems包和依赖
	bundle update  # 更新gems包依赖
	bundle exec jekyll build # 执行jekyll build，常用于解决一些jekyll的依赖等问题
	bundle exec jekyll serve # 执行jekyll serve，常用于解决一些jekyll的依赖等问题
	```

	常用jekyll命令
	```posh
	jekyll new <dir>               # 初始化一个站点目录
	jekyll build -s <dir> -d <dir> # 生成编译后的静态站点文件
	jekyll serve                   # 用于本地预览和调试，地址是127.0.0.1:4000
	```

4. 建立站点仓库
	有两种选择：一是自己从零开始一步一步建站，二是直接使用别人的模板

	1. 自己建站

		```posh
		jekyll new blog
		cd blog
		```

		修改Gemfile文件
		```text
		source 'https://ruby.taobao.org/' # 更改gem源可能要设置环境变量
		'jekyll', '3.2.1' # 注释掉这行
		gem 'github-pages', group: :jekyll_plugins # 去掉这行的注释井号#
		```

		安装插件和依赖

		```posh
		bundle install
		```

	2. 使用别人的模板
		克隆一个模板，[官方jekyll模板列表](https://github.com/jekyll/jekyll/wiki/Themes)

		```posh
		git clone git@github.com:someone/jekyll-theme.git # 克隆一个的模板
		```

		拷贝到自己的站点仓库目录，注意区分Windows和Ubuntu的命令

		```posh
		mkdir blog
		cp jekyll-theme/* blog # 这是Ubuntu的命令
		copy jekyll-theme/* blog # 这是Windows的命令
		```

		删除克隆的模板中的git记录

		```posh
		rm -rf blog/.git # Ubuntu
		rd /s blog/.git  # Windows
		```

		我是直接使用的现成模板，所以后面的内容都是以现成模板的修改来讲述

5. 初始化本地站点仓库

	```posh
	cd blog
	git init
	git remote add origin git@github.com:userName/blog.git # 与你的github blog仓库建立联系
	git checkout --orphan gh-pages
	```

6. 配置站点
	站点仓库的目录结构如下
	```text
	/blog
	  |-- _config.yml # 站点配置文件
	  |-- _layouts # 用户构成页面区域的模板，default或post一般是发布的文章的模板，page则是主页面的模板比如说边栏
	  |      |-- default.html
	  |      |-- post.html
	  |      \-- page.html
	  |-- _includes # 页面的小组件，比如分享、评论、访问统计等等
	  |      |-- share.html
	  |      \-- sidebar.html
	  |-- _posts # 你的markdown原文件存放的目录
	  |-- _site # jekyll build 默认生成已编译站点文件的目录
	  |-- _plugins # 使用的jekyll插件的存放目录
	  \-- index.html # 站点首页
	```

	**注意：**只要是按照各目录结构，这个站点仓库直接push到GitHub的仓库里，就可以建立起站点了，当然要设置作为GitHub Pages站点的分支（一般是gh-pages，不过现在可以是master分支，甚至是master分支下的docs目录了）。但是有时候需要把编译后的文件作为站点页面文件（比如你使用了jekyll插件来实现页面，而不是用JavaScript），这时候就需要把`blog`目录的源文件和编译后的站点文件（一般默认是`_site`）分开来push了。
	建议在`blog`目录下新增一个.gitignore文件，其中写入`_site`来忽略对这个目录的提交。将`blog`目录作为远程仓库的`source`分支，而`_site`目录作为远程仓库的`gh-pages`分支或者`master`分支

	```posh
	git checkout -b source
	git branch -D master # 删除分支
	git branch -D gh-pages # 删除分支
	cd _site # 切换到_site目录
	git init
	git remote add origin git@github.com:userName/blog.git # 与同意github blog仓库建立联系
	git checkout -b gh-pages
	```

	修改`_config.yml`文件，整个站点的配置主要是在这个文件中修改

	```yml
	name: '博客名'
	description: '博客简述'
	encoding: 'utf-8'
	url: 'http(s)://your.site.com'
	baseurl: '/your/project/path or blank'

	defaults:
	  -
	    scope:
	      path: ''
	      type: 'posts'
	    value:
	      layout: '在_layouts目录下的post.html或者default.html的文件名，不带扩展名'
	      author: '作者'
	      comments: true
	      share: true
	social:
	  github: 'github用户名'
	  codepen: 'codepen用户名'
	  rss: feed.xml
	disqus: '在disqus上设置的你的站点名或博客名'
	comments: true
	```

	创建/修改`_include`和`_layouts`目录下的文件，使用Liquid语法

	安装jekyll插件以及更多jekyll配置信息请阅读jekyll[官方文档](https://jekyllrb.com/docs/home/)

7. 撰写博文
	因为jekyll是使用kramdown来解析markdown，与常见markdown略有区别，建议参考kramdown的[官方语法](http://kramdown.gettalong.org/syntax.html)，如果需要更换其他markdown解析器需要在`_config.yml`文件中设置，并且安装插件

	博文源文件的命名，前时间后文章名：`2016-09-01-how-to-build-a-site-on-github-pages.md`

	博文结构主要是指头部，头部结构如下：
	```text
	layout: post # 默认是default，跟_layouts目录下的default.html文件对应，可以通过_config.yml的defaults字段配置默认设置
	author: 作者名 # 可以_config.yml默认配置
	title: 博文标题
	date: yyyy-mm-dd
	categories:
	- category1
	- category2
	tags:
	- tag1
	- tag2
	comments: true # 开启第三方评论模块，可以_config.yml默认配置
	share: true # 开启第三方分享模块，可以_config.yml默认配置
	```

	写好的markdown文件存储于`_posts`目录下即可。

8. 做好源文件的版本控制
	对站点源文件进行提交，以便进行版本控制，进入`blog`目录

	```posh
	git add --all
	git commit -m 'some revisions'
	git push origin source
	```

9. 部署站点
	生成编译后的静态站点文件，并且push到远程仓库

	```posh
	jekyll build
	cd _site
	git add --all
	git commit -m 'some descriptions'
	git push origin gh-pages
	```

10. 以后每次有新的文章发布，需要重复7~9步的操作。

## 使用hexo
1. 安装node
	在Windows下，从 https://nodejs.org/en/ 下载以.msi为扩展名的安装包，如果不需要进行node相关开发的话，选LTS版本就够用了。

	在Ubuntu下，可以利用nvm装node
	```bash
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash # 安装nvm
	nvm install node  # 安装最新版本node
	nvm ls            # 查看已安装的版本
	nvm use node      # 使用node
	```

2. 安装hexo
	```posh
	npm install -g hexo-cli
	npm install hexo-deployer-git --save # 安装部署站点的node功能包，hexo deploy命令需要
	```

3. 建立站点仓库
	```posh
	hexo init blog # 初始化一个站点目录
	cd blog
	npm install
	```

4. 配置站点
   一般hexo初始化后的站点目录结构如下
   ```text
   /blog
     |-- _config.yml # 站点配置文件
     |-- scaffolds   # 页面模板存放的目录
     |      |-- post.html # 博文模板
     |      |-- page.html # 分页模板
     |      \-- draft.html # 草稿模板
     |-- source         # 博文源文件目录
     |      |-- _posts  # 存放博文的目录
     |      \-- _drafts # 存放草稿的目录
     |-- themes      # 存放主题文件夹的目录
     |-- package.json
     |-- node_modules # 功能依赖包
     \-- .gitignore   # push的时候忽略node_modules文件夹等
   ```

	修改`_config.yml`文件，整个站点的配置主要是在这个文件中修改

	```yml
	title: 博客名
	description: 博客简述
	author: 作者名
	url: http(s)://your.site.com
	root: /your/project/path or /

	deploy:
	  type: git
	  repo: git@github.com:userName/blog.git
	  branch: gh-pages
	  message: [自定义的提交信息]
	```

5. 撰写博文
	每当需要撰写心得博文时，只需要执行以下命令，就可以得到一个标题和日期已经设置好的markdown文件

	```posh
	hexo new [layout] '博文标题' # layout是可选项，表示使用哪种模板来创建页面文件，默认是post
	```

	博文结构的头部

	```text
	title: 博文标题
	date: yyyy-mm-dd  # 日期是创建博文源文件时自动生成的
	categories:
	- category1
	- category2
	tags:
	- tag1
	- tag2
	comments: true
	```

5. 做好源文件的版本控制
	由于hexo是自动将站点文件自动部署到GitHub Pages上的，所以不需要自己另外push，但是建立生成站点页面的分支，还是有必要的。
	```posh
	git init
	git remote add origin git@github.com:userName/blog.git # 与你的github blog仓库建立联系
	git checkout --orphan source
	git push origin source
	```

6. 部署站点
	hexo的站点部署很简单

	```posh
	hexo g # 生成编译后的静态站点文件
	hexo d # 部署到远程仓库
	```

	或者可以结合起来，生成静态文件后直接部署，下面两条命令使用一条即可
	```posh
	hexo g -d # 生成后部署
	hexo d -g # 部署前生成
	```

7. 以后每次有新的文章发布，只需要如下操作

	```posh
	hexo new '博文标题'
	hexo g -d
	```

8. 常用hexo命令

	```posh
	hexo init <站点仓库的目录> # 初始化一个站点目录
	hexo clean # 用于主题切换等涉及站点整体布局效果改变的行为时，清楚hexo原有缓存
	hexo new '博文标题' # 新增一篇博文
	hexo generate # 可简写为 hexo g ，编译生成静态页面文件
	hexo server # 可简写为 hexo s ，开启本地服务器预览与测试编译生成的静态页面效果
	hexo delpoy # 可简写为 hexo d ，部署站点到远程仓库
	hexo generate -d # 可简写为 hexo g -d ，编译生成静态页面文件并部署到远程仓库
	hexo deploy -g # 可简写为 hexo d -g ，同上
	```

9. 修改主题
	从[hexo themes](https://hexo.io/themes/)找到何意的主题，clone下来，放到站点本地仓库的`themes`目录下，修改`_config.yml`文件的`theme`字段为对应的主题名
	```yml
	theme: light
	```

更多插件等功能，建议去[hexo 官网](https://hexo.io/)查看。

## 参考链接
- [Using Jekyll as a static site generator with GitHub Pages](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)
- [jekyllrb docs](https://jekyllrb.com/docs/home/)
- [Run Jekyll on Windows](http://jekyll-windows.juthilo.com/)
- [Setting up your GitHub Pages site locally with Jekyll
](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
- [Jekyll本地搭建开发环境以及Github部署流程](http://pizida.com/technology/2016/03/03/use-jekyll-create-blog-on-github/)
- [搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)
- [jekyll vs bundle exec jekyll](https://github.com/jekyll/jekyll-help/issues/225)
- [Why put the _site-directory of a Jekyll site in .gitignore?](http://stackoverflow.com/questions/31871433/why-put-the-site-directory-of-a-jekyll-site-in-gitignore)
- [hexo docs](https://hexo.io/docs/)
- [如何利用GitHub Pages和Hexo快速搭建个人博客](http://sunwhut.com/2015/10/30/buildBlog/)