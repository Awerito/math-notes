---
title: Differential Equations Exam Cheat Sheet
lang: en
---

<details>
<summary>

# 1. MODELING WITH ODEs

</summary>

## 1.1. Recipe

Every model in this section comes from one sentence:

$$
\boxed{\frac{d(\text{amount})}{dt}=\text{rate in}-\text{rate out}}
$$

1. Name the unknown with its units: $x(t)$ kg of salt, $P(t)$ individuals, $[A](t)$ mol/L.
2. Write each rate in units of amount per time.
3. Write the initial condition from the statement: $x(0)=x_0$.
4. Check the units of every term match.

The answer to a "plantear" question is the equation plus its initial condition, that is the IVP.

## 1.2. Mixing tanks

**When it appears:** brine or a pollutant enters a tank, mixes instantly, and leaves.

$$
\frac{dx}{dt}
=\underbrace{c_{in}\,r_{in}}_{\text{kg/L}\cdot\text{L/min}}
-\underbrace{\frac{x}{V(t)}\,r_{out}}_{\text{concentration}\cdot\text{L/min}}
$$

$$
V(t)=V_0+(r_{in}-r_{out})\,t
$$

If $r_{in}=r_{out}$ the volume stays at $V_0$ and the equation is linear with constant coefficients.

::: flow
**Worked example: one tank**

A 100 L tank holds 10 kg of salt. Brine with 0.5 kg/L enters at 4 L/min and the mixture leaves at 4 L/min

Rate in:

$$
\displaystyle 0.5\cdot4=2\ \text{kg/min}
$$

Rate out, the concentration $x/100$ times the flow:

$$
\displaystyle \frac{x}{100}\cdot4=0.04x\ \text{kg/min}
$$

**IVP**

$$
\displaystyle x'=2-0.04x,\qquad x(0)=10
$$

Linear, integrating factor $e^{0.04t}$, or Laplace.

::: sol
Solution

$$
x(t)=50-40e^{-0.04t}
$$

In the long run $x\to50$ kg, which is $0.5$ kg/L times 100 L
:::
:::

::: flow
**Worked example: two tanks in series**

Tanks A and B hold 100 L each. Pure water enters A at 2 L/min, A pours into B at 2 L/min, B drains at 2 L/min. A starts with 50 kg of salt, B with none

Tank A only loses salt:

$$
\displaystyle x_1'=-\frac{2}{100}x_1
$$

Tank B gains what A loses and drains its own:

$$
\displaystyle x_2'=\frac{2}{100}x_1-\frac{2}{100}x_2
$$

::: sol
IVP as a system

$$
\begin{cases}
x_1'=-0.02x_1\\
x_2'=0.02x_1-0.02x_2
\end{cases}
\qquad x_1(0)=50,\ x_2(0)=0
$$

Solved in the Laplace practice (exercise 16) and in Python (5.3)
:::
:::

## 1.3. Biology

| Model | Equation | Meaning |
|---|---|---|
| Exponential growth | $P'=kP$ | Growth proportional to the population, $P=P_0e^{kt}$ |
| Logistic | $P'=kP\left(1-\dfrac{P}{K}\right)$ | Growth that stops at the carrying capacity $K$ |
| Harvesting | $P'=kP\left(1-\dfrac{P}{K}\right)-h$ | Logistic minus a constant catch $h$ |
| Predator-prey | $\begin{cases}x'=ax-bxy\\y'=-cy+dxy\end{cases}$ | $x$ prey, $y$ predators, $xy$ counts encounters |
| Drug, two compartments | $\begin{cases}g'=-k_1g\\b'=k_1g-k_2b\end{cases}$ | $g$ in the gut, $b$ in the blood |
| SIR epidemic | $\begin{cases}S'=-\beta SI\\I'=\beta SI-\gamma I\\R'=\gamma I\end{cases}$ | Susceptible, infected, recovered |

Logistic solution, worth memorizing:

$$
P(t)=\frac{K}{1+\left(\dfrac{K-P_0}{P_0}\right)e^{-kt}}
$$

::: flow
**Worked example: logistic**

A lake supports at most 1000 fish. There are 100 today and with no limit they would grow 10% per day

Growth rate and capacity:

$$
\displaystyle k=0.1,\qquad K=1000
$$

::: sol
IVP

$$
P'=0.1P\left(1-\frac{P}{1000}\right),\qquad P(0)=100
$$
:::
:::

## 1.4. Chemistry

| Process | Equation |
|---|---|
| First-order reaction, radioactive decay | $[A]'=-k[A]$, with $k=\dfrac{\ln2}{T_{1/2}}$ |
| Second-order $A+B\to C$ | $x'=k(a-x)(b-x)$, $x$ = product formed, $a,b$ initial amounts |
| Consecutive $A\to B\to C$ | $\begin{cases}A'=-k_1A\\B'=k_1A-k_2B\\C'=k_2B\end{cases}$ |
| Newton cooling | $T'=-k(T-T_m)$ |

::: flow
**Worked example: consecutive reactions**

$A$ turns into $B$ with $k_1=0.3$ per hour, and $B$ into $C$ with $k_2=0.1$ per hour. Initially there is 2 mol/L of $A$ and nothing else

Each substance gains what the previous one loses:

$$
\displaystyle A'=-0.3A,\quad B'=0.3A-0.1B,\quad C'=0.1B
$$

::: sol
IVP

$$
A(0)=2,\quad B(0)=0,\quad C(0)=0
$$

$A+B+C=2$ at all times, a quick check of the setup
:::
:::


## 1.5. Practice

Only the setup is asked: the equation and its initial condition. The help shrinks level by level.

**Level 1: guided, one equation**

1. A 200 L tank holds 20 kg of salt. Brine with 0.25 kg/L enters at 5 L/min and the mixture leaves at 5 L/min.
    - Rate in: concentration times flow, $0.25\cdot5$.
    - Rate out: the tank's concentration $x/200$ times the flow.
2. A radioactive sample of 50 g has a half-life of 10 years.
    - First-order decay $m'=-km$ with $k=\dfrac{\ln2}{T_{1/2}}$.
3. A colony of 500 bacteria grows proportionally to its size and doubles every 3 hours.
    - Exponential growth $P'=kP$, and doubling time works like half-life: $k=\dfrac{\ln2}{3}$.

<details>
<summary>Answers, level 1</summary>

1. $x'=1.25-\dfrac{x}{40},\quad x(0)=20$
2. $m'=-\dfrac{\ln2}{10}m,\quad m(0)=50$
3. $P'=\dfrac{\ln2}{3}P,\quad P(0)=500$

</details>

**Level 2: one hint each**

4. A 100 L tank of pure water receives brine with 0.1 kg/L at 3 L/min, and the mixture leaves at 2 L/min.
    - The volume is not constant: $V(t)=100+t$.
5. A lake supports 2000 fish, today there are 200, without limits they would grow 20% per month, and 50 fish are caught per month.
    - Logistic minus a constant catch.
6. A coffee at 90 °C is left in a room at 20 °C, with cooling constant $0.1$ per minute.
    - Newton cooling.

<details>
<summary>Answers, level 2</summary>

4. $x'=0.3-\dfrac{2x}{100+t},\quad x(0)=0$
5. $P'=0.2P\left(1-\dfrac{P}{2000}\right)-50,\quad P(0)=200$
6. $T'=-0.1(T-20),\quad T(0)=90$

</details>

**Level 3: one word, systems**

7. Tanks A and B of 50 L each, pure water enters A at 5 L/min, A pours into B at 5 L/min, B drains at 5 L/min, A starts with 10 kg and B with none (series)
8. A 100 mg dose goes to the gut, passes to the blood at rate $0.5$ per hour and is eliminated from the blood at $0.2$ per hour (compartments)
9. Reaction $A\to B\to C$ with $k_1=2$, $k_2=1$ and $[A](0)=1$ mol/L (chain)

<details>
<summary>Answers, level 3</summary>

7. $x_1'=-0.1x_1,\quad x_2'=0.1x_1-0.1x_2,\quad x_1(0)=10,\ x_2(0)=0$
8. $g'=-0.5g,\quad b'=0.5g-0.2b,\quad g(0)=100,\ b(0)=0$
9. $A'=-2A,\quad B'=2A-B,\quad C'=B,\quad A(0)=1,\ B(0)=C(0)=0$

</details>

**Level 4: no help**

10. Tanks A and B of 100 L each. Pure water enters A at 4 L/min, A pumps into B at 6 L/min, B pumps back into A at 2 L/min and B drains at 4 L/min. A starts with 20 kg, B with none
11. A town of 1000 people has 1 infected, with contact rate $\beta=0.0005$ and recovery rate $\gamma=0.1$ per day
12. Alone, rabbits grow 8% per month and foxes die 5% per month. Encounters remove $0.001xy$ rabbits and add $0.0002xy$ foxes. There are 1000 rabbits and 50 foxes

<details>
<summary>Answers, level 4</summary>

10. $x_1'=-0.06x_1+0.02x_2,\quad x_2'=0.06x_1-0.06x_2,\quad x_1(0)=20,\ x_2(0)=0$

    Check the volumes: A receives $4+2$ and loses $6$, B receives $6$ and loses $2+4$.
11. $S'=-0.0005SI,\quad I'=0.0005SI-0.1I,\quad R'=0.1I,\quad S(0)=999,\ I(0)=1,\ R(0)=0$
12. $x'=0.08x-0.001xy,\quad y'=-0.05y+0.0002xy,\quad x(0)=1000,\ y(0)=50$

</details>

</details>

---

<details>
<summary>

# 2. LAPLACE TRANSFORM

</summary>

## 2.1. Definition

$$
\boxed{
\mathcal L\{f(t)\}
=
\int_0^\infty e^{-st}f(t)dt
}
$$

The transform turns a function of time into a function of the variable $s$.

## 2.2. Table of common transforms

| Function | Transform |
|---|---|
| $1$ | $\dfrac{1}{s}$ |
| $t$ | $\dfrac{1}{s^2}$ |
| $t^n$ | $\dfrac{n!}{s^{n+1}}$ |
| $e^{at}$ | $\dfrac{1}{s-a}$ |
| $\sin(at)$ | $\dfrac{a}{s^2+a^2}$ |
| $\cos(at)$ | $\dfrac{s}{s^2+a^2}$ |
| $\sinh(at)$ | $\dfrac{a}{s^2-a^2}$ |
| $\cosh(at)$ | $\dfrac{s}{s^2-a^2}$ |
| $t^ne^{at}$ | $\dfrac{n!}{(s-a)^{n+1}}$ |
| $e^{at}\sin(bt)$ | $\dfrac{b}{(s-a)^2+b^2}$ |
| $e^{at}\cos(bt)$ | $\dfrac{s-a}{(s-a)^2+b^2}$ |
| $t\sin(at)$ | $\dfrac{2as}{(s^2+a^2)^2}$ |
| $t\cos(at)$ | $\dfrac{s^2-a^2}{(s^2+a^2)^2}$ |
| $u(t-a)$ | $\dfrac{e^{-as}}{s}$ |
| $\delta(t)$ | $1$ |
| $\delta(t-a)$ | $e^{-as}$ |

Here $u(t-a)$ is the unit step function and $\delta$ is the Dirac delta, with $a\geq0$.

## 2.3. Important properties

Linearity:

$$
\mathcal L\{af+bg\}
=a\mathcal L\{f\}+b\mathcal L\{g\}
$$

First derivative:

$$
\mathcal L\{f'\}=sF(s)-f(0)
$$

Second derivative:

$$
\mathcal L\{f''\}
=s^2F(s)-sf(0)-f'(0)
$$

Derivative of order $n$:

$$
\mathcal L\{f^{(n)}\}
=
s^nF(s)-s^{n-1}f(0)-\cdots-f^{(n-1)}(0)
$$

Exponential shift:

$$
\mathcal L\{e^{at}f(t)\}=F(s-a)
$$

Multiplication by $t$:

$$
\mathcal L\{tf(t)\}=-F'(s)
$$

Multiplication by $t^n$:

$$
\mathcal L\{t^nf(t)\}=(-1)^nF^{(n)}(s)
$$

Division by $t$:

$$
\mathcal L\left\{\frac{f(t)}{t}\right\}
=\int_s^\infty F(\sigma)d\sigma
$$

Integral:

$$
\mathcal L\left\{\int_0^t f(\tau)d\tau\right\}
=\frac{F(s)}{s}
$$

Time shift, with $a\geq0$:

$$
\mathcal L\{f(t-a)u(t-a)\}=e^{-as}F(s)
$$

$$
\mathcal L\{g(t)u(t-a)\}=e^{-as}\mathcal L\{g(t+a)\}
$$

Scaling, with $c>0$:

$$
\mathcal L\{f(ct)\}=\frac{1}{c}F\left(\frac{s}{c}\right)
$$

Convolution:

$$
(f*g)(t)=\int_0^t f(\tau)g(t-\tau)d\tau
$$

$$
\mathcal L\{f*g\}=F(s)G(s)
$$

Periodic function of period $T$:

$$
\mathcal L\{f(t)\}
=\frac{1}{1-e^{-sT}}\int_0^T e^{-st}f(t)dt
$$

## 2.4. Solving differential equations with Laplace

::: flow
**Original equation**

$$
\displaystyle y''+ay'+by=g(t)
$$

Apply Laplace to both sides:

$$
\displaystyle
\mathcal L\{y''\}
+a\mathcal L\{y'\}
+b\mathcal L\{y\}
=\mathcal L\{g(t)\}
$$

Replace the transforms of the derivatives:

$$
\displaystyle
(s^2Y-sy(0)-y'(0))
+a(sY-y(0))+bY=G(s)
$$

Group the terms that contain $Y(s)$.

**Solve for the transform**

$$
\displaystyle
Y(s)=
\frac{
G(s)+sy(0)+y'(0)+ay(0)
}{
s^2+as+b
}
$$

**Decompose into partial fractions**, when applicable.

Apply the inverse transform.

::: sol
General solution

$$
y(t)=\mathcal L^{-1}\{Y(s)\}
$$
:::
:::

The advantage is that the initial conditions appear directly in the algebraic equation.

## 2.5. Table of inverse transforms

| $F(s)$ | $f(t)$ |
|---|---|
| $\dfrac{1}{s}$ | $1$ |
| $\dfrac{1}{s^n}$ | $\dfrac{t^{n-1}}{(n-1)!}$ |
| $\dfrac{1}{s-a}$ | $e^{at}$ |
| $\dfrac{1}{(s-a)^n}$ | $\dfrac{t^{n-1}e^{at}}{(n-1)!}$ |
| $\dfrac{1}{(s-a)(s-b)}$ | $\dfrac{e^{at}-e^{bt}}{a-b}$ |
| $\dfrac{1}{s^2+a^2}$ | $\dfrac{\sin(at)}{a}$ |
| $\dfrac{s}{s^2+a^2}$ | $\cos(at)$ |
| $\dfrac{1}{s^2-a^2}$ | $\dfrac{\sinh(at)}{a}$ |
| $\dfrac{s}{s^2-a^2}$ | $\cosh(at)$ |
| $\dfrac{1}{(s-a)^2+b^2}$ | $\dfrac{e^{at}\sin(bt)}{b}$ |
| $\dfrac{s-a}{(s-a)^2+b^2}$ | $e^{at}\cos(bt)$ |
| $\dfrac{1}{(s^2+a^2)^2}$ | $\dfrac{\sin(at)-at\cos(at)}{2a^3}$ |
| $\dfrac{s}{(s^2+a^2)^2}$ | $\dfrac{t\sin(at)}{2a}$ |
| $e^{-as}F(s)$ | $f(t-a)u(t-a)$ |
| $F(s)G(s)$ | $(f*g)(t)$ |

For an irreducible quadratic denominator, complete the square to reach the forms with $(s-a)^2+b^2$:

$$
s^2+ps+q=\left(s+\frac{p}{2}\right)^2+q-\frac{p^2}{4}
$$

## 2.6. Partial fraction expansions

The table of inverses only has simple fractions, so a fraction with a factored denominator has to be split into a sum of simple ones first. Splitting is the reverse of adding fractions: find which simple fractions add up to the original.

**Which numerator each factor gets**

The denominator decides the shape, never the numerator. Each factor of the denominator gets a numerator one degree lower than itself:

| Factor in the denominator | Term in the expansion |
|---|---|
| $s-a$ | $\dfrac{A}{s-a}$ |
| $(s-a)^2$ | $\dfrac{A}{s-a}+\dfrac{B}{(s-a)^2}$ |
| $s^2+bs+c$ with no real roots | $\dfrac{As+B}{s^2+bs+c}$ |

A quadratic has no real roots when $b^2-4c<0$. Otherwise factor it into linear factors and give each one a constant.

The degree of the numerator of $F(s)$ must be lower than the degree of its denominator. If it is not, do polynomial division first.

**Distinct linear factors**

::: flow
**Worked example**

$$
\displaystyle F(s)=\frac{s}{(s+3)(s-1)}
$$

Both factors are linear, so each one gets a constant on top, even though the numerator has an $s$:

$$
\displaystyle \frac{s}{(s+3)(s-1)}=\frac{A}{s+3}+\frac{B}{s-1}
$$

Multiply both sides by $(s+3)(s-1)$ to clear the denominators:

$$
\displaystyle s=A(s-1)+B(s+3)
$$

This equality holds for every $s$, so pick the values that turn one parenthesis into zero.

Substitute $s=1$, the root that cancels the term with $A$:

$$
\displaystyle 1=4B,\qquad B=\frac{1}{4}
$$

Substitute $s=-3$, the root that cancels the term with $B$:

$$
\displaystyle -3=-4A,\qquad A=\frac{3}{4}
$$

**Expansion**

$$
\displaystyle \frac{s}{(s+3)(s-1)}=\frac{3/4}{s+3}+\frac{1/4}{s-1}
$$

Invert each term with $\dfrac{1}{s-a}\to e^{at}$.

::: sol
Inverse transform

$$
f(t)=\frac{3}{4}e^{-3t}+\frac{1}{4}e^{t}
$$
:::
:::

**Repeated linear factor**

A factor $(s-a)^2$ needs one term for each power, because adding $\dfrac{A}{s-a}$ and $\dfrac{B}{(s-a)^2}$ gives back that same denominator.

::: flow
**Worked example**

$$
\displaystyle F(s)=\frac{s+1}{(s-2)^2}
$$

One term for each power of the repeated factor:

$$
\displaystyle \frac{s+1}{(s-2)^2}=\frac{A}{s-2}+\frac{B}{(s-2)^2}
$$

Multiply both sides by $(s-2)^2$:

$$
\displaystyle s+1=A(s-2)+B
$$

Substitute $s=2$, the only root:

$$
\displaystyle 3=B
$$

There are no more roots to substitute, so compare the coefficients of $s$ on both sides:

$$
\displaystyle 1=A
$$

**Expansion**

$$
\displaystyle \frac{s+1}{(s-2)^2}=\frac{1}{s-2}+\frac{3}{(s-2)^2}
$$

Invert with $\dfrac{1}{s-a}\to e^{at}$ and $\dfrac{1}{(s-a)^2}\to te^{at}$.

::: sol
Inverse transform

$$
f(t)=e^{2t}+3te^{2t}
$$
:::
:::

**Quadratic factor with no real roots**

::: flow
**Worked example**

$$
\displaystyle F(s)=\frac{1}{(s-1)(s^2+4)}
$$

$s^2+4$ has no real roots, so it gets $Bs+C$ on top, even though the numerator is just $1$:

$$
\displaystyle \frac{1}{(s-1)(s^2+4)}=\frac{A}{s-1}+\frac{Bs+C}{s^2+4}
$$

Multiply both sides by $(s-1)(s^2+4)$:

$$
\displaystyle 1=A(s^2+4)+(Bs+C)(s-1)
$$

Substitute $s=1$, the only real root:

$$
\displaystyle 1=5A,\qquad A=\frac{1}{5}
$$

Expand the right side and compare the coefficients of $s^2$:

$$
\displaystyle 0=A+B,\qquad B=-\frac{1}{5}
$$

Compare the constant terms:

$$
\displaystyle 1=4A-C,\qquad C=-\frac{1}{5}
$$

**Expansion**

$$
\displaystyle \frac{1}{(s-1)(s^2+4)}
=\frac{1/5}{s-1}-\frac{1}{5}\cdot\frac{s+1}{s^2+4}
$$

Split the quadratic term so each piece matches the table, $\dfrac{s}{s^2+a^2}\to\cos(at)$ and $\dfrac{a}{s^2+a^2}\to\sin(at)$ with $a=2$:

$$
\displaystyle \frac{s+1}{s^2+4}
=\frac{s}{s^2+4}+\frac{1}{2}\cdot\frac{2}{s^2+4}
$$

::: sol
Inverse transform

$$
f(t)=\frac{1}{5}e^{t}-\frac{1}{5}\cos(2t)-\frac{1}{10}\sin(2t)
$$
:::
:::


## 2.7. Practice

The help shrinks level by level. Try each exercise before opening the answers.

**Level 1: guided, tables only**

1. $\mathcal L\{3-2e^{4t}+\sin(2t)\}$
    - Linearity: transform each term separately with the table.
2. $\mathcal L\{t^2e^{-t}\}$
    - Row $t^ne^{at}$ with $n=2$, $a=-1$.
3. $\mathcal L^{-1}\left\{\dfrac{2s+3}{s^2+9}\right\}$
    - Split into $2\cdot\dfrac{s}{s^2+9}+\dfrac{3}{s^2+9}$, cosine and sine with $a=3$.
4. $\mathcal L^{-1}\left\{\dfrac{1}{s^2+4s+13}\right\}$
    - No real roots: complete the square, $s^2+4s+13=(s+2)^2+9$.

<details>
<summary>Answers, level 1</summary>

1. $\dfrac{3}{s}-\dfrac{2}{s-4}+\dfrac{2}{s^2+4}$
2. $\dfrac{2}{(s+1)^3}$
3. $2\cos(3t)+\sin(3t)$
4. $\dfrac{1}{3}e^{-2t}\sin(3t)$

</details>

**Level 2: one hint each, first-order IVPs**

5. $y'-2y=0,\quad y(0)=3$
    - $Y$ comes out as a single fraction of the table.
6. $y'+3y=e^{-t},\quad y(0)=0$
    - Partial fractions with the roots $s=-1$ and $s=-3$.
7. $y'+y=2,\quad y(0)=1$
    - The constant $2$ transforms to $\dfrac{2}{s}$.
8. $x'=2-0.04x,\quad x(0)=10$, the tank of 1.2
    - Same as exercise 7, with roots $s=0$ and $s=-0.04$.

<details>
<summary>Answers, level 2</summary>

5. $y=3e^{2t}$
6. $y=\dfrac{1}{2}\left(e^{-t}-e^{-3t}\right)$
7. $y=2-e^{-t}$
8. $x=50-40e^{-0.04t}$

</details>

**Level 3: one word, second order**

9. $y''+4y=0,\quad y(0)=1,\ y'(0)=2$ (table)
10. $y''-y'-2y=0,\quad y(0)=1,\ y'(0)=0$ (distinct roots)
11. $y''+2y'+y=0,\quad y(0)=1,\ y'(0)=0$ (repeated root)
12. $y''+2y'+5y=0,\quad y(0)=1,\ y'(0)=0$ (complete the square)

<details>
<summary>Answers, level 3</summary>

9. $y=\cos(2t)+\sin(2t)$
10. $y=\dfrac{1}{3}e^{2t}+\dfrac{2}{3}e^{-t}$
11. $y=e^{-t}+te^{-t}$
12. $y=e^{-t}\cos(2t)+\dfrac{1}{2}e^{-t}\sin(2t)$

</details>

**Level 4: no help**

13. $y''-3y'+2y=e^{3t},\quad y(0)=1,\ y'(0)=0$
14. $y'+y=u(t-2),\quad y(0)=0$
15. $y''+4y=\delta(t-1),\quad y(0)=0,\ y'(0)=0$
16. $x_1'=-0.02x_1,\quad x_2'=0.02x_1-0.02x_2,\quad x_1(0)=50,\ x_2(0)=0$, the two tanks of 1.2
17. $x'=y,\quad y'=-x,\quad x(0)=1,\ y(0)=0$

<details>
<summary>Answers, level 4</summary>

13. $y=\dfrac{5}{2}e^{t}-2e^{2t}+\dfrac{1}{2}e^{3t}$
14. $y=\left(1-e^{-(t-2)}\right)u(t-2)$
15. $y=\dfrac{1}{2}\sin\big(2(t-1)\big)\,u(t-1)$
16. $x_1=50e^{-0.02t},\quad x_2=te^{-0.02t}$, tank B peaks at $t=50$ min
17. $x=\cos t,\quad y=-\sin t$

For systems, transform every equation, solve the algebraic system for $X$ and $Y$, then invert each one.

</details>

</details>

---

<details>
<summary>

# 3. FOURIER TRANSFORM

</summary>

## 3.1. Definition

$$
\boxed{
\mathcal F\{f(t)\}=F(\omega)
=
\int_{-\infty}^{\infty} f(t)e^{-i\omega t}dt
}
$$

The transform turns a function of time into a function of the frequency $\omega$: $F(\omega)$ says how much of the oscillation $e^{i\omega t}$ is inside $f(t)$.

It is the same idea as Laplace with two changes: the exponent is $-i\omega t$ instead of $-st$, and the integral covers all time instead of starting at $0$.

Inverse transform:

$$
\boxed{
f(t)=\frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)e^{i\omega t}d\omega
}
$$

Euler's formula is the tool that turns complex exponentials into sines and cosines:

$$
e^{i\theta}=\cos\theta+i\sin\theta
$$

$$
\cos\theta=\frac{e^{i\theta}+e^{-i\theta}}{2},
\qquad
\sin\theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}
$$

## 3.2. Table of common transforms

| Function | Transform |
|---|---|
| $e^{-at}u(t)$ | $\dfrac{1}{a+i\omega}$ |
| $te^{-at}u(t)$ | $\dfrac{1}{(a+i\omega)^2}$ |
| $e^{-a\lvert t\rvert}$ | $\dfrac{2a}{a^2+\omega^2}$ |
| $e^{-at^2}$ | $\sqrt{\dfrac{\pi}{a}}\,e^{-\omega^2/(4a)}$ |
| $\dfrac{1}{a^2+t^2}$ | $\dfrac{\pi}{a}e^{-a\lvert\omega\rvert}$ |
| $1$ for $\lvert t\rvert<a$, $0$ otherwise | $\dfrac{2\sin(a\omega)}{\omega}$ |
| $\delta(t)$ | $1$ |
| $\delta(t-a)$ | $e^{-ia\omega}$ |
| $1$ | $2\pi\delta(\omega)$ |
| $e^{iat}$ | $2\pi\delta(\omega-a)$ |
| $\cos(at)$ | $\pi[\delta(\omega-a)+\delta(\omega+a)]$ |
| $\sin(at)$ | $\dfrac{\pi}{i}[\delta(\omega-a)-\delta(\omega+a)]$ |
| $u(t)$ | $\pi\delta(\omega)+\dfrac{1}{i\omega}$ |

Here $u(t)$ is the unit step function and $\delta$ is the Dirac delta. The first six rows need $a>0$.

How to read the table: what is short in time is wide in frequency, and the other way around. An instant impulse $\delta(t)$ contains every frequency equally, while a pure oscillation $\cos(at)$ contains only the frequencies $\pm a$.

## 3.3. Important properties

$F(\omega)$ and $G(\omega)$ are the transforms of $f(t)$ and $g(t)$.

Linearity:

$$
\mathcal F\{af+bg\}=aF(\omega)+bG(\omega)
$$

Time shift, a delay only multiplies by a complex exponential:

$$
\mathcal F\{f(t-a)\}=e^{-ia\omega}F(\omega)
$$

Frequency shift, multiplying by an oscillation moves the transform:

$$
\mathcal F\{e^{iat}f(t)\}=F(\omega-a)
$$

Scaling, compressing in time stretches in frequency:

$$
\mathcal F\{f(at)\}=\frac{1}{\lvert a\rvert}F\left(\frac{\omega}{a}\right)
$$

Derivative, each derivative becomes a multiplication by $i\omega$:

$$
\mathcal F\{f'\}=i\omega F(\omega)
$$

$$
\mathcal F\{f^{(n)}\}=(i\omega)^nF(\omega)
$$

Unlike Laplace, no initial conditions appear.

Multiplication by $t$:

$$
\mathcal F\{tf(t)\}=iF'(\omega)
$$

Convolution, it becomes a plain product:

$$
(f*g)(t)=\int_{-\infty}^{\infty}f(\tau)g(t-\tau)d\tau
$$

$$
\mathcal F\{f*g\}=F(\omega)G(\omega)
$$

Symmetry, every row of the table can be read backwards:

$$
\mathcal F\{F(t)\}=2\pi f(-\omega)
$$

## 3.4. Computing a transform from the definition

::: flow
**Worked example: decaying exponential**

$$
\displaystyle f(t)=e^{-2t}u(t)
$$

$u(t)$ is zero for negative $t$, so the integral starts at $0$:

$$
\displaystyle F(\omega)=\int_0^\infty e^{-2t}e^{-i\omega t}dt
$$

Join the exponentials:

$$
\displaystyle F(\omega)=\int_0^\infty e^{-(2+i\omega)t}dt
$$

Integrate like any exponential, treating $2+i\omega$ as a constant:

$$
\displaystyle F(\omega)=\left[-\frac{e^{-(2+i\omega)t}}{2+i\omega}\right]_0^\infty
$$

At infinity the exponential vanishes because of the $e^{-2t}$, and at $0$ it equals $1$.

::: sol
Transform

$$
F(\omega)=\frac{1}{2+i\omega}
$$
:::
:::

::: flow
**Worked example: rectangular pulse**

$$
\displaystyle f(t)=1\ \text{for}\ \lvert t\rvert<1,\qquad f(t)=0\ \text{otherwise}
$$

The function is zero outside the pulse, so integrate only from $-1$ to $1$:

$$
\displaystyle F(\omega)=\int_{-1}^{1}e^{-i\omega t}dt
$$

Integrate the exponential:

$$
\displaystyle F(\omega)=\left[\frac{e^{-i\omega t}}{-i\omega}\right]_{-1}^{1}
=\frac{e^{i\omega}-e^{-i\omega}}{i\omega}
$$

Use Euler: $e^{i\omega}-e^{-i\omega}=2i\sin\omega$.

::: sol
Transform

$$
F(\omega)=\frac{2\sin\omega}{\omega}
$$
:::
:::

## 3.5. Solving differential equations with Fourier

The steps are the same as with Laplace: transform, solve the algebra, go back with the table.

::: flow
**Worked example**

$$
\displaystyle y'+3y=e^{-2t}u(t)
$$

Apply Fourier to both sides, with $y'\to i\omega Y$ and the right side from the table:

$$
\displaystyle i\omega Y+3Y=\frac{1}{2+i\omega}
$$

**Solve for the transform**

$$
\displaystyle Y(\omega)=\frac{1}{(2+i\omega)(3+i\omega)}
$$

Expand in partial fractions, treating $i\omega$ as a single variable like $s$:

$$
\displaystyle Y(\omega)=\frac{1}{2+i\omega}-\frac{1}{3+i\omega}
$$

Invert each term with $\dfrac{1}{a+i\omega}\to e^{-at}u(t)$.

::: sol
Solution

$$
y(t)=\left(e^{-2t}-e^{-3t}\right)u(t)
$$
:::
:::

Fourier has no place for initial conditions: it gives the solution that is zero before the input starts. For problems with initial conditions use Laplace.

## 3.6. Practice

The help shrinks level by level. Try each exercise before opening the answers.

**Level 1: guided, from the definition**

The setup is given, only the integral is left to you.

1. $f(t)=e^{-3t}u(t)$
    - $u(t)$ is zero for negative $t$, so $F(\omega)=\int_0^\infty e^{-3t}e^{-i\omega t}dt$.
    - Join the exponentials into $e^{-(3+i\omega)t}$.
    - Integrate. At infinity the exponential vanishes, at $0$ it equals $1$.
2. $f(t)=e^{2t}u(-t)$
    - $u(-t)$ is zero for positive $t$, so $F(\omega)=\int_{-\infty}^0 e^{2t}e^{-i\omega t}dt$.
    - Join the exponentials into $e^{(2-i\omega)t}$.
    - Integrate. At $-\infty$ the exponential vanishes, at $0$ it equals $1$.
3. $f(t)=1$ for $0<t<2$, $0$ otherwise
    - The function is zero outside the pulse, so $F(\omega)=\int_0^2 e^{-i\omega t}dt$.
    - Integrate and evaluate at both ends.
4. $f(t)=e^{-\lvert t\rvert}$
    - Split at $0$, because $\lvert t\rvert=-t$ for negative $t$: $F(\omega)=\int_{-\infty}^0 e^{t}e^{-i\omega t}dt+\int_0^\infty e^{-t}e^{-i\omega t}dt$.
    - Each integral works like exercises 1 and 2.
    - Add the two fractions with a common denominator.

<details>
<summary>Answers, level 1</summary>

1. $\dfrac{1}{3+i\omega}$
2. $\dfrac{1}{2-i\omega}$
3. $\dfrac{1-e^{-2i\omega}}{i\omega}$
4. $\dfrac{2}{1+\omega^2}$

</details>

**Level 2: one hint each, table and properties**

5. $f(t)=e^{-3(t-2)}u(t-2)$
    - It is $e^{-3t}u(t)$ delayed by $2$: use the time shift.
6. $f(t)=1$ for $\lvert t\rvert<3$, $0$ otherwise
    - It is a row of the table.
7. $f(t)=te^{-\lvert t\rvert}$
    - Use multiplication by $t$ on the answer of exercise 4.
8. $f(t)=e^{-2t}\cos(5t)u(t)$
    - Write the cosine with Euler, then use the frequency shift on $e^{-2t}u(t)$.

<details>
<summary>Answers, level 2</summary>

5. $\dfrac{e^{-2i\omega}}{3+i\omega}$
6. $\dfrac{2\sin(3\omega)}{\omega}$
7. $-\dfrac{4i\omega}{(1+\omega^2)^2}$
8. $\dfrac{2+i\omega}{(2+i\omega)^2+25}$

</details>

**Level 3: one word, inverse transforms**

Find $f(t)$.

9. $F(\omega)=\dfrac{1}{4+i\omega}$ (table)
10. $F(\omega)=\dfrac{6}{9+\omega^2}$ (table)
11. $F(\omega)=\dfrac{e^{-3i\omega}}{1+i\omega}$ (time shift)
12. $F(\omega)=\dfrac{1}{(1+i\omega)(4+i\omega)}$ (partial fractions)
13. $F(\omega)=\dfrac{i\omega}{(2+i\omega)(3+i\omega)}$ (partial fractions)

<details>
<summary>Answers, level 3</summary>

9. $e^{-4t}u(t)$
10. $e^{-3\lvert t\rvert}$
11. $e^{-(t-3)}u(t-3)$
12. $\dfrac{1}{3}\left(e^{-t}-e^{-4t}\right)u(t)$
13. $\left(3e^{-3t}-2e^{-2t}\right)u(t)$

</details>

**Level 4: no help**

14. Solve $y'+2y=\delta(t)$
15. Solve $y'+5y=e^{-2t}u(t)$
16. Solve $y''+3y'+2y=\delta(t)$
17. Compute the convolution of $e^{-t}u(t)$ and $e^{-2t}u(t)$ with the transform

<details>
<summary>Answers, level 4</summary>

14. $y(t)=e^{-2t}u(t)$
15. $y(t)=\dfrac{1}{3}\left(e^{-2t}-e^{-5t}\right)u(t)$
16. $y(t)=\left(e^{-t}-e^{-2t}\right)u(t)$
17. $\left(e^{-t}-e^{-2t}\right)u(t)$

Exercises 16 and 17 give the same result: the solution of an equation with input $\delta(t)$ is that convolution, and both lead to $\dfrac{1}{(1+i\omega)(2+i\omega)}$.

</details>

</details>

---

<details>
<summary>

# 4. FOURIER FOR PDEs

</summary>

## 4.1. Which tool for which domain

| Domain of $x$ | Condition at $x=0$ | Tool |
|---|---|---|
| $-\infty<x<\infty$ | none | Fourier transform |
| $0<x<\infty$ | $u(0,t)$ given (Dirichlet) | Fourier sine transform |
| $0<x<\infty$ | $u_x(0,t)$ given (Neumann) | Fourier cosine transform |
| $0<x<L$ | both ends given | Fourier series, separation of variables |

The idea is always the same: transform in $x$, the PDE becomes an ODE in $t$ for each $\omega$, solve it, then invert.

## 4.2. Transforms and their key rules

Full transform:

$$
\mathcal F\{f\}=F(\omega)=\int_{-\infty}^{\infty}f(x)e^{-i\omega x}dx,
\qquad
f(x)=\frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)e^{i\omega x}d\omega
$$

Sine and cosine transforms, for $x>0$:

$$
F_s(\omega)=\int_0^\infty f(x)\sin(\omega x)dx,
\qquad
f(x)=\frac{2}{\pi}\int_0^\infty F_s(\omega)\sin(\omega x)d\omega
$$

$$
F_c(\omega)=\int_0^\infty f(x)\cos(\omega x)dx,
\qquad
f(x)=\frac{2}{\pi}\int_0^\infty F_c(\omega)\cos(\omega x)d\omega
$$

What happens to the second derivative, the rule that makes everything work:

| Transform | $u_{xx}$ becomes | Needs |
|---|---|---|
| $\mathcal F$ | $-\omega^2U$ | nothing |
| $\mathcal F_s$ | $-\omega^2U_s+\omega\,u(0,t)$ | $u(0,t)$, Dirichlet |
| $\mathcal F_c$ | $-\omega^2U_c-u_x(0,t)$ | $u_x(0,t)$, Neumann |

The sine transform asks for $u(0,t)$, so it is the right one when the statement gives $u(0,t)$. Same with cosine and $u_x(0,t)$.

Derivatives in $t$ go through untouched: $\mathcal F\{u_t\}=U_t$.

| $f(x)$ | $F(\omega)$ |
|---|---|
| $e^{-ax^2}$ | $\sqrt{\dfrac{\pi}{a}}\,e^{-\omega^2/(4a)}$ |
| $e^{-a\lvert x\rvert}$ | $\dfrac{2a}{a^2+\omega^2}$ |
| $1$ for $\lvert x\rvert<a$, else $0$ | $\dfrac{2\sin(a\omega)}{\omega}$ |
| $f(x-a)$ | $e^{-ia\omega}F(\omega)$ |
| $f*g$ | $F(\omega)G(\omega)$ |

## 4.3. Heat equation on the whole line

::: flow
**PDE and initial condition**

$$
\displaystyle u_t=\alpha^2u_{xx},\quad -\infty<x<\infty,\qquad u(x,0)=f(x)
$$

Transform in $x$, with $u_{xx}\to-\omega^2U$:

$$
\displaystyle U_t=-\alpha^2\omega^2U,\qquad U(\omega,0)=F(\omega)
$$

**ODE in $t$**, one for each $\omega$, separable:

$$
\displaystyle U(\omega,t)=F(\omega)\,e^{-\alpha^2\omega^2t}
$$

A product in $\omega$ is a convolution in $x$. The Gaussian row of the table with $a=\frac{1}{4\alpha^2t}$ gives the inverse of $e^{-\alpha^2\omega^2t}$

::: sol
Solution

$$
u(x,t)=\frac{1}{\sqrt{4\pi\alpha^2t}}\int_{-\infty}^{\infty}f(\xi)\,e^{-\frac{(x-\xi)^2}{4\alpha^2t}}d\xi
$$
:::
:::

::: flow
**Worked example: Gaussian initial temperature**

$$
\displaystyle u_t=\alpha^2u_{xx},\qquad u(x,0)=e^{-x^2}
$$

Transform the initial condition with the Gaussian row, $a=1$:

$$
\displaystyle F(\omega)=\sqrt{\pi}\,e^{-\omega^2/4}
$$

Multiply by $e^{-\alpha^2\omega^2t}$ and join the exponents:

$$
\displaystyle U=\sqrt{\pi}\,e^{-\omega^2\frac{1+4\alpha^2t}{4}}
$$

It is again a Gaussian, with $a=\dfrac{1}{1+4\alpha^2t}$. Read the table backwards

::: sol
Solution

$$
u(x,t)=\frac{1}{\sqrt{1+4\alpha^2t}}\,e^{-\frac{x^2}{1+4\alpha^2t}}
$$

At $t=0$ it gives back $e^{-x^2}$, then the bump spreads and flattens
:::
:::

## 4.4. Heat equation on a half line

::: flow
**PDE with the end held at a fixed temperature**

$$
\displaystyle u_t=\alpha^2u_{xx},\quad x>0,\qquad u(0,t)=u_0,\quad u(x,0)=0
$$

$u(0,t)$ is given, so use the sine transform, $u_{xx}\to-\omega^2U+\omega u_0$:

$$
\displaystyle U_t=-\alpha^2\omega^2U+\alpha^2\omega u_0,\qquad U(\omega,0)=0
$$

**First-order linear ODE in $t$**, constant input:

$$
\displaystyle U(\omega,t)=\frac{u_0}{\omega}\left(1-e^{-\alpha^2\omega^2t}\right)
$$

Invert with the sine formula:

$$
\displaystyle u=\frac{2u_0}{\pi}\int_0^\infty\frac{\sin(\omega x)}{\omega}\left(1-e^{-\alpha^2\omega^2t}\right)d\omega
$$

The first integral is $\frac{\pi}{2}$, the second is a known error function

::: sol
Solution

$$
u(x,t)=u_0\left[1-\operatorname{erf}\left(\frac{x}{2\alpha\sqrt t}\right)\right]
$$

$\operatorname{erf}(z)=\frac{2}{\sqrt\pi}\int_0^ze^{-r^2}dr$. Heat enters from the end and creeps inward
:::
:::

If instead the end is insulated, $u_x(0,t)=0$, use the cosine transform and the boundary term vanishes:

$$
u(x,t)=\frac{2}{\pi}\int_0^\infty F_c(\omega)\,e^{-\alpha^2\omega^2t}\cos(\omega x)\,d\omega
$$

## 4.5. Wave equation on the whole line

::: flow
**PDE with initial shape and speed**

$$
\displaystyle u_{tt}=c^2u_{xx},\qquad u(x,0)=f(x),\quad u_t(x,0)=g(x)
$$

Transform in $x$:

$$
\displaystyle U_{tt}=-c^2\omega^2U
$$

**Second-order ODE in $t$**, roots $\pm ic\omega$:

$$
\displaystyle U=F(\omega)\cos(c\omega t)+G(\omega)\frac{\sin(c\omega t)}{c\omega}
$$

Write the cosine with Euler, each $e^{\pm ic\omega t}$ is a shift of $\mp ct$ in $x$

::: sol
Solution, d'Alembert

$$
u(x,t)=\frac{f(x-ct)+f(x+ct)}{2}+\frac{1}{2c}\int_{x-ct}^{x+ct}g(\xi)\,d\xi
$$

The initial shape splits into two halves travelling left and right at speed $c$
:::
:::

## 4.6. Finite bar, Fourier series

Use it when $0<x<L$ with both ends fixed at zero.

::: flow
**Heat**

$$
\displaystyle u_t=\alpha^2u_{xx},\quad u(0,t)=u(L,t)=0,\quad u(x,0)=f(x)
$$

Separation $u=X(x)T(t)$ gives $X''+\lambda X=0$ with $X(0)=X(L)=0$, so:

$$
\displaystyle X_n=\sin\frac{n\pi x}{L},\qquad \lambda_n=\left(\frac{n\pi}{L}\right)^2
$$

$T'=-\alpha^2\lambda_nT$ gives one decaying exponential per mode

::: sol
Solution

$$
u=\sum_{n=1}^{\infty}b_n\,e^{-\left(\frac{n\pi\alpha}{L}\right)^2t}\sin\frac{n\pi x}{L},
\qquad
b_n=\frac{2}{L}\int_0^Lf(x)\sin\frac{n\pi x}{L}dx
$$
:::
:::

::: flow
**Wave**

$$
\displaystyle u_{tt}=c^2u_{xx},\quad u(0,t)=u(L,t)=0,\quad u(x,0)=f,\ u_t(x,0)=g
$$

Same $X_n$, but $T''=-c^2\lambda_nT$ oscillates

::: sol
Solution

$$
u=\sum_{n=1}^{\infty}\left(A_n\cos\frac{n\pi ct}{L}+B_n\sin\frac{n\pi ct}{L}\right)\sin\frac{n\pi x}{L}
$$

$$
A_n=\frac{2}{L}\int_0^Lf\sin\frac{n\pi x}{L}dx,
\qquad
B_n=\frac{2}{n\pi c}\int_0^Lg\sin\frac{n\pi x}{L}dx
$$
:::
:::

Example of a coefficient: for $f(x)=100$,

$$
b_n=\frac{200}{n\pi}\left(1-(-1)^n\right)=
\begin{cases}\dfrac{400}{n\pi}&n\ \text{odd}\\0&n\ \text{even}\end{cases}
$$


## 4.7. Practice

The help shrinks level by level. Try each exercise before opening the answers.

**Level 1: guided, set up the transformed problem**

1. Transform $u_t=2u_{xx}$ on the whole line.
    - $u_t\to U_t$ and $u_{xx}\to-\omega^2U$.
2. Solve the transformed problem of $u_t=u_{xx}$, $u(x,0)=e^{-\lvert x\rvert}$, only up to $U(\omega,t)$.
    - $U(\omega,0)$ is the table row of $e^{-a\lvert x\rvert}$ with $a=1$, then solve $U_t=-\omega^2U$.
3. Which transform? (a) $x>0$ with $u(0,t)=0$, (b) $x>0$ with $u_x(0,t)=0$, (c) $-\infty<x<\infty$, (d) $0<x<\pi$ with both ends at $0$
    - Look at the table of 4.1.
4. Transform $u_t=u_{xx}$, $x>0$, $u(0,t)=0$ with the sine transform.
    - $u_{xx}\to-\omega^2U+\omega u(0,t)$.

<details>
<summary>Answers, level 1</summary>

1. $U_t=-2\omega^2U$
2. $U=\dfrac{2}{1+\omega^2}e^{-\omega^2t}$
3. (a) sine, (b) cosine, (c) Fourier, (d) Fourier series
4. $U_t=-\omega^2U$, the boundary term vanishes because $u(0,t)=0$

</details>

**Level 2: one hint each, whole line**

5. $u_t=u_{xx},\quad u(x,0)=e^{-x^2}$
    - The worked example of 4.3 with $\alpha=1$.
6. $u_t=4u_{xx},\quad u(x,0)=e^{-x^2}$
    - Same, with $\alpha^2=4$.
7. $u_{tt}=u_{xx},\quad u(x,0)=e^{-x^2},\ u_t(x,0)=0$
    - d'Alembert with $c=1$ and $g=0$.
8. $u_{tt}=4u_{xx},\quad u(x,0)=0,\ u_t(x,0)=\cos x$
    - d'Alembert with $c=2$ and $f=0$, integrate the cosine.

<details>
<summary>Answers, level 2</summary>

5. $u=\dfrac{1}{\sqrt{1+4t}}e^{-\frac{x^2}{1+4t}}$
6. $u=\dfrac{1}{\sqrt{1+16t}}e^{-\frac{x^2}{1+16t}}$
7. $u=\dfrac{1}{2}\left[e^{-(x-t)^2}+e^{-(x+t)^2}\right]$
8. $u=\dfrac{1}{2}\cos x\,\sin(2t)$

</details>

**Level 3: one word, half line and finite bar**

9. $u_t=u_{xx},\ x>0,\quad u(0,t)=0,\ u(x,0)=e^{-x}$ (sine)
10. $u_t=u_{xx},\ x>0,\quad u(0,t)=5,\ u(x,0)=0$ (erf)
11. $u_t=u_{xx},\ x>0,\quad u_x(0,t)=0,\ u(x,0)=e^{-x}$ (cosine)
12. $u_t=u_{xx},\ 0<x<\pi,\quad u(0,t)=u(\pi,t)=0,\ u(x,0)=3\sin x-\sin(4x)$ (series)

<details>
<summary>Answers, level 3</summary>

9. $u=\dfrac{2}{\pi}\displaystyle\int_0^\infty\frac{\omega}{1+\omega^2}e^{-\omega^2t}\sin(\omega x)\,d\omega$
10. $u=5\left[1-\operatorname{erf}\left(\dfrac{x}{2\sqrt t}\right)\right]$
11. $u=\dfrac{2}{\pi}\displaystyle\int_0^\infty\frac{1}{1+\omega^2}e^{-\omega^2t}\cos(\omega x)\,d\omega$
12. $u=3e^{-t}\sin x-e^{-16t}\sin(4x)$, the initial condition is already a sum of modes

</details>

**Level 4: no help**

13. $u_t=2u_{xx},\quad u(x,0)=e^{-x^2/4}$
14. $u_{tt}=9u_{xx},\quad u(x,0)=\dfrac{1}{1+x^2},\ u_t(x,0)=0$
15. $u_t=u_{xx},\ 0<x<1,\quad u(0,t)=u(1,t)=0,\ u(x,0)=100$
16. $u_t=u_{xx},\quad u(x,0)=1$ for $\lvert x\rvert<1$, $0$ otherwise

<details>
<summary>Answers, level 4</summary>

13. $u=\dfrac{1}{\sqrt{1+2t}}e^{-\frac{x^2}{4(1+2t)}}$
14. $u=\dfrac{1}{2}\left[\dfrac{1}{1+(x-3t)^2}+\dfrac{1}{1+(x+3t)^2}\right]$
15. $u=\displaystyle\sum_{n\ \text{odd}}\frac{400}{n\pi}e^{-n^2\pi^2t}\sin(n\pi x)$
16. $u=\dfrac{1}{2}\left[\operatorname{erf}\left(\dfrac{x+1}{2\sqrt t}\right)-\operatorname{erf}\left(\dfrac{x-1}{2\sqrt t}\right)\right]$, from the convolution formula of 4.3

</details>

</details>

---

<details>
<summary>

# 5. ODE SYSTEMS IN PYTHON

</summary>

Only `numpy` and `matplotlib`. The same three blocks cover any IVP they can ask: write $f$, solve, plot.

## 5.1. Recipe

1. Write the system as $\mathbf x'=f(t,\mathbf x)$, one line per unknown.
2. Code `f(t, x)` returning a `np.array` with the derivatives, in the same order as the unknowns.
3. Solve with `rk4` on a grid of times.
4. Plot every unknown against $t$. With two unknowns, also one against the other (phase plane).
5. Interpret: equilibrium, long-term limit, peaks, oscillations.

## 5.2. The solver: Runge-Kutta 4

The idea is Euler, walk along the slope in small steps $h$:

$$
\mathbf x_{n+1}=\mathbf x_n+h\,f(t_n,\mathbf x_n)
$$

RK4 does the same, but averages four slopes per step, so it is accurate with few steps:

$$
\mathbf x_{n+1}=\mathbf x_n+\frac{h}{6}\left(k_1+2k_2+2k_3+k_4\right)
$$

```python
import numpy as np
import matplotlib.pyplot as plt


def rk4(f, x0, t):
    x = np.zeros((len(t), len(x0)))  # one row per time, one column per unknown
    x[0] = x0
    for i in range(len(t) - 1):
        h = t[i + 1] - t[i]
        k1 = f(t[i], x[i])
        k2 = f(t[i] + h / 2, x[i] + h / 2 * k1)
        k3 = f(t[i] + h / 2, x[i] + h / 2 * k2)
        k4 = f(t[i] + h, x[i] + h * k3)
        x[i + 1] = x[i] + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
    return x
```

Copy this function as is into every exercise. A single equation is a system with one unknown: `x0 = [10]` and `f` returns `np.array([...])` with one value.

## 5.3. Linear system: two tanks

::: flow
**System**

$$
\displaystyle x_1'=-0.02x_1,\quad x_2'=0.02x_1-0.02x_2,\quad x_1(0)=50,\ x_2(0)=0
$$
:::

```python
def tanks(t, x):
    x1, x2 = x
    return np.array([-0.02 * x1, 0.02 * x1 - 0.02 * x2])


t = np.linspace(0, 300, 601)
x = rk4(tanks, [50, 0], t)
x1, x2 = x[:, 0], x[:, 1]  # column j is unknown j

plt.plot(t, x1, label="tank A")
plt.plot(t, x2, label="tank B")
plt.plot(t, t * np.exp(-0.02 * t), "k--", label="B exact")
plt.xlabel("t (min)")
plt.ylabel("salt (kg)")
plt.legend()
plt.grid()
plt.show()

i = np.argmax(x2)
print(f"B peaks at t={t[i]:.1f} min with {x2[i]:.2f} kg")
```

Output: `B peaks at t=50.0 min with 18.39 kg`. The dashed exact solution $x_2=te^{-0.02t}$ from Laplace lies on top of the numerical one.

## 5.4. Exact solution with eigenvalues

For a linear system $\mathbf x'=A\mathbf x$ the solution is a sum of exponentials, and `numpy` finds them:

$$
\mathbf x(t)=\sum_i c_i\,e^{\lambda_it}\,\mathbf v_i,
\qquad
V\mathbf c=\mathbf x(0)
$$

```python
A = np.array([[-0.5, 0.0], [0.5, -0.2]])  # drug: gut -> blood
x0 = np.array([100.0, 0.0])

lam, V = np.linalg.eig(A)  # eigenvalues, eigenvectors as columns
c = np.linalg.solve(V, x0)  # constants from the initial condition


def exact(t):
    return ((V * np.exp(lam * t)) @ c).real  # eig may return complex dtype


print("eigenvalues:", lam.real)
print("x(3) =", exact(3.0))
```

Output: `eigenvalues: [-0.2 -0.5]` and `x(3) = [22.31301601 54.28024599]`. It needs distinct eigenvalues, with a repeated one (the two tanks) use `rk4`.

The eigenvalues also predict the plot without solving anything:

| Eigenvalues of $A$ | Behavior |
|---|---|
| Real and negative | Decays to $0$ without oscillating |
| Complex, negative real part | Decaying oscillation, spiral in the phase plane |
| Pure imaginary | Oscillation that never decays, closed orbits |
| Some positive real part | Grows without bound |

## 5.5. Nonlinear system: predator-prey and phase plane

```python
a, b, c, d = 1.0, 0.1, 1.5, 0.075


def lotka(t, z):
    x, y = z
    return np.array([a * x - b * x * y, -c * y + d * x * y])


t = np.linspace(0, 30, 3001)
z = rk4(lotka, [10, 5], t)
x, y = z[:, 0], z[:, 1]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
ax1.plot(t, x, label="prey")
ax1.plot(t, y, label="predators")
ax1.set_xlabel("t")
ax1.legend()
ax2.plot(x, y)
ax2.plot(c / d, a / b, "ro", label="equilibrium")
ax2.set_xlabel("prey")
ax2.set_ylabel("predators")
ax2.legend()
plt.show()
```

The equilibrium comes from $f=0$: $x=\dfrac{c}{d}=20$, $y=\dfrac{a}{b}=10$. The orbit is a closed loop around it.

## 5.6. If `scipy` is allowed

`solve_ivp` replaces `rk4`. Same `f`, but the result comes transposed: one row per unknown.

```python
from scipy.integrate import solve_ivp

sol = solve_ivp(tanks, (0, 300), [50, 0], t_eval=t)
x1, x2 = sol.y
```

## 5.7. Interpreting the plots

| What you see | What to write |
|---|---|
| Curves settle to constants | Equilibrium, confirm it by solving $f(\mathbf x)=0$ |
| A curve rises then falls | Intermediate stage (tank B, drug in blood), peak with `np.argmax` |
| Repeating oscillations | Cycle, predators lag behind prey |
| Closed loop in the phase plane | Periodic solution around the equilibrium |
| Blow-up | Unstable model or a sign mistake in $f$ |

Before handing in: the plot starts at the initial conditions, the axes have the units of the statement, and conserved quantities stay constant (total salt, $A+B+C$, $S+I+R$).

## 5.8. Practice

Every exercise is the `rk4` function plus a new `f`. The help shrinks level by level.

**Level 1: guided, one equation**

1. Solve $x'=2-0.04x$, $x(0)=10$ on $[0,100]$ and print $x(50)$.
    - `f` returns `np.array([2 - 0.04 * x[0]])`, and `x0 = [10]`.
    - With `t = np.linspace(0, 100, 1001)`, $t=50$ is index 500.
2. Plot the logistic $P'=0.1P(1-P/1000)$, $P(0)=100$ on $[0,100]$ and say where it levels off.
    - Same structure, the curve tends to the capacity.

<details>
<summary>Answers, level 1</summary>

1. `x(50) = 44.5866`, the exact value is $50-40e^{-2}=44.5866$
2. It levels off at $P=1000$, the carrying capacity

</details>

**Level 2: one hint each, systems**

3. The drug $g'=-0.5g$, $b'=0.5g-0.2b$, $g(0)=100$, $b(0)=0$ on $[0,24]$: when does the blood peak, and how much?
    - `np.argmax` on the blood column.
4. Eigenvalues of $x'=y$, $y'=-x-0.5y$: what does the phase plane look like?
    - $A=\begin{pmatrix}0&1\\-1&-0.5\end{pmatrix}$, then `np.linalg.eig`.

<details>
<summary>Answers, level 2</summary>

3. Peak at $t\approx3.05$ h with $b\approx54.3$ mg
4. $\lambda=-0.25\pm0.968i$, complex with negative real part: a decaying spiral

</details>

**Level 3: one word, interpret**

5. SIR with $S(0)=999$, $I(0)=1$, $R(0)=0$, $\beta=0.0005$, $\gamma=0.1$ on $[0,100]$: day and size of the peak of infected (argmax)
6. The same SIR: check that the total stays at 1000 (conservation)

<details>
<summary>Answers, level 3</summary>

5. Peak around day 21 with about 478 infected
6. `S + I + R` stays at 1000 for every $t$, the three derivatives add up to $0$

</details>

**Level 4: no help**

7. Recirculating tanks $x_1'=-0.06x_1+0.02x_2$, $x_2'=0.06x_1-0.06x_2$, $x_1(0)=20$, $x_2(0)=0$: plot both, find the eigenvalues and describe the long term

<details>
<summary>Answers, level 4</summary>

7. $\lambda\approx-0.025$ and $-0.095$, both real and negative: all the salt drains out without oscillating, tank B rises first and then empties

</details>

</details>
