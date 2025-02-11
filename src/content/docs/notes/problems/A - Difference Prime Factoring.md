---
title: A - Difference Prime Factoring
editUrl: false
head:
  - tag: link
    attrs:
      rel: stylesheet
      href: https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css
---

実行時間制限: $2\,sec$

メモリ制限: $1024\,MB$

***

### **問題文**

長さ $N$ の正の整数列 $A=(A_{1}$, $A_{2}$, ..., $A_{N})$ が与えられます。$A_{i}$ $(1 \le i \le N)$ に対して、$A_{i}$ の素因数の総和に対して $S_{i}$ $(1 \le i \le N)$ という値を設定します。

あなたは、$S_{i}$ の最大値と最小値の差を求めて、出力してください。

ただし、$A$ の中に $1$ が含まれていたならば、$S_{i}$ ではなく、<span style="color: #f00; background-color: fee;">Impossible</span>と出力してください。

***

### **制約**

* $2 \le N \le 10^5$
* $1 \le A_{i} \le 10^5$
* 入力はすべて整数

***

### **入力**

入力は以下の形式で標準入力から与えられる。

$N$
$A_{1} \quad A_{2} \quad ... \quad A_{N}$

***

### **出力**

<span style="color: #f00; background-color: fee;">Impossible</span>もしくは題意を満たす解を$1$行で出力せよ。
