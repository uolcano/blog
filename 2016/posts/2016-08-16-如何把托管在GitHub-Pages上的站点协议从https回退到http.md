---
title: 如何把托管在GitHub-Pages上的站点协议从https回退到http
date: 2016-08-16
author: uolcano
categories:
- Site Building
tags:
- GitHub Pages
- HTTPS
---

自从今年6月开始，部署在GitHub Pages上的站点开始支持https协议[GitHub Blog](https://github.com/blog/2186-https-for-github-pages)，很多博主们都欢呼雀跃。但是当你需要建立http协议的网站时，该怎么办呢？

GitHub Pages一旦开启https，就无法关闭了的。所以到底有何方式去退回到http呢？

## 失败的尝试
我想到了，新建的仓库要建http协议的站，肯定是不行的。但是可以找以前的旧仓库，腾出来用啊。

1. 找到一个旧仓库，创建一个待删除的替换分支

```bash
cd hello_world
git checkout --orphan 'todelete'
```

2. 删除所有本地文件，add、commit然后push到远程仓库

```bash
git rm -r *
git add .
git commit -m 'to delete branch'
git push origin todelete
```

3. 在GitHub上，将`todelete`分支设置为默认分支，删除`master`分支（也可以不删除，或者创建一个分支备份原有的`master`分支的数据），将远程仓库的名称改成新项目的名称

4. 将本地新项目与改名后的远程仓库关联，push新建的`gh-pages`分支到远程仓库

```bash
cd ../new_repo
git remote remote set-url origin git@github.com:username/new_repo.git
git checkout -b 'gh-pages'
git push origin gh-pages
```

5. 在GitHub上，将`gh-pages`分支设置为默认分支，删除`todelete`分支

done，但是当我访问这个新建站点时，它的协议仍旧是https的。

## 另辟蹊径
从前面的尝试，我得到一个猜测：不仅是6月份之前的建仓库，还需要时6月前建立的`gh-pages`分支作为站点，才能仍然使用http协议。

所以，只能将新站的数据，搬到某个旧仓库中以前的创建好的`gh-pages`分支下

```bash
cd ../old_repo
copy ../new_repo/* ./ # Windows cmd
cp ../new_repo/* ./   # Linux bash
git add .
git commit -m 'add a new repo site data'
```

[√] That's done.