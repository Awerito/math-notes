---
title: Calculus and Differential Equations Formula Sheet
lang: en
---

### Study reference — Larson Calculus, volumes 1 and 2

---

<details>
<summary>

# 1. TABLE OF DERIVATIVES

</summary>

## 1.1. Algebraic rules

| Function | Derivative |
|---|---|
| $c$ | $0$ |
| $x$ | $1$ |
| $x^n$ | $nx^{n-1}$ |
| $cf(x)$ | $cf'(x)$ |
| $f(x)+g(x)$ | $f'+g'$ |
| $f(x)-g(x)$ | $f'-g'$ |
| $f(x)g(x)$ | $f'g+fg'$ |
| $\dfrac{f}{g}$ | $\dfrac{f'g-fg'}{g^2}$ |
| $f(g(x))$ | $f'(g(x))g'(x)$ |

## 1.2. Exponentials and logarithms

| Function | Derivative |
|---|---|
| $e^x$ | $e^x$ |
| $e^{u}$ | $e^u u'$ |
| $a^x$ | $a^x\ln a$ |
| $a^u$ | $a^u\ln(a)u'$ |
| $\ln x$ | $\dfrac{1}{x}$ |
| $\ln|u|$ | $\dfrac{u'}{u}$ |
| $\log_a x$ | $\dfrac{1}{x\ln a}$ |
| $\log_a u$ | $\dfrac{u'}{u\ln a}$ |

## 1.3. Trigonometric functions

| Function | Derivative |
|---|---|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\cot x$ | $-\csc^2 x$ |
| $\sec x$ | $\sec x\tan x$ |
| $\csc x$ | $-\csc x\cot x$ |

For composite functions, apply the chain rule. For example:

$$
\frac{d}{dx}\sin(3x)=3\cos(3x)
$$

## 1.4. Inverse trigonometric functions

| Function | Derivative |
|---|---|
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ |
| $\arctan x$ | $\dfrac{1}{1+x^2}$ |
| $\operatorname{arccot}x$ | $-\dfrac{1}{1+x^2}$ |
| $\operatorname{arcsec}x$ | $\dfrac{1}{|x|\sqrt{x^2-1}}$ |
| $\operatorname{arccsc}x$ | $-\dfrac{1}{|x|\sqrt{x^2-1}}$ |

## 1.5. Hyperbolic functions

| Function | Derivative |
|---|---|
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $\operatorname{sech}^2x$ |
| $\coth x$ | $-\operatorname{csch}^2x$ |
| $\operatorname{sech}x$ | $-\operatorname{sech}x\tanh x$ |
| $\operatorname{csch}x$ | $-\operatorname{csch}x\coth x$ |

</details>

---

<details>
<summary>

# 2. TABLE OF INTEGRALS

</summary>

Every indefinite integral includes a constant $C$.

## 2.1. Algebraic integrals

| Integral | Result |
|---|---|
| $\int dx$ | $x+C$ |
| $\int x^n dx$ | $\dfrac{x^{n+1}}{n+1}+C,\ n\neq-1$ |
| $\int \dfrac{1}{x}dx$ | $\ln|x|+C$ |
| $\int (ax+b)^n dx$ | $\dfrac{(ax+b)^{n+1}}{a(n+1)}+C$ |
| $\int \dfrac{1}{ax+b}dx$ | $\dfrac{1}{a}\ln|ax+b|+C$ |

## 2.2. Exponentials and logarithms

| Integral | Result |
|---|---|
| $\int e^x dx$ | $e^x+C$ |
| $\int e^{ax}dx$ | $\dfrac{e^{ax}}{a}+C$ |
| $\int a^x dx$ | $\dfrac{a^x}{\ln a}+C$ |
| $\int \ln x\,dx$ | $x\ln x-x+C$ |
| $\int \log_a x\,dx$ | $\dfrac{x\ln x-x}{\ln a}+C$ |

## 2.3. Trigonometric integrals

| Integral | Result |
|---|---|
| $\int\sin x\,dx$ | $-\cos x+C$ |
| $\int\cos x\,dx$ | $\sin x+C$ |
| $\int\tan x\,dx$ | $-\ln|\cos x|+C$ |
| $\int\cot x\,dx$ | $\ln|\sin x|+C$ |
| $\int\sec^2x\,dx$ | $\tan x+C$ |
| $\int\csc^2x\,dx$ | $-\cot x+C$ |
| $\int\sec x\tan x\,dx$ | $\sec x+C$ |
| $\int\csc x\cot x\,dx$ | $-\csc x+C$ |
| $\int\sec x\,dx$ | $\ln|\sec x+\tan x|+C$ |
| $\int\csc x\,dx$ | $\ln|\csc x-\cot x|+C$ |

## 2.4. Inverse trigonometric forms

| Integral | Result |
|---|---|
| $\int\dfrac{dx}{\sqrt{a^2-x^2}}$ | $\arcsin\dfrac{x}{a}+C$ |
| $\int\dfrac{dx}{a^2+x^2}$ | $\dfrac{1}{a}\arctan\dfrac{x}{a}+C$ |
| $\int\dfrac{dx}{x\sqrt{x^2-a^2}}$ | $\dfrac{1}{a}\operatorname{arcsec}\dfrac{|x|}{a}+C$ |

Here $a>0$.

## 2.5. Integrals with radicals

| Integral | Result |
|---|---|
| $\int\dfrac{dx}{\sqrt{x^2+a^2}}$ | $\ln|x+\sqrt{x^2+a^2}|+C$ |
| $\int\dfrac{dx}{\sqrt{x^2-a^2}}$ | $\ln|x+\sqrt{x^2-a^2}|+C$ |
| $\int\dfrac{dx}{\sqrt{a^2-x^2}}$ | $\arcsin\dfrac{x}{a}+C$ |

## 2.6. Fundamental trigonometric identities

$$
\sin^2x+\cos^2x=1
$$

$$
1+\tan^2x=\sec^2x
$$

$$
1+\cot^2x=\csc^2x
$$

$$
\sin^2x=\frac{1-\cos(2x)}{2}
$$

$$
\cos^2x=\frac{1+\cos(2x)}{2}
$$

</details>

---

<details>
<summary>

# 3. INTEGRATION METHODS

</summary>

## 3.1. $u$-substitution

**When to use:** when the integrand contains a composite function and its derivative (or a multiple of it).

::: flow
**Substitution**

$$
u=g(x)
$$

$$
du=g'(x)dx
$$

**Replace**

$$
\int f(g(x))g'(x)dx
=
\int f(u)du
$$

**Integrate**

$$
F(u)+C
$$

::: sol
Back to the original variable

$$
F(g(x))+C
$$
:::
:::

## 3.2. Integration by parts

**When to use:** when we have a product of functions and differentiating one of them simplifies the expression.

::: flow
**Formula**

$$
\boxed{\int u\,dv=uv-\int v\,du}
$$

Choose:

$$
u=f(x),\qquad dv=g(x)dx
$$

Differentiate and integrate:

$$
du=f'(x)dx,\qquad v=\int g(x)dx
$$

**Replace**

$$
\int u\,dv=uv-\int v\,du
$$

::: sol
Integrate the result

$$
uv-\int v\,du+C
$$
:::
:::

Rule of thumb for choosing $u$: LIATE (logarithmic, inverse trigonometric, algebraic, trigonometric, exponential).

## 3.3. Partial fractions

**When to use:** when we have a rational function:

$$
\frac{P(x)}{Q(x)}
$$

First check that the degree of the numerator is lower than the degree of the denominator. If it is not, do polynomial division.

**Factor the denominator**

Depending on the factors, decompose:

Distinct linear factors:

$$
\frac{P(x)}{(x-a)(x-b)}
=
\frac{A}{x-a}+\frac{B}{x-b}
$$

Repeated linear factor:

$$
\frac{P(x)}{(x-a)^2}
=
\frac{A}{x-a}+\frac{B}{(x-a)^2}
$$

Irreducible quadratic factor:

$$
\frac{P(x)}{x^2+bx+c}
=
\frac{Ax+B}{x^2+bx+c}
$$

**Find the coefficients**

Multiply by the common denominator and compare coefficients.

**Integrate each fraction**

$$
\int\frac{A}{x-a}dx=A\ln|x-a|
$$

Quadratic terms may require logarithms and arctangents.

## 3.4. Trigonometric substitution

**When to use:** when radicals with quadratic expressions appear.

| Radical | Substitution |
|---|---|
| $\sqrt{a^2-x^2}$ | $x=a\sin\theta$ |
| $\sqrt{a^2+x^2}$ | $x=a\tan\theta$ |
| $\sqrt{x^2-a^2}$ | $x=a\sec\theta$ |

Then:

1. Differentiate the substitution.
2. Replace $x$ and $dx$.
3. Simplify using trigonometric identities.
4. Integrate with respect to $\theta$.
5. Go back to $x$ using a triangle or identities.

## 3.5. Integrating trigonometric powers

**When to use:** when products of powers of sine and cosine, or of tangent and secant, appear.

For:

$$
\int\sin^m x\cos^n x\,dx
$$

- If the power of sine is odd, split off one sine and convert the rest using $\sin^2x=1-\cos^2x$.
- If the power of cosine is odd, split off one cosine and convert the rest using $\cos^2x=1-\sin^2x$.
- If both are even, use double-angle identities.

For:

$$
\int\tan^m x\sec^n x\,dx
$$

Use:

$$
\tan^2x=\sec^2x-1
$$

$$
\sec^2x=1+\tan^2x
$$

## 3.6. Improper integrals

**When to use:** when the limits are infinite or the integrand has a discontinuity inside the interval or at its endpoints.

Infinite interval:

$$
\int_a^\infty f(x)dx
=
\lim_{b\to\infty}\int_a^b f(x)dx
$$

Discontinuity at an endpoint:

$$
\int_a^b f(x)dx
=
\lim_{t\to a^+}\int_t^b f(x)dx
$$

The integral converges if the limit exists and is finite.

</details>

---

<details>
<summary>

# 4. DIFFERENTIAL EQUATIONS

</summary>

## 4.1. Separable variables

::: flow
**Original equation**

$$
\displaystyle \frac{dy}{dx}=f(x)g(y)
$$

Separate the variables:

$$
\displaystyle \frac{dy}{g(y)}=f(x)dx
$$

Integrate both sides:

$$
\displaystyle \int\frac{1}{g(y)}dy=\int f(x)dx
$$

::: sol
General solution

$$
\displaystyle
\int\frac{1}{g(y)}dy=\int f(x)dx+C
$$
:::
:::

Check separately the values of $y$ that make $g(y)$ zero, because they can produce constant solutions.

## 4.2. Homogeneous equations

::: flow
**Original equation**

$$
\displaystyle y'=F\left(\frac{y}{x}\right)
$$

Substitute:

$$
\displaystyle y=vx
$$

Differentiate:

$$
\displaystyle dy=v\,dx+x\,dv
$$

Replace in the equation:

$$
\displaystyle v+x\frac{dv}{dx}=F(v)
$$

Separate variables:

$$
\displaystyle \frac{dv}{F(v)-v}=\frac{dx}{x}
$$

Integrate both sides:

$$
\displaystyle \int\frac{dv}{F(v)-v}=\int\frac{dx}{x}
$$

Go back to the original variable:

$$
\displaystyle v=\frac{y}{x}
$$

::: sol
General solution

$$
\displaystyle
\int\frac{dv}{F(v)-v}=\ln|x|+C,
\qquad v=\frac{y}{x}
$$
:::
:::

Check the solutions lost when dividing by $F(v)-v$.

## 4.3. First-order linear equations

::: flow
**Original equation**

$$
\displaystyle y'+P(x)y=Q(x)
$$

Multiply by:

$$
\displaystyle u=e^{\int P(x)dx}
$$

**Product rule**

$$
\displaystyle (uy)'=uQ
$$

Integrate both sides.

**Undo the derivative**

$$
\displaystyle uy=\int uQ\,dx+C
$$

Divide by $u$.

::: sol
General solution

$$
\displaystyle y=\frac{1}{u}\left(\int uQ\,dx+C\right)
$$
:::
:::

## 4.4. Bernoulli equations

::: flow
**Original equation**

$$
\displaystyle y'+Py=Qy^n
$$

Substitute:

$$
\displaystyle v=y^{1-n}
$$

Differentiate:

$$
\displaystyle v'=(1-n)y^{-n}y'
$$

Divide the original equation by $y^n$ and multiply by $1-n$.

**Transformed linear equation**

$$
\displaystyle v'+(1-n)Pv=(1-n)Q
$$

Multiply by:

$$
\displaystyle u=e^{\int(1-n)Pdx}
$$

**Product rule**

$$
\displaystyle (uv)'=u(1-n)Q
$$

Integrate both sides.

**Undo the derivative**

$$
\displaystyle uv=\int u(1-n)Q\,dx+C
$$

Divide by $u$ and go back to $y$.

::: sol
General solution

$$
\displaystyle
y=\left[
\frac{1}{u}\left(\int u(1-n)Q\,dx+C\right)
\right]^{\frac{1}{1-n}}
$$

Where:

$$
\displaystyle u=e^{\int(1-n)Pdx}
$$
:::
:::

Check separately the solutions excluded when dividing by $y^n$.

## 4.5. Exact equations

::: flow
**Original equation**

$$
\displaystyle M(x,y)dx+N(x,y)dy=0
$$

Check the exactness condition:

$$
\displaystyle \frac{\partial M}{\partial y}
=
\frac{\partial N}{\partial x}
$$

Look for a potential function:

$$
\displaystyle F_x=M
$$

Integrate with respect to $x$:

$$
\displaystyle F(x,y)=\int M(x,y)dx+g(y)
$$

Differentiate with respect to $y$:

$$
\displaystyle F_y=N
$$

Solve for $g'(y)$, integrate and obtain $g(y)$.

::: sol
General solution

$$
F(x,y)=C
$$
:::
:::

## 4.6. Second-order linear homogeneous equations with constant coefficients

::: flow
**Original equation**

$$
\displaystyle ay''+by'+cy=0
$$

Propose:

$$
\displaystyle y=e^{rx}
$$

Replace:

$$
\displaystyle ar^2e^{rx}+bre^{rx}+ce^{rx}=0
$$

Divide by $e^{rx}$.

**Characteristic equation**

$$
\displaystyle ar^2+br+c=0
$$

Compute the roots and build the solution.

::: sol
Case 1: distinct real roots

$$
y=C_1e^{r_1x}+C_2e^{r_2x}
$$
:::

::: sol
Case 2: repeated real root

$$
y=(C_1+C_2x)e^{rx}
$$
:::

::: sol
Case 3: complex roots

If $r=\alpha\pm\beta i$:

$$
y=e^{\alpha x}
(C_1\cos\beta x+C_2\sin\beta x)
$$
:::
:::

## 4.7. Second-order nonhomogeneous equations

::: flow
**Original equation**

$$
\displaystyle ay''+by'+cy=g(x)
$$

Look for two solutions:

- $y_h$: solution of the associated homogeneous equation.
- $y_p$: particular solution of the full equation.

::: sol
General solution

$$
y=y_h+y_p
$$
:::
:::

Usual methods to obtain $y_p$:

- Undetermined coefficients: for polynomial, exponential, sine and cosine terms and their combinations.
- Variation of parameters: a more general method that uses solutions of the homogeneous equation.

</details>

---

<details>
<summary>

# 5. LAPLACE TRANSFORM

</summary>

## 5.1. Definition

$$
\boxed{
\mathcal L\{f(t)\}
=
\int_0^\infty e^{-st}f(t)dt
}
$$

The transform turns a function of time into a function of the variable $s$.

## 5.2. Table of common transforms

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

## 5.3. Important properties

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

## 5.4. Solving differential equations with Laplace

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

## 5.5. Table of inverse transforms

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

## 5.6. Partial fraction expansions

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

</details>

---

<details>
<summary>

# 6. FOURIER SERIES

</summary>

## 6.1. General idea

A periodic function can be represented as a combination of sines and cosines.

For a function of period $2L$:

$$
\boxed{
f(x)\sim
\frac{a_0}{2}
+
\sum_{n=1}^{\infty}
\left[
a_n\cos\left(\frac{n\pi x}{L}\right)
+
b_n\sin\left(\frac{n\pi x}{L}\right)
\right]
}
$$

## 6.2. Fourier coefficients

Constant term:

$$
\boxed{
a_0=\frac{1}{L}\int_{-L}^{L}f(x)dx
}
$$

Cosine coefficients:

$$
\boxed{
a_n=\frac{1}{L}\int_{-L}^{L}
f(x)\cos\left(\frac{n\pi x}{L}\right)dx
}
$$

Sine coefficients:

$$
\boxed{
b_n=\frac{1}{L}\int_{-L}^{L}
f(x)\sin\left(\frac{n\pi x}{L}\right)dx
}
$$

## 6.3. Symmetry

**Even function**

$$
f(-x)=f(x)
$$

- Only cosines appear.
- $b_n=0$.

$$
a_n=\frac{2}{L}\int_0^L
f(x)\cos\left(\frac{n\pi x}{L}\right)dx
$$

**Odd function**

$$
f(-x)=-f(x)
$$

- Only sines appear.
- $a_0=a_n=0$.

$$
b_n=\frac{2}{L}\int_0^L
f(x)\sin\left(\frac{n\pi x}{L}\right)dx
$$

## 6.4. Half-range series

For a function defined on $0<x<L$:

Sine series:

$$
f(x)\sim
\sum_{n=1}^{\infty}
b_n\sin\left(\frac{n\pi x}{L}\right)
$$

$$
b_n=\frac{2}{L}\int_0^L
f(x)\sin\left(\frac{n\pi x}{L}\right)dx
$$

Cosine series:

$$
f(x)\sim
\frac{a_0}{2}+
\sum_{n=1}^{\infty}
a_n\cos\left(\frac{n\pi x}{L}\right)
$$

$$
a_n=\frac{2}{L}\int_0^L
f(x)\cos\left(\frac{n\pi x}{L}\right)dx
$$

## 6.5. Convergence

At points where the function is continuous, the series converges to $f(x)$.

At a jump discontinuity, it converges to the average of the one-sided limits:

$$
\boxed{
\frac{f(x^-)+f(x^+)}{2}
}
$$

</details>

---

<details>
<summary>

# 7. FOURIER AND LAPLACE IN DIFFERENTIAL EQUATIONS

</summary>

## 7.1. When to use each tool?

| Tool | Usual application |
|---|---|
| Laplace | Initial value problems |
| Fourier | Periodic functions and boundary value problems |
| Fourier sine | Homogeneous Dirichlet boundary conditions |
| Fourier cosine | Homogeneous Neumann boundary conditions |
| Laplace + partial fractions | Solving differential equations with constant coefficients |
| Fourier series | Solving partial differential equations by separation of variables |

## 7.2. Heat equation

$$
\frac{\partial u}{\partial t}
=
\alpha^2\frac{\partial^2u}{\partial x^2}
$$

Use separation of variables:

$$
u(x,t)=X(x)T(t)
$$

Replace:

$$
XT'=\alpha^2X''T
$$

Divide by $\alpha^2XT$:

$$
\frac{T'}{\alpha^2T}
=
\frac{X''}{X}
=-\lambda
$$

We get two ordinary equations:

$$
X''+\lambda X=0
$$

$$
T'+\alpha^2\lambda T=0
$$

Solve both and use the boundary conditions to determine the Fourier coefficients.

## 7.3. Wave equation

$$
\frac{\partial^2u}{\partial t^2}
=
c^2\frac{\partial^2u}{\partial x^2}
$$

Apply:

$$
u(x,t)=X(x)T(t)
$$

Separate:

$$
\frac{T''}{c^2T}
=
\frac{X''}{X}
=-\lambda
$$

We get:

$$
X''+\lambda X=0
$$

$$
T''+c^2\lambda T=0
$$

Solve the equations and apply the initial and boundary conditions.

</details>

---

<details>
<summary>

# 8. REMINDER: HOW TO CHOOSE THE METHOD

</summary>

| If you find... | Consider using... |
|---|---|
| A composite function and its derivative | $u$-substitution |
| Product of functions | Integration by parts |
| Quotient of polynomials | Partial fractions |
| Quadratic radicals | Trigonometric substitution |
| Trigonometric powers | Trigonometric identities |
| $y'=f(x)g(y)$ | Separable variables |
| $y'=F(y/x)$ | Homogeneous equation |
| $y'+Py=Q$ | Integrating factor |
| $y'+Py=Qy^n$ | Bernoulli |
| $Mdx+Ndy=0$ | Exact equation |
| $ay''+by'+cy=0$ | Characteristic equation |
| Equation with initial conditions | Laplace |
| Periodic function | Fourier series |
| Partial differential equation with boundaries | Separation of variables and Fourier |

</details>

---

**Usage note:** This sheet gathers standard methods and formulas of calculus and differential equations. It is not meant to be a literal transcription or an exhaustive listing of Larson's chapters. For each method it is worth practicing at least one full exercise and checking the results by differentiating or substituting into the original equation.

**A clarification:** Fourier and Laplace are not interchangeable methods. Laplace is usually most useful for problems with initial conditions; Fourier lets us represent functions and solve many problems with boundary conditions. They are kept apart in this sheet so their purposes do not get mixed.
