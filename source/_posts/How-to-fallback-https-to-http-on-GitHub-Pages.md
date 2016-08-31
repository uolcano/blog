---
title: How to fallback HTTPS to HTTP on GitHub Pages
date: 2016-08-16 12:30:10
categories:
- Building Site
tags:
- GitHub Pages
---
After GitHub supports HTTPS in June, thousands of bloggers cheer. But what can I do, when I still need HTTP sometimes, specially when I cannot change the server API. Yes, I am.

So, how to fallback HTTPS to HTTP on GitHub Pages?

Obviously, I'd tried. 

## Try
1. find a old repo, create a new branch as a placeholder
```
cd hello_world
git checkout -b 'todelete'
```
2. delete all local files, add/commit then push data onto the remote repo
```
git add .
git commit -m 'to delete repo'
git push origin todelete
```
3. switch to the 'todelete' branch on GitHub, and delete 'master' branch on my GitHub repo, change the repo name from 'hello_world' to 'new_repo'
4. copy the repo URL, and add it to the remote origin of the new local repo
```
cd ../new_repo
git remote remove origin
git remote add origin https://github.com/uolcano/new_repo.git
git checkout -b 'gh-pages'
git push origin gh-pages
```
5. switch to gh-pages branch on GitHub, and delete the 'todelete' branch on GitHub
6. done, but when I access to the repo site, it still is a site with HTTPs.

Maybe the new created 'gh-pages' branch still works with HTTPS.

## Other way
Perhaps, I can use the created 'gh-pages' branch in the past.

So, that is simple. Find a old repo on GitHub and local, add the new repo files into the local directory of the old local repo.
```
cd ../old_repo
git add .
git commit -m 'add a new repo site'
git push origin gh-pages
```

[√] That's done.

## Conclusion
You can not fallback HTTPS to HTTP after HTTPS is enforced. But you can deploy the new site under a old GitHub Pages deployed before June 16 2016.
