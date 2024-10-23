---
title: Mercari2024
editUrl: false
head:
  - tag: link
    attrs:
      rel: stylesheet
      href: https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css
---

# A

$URL\:\to$ <https://mofecoder.com/contests/mercon2024/tasks/mercon2024_a>

\#愚直

```python
n,p = Integer().content
os, so = [], []
for i in range(n):
	c,s = String().content
	c = int(c)
	if s== "on_sale": os.append(c)
	else: so.append(c)
YesNo(max(so)<p and p<min(os))
```

#### 解法

on\_sale と sold\_out でそれぞれを分けて $max(sold\_out)\le n \le min(on\_sale)$ か否かで出力を分ける。

***

# B

$URL\:\to$ <https://mofecoder.com/contests/mercon2024/tasks/mercon2024_b>

\#貪欲法

```python
n = Integer().content
d,c = defaultdict(int), defaultdict(int)
for i in range(n):
	u,v,h = Integer().content
	d[v] = u if h>c[v]  else d[v]
	c[v] = max(c[v], h)
print(len(d))
for i in sorted(d.items()):
	print(*i)
```

#### 解法

1対1の関係が成立しているので、幸せ値が大きくなるように貪欲で可能。
現場では貪欲に気付くまでとても時間がかかった。

***

# C

$URL\:\to$ <https://mofecoder.com/contests/mercon2024/tasks/mercon2024_c>

\#数学

```python
w,h,t = Integer().content
x,y = Integer().content
W,H = (x+t)//w, (y+t)//h
print( (x+t)%w if W%2==0 else w-(x+t)%w, (y+t)%h if H%2==0 else h-(y+t)%h )
```

#### 解法

個人的にはこっちより $B$ の方が難しかった。
とりあえず壁を考えずに進めきったのちに、$x,\;y$ を $W,\;H$ でそれぞれの商と余を求める。商が偶数のとき、それぞれは正の方向に進んでおり、奇数のときは負の方向に進んでいるので、負の時は反射で帰ってきていることに気を付けながら出力する。
なんとなく気体の分子運動を思いうかべた。

***

# D

$URL\:\to$ <https://mofecoder.com/contests/mercon2024/tasks/mercon2024_d>

\#区間スケジューリング

```python
# 値の代入
n,m = Integer().content
times = [Integer().content for _ in range(n)]
wanna = [Integer().content for _ in range(m)]

ans = 0
query = []

# 0 -> 展示期間フラグ, 1 -> 希望購入時間フラグ
for x,y in times: query.append((x, 0, y))
for z in wanna: query.append((z, 1, z))

query.sort()
shoes = SortedList()

for a,b,c in query:
	# フラグが "0" のとき、展示終了時間をqueue
	if b==0: shoes.add(c)
	
	else:
		# フラグが "1" のとき、すでに展示終了しているものをdequeue
		while shoes and shoes[0]<(z:=a): shoes.pop(0)
		
		# 展示中の靴があるならば、購入(dequeue)して、ans++
		if shoes:
			shoes.pop(0)
			ans += 1

print(ans)
```

#### 解法

おそらく区間スケジューリング、の発展形と思われる。
コメントアウトで言いたいことは書いてしまった気がする。

***

# E

$URL\:\to$

#

```python
```

#### 解法

***
