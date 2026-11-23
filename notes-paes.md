---
title: Apuntes PAES Matemática
lang: es
---

<details>
<summary>

# 1. NÚMEROS {#numeros}

</summary>

Operar y comparar enteros, fracciones, porcentajes, potencias y raíces. En M2 se suman los irracionales, la matemática financiera y los logaritmos.

## 1.1. Enteros y racionales

**Cuándo aparece:** en casi todas las preguntas, como paso intermedio. Aquí se pierden puntos por signos y por el orden de las operaciones, no por falta de ideas.

**Orden de las operaciones, PAPOMUDAS:** paréntesis, potencias, multiplicación y división de izquierda a derecha, adición y sustracción de izquierda a derecha.

| Operación | Regla |
|---|---|
| Suma de fracciones | Igualar denominadores: $\dfrac{a}{b}+\dfrac{c}{d}=\dfrac{ad+bc}{bd}$ |
| Producto | Numerador por numerador, denominador por denominador |
| División | Multiplicar por el inverso: $\dfrac{a}{b}:\dfrac{c}{d}=\dfrac{a}{b}\cdot\dfrac{d}{c}$ |
| Comparar | Igualar denominadores, o pasar a decimal |
| Decimal periódico | $0{,}\overline{ab}=\dfrac{ab}{99}$ |
| Decimal semiperiódico | $0{,}a\overline{b}=\dfrac{ab-a}{90}$: todo menos lo que no se repite, sobre un 9 por cifra periódica y un 0 por cifra no periódica |

::: flow
**Ejemplo resuelto: signos y PAPOMUDAS**

$$
\displaystyle -3+2\cdot(-4)-(-6):2
$$

Primero las multiplicaciones y divisiones, cada una con su signo:

$$
\displaystyle 2\cdot(-4)=-8,\qquad (-6):2=-3
$$

Reemplaza. El menos delante de $(-3)$ lo cambia a $+3$:

$$
\displaystyle -3-8+3
$$

::: sol
Resultado

$$
-8
$$
:::
:::

::: flow
**Ejemplo resuelto: fracción de lo que queda**

Ana tiene \$24.000. Gasta $\frac{1}{3}$ en ropa y luego $\frac{1}{4}$ de lo que le queda en comida

El primer gasto es sobre el total:

$$
\displaystyle \frac{1}{3}\cdot24.000=8.000,\qquad \text{quedan }16.000
$$

El segundo es sobre lo que queda, no sobre el total:

$$
\displaystyle \frac{1}{4}\cdot16.000=4.000,\qquad \text{quedan }12.000
$$

::: sol
Le quedan \$12.000

Atajo: le queda $\frac{2}{3}\cdot\frac{3}{4}=\frac{1}{2}$ del dinero
:::
:::

**Error típico:** $-3^2=-9$, porque la potencia afecta solo al 3. En cambio $(-3)^2=9$.

## 1.2. Porcentaje

**Cuándo aparece:** descuentos, alzas, IVA, encuestas. Casi siempre en contexto.

La idea que resuelve todo: **un cambio porcentual es una multiplicación por un factor.**

| Situación | Cálculo |
|---|---|
| $p\%$ de $x$ | $\dfrac{p}{100}\cdot x$ |
| Subir $p\%$ | $x\cdot\left(1+\dfrac{p}{100}\right)$, subir 19% es multiplicar por $1{,}19$ |
| Bajar $p\%$ | $x\cdot\left(1-\dfrac{p}{100}\right)$, bajar 30% es multiplicar por $0{,}7$ |
| Cambios sucesivos | Multiplicar los factores |
| Qué porcentaje es $a$ de $b$ | $\dfrac{a}{b}\cdot100$ |
| Variación porcentual | $\dfrac{\text{nuevo}-\text{original}}{\text{original}}\cdot100$ |
| Volver al original | Dividir por el factor |

El IVA en Chile es 19%: $\text{total}=\text{neto}\cdot1{,}19$, y por lo tanto $\text{neto}=\dfrac{\text{total}}{1{,}19}$.

::: flow
**Ejemplo resuelto: sube y baja el mismo porcentaje**

Un televisor de \$50.000 sube 20% y después baja 20%

Cada cambio es un factor, y se multiplican:

$$
\displaystyle 50.000\cdot1{,}2\cdot0{,}8=50.000\cdot0{,}96
$$

::: sol
Precio final \$48.000

El factor total $0{,}96$ significa que terminó 4% más barato que al inicio
:::
:::

::: flow
**Ejemplo resuelto: precio antes del descuento**

Con 15% de descuento pagaste \$34.000. ¿Cuál era el precio original?

El precio original por $0{,}85$ da lo que pagaste:

$$
\displaystyle x\cdot0{,}85=34.000
$$

Para volver atrás se divide por el factor, no se suma el 15%:

$$
\displaystyle x=\frac{34.000}{0{,}85}
$$

::: sol
Precio original \$40.000
:::
:::

::: flow
**Ejemplo resuelto: IVA**

Una boleta dice \$59.500 con IVA incluido

$$
\displaystyle \text{neto}=\frac{59.500}{1{,}19}=50.000
$$

::: sol
Neto \$50.000 e IVA \$9.500
:::
:::

**Error típico:** creer que subir 20% y bajar 20% devuelve al precio original, o calcular el 19% sobre el total para sacar el IVA ($0{,}19\cdot59.500=11.305$ no es el IVA).

## 1.3. Potencias

**Cuándo aparece:** simplificar expresiones, notación científica, crecimiento (bacterias que se duplican).

Las propiedades solo funcionan con la **misma base** o el **mismo exponente**. Por eso el primer paso es casi siempre escribir todo con la misma base: $4=2^2$, $8=2^3$, $9=3^2$, $27=3^3$.

| Propiedad | Ejemplo |
|---|---|
| $a^m\cdot a^n=a^{m+n}$ | $2^3\cdot2^4=2^7$ |
| $\dfrac{a^m}{a^n}=a^{m-n}$ | $\dfrac{5^6}{5^2}=5^4$ |
| $(a^m)^n=a^{m\cdot n}$ | $(3^2)^3=3^6$ |
| $(a\cdot b)^n=a^n\cdot b^n$ | $(2\cdot5)^3=2^3\cdot5^3$ |
| $a^0=1$ | $7^0=1$ |
| $a^{-n}=\dfrac{1}{a^n}$ | $2^{-3}=\dfrac{1}{8}$ |
| $\left(\dfrac{a}{b}\right)^{-n}=\left(\dfrac{b}{a}\right)^{n}$ | $\left(\dfrac{2}{3}\right)^{-2}=\dfrac{9}{4}$ |
| $a^{\frac{m}{n}}=\sqrt[n]{a^m}$ | $8^{\frac{2}{3}}=\left(\sqrt[3]{8}\right)^2=4$ |

Con exponente fraccionario conviene sacar la raíz primero, así los números quedan chicos: $16^{-\frac{3}{4}}=\dfrac{1}{\left(\sqrt[4]{16}\right)^3}=\dfrac{1}{8}$.

::: flow
**Ejemplo resuelto: todo a la misma base**

$$
\displaystyle \frac{9^2\cdot27^{-1}}{3^{-2}}
$$

Escribe cada número como potencia de 3:

$$
\displaystyle \frac{3^4\cdot3^{-3}}{3^{-2}}
$$

Suma los exponentes de arriba y resta el de abajo:

$$
\displaystyle 3^{4-3-(-2)}=3^3
$$

::: sol
Resultado

$$
27
$$
:::
:::

::: flow
**Ejemplo resuelto: notación científica**

$$
\displaystyle (4\cdot10^5)\cdot(3\cdot10^{-2})
$$

Multiplica los números por un lado y las potencias de 10 por otro:

$$
\displaystyle 12\cdot10^{3}
$$

::: sol
Resultado

$$
1{,}2\cdot10^4=12.000
$$
:::
:::

**Error típico:** $2^3+2^3=2^6$. Sumar no suma exponentes: $2^3+2^3=2\cdot2^3=2^4$.

## 1.4. Raíces enésimas

**Cuándo aparece:** simplificar, sumar raíces, racionalizar, y en Pitágoras.

$\sqrt[n]{a}=b$ significa $b^n=a$. Con índice par, $a$ debe ser mayor o igual a 0 para que exista en los reales.

| Propiedad | Ejemplo |
|---|---|
| $\sqrt[n]{a\cdot b}=\sqrt[n]{a}\cdot\sqrt[n]{b}$ | $\sqrt{72}=\sqrt{36}\cdot\sqrt2=6\sqrt2$ |
| $\sqrt[n]{\dfrac{a}{b}}=\dfrac{\sqrt[n]{a}}{\sqrt[n]{b}}$ | $\sqrt{\dfrac{9}{25}}=\dfrac{3}{5}$ |
| $\sqrt[n]{a^m}=a^{\frac{m}{n}}$ | $\sqrt[3]{2^6}=2^2$ |
| $\sqrt[m]{\sqrt[n]{a}}=\sqrt[mn]{a}$ | $\sqrt{\sqrt[3]{64}}=\sqrt[6]{64}=2$ |

**Descomponer:** busca el mayor factor que sea potencia exacta del índice: $\sqrt{72}=\sqrt{36\cdot2}=6\sqrt2$ y $\sqrt[3]{54}=\sqrt[3]{27\cdot2}=3\sqrt[3]{2}$.

**Sumar:** solo se suman raíces iguales, como términos semejantes en álgebra. Por eso primero se descompone.

**Racionalizar:** quitar la raíz del denominador multiplicando por 1 escrito con la raíz adecuada.

| Denominador | Multiplica arriba y abajo por |
|---|---|
| $\sqrt a$ | $\sqrt a$ |
| $\sqrt a-b$ o $\sqrt a+b$ | El conjugado, $\sqrt a+b$ o $\sqrt a-b$, porque $(\sqrt a-b)(\sqrt a+b)=a-b^2$ |

::: flow
**Ejemplo resuelto: sumar raíces**

$$
\displaystyle \sqrt{50}+\sqrt{18}-\sqrt8
$$

Descompón cada una sacando el cuadrado perfecto:

$$
\displaystyle 5\sqrt2+3\sqrt2-2\sqrt2
$$

Ahora son términos semejantes:

::: sol
Resultado

$$
6\sqrt2
$$
:::
:::

::: flow
**Ejemplo resuelto: racionalizar con conjugado**

$$
\displaystyle \frac{2}{\sqrt5-1}
$$

Multiplica arriba y abajo por el conjugado $\sqrt5+1$:

$$
\displaystyle \frac{2(\sqrt5+1)}{(\sqrt5-1)(\sqrt5+1)}=\frac{2(\sqrt5+1)}{5-1}
$$

::: sol
Resultado

$$
\frac{\sqrt5+1}{2}
$$
:::
:::

**Error típico:** $\sqrt{a+b}=\sqrt a+\sqrt b$. Basta un caso para verlo: $\sqrt{9+16}=5$, pero $\sqrt9+\sqrt{16}=7$.

## 1.5. Números reales (M2)

**Cuándo aparece:** clasificar un número como racional o irracional, y ordenar raíces sin calculadora.

Los reales son los racionales (se escriben como fracción) más los irracionales (decimal infinito no periódico): $\sqrt2$, $\sqrt3$, $\pi$, $e$.

| Operación | Resultado |
|---|---|
| Racional distinto de 0 por irracional | Siempre irracional: $3\sqrt2$ |
| Racional más irracional | Siempre irracional: $1+\sqrt2$ |
| Irracional más irracional | Depende: $\sqrt2+(-\sqrt2)=0$ es racional |
| Irracional por irracional | Depende: $\sqrt2\cdot\sqrt8=4$ es racional |

**Ordenar raíces:** si los números son positivos, elevarlos al cuadrado no cambia el orden. Mete el coeficiente dentro de la raíz y compara lo de adentro.

::: flow
**Ejemplo resuelto: ordenar**

Ordena de menor a mayor $2\sqrt3$, $3\sqrt2$ y $\sqrt{11}$

Eleva cada uno al cuadrado:

$$
\displaystyle (2\sqrt3)^2=12,\qquad (3\sqrt2)^2=18,\qquad (\sqrt{11})^2=11
$$

::: sol
Orden

$$
\sqrt{11}<2\sqrt3<3\sqrt2
$$
:::
:::

::: flow
**Ejemplo resuelto: ¿racional o irracional?**

Desarrolla con productos notables antes de decidir:

$$
\displaystyle (\sqrt3+1)(\sqrt3-1)=3-1=2
$$

$$
\displaystyle (\sqrt2+1)^2=2+2\sqrt2+1=3+2\sqrt2
$$

::: sol
El primero es racional, el segundo es irracional
:::
:::

**Error típico:** suponer que la suma o el producto de dos irracionales es irracional. Es la clase de afirmación que la prueba pide refutar con un contraejemplo.

## 1.6. Matemática financiera (M2)

**Cuándo aparece:** créditos de consumo, créditos hipotecarios, ahorro y AFP. La prueba entrega en el enunciado las tasas y las fórmulas de cuota que necesita, lo que se evalúa es saber cuál usar.

| Tipo | Fórmula | Idea |
|---|---|---|
| Interés simple | $M=C(1+i\cdot n)$ | El interés se calcula siempre sobre el capital inicial |
| Interés compuesto | $M=C(1+i)^n$ | El interés de cada período se suma al capital y también genera interés |
| Cuota fija | $\text{cuota}=\dfrac{C\cdot i}{1-(1+i)^{-n}}$ | Crédito pagado en $n$ cuotas iguales |
| Costo total | $n\cdot\text{cuota}$ | Lo que se paga en total, los intereses son $n\cdot\text{cuota}-C$ |

$C$ es el capital, $i$ la tasa como decimal y $n$ el número de períodos. **La tasa y el tiempo deben estar en la misma unidad:** tasa mensual con meses, tasa anual con años.

::: flow
**Ejemplo resuelto: simple contra compuesto**

\$1.000.000 a 5% anual durante 3 años

Interés simple, el 5% siempre sobre el millón:

$$
\displaystyle 1.000.000\cdot(1+0{,}05\cdot3)=1.150.000
$$

Interés compuesto, cada año multiplica por $1{,}05$:

$$
\displaystyle 1.000.000\cdot1{,}05^3=1.157.625
$$

::: sol
Simple \$1.150.000, compuesto \$1.157.625

La diferencia de \$7.625 son los intereses que generaron los intereses
:::
:::

::: flow
**Ejemplo resuelto: crédito de consumo**

Pides \$1.000.000 a 12 cuotas mensuales iguales con tasa 2% mensual

Reemplaza en la fórmula de cuota con $i=0{,}02$ y $n=12$:

$$
\displaystyle \text{cuota}=\frac{1.000.000\cdot0{,}02}{1-1{,}02^{-12}}\approx94.560
$$

El costo total son las 12 cuotas:

$$
\displaystyle 12\cdot94.560=1.134.720
$$

::: sol
Cuota de \$94.560 y \$134.720 en intereses

Para comparar dos créditos se compara el costo total, no solo la cuota
:::
:::

**Crédito hipotecario:** es la misma fórmula de cuota con $n$ grande, en UF. El banco financia el precio menos el pie: una vivienda de 3.000 UF con 20% de pie deja un crédito de $3.000\cdot0{,}8=2.400$ UF.

::: flow
**Ejemplo resuelto: AFP**

Un sueldo imponible de \$800.000 cotiza 10% en la cuenta individual, y la AFP cobra una comisión de 1,2% del sueldo imponible

$$
\displaystyle 0{,}10\cdot800.000=80.000,\qquad 0{,}012\cdot800.000=9.600
$$

Si el fondo acumulado es de \$10.000.000 y rinde 4% anual compuesto, en 10 años:

$$
\displaystyle 10.000.000\cdot1{,}04^{10}\approx14.802.443
$$

::: sol
Se descuentan \$89.600 al mes, de los cuales \$80.000 van al fondo

El fondo llega a unos \$14.802.443
:::
:::

**Error típico:** pasar 2% mensual compuesto a 24% anual. Doce meses al 2% multiplican por $1{,}02^{12}\approx1{,}268$, o sea 26,8% anual.

## 1.7. Logaritmos (M2)

**Cuándo aparece:** despejar un exponente (cuánto tiempo tarda algo en crecer), pH, escalas, y simplificar con propiedades.

El logaritmo responde una pregunta: **¿a qué exponente hay que elevar la base para obtener el número?**

$$
\log_b a=c\iff b^c=a,\qquad b>0,\ b\neq1,\ a>0
$$

En la PAES, $\log x$ sin base escrita es el logaritmo en base 10 (así lo define la hoja de símbolos de la prueba), y cualquier otra base se escribe: $\log_2x$. Con esta lectura salen sin calcular: $\log_2 32=5$ porque $2^5=32$, $\log_3\frac{1}{9}=-2$ porque $3^{-2}=\frac{1}{9}$, y $\log_4 8=\frac{3}{2}$ porque $4^{\frac{3}{2}}=8$.

| Propiedad | Viene de |
|---|---|
| $\log_b 1=0$, $\ \log_b b=1$ | $b^0=1$, $\ b^1=b$ |
| $\log(x\cdot y)=\log x+\log y$ | Multiplicar potencias suma exponentes |
| $\log\left(\dfrac{x}{y}\right)=\log x-\log y$ | Dividir potencias resta exponentes |
| $\log(x^n)=n\log x$ | Potencia de potencia multiplica exponentes |
| $\log\sqrt[n]{x}=\dfrac{1}{n}\log x$ | Es el caso $x^{\frac{1}{n}}$ |
| $\log_b a=\dfrac{\log a}{\log b}$ | Cambio de base, para usar la calculadora |

::: flow
**Ejemplo resuelto: con valores dados**

Si $\log2\approx0{,}301$ y $\log3\approx0{,}477$, calcula $\log12$ y $\log1{,}5$

Descompón el número en factores 2 y 3:

$$
\displaystyle \log12=\log(2^2\cdot3)=2\log2+\log3
$$

$$
\displaystyle \log1{,}5=\log\frac{3}{2}=\log3-\log2
$$

::: sol
Resultado

$$
\log12\approx1{,}079,\qquad \log1{,}5\approx0{,}176
$$
:::
:::

::: flow
**Ejemplo resuelto: despejar un exponente**

Una colonia de 500 bacterias se duplica cada hora. ¿Cuándo llega a 8.000?

El modelo es $500\cdot2^t$. Iguala y divide por 500:

$$
\displaystyle 2^t=16
$$

Aquí el exponente sale a simple vista, $t=\log_2 16$. Si el número no fuera potencia exacta, por ejemplo $2^t=20$, se aplica log a ambos lados:

$$
\displaystyle t=\frac{\log20}{\log2}\approx4{,}32
$$

::: sol
Llega a 8.000 en 4 horas
:::
:::

**Error típico:** $\log(a+b)=\log a+\log b$, y $\dfrac{\log a}{\log b}=\log\dfrac{a}{b}$. Ninguna de las dos es una propiedad.

## 1.8. Práctica

La ayuda disminuye nivel a nivel. El nivel 4 tiene el formato de la prueba.

**Nivel 1: guiado**

1. Calcula $-2^2+(-3)^2-4:(-2)$.
    - La potencia de $-2^2$ afecta solo al 2.
    - Dividir dos números de distinto signo da negativo.
2. Un polerón de \$25.000 tiene 30% de descuento. ¿Cuánto pagas?
    - Bajar 30% es multiplicar por $0{,}7$.
3. Simplifica $\dfrac{2^5\cdot2^{-2}}{4}$.
    - Escribe $4=2^2$ y opera los exponentes.
4. Simplifica $\sqrt{48}$.
    - El mayor cuadrado perfecto que divide a 48 es 16.

<details>
<summary>Respuestas, nivel 1</summary>

1. $7$, porque $-4+9+2$
2. \$17.500, porque $25.000\cdot0{,}7$
3. $2$, porque $2^{5-2-2}=2^1$
4. $4\sqrt3$, porque $\sqrt{16\cdot3}$

</details>

**Nivel 2: una pista**

5. Ordena de menor a mayor $\frac{3}{4}$, $0{,}7$ y $\frac{5}{7}$.
    - Pasa todo a decimal.
6. Un precio sube 10% y luego sube otro 10%. ¿Cuál es la variación total?
    - Multiplica los factores.
7. Racionaliza $\dfrac{3}{\sqrt6}$.
    - Multiplica arriba y abajo por $\sqrt6$.
8. (M2) Calcula $\log_2 8+\log_3\frac{1}{3}-\log100$.
    - Pregunta a qué exponente hay que elevar cada base.
9. (M2) Depositas \$200.000 al 3% mensual compuesto durante 2 meses. ¿Cuánto tienes al final?
    - $M=C(1+i)^n$.

<details>
<summary>Respuestas, nivel 2</summary>

5. $0{,}7<\frac{5}{7}<\frac{3}{4}$, porque $\frac{5}{7}\approx0{,}714$ y $\frac{3}{4}=0{,}75$
6. Sube 21%, porque $1{,}1\cdot1{,}1=1{,}21$
7. $\dfrac{\sqrt6}{2}$, porque $\dfrac{3\sqrt6}{6}$
8. $0$, porque $3+(-1)-2$
9. \$212.180, porque $200.000\cdot1{,}03^2$

</details>

**Nivel 3: una palabra**

10. Escribe $0{,}4\overline{5}$ como fracción (semiperiódico)
11. Calcula $27^{\frac{2}{3}}\cdot9^{-\frac{1}{2}}$ (raíz primero)
12. Una boleta de \$71.400 incluye IVA. ¿Cuál es el neto? (dividir)
13. (M2) Ordena de menor a mayor $2\sqrt5$, $3\sqrt2$ y $\sqrt{19}$ (cuadrados)
14. (M2) Si $\log2\approx0{,}30$ y $\log3\approx0{,}48$, calcula $\log18$ (factores)

<details>
<summary>Respuestas, nivel 3</summary>

10. $\dfrac{41}{90}$, porque $\dfrac{45-4}{90}$
11. $3$, porque $9\cdot\dfrac{1}{3}$
12. \$60.000, porque $\dfrac{71.400}{1{,}19}$
13. $3\sqrt2<\sqrt{19}<2\sqrt5$, porque los cuadrados son 18, 19 y 20
14. $1{,}26$, porque $\log(2\cdot3^2)=0{,}30+2\cdot0{,}48$

</details>

**Nivel 4: sin ayuda, estilo PAES**

15. En un curso de 40 estudiantes, cada uno practica a lo más un deporte. $\frac{3}{8}$ del curso practica fútbol y $\frac{2}{5}$ del resto practica básquetbol. ¿Cuántos estudiantes no practican ninguno de los dos?

    A) 9
    B) 10
    C) 15
    D) 25

16. Una tienda sube el precio de un artículo en 25% y después lo ofrece con 20% de descuento. Respecto del precio original, el precio final es

    A) 5% mayor
    B) 5% menor
    C) igual
    D) 45% mayor

17. ¿Cuál es el valor de $\sqrt{12}+\sqrt{27}-\sqrt{75}$?

    A) $0$
    B) $\sqrt3$
    C) $-2\sqrt3$
    D) $10\sqrt3$

18. (M2) Una persona pide \$1.000.000 y lo paga en una sola cuota a 2 meses, con interés compuesto de 2% mensual. ¿Cuánto paga?

    A) \$1.020.000
    B) \$1.040.000
    C) \$1.040.400
    D) \$1.400.000

19. (M2) Una población de 200 bacterias se triplica cada hora. ¿En cuántas horas llega a 16.200?

    A) 3
    B) 4
    C) 27
    D) 81

20. (M2) Un sueldo imponible de \$900.000 cotiza 10% en la cuenta individual, y la AFP cobra una comisión de 1,5% del sueldo imponible. ¿Cuánto se descuenta en total por AFP?

    A) \$90.000
    B) \$91.350
    C) \$103.500
    D) \$115.000

<details>
<summary>Respuestas, nivel 4</summary>

15. C, 15 fútbol, del resto de 25 son 10 de básquetbol, y quedan 15
16. C, $1{,}25\cdot0{,}8=1$
17. A, $2\sqrt3+3\sqrt3-5\sqrt3=0$
18. C, $1.000.000\cdot1{,}02^2=1.040.400$, la B es interés simple
19. B, $3^t=\frac{16.200}{200}=81=3^4$
20. C, $90.000+13.500=103.500$, la B aplica la comisión sobre la cotización

</details>

</details>

---

<details>
<summary>

# 2. ÁLGEBRA {#algebra}

</summary>

Primera mitad del eje "Álgebra y funciones": manipular expresiones, proporciones, ecuaciones, inecuaciones y sistemas. Las funciones van en la pestaña 3.

## 2.1. Expresiones algebraicas

**Cuándo aparece:** "¿cuál expresión es equivalente a...?", simplificar una fracción con $x$, o calcular $52\cdot48$ sin calculadora.

Desarrollar es pasar de producto a suma, factorizar es lo contrario. Casi todo se resuelve con esta tabla, leída de izquierda a derecha para desarrollar y de derecha a izquierda para factorizar:

| Producto | Desarrollo | Nombre |
|---|---|---|
| $(a+b)^2$ | $a^2+2ab+b^2$ | Cuadrado de binomio |
| $(a-b)^2$ | $a^2-2ab+b^2$ | Cuadrado de binomio |
| $(a+b)(a-b)$ | $a^2-b^2$ | Suma por diferencia |
| $(x+a)(x+b)$ | $x^2+(a+b)x+ab$ | Binomios con término común |
| $(a+b)^3$ | $a^3+3a^2b+3ab^2+b^3$ | Cubo de binomio |
| $(a-b)^3$ | $a^3-3a^2b+3ab^2-b^3$ | Cubo de binomio |

**Error típico:** $(a+b)^2\neq a^2+b^2$. Falta el doble producto $2ab$: con $a=b=1$ queda $4\neq2$.

**Cómo decidir qué factorización usar**

1. Siempre primero el factor común: lo que se repite en todos los términos sale fuera del paréntesis.
2. Después cuenta los términos que quedan:
    - Dos términos con resta de cuadrados: suma por diferencia, $a^2-b^2=(a+b)(a-b)$.
    - Tres términos donde los extremos son cuadrados y el centro es su doble producto: cuadrado de binomio.
    - Tres términos $x^2+bx+c$: busca dos números que multiplicados den $c$ y sumados den $b$.

::: flow
**Ejemplo resuelto: factorizar en dos pasos**

$$
\displaystyle 3x^2-12
$$

El 3 está en los dos términos, sale como factor común:

$$
\displaystyle 3(x^2-4)
$$

Quedan dos términos que restan cuadrados, $x^2$ y $2^2$:

::: sol
Factorización

$$
3x^2-12=3(x+2)(x-2)
$$

Para verificar, desarrolla: $3(x^2-4)=3x^2-12$
:::
:::

::: flow
**Ejemplo resuelto: trinomio $x^2+bx+c$**

$$
\displaystyle x^2-5x+6
$$

Busca dos números que multiplicados den $6$ y sumados den $-5$. Como el producto es positivo y la suma negativa, los dos son negativos:

$$
\displaystyle (-2)\cdot(-3)=6,\qquad (-2)+(-3)=-5
$$

::: sol
Factorización

$$
x^2-5x+6=(x-2)(x-3)
$$
:::
:::

**Cálculo mental con productos notables**

::: flow
**Ejemplo resuelto: $998\cdot1002$ sin calculadora**

Los dos números están a la misma distancia de $1000$, así que es una suma por diferencia:

$$
\displaystyle 998\cdot1002=(1000-2)(1000+2)=1000^2-2^2
$$

::: sol
Resultado

$$
998\cdot1002=1.000.000-4=999.996
$$
:::
:::

**Fracciones algebraicas**

Solo se simplifican factores, nunca términos sueltos. Por eso el método es siempre el mismo: factoriza arriba, factoriza abajo y cancela lo que se repite.

::: flow
**Ejemplo resuelto: simplificar**

$$
\displaystyle \frac{x^2-9}{x^2+3x}
$$

Arriba suma por diferencia, abajo factor común $x$:

$$
\displaystyle \frac{(x+3)(x-3)}{x(x+3)}
$$

El factor $(x+3)$ multiplica arriba y abajo, se cancela:

::: sol
Resultado

$$
\frac{x^2-9}{x^2+3x}=\frac{x-3}{x},\qquad x\neq0,\ x\neq-3
$$

Los valores que anulaban el denominador original siguen prohibidos aunque el factor se haya ido
:::
:::

**Error típico:** cancelar términos. $\dfrac{x+3}{3}$ no es $x$, el 3 de arriba está sumando, no multiplicando.

## 2.2. Proporcionalidad

**Cuándo aparece:** recetas, precios por kilo, escalas, obreros que terminan una obra, llaves que llenan un estanque, velocidad y tiempo.

| | Directa | Inversa |
|---|---|---|
| Qué es constante | El cociente $\dfrac{y}{x}=k$ | El producto $x\cdot y=k$ |
| Fórmula | $y=kx$ | $y=\dfrac{k}{x}$ |
| Si $x$ se duplica | $y$ se duplica | $y$ se reduce a la mitad |
| Gráfico | Recta que pasa por el origen | Hipérbola, nunca toca los ejes |
| Ejemplos | Kilos y precio, horas y sueldo | Obreros y días, velocidad y tiempo |

Para reconocerla en una tabla no basta con ver que "uno sube y el otro baja": calcula el cociente y el producto de cada fila y mira cuál se mantiene.

**Error típico:** suponer que es inversa porque una magnitud disminuye. En $y=10-x$ una baja cuando la otra sube y no es proporcional de ningún tipo, ni el cociente ni el producto son constantes.

::: flow
**Ejemplo resuelto: directa**

Si 3 kg de manzanas cuestan \$4.500, ¿cuánto cuestan 5 kg?

El precio por kilo es la constante:

$$
\displaystyle k=\frac{4500}{3}=1500\ \text{pesos por kg}
$$

::: sol
Precio de 5 kg

$$
5\cdot1500=\$7.500
$$
:::
:::

::: flow
**Ejemplo resuelto: inversa**

6 obreros terminan una obra en 10 días. ¿Cuántos días tardan 4 obreros, trabajando al mismo ritmo?

Menos obreros, más días: es inversa, lo constante es el trabajo total en "días-obrero":

$$
\displaystyle 6\cdot10=60\ \text{días-obrero}
$$

::: sol
Días con 4 obreros

$$
\frac{60}{4}=15\ \text{días}
$$
:::
:::

::: flow
**Ejemplo resuelto: compuesta**

4 máquinas trabajando 6 horas producen 120 piezas. ¿Cuántas piezas producen 6 máquinas en 5 horas?

Las piezas son directamente proporcionales a las máquinas y a las horas, así que la unidad es "pieza por máquina-hora":

$$
\displaystyle \frac{120}{4\cdot6}=5\ \text{piezas por máquina-hora}
$$

::: sol
Producción

$$
6\cdot5\cdot5=150\ \text{piezas}
$$
:::
:::

## 2.3. Ecuaciones lineales

**Cuándo aparece:** despejes directos y, sobre todo, problemas de planteo: edades, números consecutivos, repartos, precios.

1. Elimina paréntesis.
2. Elimina denominadores multiplicando todo por el mínimo común múltiplo.
3. Pasa las $x$ a un lado y los números al otro.
4. Despeja y verifica reemplazando en la ecuación original.

::: flow
**Ejemplo resuelto: con fracciones**

$$
\displaystyle \frac{x+1}{3}-\frac{x-2}{4}=2
$$

El mcm de 3 y 4 es 12. Multiplica cada término por 12:

$$
\displaystyle 4(x+1)-3(x-2)=24
$$

El signo menos afecta a todo el numerador $x-2$, por eso el $-2$ pasa a $+6$:

$$
\displaystyle 4x+4-3x+6=24
$$

$$
\displaystyle x+10=24
$$

::: sol
Solución

$$
x=14
$$

Verificación: $\dfrac{15}{3}-\dfrac{12}{4}=5-3=2$
:::
:::

**Error típico:** escribir $-3x-6$ en vez de $-3x+6$. La raya de fracción funciona como un paréntesis.

**Traducir el enunciado**

| Enunciado | Expresión |
|---|---|
| El doble de un número | $2x$ |
| La mitad de un número | $\dfrac{x}{2}$ |
| Un número excede a otro en 5 | $x=y+5$ |
| Tres números consecutivos | $x,\ x+1,\ x+2$ |
| Tres pares consecutivos | $2n,\ 2n+2,\ 2n+4$ |
| La edad hace 4 años, en 6 años | $x-4$, $x+6$ |
| El 20% de un número | $0{,}2x$ |

::: flow
**Ejemplo resuelto: consecutivos**

La suma de tres números consecutivos es 87. ¿Cuáles son?

Llama $x$ al menor:

$$
\displaystyle x+(x+1)+(x+2)=87
$$

$$
\displaystyle 3x+3=87
$$

::: sol
Números

$$
x=28:\qquad 28,\ 29,\ 30
$$

Lee bien qué piden: si preguntan por el mayor, la respuesta es 30, no 28
:::
:::

## 2.4. Inecuaciones lineales

**Cuándo aparece:** "¿desde cuántos minutos conviene el plan B?", "¿cuál es el máximo de...?", o el conjunto solución escrito como intervalo.

Se resuelven igual que una ecuación, con una sola regla extra: **al multiplicar o dividir por un número negativo, la desigualdad se da vuelta.** La razón es que multiplicar por $-1$ refleja la recta: $2<3$, pero $-2>-3$.

| Desigualdad | Intervalo | En la recta |
|---|---|---|
| $x<a$ | $]-\infty,a[$ | Punto abierto en $a$, hacia la izquierda |
| $x\le a$ | $]-\infty,a]$ | Punto cerrado en $a$, hacia la izquierda |
| $x>a$ | $]a,+\infty[$ | Punto abierto en $a$, hacia la derecha |
| $a<x\le b$ | $]a,b]$ | Tramo entre $a$ (abierto) y $b$ (cerrado) |

El corchete hacia afuera, $]$ en el extremo izquierdo o $[$ en el derecho, significa que ese extremo no se incluye. Infinito siempre va abierto.

::: flow
**Ejemplo resuelto: el cambio de signo**

$$
\displaystyle 3-2x\ge7
$$

Resta 3 a ambos lados:

$$
\displaystyle -2x\ge4
$$

Divide por $-2$, que es negativo, y da vuelta el signo:

$$
\displaystyle x\le-2
$$

::: sol
Conjunto solución

$$
]-\infty,-2]
$$

Verificación con $x=-3$: $3+6=9\ge7$
:::
:::

::: flow
**Ejemplo resuelto: comparar planes**

El plan A cobra \$8.000 fijos más \$50 por minuto. El plan B cobra \$12.000 fijos más \$30 por minuto. ¿Desde cuántos minutos conviene el plan B?

Con $m$ minutos, B conviene cuando cuesta menos que A:

$$
\displaystyle 12000+30m<8000+50m
$$

$$
\displaystyle 4000<20m
$$

::: sol
Respuesta

$$
m>200
$$

Con más de 200 minutos conviene B. Con exactamente 200 cuestan lo mismo, \$18.000
:::
:::

::: flow
**Ejemplo resuelto: inecuación doble**

$$
\displaystyle -1<2x+3\le9
$$

Todo lo que hagas, hazlo en las tres partes. Resta 3:

$$
\displaystyle -4<2x\le6
$$

Divide por 2, positivo, los signos se mantienen:

::: sol
Conjunto solución

$$
-2<x\le3\qquad\Longrightarrow\qquad ]-2,3]
$$
:::
:::

## 2.5. Sistemas de ecuaciones 2x2

**Cuándo aparece:** dos incógnitas y dos datos: entradas de adulto y niño, monedas de dos valores, mezclas, edades de dos personas.

Los tres métodos dan lo mismo. Elige el que menos cuentas te cueste:

| Método | Úsalo cuando | Idea |
|---|---|---|
| Sustitución | Una incógnita tiene coeficiente 1 | Despeja esa y reemplázala en la otra ecuación |
| Igualación | Ambas ecuaciones ya están despejadas para la misma letra | Iguala los dos despejes |
| Reducción | En cualquier otro caso | Multiplica para que una letra tenga coeficientes opuestos y suma |

::: flow
**Ejemplo resuelto: reducción**

$$
\displaystyle
\begin{cases}
2x+3y=12\\
5x-3y=9
\end{cases}
$$

La $y$ ya tiene coeficientes opuestos, $+3$ y $-3$. Suma las ecuaciones:

$$
\displaystyle 7x=21\quad\Rightarrow\quad x=3
$$

Reemplaza en la primera:

$$
\displaystyle 6+3y=12\quad\Rightarrow\quad y=2
$$

::: sol
Solución

$$
x=3,\qquad y=2
$$

Verifica en la segunda, que no usaste para despejar: $15-6=9$
:::
:::

::: flow
**Ejemplo resuelto: planteo**

3 entradas de adulto y 2 de niño cuestan \$13.000. 2 de adulto y 4 de niño cuestan \$14.000. ¿Cuánto cuesta cada una?

Con $a$ el precio de adulto y $n$ el de niño:

$$
\displaystyle
\begin{cases}
3a+2n=13000\\
2a+4n=14000
\end{cases}
$$

Multiplica la primera por 2 para igualar los coeficientes de $n$:

$$
\displaystyle 6a+4n=26000
$$

Réstale la segunda:

$$
\displaystyle 4a=12000\quad\Rightarrow\quad a=3000
$$

::: sol
Precios

$$
a=\$3.000,\qquad n=\$2.000
$$

Verificación: $2\cdot3000+4\cdot2000=14000$
:::
:::

**Error típico:** encontrar $x$ y $y$ y marcar una de ellas cuando la pregunta era otra cosa, por ejemplo el total o la diferencia.

## 2.6. Cantidad de soluciones de un sistema (M2)

**Cuándo aparece:** "¿para qué valor de $k$ el sistema no tiene solución?" o "¿cuál sistema tiene infinitas soluciones?".

Cada ecuación es una recta. Dos rectas se cortan en un punto, son paralelas o son la misma. Para saber cuál sin graficar, compara los coeficientes de

$$
\begin{cases}
ax+by=c\\
dx+ey=f
\end{cases}
$$

| Comparación | Rectas | Soluciones |
|---|---|---|
| $\dfrac{a}{d}\neq\dfrac{b}{e}$ | Se cortan | Una única solución |
| $\dfrac{a}{d}=\dfrac{b}{e}\neq\dfrac{c}{f}$ | Paralelas distintas | Ninguna |
| $\dfrac{a}{d}=\dfrac{b}{e}=\dfrac{c}{f}$ | La misma recta | Infinitas |

Que $\dfrac{a}{d}=\dfrac{b}{e}$ significa que las dos rectas tienen la misma pendiente. Si hay ceros en los denominadores, compara multiplicando cruzado: $ae=bd$.

::: flow
**Ejemplo resuelto: valor de $k$ sin solución**

$$
\displaystyle
\begin{cases}
kx+2y=5\\
3x+6y=1
\end{cases}
$$

Para no tener solución, las rectas deben ser paralelas: los coeficientes de $x$ y de $y$ deben ser proporcionales:

$$
\displaystyle \frac{k}{3}=\frac{2}{6}\quad\Rightarrow\quad k=1
$$

Revisa que los términos libres no sigan la misma proporción, porque si la siguen las rectas son la misma:

$$
\displaystyle \frac{5}{1}=5\neq\frac{2}{6}
$$

::: sol
Respuesta

$$
k=1
$$

Para cualquier otro $k$ hay solución única. Infinitas soluciones no hay para ningún $k$
:::
:::

::: flow
**Ejemplo resuelto: infinitas soluciones**

$$
\displaystyle
\begin{cases}
2x-y=3\\
4x-2y=6
\end{cases}
$$

La segunda es la primera multiplicada por 2:

$$
\displaystyle \frac{2}{4}=\frac{-1}{-2}=\frac{3}{6}=\frac12
$$

::: sol
Infinitas soluciones

Son la misma recta $y=2x-3$: cualquier punto de ella sirve, por ejemplo $(0,-3)$ o $(2,1)$
:::
:::

## 2.7. Práctica

**Nivel 1: guiado**

1. Desarrolla $(3x+2)^2$.
    - Usa $a^2+2ab+b^2$ con $a=3x$ y $b=2$.
2. Factoriza $x^2+7x+12$.
    - Dos números que multiplicados den 12 y sumados den 7.
3. Resuelve $5x-7=2x+8$.
    - Pasa las $x$ a la izquierda y los números a la derecha.
4. Si 4 cuadernos cuestan \$6.000, ¿cuánto cuestan 7?
    - Directa: calcula primero el precio de uno.

<details>
<summary>Respuestas, nivel 1</summary>

1. $9x^2+12x+4$, el doble producto es $2\cdot3x\cdot2=12x$
2. $(x+3)(x+4)$, porque $3\cdot4=12$ y $3+4=7$
3. $x=5$, queda $3x=15$
4. \$10.500, cada uno cuesta \$1.500

</details>

**Nivel 2: una pista**

5. Simplifica $\dfrac{x^2-4x+4}{x^2-4}$.
    - Arriba hay un cuadrado de binomio y abajo una suma por diferencia.
6. Resuelve $1-3x>2x+11$ y escribe el intervalo.
    - Vas a dividir por un negativo.
7. 8 llaves iguales llenan un estanque en 9 horas. ¿Cuánto tardan 12 llaves?
    - Más llaves, menos horas: el producto es constante.
8. Resuelve $x+2y=7,\ 3x-y=7$.
    - Sustitución: $x=7-2y$.

<details>
<summary>Respuestas, nivel 2</summary>

5. $\dfrac{x-2}{x+2}$ con $x\neq\pm2$, porque $\dfrac{(x-2)^2}{(x-2)(x+2)}$
6. $x<-2$, es decir $]-\infty,-2[$, de $-5x>10$ dividiendo por $-5$
7. 6 horas, $8\cdot9=72$ y $72/12=6$
8. $x=3,\ y=2$, queda $21-7y=7$

</details>

**Nivel 3: una palabra**

9. Calcula $52\cdot48$ sin calculadora (suma por diferencia)
10. Un padre tiene 36 años más que su hijo, y en 6 años tendrá el triple de la edad del hijo. ¿Qué edad tiene el hijo? (planteo)
11. Conjunto solución de $-3\le1-2x<5$ (doble)
12. (M2) ¿Para qué valor de $m$ el sistema $2x+my=4,\ x+3y=2$ tiene infinitas soluciones? (proporción)

<details>
<summary>Respuestas, nivel 3</summary>

9. $2496$, porque $(50+2)(50-2)=2500-4$
10. 12 años, de $h+36+6=3(h+6)$. El padre tiene 48 y en 6 años $54=3\cdot18$
11. $]-2,2]$, de $-4\le-2x<4$ dividiendo por $-2$ y dando vuelta ambos signos
12. $m=6$, porque $\dfrac{2}{1}=\dfrac{m}{3}=\dfrac{4}{2}$

</details>

**Nivel 4: sin ayuda, estilo PAES**

13. En una tienda, 2 poleras y 3 pantalones cuestan \$49.000, y 3 poleras y 1 pantalón cuestan \$35.000. ¿Cuánto cuesta un pantalón?

    A) \$8.000  
    B) \$11.000  
    C) \$13.000  
    D) \$19.000

14. ¿Cuál de las siguientes expresiones es equivalente a $(a-b)^2-(a+b)^2$?

    A) $0$  
    B) $-2b^2$  
    C) $-4ab$  
    D) $4ab$

15. Un auto recorre la distancia entre dos ciudades en 3 horas a 80 km/h. ¿A qué velocidad constante debe ir para hacer el mismo recorrido en 2,5 horas?

    A) Aproximadamente 66,7 km/h  
    B) 90 km/h  
    C) 96 km/h  
    D) 100 km/h

16. Un taxi cobra \$500 al subir y \$150 por cada 200 m recorridos. Si una persona tiene \$5.000, ¿cuál es la mayor distancia que puede recorrer?

    A) 5,8 km  
    B) 6 km  
    C) 6,6 km  
    D) 30 km

17. (M2) ¿Para qué valor de $k$ el sistema $3x-2y=5,\ 6x+ky=7$ no tiene solución?

    A) $-4$  
    B) $4$  
    C) $-2$  
    D) $2$  
    E) Para ningún valor real

18. En un estacionamiento hay 30 vehículos entre autos y motos, y en total suman 100 ruedas. Si $a$ es la cantidad de autos y $m$ la de motos, ¿cuál sistema representa la situación?

    A) $a+m=100,\ 4a+2m=30$  
    B) $a+m=30,\ 4a+2m=100$  
    C) $a+m=30,\ 2a+4m=100$  
    D) $4a+2m=30,\ a+m=100$

<details>
<summary>Respuestas, nivel 4</summary>

13. B. De $q=35000-3p$ en la primera: $p=8000$ (polera, alternativa A) y $q=11000$
14. C. $(a^2-2ab+b^2)-(a^2+2ab+b^2)=-4ab$
15. C. Es inversa: $80\cdot3=240$ km y $240/2{,}5=96$. La A sale de tratarla como directa
16. B. $500+150n\le5000$ da $n\le30$ tramos, $30\cdot200=6000$ m. La C olvida los \$500 iniciales
17. A. $\dfrac{3}{6}=\dfrac{-2}{k}$ da $k=-4$, y $\dfrac{5}{7}\neq\dfrac12$, así que son paralelas distintas
18. B. Una ecuación cuenta vehículos y la otra ruedas, 4 por auto y 2 por moto. Resolviendo hay 20 autos y 10 motos

</details>

</details>

---

<details>
<summary>

# 3. FUNCIONES {#funciones}

</summary>

Segunda mitad del eje Álgebra y funciones: leer, construir y comparar funciones a partir de una tabla, un gráfico o un enunciado.

## 3.1. Función lineal y afín

**Cuándo aparece:** algo cambia siempre en la misma cantidad por cada unidad: tarifas con cargo fijo más un cobro por minuto, un estanque que se llena a caudal constante, un sueldo base más comisión.

$$
\boxed{f(x)=mx+n}
$$

- $m$ es la **pendiente**: cuánto cambia $f$ cuando $x$ aumenta en 1. En una tarifa es el precio por unidad.
- $n$ es el **coeficiente de posición**: el valor cuando $x=0$, donde la recta corta el eje $Y$. En una tarifa es el cargo fijo.
- Si $n=0$ la función es **lineal**: pasa por el origen y es una proporcionalidad directa. Si $n\neq0$ es **afín**.

| Lo que ves | Lo que significa |
|---|---|
| $m>0$ | La recta sube de izquierda a derecha |
| $m<0$ | La recta baja |
| $m=0$ | Recta horizontal, $f$ constante |
| $\lvert m\rvert$ más grande | Recta más empinada |
| $n>0$ / $n<0$ | Corta el eje $Y$ sobre / bajo el origen |

**Pendiente desde dos puntos:** cuánto sube dividido por cuánto avanza.

$$
m=\frac{y_2-y_1}{x_2-x_1}
$$

::: flow
**Ejemplo resuelto: recta por dos puntos**

Una función afín cumple $f(2)=7$ y $f(6)=19$

Entre $x=2$ y $x=6$ avanza 4 y sube 12, así que sube 3 por cada unidad:

$$
\displaystyle m=\frac{19-7}{6-2}=\frac{12}{4}=3
$$

Para $n$, reemplaza un punto conocido en $f(x)=3x+n$:

$$
\displaystyle 7=3\cdot2+n\quad\Rightarrow\quad n=1
$$

::: sol
Función

$$
f(x)=3x+1
$$

Comprueba con el otro punto: $3\cdot6+1=19$
:::
:::

::: flow
**Ejemplo resuelto: comparar dos planes**

El plan A cobra \$8.000 fijos más \$50 por minuto. El plan B cobra \$3.000 fijos más \$100 por minuto. ¿Desde cuántos minutos conviene el plan A?

Cada plan es una función afín del número de minutos $x$:

$$
\displaystyle A(x)=50x+8000,\qquad B(x)=100x+3000
$$

Las rectas se cruzan donde los costos son iguales:

$$
\displaystyle 50x+8000=100x+3000\quad\Rightarrow\quad 5000=50x\quad\Rightarrow\quad x=100
$$

::: sol
Respuesta

En 100 minutos ambos cuestan \$13.000. Con más de 100 minutos conviene A, porque su pendiente es menor: cada minuto extra le suma menos
:::
:::

**Error típico:** confundir la pendiente con el cargo fijo. En "\$400 de bajada de bandera más \$160 por cada 200 m", la pendiente por kilómetro es $5\cdot160=800$, no 160.

## 3.2. Ecuación de segundo grado

**Cuándo aparece:** buscar los ceros de una parábola, cuándo un proyectil toca el suelo, qué medidas dan un área pedida.

La ecuación es $ax^2+bx+c=0$ con $a\neq0$. Elige el método según su forma, del más rápido al más general:

| Forma | Método | Ejemplo |
|---|---|---|
| Falta $c$: $ax^2+bx=0$ | Factoriza $x$: $x(ax+b)=0$ | $x^2-3x=0\Rightarrow x=0,\ x=3$ |
| Falta $b$: $ax^2+c=0$ | Despeja $x^2$ y saca raíz con $\pm$ | $x^2-9=0\Rightarrow x=\pm3$ |
| Factorizable a simple vista | Dos números que sumen $-b$ y multipliquen $c$ (con $a=1$) | $x^2-5x+6=(x-2)(x-3)$ |
| Cualquier otra | Fórmula general | La de abajo |

$$
\boxed{x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}}
$$

El **discriminante** $\Delta=b^2-4ac$ es lo que está dentro de la raíz, y por eso decide cuántas soluciones hay sin resolver nada:

| $\Delta$ | Soluciones reales | La parábola |
|---|---|---|
| $\Delta>0$ | Dos distintas | Corta el eje $X$ en dos puntos |
| $\Delta=0$ | Una (repetida) | Toca el eje $X$ en el vértice |
| $\Delta<0$ | Ninguna | No toca el eje $X$ |

Sin resolver también sabes la suma y el producto de las soluciones, útil cuando la pregunta pide solo eso:

$$
x_1+x_2=-\frac{b}{a},\qquad x_1\cdot x_2=\frac{c}{a}
$$

::: flow
**Ejemplo resuelto: factorizando**

$$
\displaystyle x^2-5x+6=0
$$

Busca dos números que multiplicados den 6 y sumados den 5: son 2 y 3, así que

$$
\displaystyle (x-2)(x-3)=0
$$

Un producto es cero solo si uno de los factores es cero.

::: sol
Soluciones

$$
x=2\quad\text{o}\quad x=3
$$
:::
:::

::: flow
**Ejemplo resuelto: fórmula general**

$$
\displaystyle 2x^2+3x-2=0,\qquad a=2,\ b=3,\ c=-2
$$

Primero el discriminante:

$$
\displaystyle \Delta=3^2-4\cdot2\cdot(-2)=9+16=25
$$

Es positivo, hay dos soluciones, y su raíz es exacta:

$$
\displaystyle x=\frac{-3\pm5}{4}
$$

::: sol
Soluciones

$$
x=\frac{1}{2}\quad\text{o}\quad x=-2
$$
:::
:::

**Error típico:** en $x^2=3x$ dividir ambos lados por $x$ y quedarse solo con $x=3$. Al dividir por $x$ se pierde $x=0$. Pasa todo a un lado y factoriza: $x(x-3)=0$.

## 3.3. Función cuadrática: gráfico y parámetros

**Cuándo aparece:** reconocer qué gráfico corresponde a $f(x)=ax^2+bx+c$, o deducir signos de $a$, $b$, $c$ mirando una parábola.

Cada parámetro se lee en un lugar distinto del gráfico:

| Parámetro | Qué decide | Por qué |
|---|---|---|
| $a>0$ | Abre hacia arriba, el vértice es un mínimo | Para $x$ grande manda $ax^2$, positivo |
| $a<0$ | Abre hacia abajo, el vértice es un máximo | $ax^2$ se vuelve muy negativo |
| $\lvert a\rvert$ grande | Parábola más angosta | Crece más rápido |
| $c$ | Corta el eje $Y$ en $(0,c)$ | $f(0)=c$ |
| $b$ junto con $a$ | Lado del eje de simetría | $x_v=-\dfrac{b}{2a}$ |
| $\Delta$ | Cuántas veces corta el eje $X$ | Ver 3.2 |

Para el lado del vértice: si $a$ y $b$ tienen el mismo signo, el vértice queda a la izquierda del eje $Y$; si tienen signos distintos, a la derecha; si $b=0$, sobre el eje $Y$.

**Puntos especiales**

| Punto | Cómo se calcula |
|---|---|
| Vértice | $x_v=-\dfrac{b}{2a}$, luego $y_v=f(x_v)$ |
| Eje de simetría | La recta vertical $x=x_v$ |
| Ceros (corte con eje $X$) | Resuelve $f(x)=0$ |
| Corte con eje $Y$ | $(0,c)$ |
| Recorrido | $[y_v,+\infty[$ si $a>0$, $]-\infty,y_v]$ si $a<0$ |

**Traslaciones:** escrita como $f(x)=a(x-h)^2+k$, el vértice es $(h,k)$. Cambiar $x$ por $x-5$ mueve el gráfico 5 unidades a la **derecha** (el signo engaña), y sumar 5 afuera lo sube 5.

::: flow
**Ejemplo resuelto: analizar una parábola**

Considera la función $f$, cuyo dominio es el conjunto de los números reales, definida por $f(x)=x^2-4x+3$

$a=1>0$, abre hacia arriba. Corta el eje $Y$ en $(0,3)$.

Vértice:

$$
\displaystyle x_v=-\frac{-4}{2\cdot1}=2,\qquad y_v=2^2-4\cdot2+3=-1
$$

Ceros, factorizando:

$$
\displaystyle x^2-4x+3=(x-1)(x-3)=0\quad\Rightarrow\quad x=1,\ x=3
$$

Tabla de valores, simétrica en torno a $x=2$:

| $x$ | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| $f(x)$ | 3 | 0 | $-1$ | 0 | 3 |

::: sol
Resumen

Vértice $(2,-1)$ mínimo, ceros en $x=1$ y $x=3$, corte con $Y$ en $(0,3)$, recorrido $[-1,+\infty[$

En forma canónica: $f(x)=(x-2)^2-1$
:::
:::

**Error típico:** creer que $c$ decide si la parábola corta el eje $X$. Eso lo decide $\Delta$; $c$ solo dice dónde corta el eje $Y$.

## 3.4. Problemas de máximo y mínimo

**Cuándo aparece:** "altura máxima", "área máxima", "ingreso máximo", "costo mínimo". Si la cantidad es cuadrática, el óptimo está en el vértice.

1. Escribe la cantidad a optimizar como función de una sola variable.
2. Calcula $x_v=-\dfrac{b}{2a}$: es **dónde** ocurre el óptimo.
3. Calcula $f(x_v)$: es **cuánto** vale el óptimo.
4. Lee bien qué pregunta: el tiempo, la altura, la medida o el área.

::: flow
**Ejemplo resuelto: lanzamiento vertical**

Una pelota se lanza desde lo alto de un edificio y su altura, en metros, a los $t$ segundos es $h(t)=-5t^2+20t+25$

El máximo está en el vértice, porque $a=-5<0$:

$$
\displaystyle t_v=-\frac{20}{2\cdot(-5)}=2,\qquad h(2)=-20+40+25=45
$$

Llega al suelo cuando $h(t)=0$. Divide por $-5$ para simplificar:

$$
\displaystyle t^2-4t-5=0\quad\Rightarrow\quad(t-5)(t+1)=0
$$

$t=-1$ se descarta porque el tiempo no es negativo.

::: sol
Respuesta

Altura máxima 45 m a los 2 s, llega al suelo a los 5 s. Parte desde 25 m, que es $h(0)$
:::
:::

::: flow
**Ejemplo resuelto: área máxima**

Con 40 m de malla se cerca un terreno rectangular por sus cuatro lados. ¿Qué medidas dan el área máxima?

Si un lado mide $x$, el perímetro obliga a que el otro mida $20-x$:

$$
\displaystyle A(x)=x(20-x)=-x^2+20x
$$

Vértice:

$$
\displaystyle x_v=-\frac{20}{2\cdot(-1)}=10,\qquad A(10)=10\cdot10=100
$$

::: sol
Respuesta

Un cuadrado de 10 m por lado, con 100 m² de área
:::
:::

**Error típico:** responder $x_v$ cuando piden el valor máximo, o al revés. "¿Cuándo?" es $x_v$, "¿cuánto?" es $f(x_v)$.

## 3.5. Función potencia (M2)

**Cuándo aparece:** cantidades que dependen de una medida elevada a un exponente: área (cuadrado del lado), volumen (cubo de la arista), y preguntas sobre la forma del gráfico de $f(x)=ax^n$.

| $f(x)=ax^n$, $n$ natural | Forma del gráfico |
|---|---|
| $n$ par ($x^2,x^4$) | Forma de U, simétrica respecto del eje $Y$, nunca negativa si $a>0$ |
| $n$ impar ($x^3,x^5$) | Forma de S, pasa por el origen, negativa para $x<0$ si $a>0$ |
| $a<0$ | El mismo gráfico reflejado respecto del eje $X$ |

Todas pasan por $(0,0)$ y por $(1,a)$. Entre 0 y 1, a mayor exponente más chico el valor: $0{,}5^2=0{,}25$ pero $0{,}5^3=0{,}125$. Después de 1 es al revés.

La idea clave es el **efecto de escalar**: si $x$ se multiplica por $k$, $f(x)=ax^n$ se multiplica por $k^n$.

::: flow
**Ejemplo resuelto: duplicar la arista**

Un cubo de arista 3 cm se reemplaza por otro de arista 6 cm. ¿Cuántas veces aumenta el volumen?

$V(a)=a^3$ es una función potencia con $n=3$, y la arista se multiplica por $k=2$:

$$
\displaystyle \frac{V(6)}{V(3)}=\frac{216}{27}=8=2^3
$$

::: sol
Respuesta

El volumen se multiplica por 8, no por 2. El área de cada cara, que es potencia 2, se multiplica por 4
:::
:::

## 3.6. Función exponencial y logarítmica (M2)

**Cuándo aparece:** algo cambia en un **porcentaje fijo** por período: bacterias que se duplican, poblaciones, intereses, depreciación, sustancias radiactivas, medicamentos en la sangre.

$$
\boxed{f(t)=a\cdot b^{t}}
$$

- $a$ es el valor inicial, $f(0)=a$.
- $b$ es el factor por período: crece un 20% $\Rightarrow b=1{,}2$; baja un 20% $\Rightarrow b=0{,}8$; se duplica $\Rightarrow b=2$.
- Si el período no es 1, divide: "se duplica cada 3 horas" es $2^{t/3}$.

| | $b>1$ | $0<b<1$ |
|---|---|---|
| Comportamiento | Crece | Decrece |
| Corte con eje $Y$ | $(0,a)$ | $(0,a)$ |
| Asíntota | El eje $X$ hacia la izquierda | El eje $X$ hacia la derecha |
| Recorrido ($a>0$) | $]0,+\infty[$ | $]0,+\infty[$ |

**Logarítmica:** $g(x)=\log_b x$ es la inversa de $b^x$, su gráfico es el de $b^x$ reflejado en la recta $y=x$. Dominio $]0,+\infty[$, pasa por $(1,0)$, el eje $Y$ es asíntota. En la PAES, $\log$ sin base es base 10.

| $x$ | $\frac14$ | $\frac12$ | 1 | 2 | 4 | 8 |
|---|---|---|---|---|---|---|
| $\log_2 x$ | $-2$ | $-1$ | 0 | 1 | 2 | 3 |

**Cuándo usar logaritmo:** cuando la incógnita está en el exponente. Si ambos lados se escriben con la misma base, iguala exponentes; si no, aplica $\log$ a ambos lados y baja el exponente (propiedades en el eje Números).

::: flow
**Ejemplo resuelto: crecimiento**

Un cultivo tiene 500 bacterias y se duplica cada 3 horas

$$
\displaystyle N(t)=500\cdot2^{t/3}
$$

A las 12 horas pasaron 4 períodos:

$$
\displaystyle N(12)=500\cdot2^{4}=8000
$$

¿Cuándo llega a 32.000? Divide por 500 y escribe 64 como potencia de 2:

$$
\displaystyle 2^{t/3}=64=2^{6}\quad\Rightarrow\quad\frac{t}{3}=6
$$

::: sol
Respuesta

8.000 bacterias a las 12 horas, 32.000 a las 18 horas
:::
:::

::: flow
**Ejemplo resuelto: decaimiento con logaritmo**

Un paciente tiene 100 mg de un medicamento en la sangre, y cada hora se elimina el 20% de lo que queda

Queda el 80% cada hora:

$$
\displaystyle C(t)=100\cdot0{,}8^{t},\qquad C(2)=100\cdot0{,}64=64
$$

¿Cuándo queda la mitad? $0{,}8^t=0{,}5$ no se escribe con la misma base, así que aplica $\log$:

$$
\displaystyle t\log0{,}8=\log0{,}5\quad\Rightarrow\quad t=\frac{\log0{,}5}{\log0{,}8}\approx3{,}1
$$

::: sol
Respuesta

64 mg a las 2 horas, la mitad en algo más de 3 horas
:::
:::

**Error típico:** escribir $500\cdot2^t$ como $1000^t$. La potencia se calcula antes que la multiplicación, solo el 2 está elevado.

## 3.7. Funciones seno y coseno (M2)

**Cuándo aparece:** fenómenos que se repiten: mareas, la altura en una rueda de la fortuna, temperatura a lo largo del día, un resorte.

Valores que conviene saber, en grados y radianes:

| $x$ | $0$ | $90^\circ=\frac{\pi}{2}$ | $180^\circ=\pi$ | $270^\circ=\frac{3\pi}{2}$ | $360^\circ=2\pi$ |
|---|---|---|---|---|---|
| $\operatorname{sen}x$ | 0 | 1 | 0 | $-1$ | 0 |
| $\cos x$ | 1 | 0 | $-1$ | 0 | 1 |

Ambas oscilan entre $-1$ y $1$ y se repiten cada $2\pi$. El coseno es el seno adelantado: parte en su máximo.

Para $f(x)=a\operatorname{sen}(bx)+d$ o $f(x)=a\cos(bx)+d$:

| Parámetro | Efecto en el gráfico |
|---|---|
| $\lvert a\rvert$ | **Amplitud**: cuánto sube y baja respecto del centro |
| $b$ | **Período** $\dfrac{2\pi}{b}$: tiempo de una oscilación completa |
| $d$ | Línea central: el máximo es $d+\lvert a\rvert$, el mínimo $d-\lvert a\rvert$ |
| $a<0$ | Gráfico invertido: el coseno parte en su mínimo |

::: flow
**Ejemplo resuelto: rueda de la fortuna**

La altura, en metros, de una cabina a los $t$ minutos es $h(t)=12-10\cos\left(\dfrac{\pi t}{15}\right)$

Período: una vuelta completa.

$$
\displaystyle \frac{2\pi}{\pi/15}=30\ \text{minutos}
$$

Centro 12 y amplitud 10:

$$
\displaystyle h_{max}=12+10=22,\qquad h_{min}=12-10=2
$$

Como $a=-10<0$, en $t=0$ está abajo: $h(0)=12-10\cdot1=2$. A los 5 minutos, con $\cos\frac{\pi}{3}=0{,}5$:

$$
\displaystyle h(5)=12-10\cdot0{,}5=7
$$

::: sol
Respuesta

Una vuelta dura 30 min, la cabina va de 2 m a 22 m, y llega arriba a los 15 min
:::
:::

**Error típico:** calcular el período como $2\pi\cdot b$ en vez de $\dfrac{2\pi}{b}$, o usar la calculadora en grados cuando el argumento está en radianes.

## 3.8. Práctica

La ayuda disminuye nivel a nivel.

**Nivel 1: guiado**

1. Un plan de telefonía cobra \$6.000 fijos más \$40 por minuto. Escribe el costo $f(x)$ y calcula el de 150 minutos.
    - El cargo fijo es $n$ y el precio por minuto es $m$.
2. Resuelve $x^2-7x+10=0$.
    - Dos números que multiplicados den 10 y sumados den 7.
3. Encuentra el vértice de $f(x)=x^2-6x+5$.
    - $x_v=-\dfrac{b}{2a}$, luego reemplaza en $f$.
4. (M2) Una población de 200 conejos se triplica cada año. ¿Cuántos hay a los 3 años?
    - $P(t)=200\cdot3^t$.

<details>
<summary>Respuestas, nivel 1</summary>

1. $f(x)=40x+6000$, $f(150)=\$12.000$
2. $(x-2)(x-5)=0$, $x=2$ o $x=5$
3. $x_v=3$, $f(3)=-4$, vértice $(3,-4)$
4. $200\cdot27=5.400$ conejos

</details>

**Nivel 2: una pista**

5. Encuentra la función afín cuyo gráfico pasa por $(1,5)$ y $(4,-1)$.
    - Primero la pendiente, después $n$.
6. ¿Para qué valor de $k$ la ecuación $x^2+6x+k=0$ tiene una única solución?
    - Una solución significa $\Delta=0$.
7. Un balón pateado hacia arriba tiene altura $h(t)=-5t^2+30t$ metros. Calcula la altura máxima y cuándo vuelve al suelo.
    - El máximo está en el vértice.
8. (M2) Resuelve $2^x=40$.
    - 40 no es potencia de 2: aplica $\log$ a ambos lados.
9. (M2) Encuentra amplitud, período, máximo y mínimo de $f(t)=3+2\operatorname{sen}\left(\dfrac{\pi t}{6}\right)$, la altura de la marea en metros a las $t$ horas.
    - Período $\dfrac{2\pi}{b}$.

<details>
<summary>Respuestas, nivel 2</summary>

5. $m=\dfrac{-1-5}{4-1}=-2$, $n=7$, $f(x)=-2x+7$
6. $36-4k=0$, $k=9$
7. $t_v=3$, altura máxima 45 m, vuelve al suelo a los 6 s
8. $x=\dfrac{\log40}{\log2}\approx5{,}32$
9. Amplitud 2 m, período 12 h, máximo 5 m, mínimo 1 m

</details>

**Nivel 3: una palabra**

10. Con 60 m de malla se cerca un corral rectangular junto a un muro, así que solo se cercan tres lados. ¿Cuál es el área máxima? (vértice)
11. La empresa A cobra \$20.000 más \$500 por km y la empresa B cobra \$35.000 más \$200 por km. ¿Desde cuántos km conviene B? (igualar)
12. (M2) Un auto de \$12.000.000 pierde un 15% de su valor cada año. ¿Cuánto vale a los 2 años? (factor)
13. (M2) Si la arista de un cubo se triplica, ¿por cuánto se multiplica su volumen? (potencia)

<details>
<summary>Respuestas, nivel 3</summary>

10. $A(x)=x(60-2x)$, $x_v=15$, el corral mide 15 m por 30 m con 450 m²
11. $20000+500x=35000+200x$ da $x=50$: con más de 50 km conviene B
12. $12.000.000\cdot0{,}85^2=\$8.670.000$
13. $3^3=27$ veces

</details>

**Nivel 4: sin ayuda, estilo PAES**

14. La parábola asociada a $f(x)=ax^2+bx+c$ abre hacia abajo, corta el eje $Y$ bajo el origen y tiene su vértice a la derecha del eje $Y$. ¿Cuál de las siguientes opciones es verdadera?

    A) $a>0$, $b>0$ y $c<0$
    B) $a<0$, $b>0$ y $c<0$
    C) $a<0$, $b<0$ y $c<0$
    D) $a<0$, $b>0$ y $c>0$

15. Un taxi cobra \$400 de bajada de bandera y \$160 por cada 200 m recorridos. ¿Cuál de las siguientes funciones representa el costo, en pesos, de un viaje de $x$ km?

    A) $f(x)=160x+400$
    B) $f(x)=800x+400$
    C) $f(x)=400x+160$
    D) $f(x)=32x+400$

16. Considera la función $f$, cuyo dominio es el conjunto de los números reales, definida por $f(x)=x^2-2x+3$. ¿Cuál de las siguientes funciones tiene como gráfica la parábola asociada a $f$, trasladada 3 unidades hacia la derecha?

    A) $g(x)=x^2-8x+18$
    B) $g(x)=x^2+4x+6$
    C) $g(x)=x^2-2x+6$
    D) $g(x)=x^2-2x$

17. ¿Cuál es la suma de las soluciones de la ecuación $2x^2-8x+3=0$?

    A) $-4$
    B) $\dfrac{3}{2}$
    C) $4$
    D) $8$

18. (M2) La masa, en gramos, de una sustancia radiactiva a los $t$ años es $Q(t)=80\cdot\left(\dfrac{1}{2}\right)^{t/5}$. ¿A los cuántos años quedan 10 g?

    A) 5
    B) 10
    C) 15
    D) 40

19. (M2) La altura, en metros, de una cabina de una rueda de la fortuna a los $t$ minutos es $h(t)=20-18\cos\left(\dfrac{\pi t}{10}\right)$. ¿Cuánto dura una vuelta y cuál es la altura máxima?

    A) 10 min y 38 m
    B) 20 min y 38 m
    C) 20 min y 20 m
    D) $10\pi$ min y 18 m

<details>
<summary>Respuestas, nivel 4</summary>

14. B. Abre hacia abajo: $a<0$. Corta bajo el origen: $c<0$. Vértice a la derecha: $a$ y $b$ con signos distintos, $b>0$
15. B. Un km son 5 tramos de 200 m, $5\cdot160=800$ por km
16. A. $f(x-3)=(x-3)^2-2(x-3)+3=x^2-8x+18$, el vértice pasa de $(1,2)$ a $(4,2)$
17. C. $x_1+x_2=-\dfrac{b}{a}=\dfrac{8}{2}=4$. La B es el producto
18. C. $\left(\dfrac12\right)^{t/5}=\dfrac{10}{80}=\left(\dfrac12\right)^3$, $t=15$
19. B. Período $\dfrac{2\pi}{\pi/10}=20$, máximo $20+18=38$

</details>

</details>

---

<details>
<summary>

# 4. GEOMETRÍA {#geometria}

</summary>

Casi todo en este eje se reduce a tres herramientas: Pitágoras para encontrar el lado que falta, una tabla de fórmulas de área y volumen, y la razón de semejanza $k$ para pasar de una figura a otra. Las figuras de la prueba son solo indicativas: nunca midas el dibujo, calcula con los datos.

## 4.1. Teorema de Pitágoras

**Cuándo aparece:** hay un ángulo recto (escalera contra un muro, diagonal de un rectángulo, altura de un triángulo isósceles o de un trapecio) y conoces dos lados.

$$
\boxed{a^2+b^2=c^2}
$$

$c$ es la hipotenusa: el lado opuesto al ángulo recto, siempre el más largo. $a$ y $b$ son los catetos.

1. Identifica el ángulo recto y marca la hipotenusa.
2. Si buscas la hipotenusa, suma los cuadrados. Si buscas un cateto, resta: $b^2=c^2-a^2$.
3. Revisa que la hipotenusa salió mayor que cada cateto.

Tríos pitagóricos que conviene reconocer de vista, porque ahorran la raíz:

| Trío | Múltiplos que aparecen |
|---|---|
| $3,\ 4,\ 5$ | $6,8,10$ · $9,12,15$ · $1{,}5;\ 2;\ 2{,}5$ |
| $5,\ 12,\ 13$ | $10,24,26$ |
| $8,\ 15,\ 17$ | $16,30,34$ |
| $7,\ 24,\ 25$ | |

El recíproco también sirve: si $a^2+b^2=c^2$ con $c$ el lado mayor, el triángulo es rectángulo.

::: flow
**Ejemplo resuelto: escalera**

Una escalera de 6,5 m se apoya en un muro y su pie queda a 2,5 m de la base del muro. ¿A qué altura toca el muro?

La escalera es la hipotenusa, buscas un cateto, así que restas:

$$
\displaystyle h^2=6{,}5^2-2{,}5^2=42{,}25-6{,}25=36
$$

::: sol
Respuesta

$$
h=6\ \text{m}
$$

Es el trío $5,12,13$ multiplicado por $0{,}5$
:::
:::

**Error típico:** sumar los cuadrados cuando el dato conocido es la hipotenusa. Si la escalera mide 6,5 m, ningún otro lado puede medir más que eso.

## 4.2. Perímetro y área de figuras planas

**Cuándo aparece:** terrenos, pisos, pintar una pared, figuras sombreadas que son "una figura menos otra".

| Figura | Área | Perímetro |
|---|---|---|
| Triángulo | $\dfrac{b\cdot h}{2}$ | suma de lados |
| Rectángulo | $a\cdot b$ | $2a+2b$ |
| Paralelogramo | $b\cdot h$, con $h$ la altura, no el lado inclinado | $2a+2b$ |
| Rombo | $\dfrac{d_1\cdot d_2}{2}$ | $4a$ |
| Trapecio | $\dfrac{(B+b)\cdot h}{2}$ | suma de lados |
| Círculo | $\pi r^2$ | $2\pi r$ |

La altura siempre es perpendicular a la base. Cuando el dibujo no la da, casi siempre sale con Pitágoras.

::: flow
**Ejemplo resuelto: trapecio isósceles**

Un trapecio isósceles tiene bases de 10 cm y 4 cm, y sus lados no paralelos miden 5 cm. Calcula su perímetro y su área

Al bajar las dos alturas desde la base menor, la base mayor sobra $10-4=6$ cm, repartidos en 3 cm a cada lado. Cada lado inclinado es la hipotenusa de un triángulo de catetos 3 y $h$:

$$
\displaystyle h^2=5^2-3^2=16\quad\Rightarrow\quad h=4
$$

Área con el promedio de las bases por la altura:

$$
\displaystyle A=\frac{(10+4)\cdot4}{2}=28
$$

::: sol
Respuesta

$$
P=10+4+5+5=24\ \text{cm},\qquad A=28\ \text{cm}^2
$$
:::
:::

::: flow
**Ejemplo resuelto: área sombreada**

Un cuadrado de 10 cm de lado tiene un círculo inscrito. Calcula el área de la zona del cuadrado que queda fuera del círculo

Inscrito significa que el círculo toca los cuatro lados, así que su diámetro es el lado: $r=5$.

Sombreada = cuadrado menos círculo:

$$
\displaystyle 10^2-\pi\cdot5^2
$$

::: sol
Respuesta

$$
100-25\pi\ \text{cm}^2\ \approx 21{,}5\ \text{cm}^2\ \ (\text{con } \pi\approx3{,}14)
$$
:::
:::

**Error típico:** usar el diámetro como radio. Si el enunciado dice "diámetro 10", en la fórmula va $r=5$.

## 4.3. Cuerpos geométricos: cubo, paralelepípedo y cilindro

**Cuándo aparece:** cajas, estanques, latas, piscinas. "Cuánto material" es área de superficie, "cuánto cabe" es volumen.

| Cuerpo | Área de superficie | Volumen |
|---|---|---|
| Cubo de arista $a$ | $6a^2$ | $a^3$ |
| Paralelepípedo $a\times b\times c$ | $2(ab+bc+ac)$ | $a\cdot b\cdot c$ |
| Cilindro de radio $r$ y altura $h$ | $\underbrace{2\pi r^2}_{\text{tapas}}+\underbrace{2\pi rh}_{\text{manto}}$ | $\pi r^2h$ |

El manto del cilindro desenrollado es un rectángulo de base $2\pi r$ y altura $h$. Si el cuerpo no tiene tapa, resta esa cara.

Conversiones que siempre piden: $1\ \text{dm}^3=1\ \text{L}$, $1\ \text{m}^3=1000\ \text{L}$, $1\ \text{cm}^3=1\ \text{mL}$.

::: flow
**Ejemplo resuelto: caja**

Una caja mide 30 cm de largo, 20 cm de ancho y 10 cm de alto. ¿Cuánto cartón necesita y cuántos litros caben?

Las tres caras distintas, cada una dos veces:

$$
\displaystyle A=2(30\cdot20+20\cdot10+30\cdot10)=2(600+200+300)=2200
$$

Volumen:

$$
\displaystyle V=30\cdot20\cdot10=6000\ \text{cm}^3
$$

::: sol
Respuesta

$$
A=2200\ \text{cm}^2,\qquad V=6000\ \text{cm}^3=6\ \text{L}
$$
:::
:::

::: flow
**Ejemplo resuelto: estanque cilíndrico**

Un estanque cilíndrico tiene 2 m de diámetro y 1,5 m de altura. ¿Cuántos litros caben? Usa $\pi\approx3{,}14$

Radio $r=1$ m:

$$
\displaystyle V=\pi\cdot1^2\cdot1{,}5=1{,}5\pi\approx4{,}71\ \text{m}^3
$$

::: sol
Respuesta

$$
4{,}71\ \text{m}^3=4710\ \text{L}
$$
:::
:::

**Error típico:** dejar el resultado en cm³ cuando piden litros, o en m³ cuando piden cm³. Cambia las unidades antes de multiplicar.

## 4.4. Vectores y transformaciones isométricas

**Cuándo aparece:** un punto o figura del plano cartesiano se traslada, refleja o rota, y piden las coordenadas de la imagen o qué transformación se aplicó.

Un vector $\vec v=(a,b)$ indica cuánto moverse: $a$ en horizontal y $b$ en vertical. Si no se dice otra cosa, parte en el origen. Su módulo (largo) sale con Pitágoras: $|\vec v|=\sqrt{a^2+b^2}$. Los vectores se suman coordenada a coordenada.

Las isometrías mueven la figura sin cambiar su forma ni su tamaño. Las reglas para un punto $(x,y)$:

| Transformación | Imagen de $(x,y)$ |
|---|---|
| Traslación según $\vec v=(a,b)$ | $(x+a,\ y+b)$ |
| Reflexión respecto al eje $X$ | $(x,\ -y)$ |
| Reflexión respecto al eje $Y$ | $(-x,\ y)$ |
| Reflexión respecto a la recta $y=x$ | $(y,\ x)$ |
| Rotación de $90^\circ$ respecto al origen | $(-y,\ x)$ |
| Rotación de $180^\circ$ respecto al origen | $(-x,\ -y)$ |
| Rotación de $270^\circ$ respecto al origen | $(y,\ -x)$ |

Las rotaciones positivas son en sentido antihorario. Una rotación de $270^\circ$ es lo mismo que $-90^\circ$, es decir $90^\circ$ en sentido horario. Para no memorizar la tabla, rota mentalmente el punto $(1,0)$: con $90^\circ$ queda en $(0,1)$.

::: flow
**Ejemplo resuelto: composición**

Al punto $P(3,1)$ se le aplica una reflexión respecto al eje $Y$ y después una traslación según $\vec v=(2,4)$. ¿Dónde queda?

Reflexión en el eje $Y$, cambia el signo de $x$:

$$
\displaystyle (3,1)\to(-3,1)
$$

Traslación, suma el vector:

$$
\displaystyle (-3+2,\ 1+4)
$$

::: sol
Respuesta

$$
P''=(-1,5)
$$

En el orden inverso (primero trasladar, luego reflejar) sale $(-5,5)$: el orden importa
:::
:::

::: flow
**Ejemplo resuelto: encontrar el vector**

¿Qué vector traslada $A(2,-1)$ a $A'(-1,3)$?

Llegada menos partida:

$$
\displaystyle \vec v=(-1-2,\ 3-(-1))=(-3,4)
$$

::: sol
Respuesta

$$
\vec v=(-3,4),\qquad |\vec v|=\sqrt{9+16}=5
$$
:::
:::

**Error típico:** confundir $90^\circ$ con $270^\circ$. Comprueba con un punto fácil: $(1,0)$ rotado $90^\circ$ antihorario sube al eje $Y$ positivo.

## 4.5. Semejanza, Thales y escalas

**Cuándo aparece:** maquetas, mapas, sombras, fotos ampliadas, triángulos "uno dentro de otro" con un lado paralelo.

Dos figuras son semejantes si tienen la misma forma: ángulos iguales y lados proporcionales. Dos triángulos son semejantes si cumplen uno de estos criterios:

| Criterio | Qué se comprueba |
|---|---|
| AA | Dos ángulos iguales |
| LLL | Los tres pares de lados en la misma razón |
| LAL | Dos pares de lados en la misma razón y el ángulo entre ellos igual |

La razón de semejanza $k$ dice cuántas veces más grande es una figura que la otra, y no afecta igual a todo:

| Magnitud | Se multiplica por |
|---|---|
| Lados, perímetros, alturas | $k$ |
| Áreas | $k^2$ |
| Volúmenes | $k^3$ |

**Thales:** rectas paralelas que cortan a dos transversales generan segmentos proporcionales. El caso típico es la sombra: el sol llega con el mismo ángulo a todos los objetos, así que objeto y sombra forman triángulos semejantes.

**Escala** $1:n$: 1 unidad en el dibujo son $n$ unidades reales. En un mapa $1:50.000$, 1 cm son 50.000 cm, o sea 500 m.

::: flow
**Ejemplo resuelto: sombras**

Un edificio proyecta una sombra de 12 m. A la misma hora, una persona de 1,8 m proyecta una sombra de 1,5 m. ¿Cuánto mide el edificio?

Altura sobre sombra es igual en ambos triángulos:

$$
\displaystyle \frac{h}{12}=\frac{1{,}8}{1{,}5}
$$

::: sol
Respuesta

$$
h=\frac{1{,}8\cdot12}{1{,}5}=14{,}4\ \text{m}
$$
:::
:::

::: flow
**Ejemplo resuelto: maqueta**

Una maqueta a escala $1:100$ tiene un piso de 12 cm² y un estanque de 30 cm³. ¿Cuánto miden en la realidad?

La razón es $k=100$. El área se multiplica por $k^2=10.000$:

$$
\displaystyle 12\cdot10.000=120.000\ \text{cm}^2=12\ \text{m}^2
$$

El volumen por $k^3=1.000.000$:

$$
\displaystyle 30\cdot1.000.000=30.000.000\ \text{cm}^3=30\ \text{m}^3
$$

::: sol
Respuesta

$$
12\ \text{m}^2\ \text{de piso},\qquad 30\ \text{m}^3\ \text{de estanque}
$$
:::
:::

**Error típico:** multiplicar el área por $k$. Si duplicas el lado de un cuadrado, su área se cuadruplica.

## 4.6. Homotecia (M2)

**Cuándo aparece:** una figura se amplía o reduce "desde un punto", como la sombra de una mano en una lámpara.

Una homotecia de centro $O$ y razón $k$ lleva cada punto $P$ a $P'$ sobre la recta $OP$, con $\overrightarrow{OP'}=k\cdot\overrightarrow{OP}$:

$$
P'=O+k\,(P-O)
$$

| Razón | Efecto |
|---|---|
| $k>1$ | Amplía, mismo lado del centro |
| $0<k<1$ | Reduce, mismo lado del centro |
| $k<0$ | La imagen queda al otro lado del centro, invertida |
| $k=-1$ | Igual a una rotación de $180^\circ$ en torno a $O$ |

La figura imagen es semejante a la original con razón $|k|$: los lados se multiplican por $|k|$ y las áreas por $k^2$. Si el centro es el origen, basta multiplicar las coordenadas por $k$.

::: flow
**Ejemplo resuelto: centro fuera del origen**

Aplica una homotecia de centro $O(1,1)$ y razón $k=2$ al punto $P(3,2)$

Vector de $O$ a $P$:

$$
\displaystyle P-O=(2,1)
$$

Multiplícalo por $k$ y súmalo al centro:

$$
\displaystyle P'=(1,1)+2\cdot(2,1)=(1,1)+(4,2)
$$

::: sol
Respuesta

$$
P'=(5,3)
$$

Con $k=-\tfrac12$ el mismo punto va a $(1,1)-\tfrac12(2,1)=(0;\ 0{,}5)$, al otro lado del centro
:::
:::

**Error típico:** multiplicar las coordenadas por $k$ cuando el centro no es el origen. Primero resta el centro, después multiplica, después súmalo de vuelta.

## 4.7. Razones trigonométricas (M2)

**Cuándo aparece:** triángulo rectángulo con un ángulo agudo conocido: alturas de árboles o edificios, rampas, ángulos de elevación y de depresión.

Mirando desde el ángulo $\alpha$:

| Razón | Definición |
|---|---|
| $\sin\alpha$ | $\dfrac{\text{cateto opuesto}}{\text{hipotenusa}}$ |
| $\cos\alpha$ | $\dfrac{\text{cateto adyacente}}{\text{hipotenusa}}$ |
| $\tan\alpha$ | $\dfrac{\text{cateto opuesto}}{\text{cateto adyacente}}=\dfrac{\sin\alpha}{\cos\alpha}$ |

En la PAES no hay calculadora, así que los ángulos son casi siempre los notables o el valor viene en el enunciado:

| $\alpha$ | $\sin\alpha$ | $\cos\alpha$ | $\tan\alpha$ |
|---|---|---|---|
| $30^\circ$ | $\dfrac12$ | $\dfrac{\sqrt3}{2}$ | $\dfrac{\sqrt3}{3}$ |
| $45^\circ$ | $\dfrac{\sqrt2}{2}$ | $\dfrac{\sqrt2}{2}$ | $1$ |
| $60^\circ$ | $\dfrac{\sqrt3}{2}$ | $\dfrac12$ | $\sqrt3$ |

Para elegir la razón: marca qué lado conoces y cuál buscas respecto al ángulo. Opuesto e hipotenusa, seno. Adyacente e hipotenusa, coseno. Los dos catetos, tangente.

El ángulo de depresión (mirando hacia abajo desde arriba) es igual al de elevación visto desde abajo, porque son alternos internos entre paralelas horizontales.

::: flow
**Ejemplo resuelto: altura de un árbol**

Desde un punto a 20 m de la base de un árbol, se ve su copa con un ángulo de elevación de $30^\circ$. ¿Cuánto mide el árbol?

Conoces el cateto adyacente (20 m) y buscas el opuesto (la altura): tangente.

$$
\displaystyle \tan30^\circ=\frac{h}{20}\quad\Rightarrow\quad h=20\cdot\frac{\sqrt3}{3}
$$

::: sol
Respuesta

$$
h=\frac{20\sqrt3}{3}\ \text{m}\approx11{,}55\ \text{m}
$$
:::
:::

::: flow
**Ejemplo resuelto: rampa**

Una rampa de 10 m de largo tiene una inclinación de $30^\circ$. ¿Cuánto sube?

La rampa es la hipotenusa, la subida es el cateto opuesto: seno.

::: sol
Respuesta

$$
h=10\cdot\sin30^\circ=5\ \text{m}
$$
:::
:::

**Error típico:** tomar como adyacente el lado equivocado. Adyacente es el cateto que toca al ángulo, nunca la hipotenusa.

## 4.8. Relaciones métricas en la circunferencia (M2)

**Cuándo aparece:** ángulos marcados sobre una circunferencia, o dos cuerdas o secantes que se cortan y piden un segmento.

**Ángulos.** El ángulo del centro mide lo mismo que el arco que abarca. El ángulo inscrito (vértice sobre la circunferencia) mide la mitad del arco que abarca.

| Situación | Consecuencia |
|---|---|
| Inscrito y del centro sobre el mismo arco | inscrito $=\dfrac{\text{del centro}}{2}$ |
| Dos inscritos sobre el mismo arco | Son iguales |
| Inscrito que abarca un diámetro | Mide $90^\circ$ |
| Cuadrilátero inscrito | Ángulos opuestos suman $180^\circ$ |
| Tangente en un punto | Es perpendicular al radio en ese punto |

**Arcos y sectores** de ángulo $\alpha$ en grados: longitud $2\pi r\cdot\dfrac{\alpha}{360}$, área $\pi r^2\cdot\dfrac{\alpha}{360}$.

**Segmentos.** Las tres reglas tienen la misma forma, producto igual a producto:

| Caso | Relación |
|---|---|
| Dos cuerdas $AB$ y $CD$ se cortan en $P$ dentro | $PA\cdot PB=PC\cdot PD$ |
| Dos secantes desde $P$ fuera | $PA\cdot PB=PC\cdot PD$, con $PA$ y $PC$ los trozos externos y $PB$, $PD$ las secantes completas |
| Tangente $PT$ y secante desde $P$ fuera | $PT^2=PA\cdot PB$ |

::: flow
**Ejemplo resuelto: cuerdas**

Dos cuerdas $AB$ y $CD$ se cortan en $P$. Si $AP=4$, $PB=6$ y $CP=3$, ¿cuánto mide $PD$?

Producto de los trozos de una cuerda igual al de la otra:

$$
\displaystyle 4\cdot6=3\cdot PD
$$

::: sol
Respuesta

$$
PD=8
$$
:::
:::

::: flow
**Ejemplo resuelto: tangente**

Desde un punto $P$ exterior se traza una secante que corta a la circunferencia en $A$ y $B$, con $PA=4$ y $PB=9$, y una tangente $PT$. ¿Cuánto mide $PT$?

Tangente al cuadrado igual a trozo externo por secante completa:

$$
\displaystyle PT^2=4\cdot9=36
$$

::: sol
Respuesta

$$
PT=6
$$
:::
:::

**Error típico:** en dos secantes, multiplicar el trozo externo por el trozo interno. Va el externo por la secante entera, desde $P$ hasta el segundo corte.

## 4.9. Esfera (M2)

**Cuándo aparece:** pelotas, globos, estanques esféricos, esferas que se funden para formar otros cuerpos.

| | Fórmula |
|---|---|
| Área de la superficie | $4\pi r^2$ |
| Volumen | $\dfrac43\pi r^3$ |
| Semiesfera, área curva | $2\pi r^2$ |

Si el radio se multiplica por $k$, el área se multiplica por $k^2$ y el volumen por $k^3$, igual que en semejanza.

::: flow
**Ejemplo resuelto: fundir un cilindro**

Un cilindro de metal de radio 2 cm y altura 3 cm se funde para hacer esferas de radio 1 cm. ¿Cuántas esferas salen?

Al fundir se conserva el volumen.

$$
\displaystyle V_{\text{cil}}=\pi\cdot2^2\cdot3=12\pi,\qquad V_{\text{esf}}=\frac43\pi\cdot1^3=\frac43\pi
$$

::: sol
Respuesta

$$
\frac{12\pi}{\frac43\pi}=9\ \text{esferas}
$$
:::
:::

**Error típico:** usar $r^2$ en el volumen. El volumen siempre lleva la longitud al cubo.

## 4.10. Rectas en el plano (M2)

**Cuándo aparece:** dos puntos y piden la recta, o piden una recta paralela o perpendicular a otra, o la distancia y el punto medio entre dos puntos.

| Concepto | Fórmula |
|---|---|
| Pendiente entre $(x_1,y_1)$ y $(x_2,y_2)$ | $m=\dfrac{y_2-y_1}{x_2-x_1}$ |
| Punto-pendiente | $y-y_1=m(x-x_1)$ |
| Ecuación principal | $y=mx+n$, $n$ es el corte con el eje $Y$ |
| Ecuación general | $ax+by+c=0$, con $m=-\dfrac ab$ |
| Paralelas | $m_1=m_2$ |
| Perpendiculares | $m_1\cdot m_2=-1$ |
| Distancia | $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$ |
| Punto medio | $\left(\dfrac{x_1+x_2}{2},\ \dfrac{y_1+y_2}{2}\right)$ |

Para comparar dos rectas, despeja $y$ en las dos y mira las pendientes.

::: flow
**Ejemplo resuelto: recta, distancia y perpendicular**

Dados $A(1,3)$ y $B(3,7)$, encuentra la recta $AB$, la distancia $AB$, su punto medio y la perpendicular a $AB$ que pasa por $B$

Pendiente:

$$
\displaystyle m=\frac{7-3}{3-1}=2
$$

Punto-pendiente con $A$:

$$
\displaystyle y-3=2(x-1)\quad\Rightarrow\quad y=2x+1
$$

Distancia y punto medio:

$$
\displaystyle d=\sqrt{2^2+4^2}=\sqrt{20}=2\sqrt5,\qquad M=(2,5)
$$

La perpendicular tiene pendiente inversa y de signo contrario, $-\tfrac12$:

$$
\displaystyle y-7=-\frac12(x-3)
$$

::: sol
Respuesta

$$
AB:\ y=2x+1,\qquad d=2\sqrt5,\qquad M=(2,5),\qquad \perp:\ x+2y-17=0
$$
:::
:::

**Error típico:** para la perpendicular, cambiar solo el signo de la pendiente. Hay que invertirla y cambiarle el signo: $2$ pasa a $-\tfrac12$.

## 4.11. Práctica

La ayuda disminuye nivel a nivel. En el nivel 4 las preguntas M1 tienen 4 alternativas y las M2 tienen 5, como en la prueba.

**Nivel 1: guiado**

1. Un rectángulo mide 8 cm por 15 cm. Calcula su diagonal.
    - La diagonal es la hipotenusa: $8^2+15^2$.
2. Una lata cilíndrica tiene 10 cm de diámetro y 12 cm de altura. Calcula su volumen.
    - El radio es 5, y $V=\pi r^2h$.
3. Refleja $P(-2,5)$ respecto al eje $X$ y luego rótalo $90^\circ$ respecto al origen.
    - Eje $X$: cambia el signo de $y$. Rotación de $90^\circ$: $(x,y)\to(-y,x)$.

<details>
<summary>Respuestas, nivel 1</summary>

1. $17$ cm, trío $8,15,17$
2. $300\pi$ cm³, unos $942$ cm³ con $\pi\approx3{,}14$
3. $(-2,-5)$ y luego $(5,-2)$

</details>

**Nivel 2: una pista**

4. Un trapecio rectángulo tiene bases de 9 cm y 12 cm y altura 4 cm. Calcula su área y su perímetro.
    - El lado oblicuo es la hipotenusa de un triángulo de catetos $12-9$ y $4$.
5. En un mapa a escala $1:25.000$ dos ciudades están a 8 cm. ¿A cuántos km están en la realidad?
    - 1 cm del mapa son 25.000 cm reales.
6. (M2) Desde lo alto de un faro de 30 m se ve un bote con un ángulo de depresión de $60^\circ$. ¿A qué distancia horizontal está el bote?
    - Desde el bote, el ángulo de elevación también es $60^\circ$, y conoces el cateto opuesto.

<details>
<summary>Respuestas, nivel 2</summary>

4. Área $42$ cm², perímetro $30$ cm, el lado oblicuo mide 5 por el trío $3,4,5$
5. $8\cdot25.000=200.000$ cm, es decir $2$ km
6. $\tan60^\circ=\dfrac{30}{d}$, así que $d=\dfrac{30}{\sqrt3}=10\sqrt3\approx17{,}32$ m

</details>

**Nivel 3: una palabra**

7. Área total y volumen de un cubo de arista 4 cm (fórmulas)
8. Dos triángulos semejantes están en razón $2:5$ y el menor tiene área 12 cm². Área del mayor (cuadrado)
9. (M2) Dos cuerdas $AB$ y $CD$ se cortan en $P$, con $AP=2$, $PB=9$ y $CP=3$. Calcula $PD$ (cuerdas)
10. (M2) Recta que pasa por $(2,-1)$ y es paralela a $y=3x-5$ (pendiente)
11. (M2) Imagen de $(3,-1)$ con una homotecia de centro en el origen y razón $-2$ (multiplica)

<details>
<summary>Respuestas, nivel 3</summary>

7. $A=6\cdot16=96$ cm², $V=64$ cm³
8. $12\cdot\left(\dfrac52\right)^2=75$ cm²
9. $2\cdot9=3\cdot PD$, así que $PD=6$
10. $y+1=3(x-2)$, es decir $y=3x-7$
11. $(-6,2)$, queda al otro lado del origen

</details>

**Nivel 4: sin ayuda, estilo PAES**

12. Una piscina con forma de paralelepípedo mide 10 m de largo, 5 m de ancho y 1,6 m de profundidad. ¿Cuántos litros de agua se necesitan para llenarla hasta 20 cm bajo el borde?

    A) 80.000 L
    B) 70.000 L
    C) 8.000 L
    D) 7.000 L

13. Un jardín circular de 6 m de radio está rodeado por un camino de 1 m de ancho. ¿Cuál es el área del camino?

    A) $13\pi$ m²
    B) $12\pi$ m²
    C) $7\pi$ m²
    D) $\pi$ m²

14. ¿Qué transformación lleva el triángulo de vértices $A(1,1)$, $B(3,1)$, $C(1,4)$ al triángulo $A'(-1,1)$, $B'(-1,3)$, $C'(-4,1)$?

    A) Reflexión respecto al eje $Y$
    B) Rotación de $90^\circ$ respecto al origen
    C) Rotación de $270^\circ$ respecto al origen
    D) Reflexión respecto a la recta $y=x$

15. (M2) Una escalera de 8 m se apoya en un muro vertical y forma un ángulo de $60^\circ$ con el suelo horizontal. ¿A qué altura toca el muro?

    A) $4$ m
    B) $4\sqrt2$ m
    C) $4\sqrt3$ m
    D) $8\sqrt3$ m
    E) $\dfrac{8\sqrt3}{3}$ m

16. (M2) Un vaso cilíndrico de 3 cm de radio y 6 cm de altura está lleno de agua. Se introduce una esfera de 3 cm de radio. ¿Qué volumen de agua queda en el vaso?

    A) $54\pi$ cm³
    B) $36\pi$ cm³
    C) $27\pi$ cm³
    D) $18\pi$ cm³
    E) $0$ cm³

17. (M2) ¿Cuál de las siguientes rectas es perpendicular a $2x-3y+6=0$?

    A) $2x-3y+1=0$
    B) $3x+2y-1=0$
    C) $3x-2y+4=0$
    D) $2x+3y-5=0$
    E) $x-y=0$

18. (M2) En una circunferencia de centro $O$, el ángulo del centro $AOC$ mide $140^\circ$ y $B$ es un punto del arco mayor $AC$. ¿Cuánto mide el ángulo inscrito $ABC$?

    A) $35^\circ$
    B) $70^\circ$
    C) $110^\circ$
    D) $140^\circ$
    E) $220^\circ$

<details>
<summary>Respuestas, nivel 4</summary>

12. B, se llena hasta $1{,}4$ m: $10\cdot5\cdot1{,}4=70$ m³ $=70.000$ L
13. A, círculo grande menos chico: $\pi\cdot7^2-\pi\cdot6^2=13\pi$
14. B, los tres vértices cumplen $(x,y)\to(-y,x)$, la reflexión en $Y$ falla con $B$
15. C, la altura es el cateto opuesto: $8\cdot\sin60^\circ=4\sqrt3$
16. D, el vaso tiene $54\pi$ y la esfera desplaza $36\pi$, que se derraman
17. B, la recta dada tiene $m=\tfrac23$ y la B tiene $m=-\tfrac32$, el producto es $-1$
18. B, el inscrito mide la mitad del arco que abarca: $70^\circ$. Con $B$ en el arco menor serían $110^\circ$

</details>

</details>

---

<details>
<summary>

# 5. PROBABILIDAD Y ESTADÍSTICA {#probabilidad-y-estadistica}

</summary>

Leer datos, ubicar un valor dentro de un grupo y medir la chance de un evento. Casi todo se responde con una tabla bien armada.

## 5.1. Tablas de frecuencia y promedio

**Cuándo aparece:** te dan una lista de datos o una tabla y preguntan qué porcentaje cumple algo, cuántos hay hasta cierto valor o el promedio.

| Columna | Qué cuenta | Cómo se calcula |
|---|---|---|
| Frecuencia absoluta $f$ | Cuántos datos tienen ese valor | Contar |
| Frecuencia relativa $f_r$ | Qué fracción del total son | $f_r=\dfrac{f}{n}$, por 100 si la piden en % |
| Frecuencia acumulada $F$ | Cuántos datos hay hasta ese valor | Sumar las $f$ de arriba hacia abajo |

Las $f_r$ siempre suman $1$ y la última $F$ siempre es $n$: sirve para revisar la tabla.

El promedio desde una tabla es cada valor por las veces que aparece, sumado y dividido por el total:

$$
\bar x=\frac{x_1f_1+x_2f_2+\dots+x_kf_k}{n}
$$

Si los datos vienen en intervalos, usa como $x$ la marca de clase, el punto medio del intervalo.

::: flow
**Ejemplo resuelto: hermanos de un curso**

Se preguntó a 20 estudiantes cuántos hermanos tienen

| Hermanos $x$ | $f$ | $f_r$ | $F$ |
|---|---|---|---|
| 0 | 4 | 0,2 | 4 |
| 1 | 8 | 0,4 | 12 |
| 2 | 6 | 0,3 | 18 |
| 3 | 2 | 0,1 | 20 |

Cada valor por su frecuencia, todo dividido por 20:

$$
\displaystyle \bar x=\frac{0\cdot4+1\cdot8+2\cdot6+3\cdot2}{20}=\frac{26}{20}
$$

::: sol
Resultado

$$
\bar x=1{,}3\ \text{hermanos}
$$

La columna $F$ responde sin cálculo que 12 estudiantes tienen a lo más un hermano, y $f_r=0{,}3$ dice que el 30 % tiene exactamente dos
:::
:::

**Error típico:** promediar promedios. Si 30 alumnos promedian 5,2 y otros 20 promedian 6,0, el promedio total no es 5,6: hay que pesar por la cantidad de alumnos, $\dfrac{30\cdot5{,}2+20\cdot6{,}0}{50}=5{,}52$.

## 5.2. Qué gráfico usar

**Cuándo aparece:** elegir el gráfico que representa una situación, o leer uno y descartar afirmaciones falsas.

| Gráfico | Sirve para | Se lee |
|---|---|---|
| Barras | Categorías o valores sueltos (deporte favorito, n° de hermanos) | La altura es la frecuencia |
| Circular | Partes de un todo | El ángulo es $f_r\cdot360^\circ$ |
| Histograma | Datos continuos en intervalos (estaturas, tiempos) | Barras pegadas, una por intervalo |
| Línea | Cambio en el tiempo | La pendiente muestra si sube o baja |
| Cajón | Distribución y comparación de grupos | Ver 5.4 |

::: flow
**Ejemplo resuelto: gráfico circular**

En el curso de 5.1, ¿qué ángulo le corresponde al sector "1 hermano"?

Su frecuencia relativa es $0{,}4$, y el círculo completo son $360^\circ$:

$$
\displaystyle 0{,}4\cdot360^\circ
$$

::: sol
Ángulo

$$
144^\circ
$$
:::
:::

**Error típico:** creer lo que se ve sin leer el eje. Si el eje vertical parte en 80 y no en 0, una barra de 90 se ve el doble de alta que una de 85 aunque la diferencia sea pequeña.

## 5.3. Cuartiles y percentiles

**Cuándo aparece:** "el 25 % de menor ingreso", "qué valor supera al 60 % de los datos", "a qué percentil corresponde". Todo es ubicar posiciones en los datos ordenados.

El percentil $k$, $P_k$, es el valor que deja al menos el $k$ % de los datos en o bajo él. Los cuartiles son tres percentiles con nombre:

$$
Q_1=P_{25},\qquad Q_2=P_{50}=\text{mediana},\qquad Q_3=P_{75}
$$

Receta, con la convención de los textos escolares chilenos, que es la que calza con las preguntas oficiales:

1. Ordena los datos de menor a mayor.
2. Calcula la posición $\dfrac{k\cdot n}{100}$.
3. Si no es entero, sube al entero siguiente y ese dato es $P_k$.
4. Si es entero, $P_k$ es el promedio del dato en esa posición y el siguiente.

::: flow
**Ejemplo resuelto: pregunta oficial PAES 2024**

Masa de 12 tomates, ya ordenada: 75, 77, 84, 98, 101, 116, 129, 132, 145, 152, 163 y 176 g. ¿Cuál de los percentiles 10, 20, 30 o 40 supera los 100 g?

Los percentiles crecen con $k$, así que basta revisar los dos últimos.

$P_{30}$: posición $\dfrac{30\cdot12}{100}=3{,}6$, sube a la 4.ª:

$$
\displaystyle P_{30}=98\ \text{g}
$$

$P_{40}$: posición $\dfrac{40\cdot12}{100}=4{,}8$, sube a la 5.ª:

$$
\displaystyle P_{40}=101\ \text{g}
$$

::: sol
Respuesta

$$
P_{40}=101\ \text{g}>100\ \text{g}
$$

Los cuartiles del mismo grupo, todos con posición entera: $Q_1=\dfrac{84+98}{2}=91$, $Q_2=\dfrac{116+129}{2}=122{,}5$, $Q_3=\dfrac{145+152}{2}=148{,}5$
:::
:::

Para traducir enunciados: "el 60 % de menores ingresos" son los que están bajo $P_{60}$, "el 25 % de mayores ingresos" son los que están sobre $Q_3$.

**Error típico:** confundir la posición con el valor. $3{,}6$ no es el percentil, es el lugar donde buscarlo.

## 5.4. Diagrama de cajón

**Cuándo aparece:** comparar dos o más grupos (cursos, ciudades, sucursales) con un dibujo que resume cada uno en cinco números.

El cajón se dibuja con mínimo, $Q_1$, $Q_2$, $Q_3$ y máximo. Esos cinco números cortan los datos en cuatro tramos con el 25 % de los datos cada uno:

| Tramo | Contiene |
|---|---|
| Bigote izquierdo, de mínimo a $Q_1$ | 25 % |
| Caja, de $Q_1$ a $Q_3$ | 50 % central |
| Bigote derecho, de $Q_3$ a máximo | 25 % |

Rango $=\text{máx}-\text{mín}$. Rango intercuartil $=Q_3-Q_1$, el ancho de la caja: cuanto más ancha, más dispersos los datos centrales.

::: flow
**Ejemplo resuelto: notas de dos cursos**

| Curso | Mín | $Q_1$ | $Q_2$ | $Q_3$ | Máx |
|---|---|---|---|---|---|
| A | 2,0 | 4,0 | 5,0 | 5,8 | 6,9 |
| B | 3,5 | 4,5 | 5,2 | 5,5 | 6,2 |

Mediana más alta: B, $5{,}2>5{,}0$.

Datos centrales más dispersos, ancho de la caja:

$$
\displaystyle A:\ 5{,}8-4{,}0=1{,}8\qquad B:\ 5{,}5-4{,}5=1{,}0
$$

Qué porcentaje de B sacó 4,5 o más: desde $Q_1$ hacia arriba quedan tres tramos.

::: sol
Conclusiones

B tiene mejor mediana, A es más disperso, y el 75 % de B sacó 4,5 o más
:::
:::

**Error típico:** pensar que un tramo más largo tiene más datos. Todos los tramos tienen el 25 %, uno largo solo dice que esos datos están más separados.

## 5.5. Probabilidad: casos favorables y complemento

**Cuándo aparece:** dados, monedas, fichas, urnas, sorteos. Todo resultado tiene la misma chance: en la PAES un "dado común" tiene 6 caras numeradas del 1 al 6, todas igual de probables, y las dos caras de una moneda también lo son, salvo que digan otra cosa.

$$
P(A)=\frac{\text{casos favorables}}{\text{casos posibles}}
\qquad
P(\text{no }A)=1-P(A)
$$

La probabilidad va de $0$ (imposible) a $1$ (seguro). Si piden "al menos uno", casi siempre es más corto calcular el complemento, "ninguno", y restarlo de 1.

::: flow
**Ejemplo resuelto: dos dados**

Se lanzan dos dados comunes. ¿Cuál es la probabilidad de obtener al menos un 6?

Casos posibles, 6 resultados por dado:

$$
\displaystyle 6\cdot6=36
$$

"Al menos un 6" tiene muchos casos, el complemento "ningún 6" tiene $5\cdot5=25$:

$$
\displaystyle P(\text{ningún }6)=\frac{25}{36}
$$

::: sol
Resultado

$$
P(\text{al menos un }6)=1-\frac{25}{36}=\frac{11}{36}
$$
:::
:::

**Error típico:** sumar $\dfrac16+\dfrac16=\dfrac13$. Eso cuenta dos veces el caso de dos seis.

## 5.6. Regla aditiva, regla multiplicativa y árboles

**Cuándo aparece:** "A o B" suma, "A y después B" multiplica.

| Pregunta | Regla |
|---|---|
| $A$ o $B$ | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ |
| $A$ o $B$, sin casos en común (excluyentes) | $P(A\cup B)=P(A)+P(B)$ |
| $A$ y $B$, uno no afecta al otro (independientes) | $P(A\cap B)=P(A)\cdot P(B)$ |
| Varias etapas | Árbol: multiplica a lo largo de cada rama, suma las ramas que sirven |

La resta de la regla aditiva quita los casos que se contaron dos veces.

::: flow
**Ejemplo resuelto: regla aditiva**

Se lanza un dado común. ¿Cuál es la probabilidad de obtener un número par o mayor que 4?

Pares $\{2,4,6\}$, mayores que 4 $\{5,6\}$, el 6 está en los dos:

$$
\displaystyle \frac36+\frac26-\frac16
$$

::: sol
Resultado

$$
\frac46=\frac23
$$
:::
:::

::: flow
**Ejemplo resuelto: árbol sin reposición**

Una urna tiene 3 bolitas rojas y 2 azules. Se sacan dos, sin devolver la primera. ¿Cuál es la probabilidad de que sean del mismo color?

Rama roja-roja, en la segunda quedan 2 rojas de 4:

$$
\displaystyle \frac35\cdot\frac24=\frac{6}{20}
$$

Rama azul-azul, en la segunda queda 1 azul de 4:

$$
\displaystyle \frac25\cdot\frac14=\frac{2}{20}
$$

::: sol
Suma de las ramas que sirven

$$
\frac{6}{20}+\frac{2}{20}=\frac25
$$

Con reposición las extracciones son independientes y, por ejemplo, $P(\text{dos rojas})=\dfrac35\cdot\dfrac35=\dfrac{9}{25}$
:::
:::

**Error típico:** no actualizar el total en la segunda extracción cuando no hay reposición.

## 5.7. Medidas de dispersión (M2)

**Cuándo aparece:** dos grupos con el mismo promedio y preguntan cuál es más homogéneo, o qué pasa con la dispersión si se transforman los datos.

La desviación estándar mide cuánto se alejan los datos del promedio, en las mismas unidades que los datos. Receta:

1. Calcula el promedio $\bar x$.
2. Resta el promedio a cada dato y eleva al cuadrado.
3. Promedia esos cuadrados: es la varianza $\sigma^2$.
4. Saca raíz: es la desviación estándar $\sigma$.

$$
\sigma^2=\frac{(x_1-\bar x)^2+\dots+(x_n-\bar x)^2}{n},
\qquad
\sigma=\sqrt{\sigma^2}
$$

Se divide por $n$, la varianza de la población, como en los textos escolares.

::: flow
**Ejemplo resuelto: ocho datos**

Datos: 2, 4, 4, 4, 5, 5, 7, 9

Promedio:

$$
\displaystyle \bar x=\frac{40}{8}=5
$$

Distancias al promedio, al cuadrado: $9,1,1,1,0,0,4,16$, que suman $32$:

$$
\displaystyle \sigma^2=\frac{32}{8}=4
$$

::: sol
Desviación estándar

$$
\sigma=2
$$

El grupo 5, 5, 5, 5, 5, 5, 5, 5 tiene el mismo promedio y $\sigma=0$: es perfectamente homogéneo
:::
:::

| Si a todos los datos | El promedio | La desviación estándar | La varianza |
|---|---|---|---|
| Les sumas $c$ | Suma $c$ | No cambia | No cambia |
| Los multiplicas por $c$ | Se multiplica por $c$ | Se multiplica por $\lvert c\rvert$ | Se multiplica por $c^2$ |

**Error típico:** comparar varianzas como si fueran desviaciones. La varianza está en unidades al cuadrado, $\sigma^2=1{,}44$ es $\sigma=1{,}2$.

## 5.8. Probabilidad condicional (M2)

**Cuándo aparece:** "sabiendo que", "si se elige uno que...", "dado que". La información achica el total.

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}
$$

Con una tabla de doble entrada no hace falta la fórmula: quédate solo con la fila o columna de lo que ya sabes y calcula ahí.

::: flow
**Ejemplo resuelto: deporte y género**

| | Practica deporte | No practica | Total |
|---|---|---|---|
| Hombres | 60 | 40 | 100 |
| Mujeres | 45 | 55 | 100 |
| Total | 105 | 95 | 200 |

Sabiendo que es mujer, solo cuenta la fila de mujeres:

$$
\displaystyle P(\text{deporte}\mid\text{mujer})=\frac{45}{100}=0{,}45
$$

Sabiendo que practica deporte, solo cuenta esa columna:

$$
\displaystyle P(\text{mujer}\mid\text{deporte})=\frac{45}{105}=\frac37
$$

::: sol
Las dos condicionales son distintas

$$
0{,}45\neq\frac37
$$

Además $P(\text{deporte})=\dfrac{105}{200}=0{,}525\neq0{,}45$: saber el género cambia la probabilidad, así que los eventos no son independientes
:::
:::

**Error típico:** dividir por el total de la tabla en vez de por el total de la fila o columna dada.

## 5.9. Permutaciones y combinaciones (M2)

**Cuándo aparece:** contar de cuántas formas se ordena, se elige o se arma algo, y probabilidades donde los casos son demasiados para listarlos.

La pregunta que decide todo: **¿importa el orden?** Si cambiar el orden da un resultado distinto (cargos, podios, claves) importa. Si no (comités, grupos, manos de cartas) no importa.

| Situación | Fórmula | Ejemplo |
|---|---|---|
| Etapas independientes | Multiplica las opciones de cada etapa | Clave de 4 dígitos: $10^4$ |
| Ordenar $n$ objetos distintos | $n!$ | 5 libros en fila: $120$ |
| Elegir $k$ de $n$, importa el orden | $\dfrac{n!}{(n-k)!}$ | Oro, plata y bronce entre 8: $336$ |
| Elegir $k$ de $n$, no importa el orden | $\dbinom nk=\dfrac{n!}{k!\,(n-k)!}$ | Comité de 3 entre 8: $56$ |
| Ordenar con objetos repetidos | $\dfrac{n!}{a!\,b!\cdots}$ | Anagramas de PAPA: $\dfrac{4!}{2!\,2!}=6$ |

::: flow
**Ejemplo resuelto: club de 10 personas**

¿De cuántas formas se elige un presidente y un tesorero? ¿Y una comisión de 2?

Presidente y tesorero son cargos distintos, el orden importa:

$$
\displaystyle 10\cdot9=90
$$

En la comisión, Ana-Beto es lo mismo que Beto-Ana, cada par se contó dos veces:

$$
\displaystyle \binom{10}{2}=\frac{90}{2}
$$

::: sol
Resultados

$$
90\ \text{formas con cargos},\qquad 45\ \text{comisiones}
$$
:::
:::

**Error típico:** usar permutación en un comité. Si los elegidos no tienen cargos distintos, el orden no importa.

## 5.10. Modelo binomial (M2)

**Cuándo aparece:** el mismo experimento se repite $n$ veces, cada vez con éxito o fracaso, siempre con la misma probabilidad $p$. Preguntan por la probabilidad de exactamente $k$ éxitos.

$$
P(X=k)=\binom nk\,p^k\,(1-p)^{n-k}
$$

$\dbinom nk$ cuenta en qué intentos caen los éxitos, $p^k$ los $k$ éxitos y $(1-p)^{n-k}$ los fracasos. El número esperado de éxitos es $n\cdot p$.

::: flow
**Ejemplo resuelto: responder al azar**

Una prueba tiene 4 preguntas con 4 alternativas cada una y se responde todo al azar. ¿Cuál es la probabilidad de acertar exactamente 2?

Parámetros:

$$
\displaystyle n=4,\quad k=2,\quad p=\frac14,\quad 1-p=\frac34
$$

Formas de elegir cuáles 2 se aciertan, $\binom42=6$:

$$
\displaystyle 6\cdot\left(\frac14\right)^2\left(\frac34\right)^2=6\cdot\frac{9}{256}
$$

::: sol
Resultado

$$
P(X=2)=\frac{54}{256}=\frac{27}{128}\approx0{,}21
$$

Se esperan $4\cdot\dfrac14=1$ acierto
:::
:::

**Error típico:** olvidar el $\dbinom nk$ y calcular solo la probabilidad de un orden particular.

## 5.11. Distribución normal (M2)

**Cuándo aparece:** estaturas, pesos, puntajes, tiempos que se agrupan en forma de campana alrededor del promedio $\mu$ con desviación $\sigma$. La prueba entrega una tabla con $P(Z\le z)$.

1. Estandariza: cuántas desviaciones se aleja el valor del promedio.

$$
z=\frac{x-\mu}{\sigma}
$$

2. Busca $P(Z\le z)$ en la tabla.
3. Ajusta con la simetría de la campana:

| Piden | Calcula |
|---|---|
| $P(Z\le z)$ | Directo de la tabla |
| $P(Z>z)$ | $1-P(Z\le z)$ |
| $P(Z\le -z)$ | $1-P(Z\le z)$ |
| $P(a\le Z\le b)$ | $P(Z\le b)-P(Z\le a)$ |

| $z$ | 0,5 | 1 | 1,5 | 2 | 2,5 | 3 |
|---|---|---|---|---|---|---|
| $P(Z\le z)$ | 0,691 | 0,841 | 0,933 | 0,977 | 0,994 | 0,999 |

Regla rápida: a una, dos y tres desviaciones del promedio quedan cerca del 68 %, 95 % y 99,7 % de los datos.

::: flow
**Ejemplo resuelto: estaturas**

Las estaturas de un grupo siguen una normal con $\mu=170$ cm y $\sigma=8$ cm. ¿Qué proporción mide entre 162 y 178 cm? ¿Y más de 174 cm?

Estandariza los extremos:

$$
\displaystyle z=\frac{162-170}{8}=-1,\qquad z=\frac{178-170}{8}=1
$$

Entre $-1$ y $1$, usando $P(Z\le-1)=1-0{,}841=0{,}159$:

$$
\displaystyle 0{,}841-0{,}159=0{,}682
$$

Para 174 cm, $z=\dfrac{4}{8}=0{,}5$, y piden la cola de arriba:

$$
\displaystyle 1-0{,}691=0{,}309
$$

::: sol
Resultados

$$
P(162\le X\le178)=0{,}682,\qquad P(X>174)=0{,}309
$$

El primero es la regla del 68 %
:::
:::

**Error típico:** leer la tabla directo cuando piden "más que". La tabla siempre da el área a la izquierda.

## 5.12. Práctica

La ayuda baja nivel a nivel.

**Nivel 1: guiado**

1. En 25 hogares se contó el número de mascotas: 7 hogares tienen 0, 10 tienen 1, 5 tienen 2 y 3 tienen 3. Completa las frecuencias relativa y acumulada y calcula el promedio.
    - $f_r=f/25$, y la $F$ se va sumando hacia abajo.
    - Promedio: $\dfrac{0\cdot7+1\cdot10+2\cdot5+3\cdot3}{25}$.
2. Calcula $Q_1$, $Q_2$ y $Q_3$ de: 3, 5, 6, 8, 9, 10, 12, 15, 16, 20.
    - Posiciones $\dfrac{25\cdot10}{100}$, $\dfrac{50\cdot10}{100}$ y $\dfrac{75\cdot10}{100}$.
    - Posición entera: promedio con el siguiente. No entera: sube.
3. Una bolsa tiene 4 fichas rojas, 6 verdes y 10 azules. ¿Cuál es la probabilidad de no sacar una azul?
    - Complemento: $1-P(\text{azul})$.

<details>
<summary>Respuestas, nivel 1</summary>

1. $f_r$: 0,28; 0,4; 0,2; 0,12. $F$: 7, 17, 22, 25. Promedio $\dfrac{29}{25}=1{,}16$
2. $Q_1=6$ (posición 2,5 sube a la 3.ª), $Q_2=\dfrac{9+10}{2}=9{,}5$, $Q_3=15$ (posición 7,5 sube a la 8.ª)
3. $1-\dfrac{10}{20}=\dfrac12$

</details>

**Nivel 2: una pista**

4. Un curso de 25 alumnos promedia 5,4 y otro de 15 alumnos promedia 6,2. ¿Cuál es el promedio de los 40 juntos?
    - Suma total de notas dividida por 40.
5. Se lanzan dos monedas y un dado común. ¿Cuál es la probabilidad de obtener dos caras y un número mayor que 4?
    - Son independientes: multiplica.
6. (M2) Calcula la desviación estándar de 1, 3, 5, 7, 9.
    - El promedio es 5.
7. (M2) ¿Cuántos comités de 3 personas se pueden formar en un grupo de 8?
    - En un comité no importa el orden.

<details>
<summary>Respuestas, nivel 2</summary>

4. $\dfrac{25\cdot5{,}4+15\cdot6{,}2}{40}=\dfrac{228}{40}=5{,}7$
5. $\dfrac14\cdot\dfrac26=\dfrac{1}{12}$
6. Cuadrados $16,4,0,4,16$, varianza $\dfrac{40}{5}=8$, $\sigma=\sqrt8=2\sqrt2\approx2{,}83$
7. $\dbinom83=56$

</details>

**Nivel 3: una palabra**

8. (M2) De 120 personas, 80 se vacunaron y 6 de ellas enfermaron, mientras que de las 40 no vacunadas enfermaron 12. Si se elige al azar una persona que enfermó, ¿cuál es la probabilidad de que esté vacunada? (condicional)
9. (M2) Una prueba de 5 preguntas de verdadero o falso se responde al azar. ¿Cuál es la probabilidad de acertar exactamente 4? (binomial)
10. (M2) La masa de los recién nacidos sigue una normal con $\mu=3.200$ g y $\sigma=400$ g. ¿Qué proporción pesa menos de 2.400 g? (estandarizar)
11. (M2) ¿Cuántos anagramas tiene la palabra CASA? (repetidos)

<details>
<summary>Respuestas, nivel 3</summary>

8. Enfermaron $6+12=18$, de ellos 6 vacunados: $\dfrac{6}{18}=\dfrac13$
9. $\dbinom54\left(\dfrac12\right)^5=\dfrac{5}{32}$
10. $z=\dfrac{2.400-3.200}{400}=-2$, $P=1-0{,}977=0{,}023$, cerca del 2,3 %
11. $\dfrac{4!}{2!}=12$, la A se repite dos veces

</details>

**Nivel 4: sin ayuda, estilo PAES**

12. Una municipalidad entregará una beca al 30 % de los estudiantes de la comuna con mejores notas. ¿Qué medida permite determinar la nota mínima para obtener la beca?

    A) El percentil 30 de las notas
    B) El percentil 70 de las notas
    C) El tercer cuartil de las notas
    D) La mediana de las notas

13. Los tiempos de espera, en minutos, de dos sucursales se resumen en sus diagramas de cajón: sucursal A con mínimo 2, $Q_1=5$, $Q_2=8$, $Q_3=12$ y máximo 20; sucursal B con mínimo 4, $Q_1=6$, $Q_2=7$, $Q_3=9$ y máximo 14. ¿Cuál afirmación es verdadera?

    A) La mediana de A es menor que la de B
    B) Al menos el 50 % de los clientes de B esperó 7 minutos o menos
    C) A tiene menor rango intercuartil que B
    D) En A solo el 25 % de los clientes esperó más de 8 minutos

14. Una caja tiene 5 fichas numeradas del 1 al 5 y otra tiene 5 fichas numeradas del 6 al 10. Si se saca una ficha al azar de cada caja, ¿cuál es la probabilidad de que la suma sea par?

    A) $\dfrac12$
    B) $\dfrac{12}{25}$
    C) $\dfrac{13}{25}$
    D) $\dfrac{6}{25}$

15. (M2) Los puntajes de un ensayo siguen una normal con $\mu=500$ y $\sigma=100$. Usando $P(Z\le1)=0{,}841$ y $P(Z\le2)=0{,}977$, ¿qué proporción obtuvo entre 400 y 700 puntos?

    A) $0{,}818$
    B) $0{,}136$
    C) $0{,}659$
    D) $0{,}841$

16. (M2) De un grupo de 5 hombres y 4 mujeres se eligen 3 personas al azar. ¿Cuál es la probabilidad de que las 3 sean mujeres?

    A) $\dfrac{1}{21}$
    B) $\dfrac49$
    C) $\dfrac13$
    D) $\dfrac{64}{729}$

17. (M2) Las notas de un curso tienen varianza 1,44. Si a todas se les suman 3 décimas, ¿cuál afirmación es verdadera?

    A) La desviación estándar sigue siendo 1,2
    B) La varianza pasa a ser 1,74
    C) La desviación estándar pasa a ser 1,5
    D) El promedio no cambia

<details>
<summary>Respuestas, nivel 4</summary>

12. B, quedan sobre el percentil 70 exactamente el 30 % de mejores notas
13. B, la mediana de B es 7. A es falsa (8 > 7), C es falsa (7 > 3), D es falsa (sobre la mediana queda el 50 %)
14. B, par + par o impar + impar: $\dfrac{2\cdot3+3\cdot2}{25}=\dfrac{12}{25}$, la primera caja tiene 2 pares y 3 impares, la segunda 3 pares y 2 impares
15. A, $z$ va de $-1$ a $2$: $0{,}977-(1-0{,}841)=0{,}818$
16. A, $\dfrac{\binom43}{\binom93}=\dfrac{4}{84}=\dfrac{1}{21}$
17. A, sumar una constante no cambia la dispersión, $\sigma=\sqrt{1{,}44}=1{,}2$, el promedio sí sube 0,3

</details>

</details>

---

<details>
<summary>

# 6. LA PRUEBA {#la-prueba}

</summary>

Cómo es la prueba, qué da por sentado y cómo se responden las preguntas de Suficiencia de Datos. Todo sale del temario oficial DEMRE de la Admisión 2027 y del cuadernillo oficial M2 2025.

## 6.1. M1 y M2

| | M1 | M2 |
|---|---|---|
| Carácter | Obligatoria | Electiva, la piden las carreras científicas |
| Contenidos | 7° básico a 2° medio | 7° básico a 4° medio, todo M1 más lo marcado (M2) |
| Preguntas | 65, de ellas 60 cuentan para el puntaje | 55, de ellas 50 cuentan |
| Alternativas | 4 | 4 o 5 |
| Suficiencia de Datos | No | Sí |
| Tiempo | 2 h 20 min | 2 h 20 min |

Las preguntas que no cuentan son de prueba para años siguientes y no sabes cuáles son, así que todas valen lo mismo para ti.

El tiempo alcanza para unos 2 minutos por pregunta en M1 y 2,5 en M2:

$$
\frac{140}{65}\approx2{,}15\ \text{min}\qquad\frac{140}{55}\approx2{,}55\ \text{min}
$$

Una pregunta que se lleva más de 4 minutos se marca y se deja para la segunda vuelta.

## 6.2. Lo que la prueba da por sentado

La primera página del cuadernillo fija estas convenciones, valen para todas las preguntas:

| Convención | Qué significa para ti |
|---|---|
| Las figuras son solo indicativas | No midas el dibujo, calcula con los datos |
| Ejes perpendiculares con origen en $(0,0)$ | El plano cartesiano de siempre |
| $[p,q]$, $]p,q]$, $[p,q[$, $]p,q[$ | Corchete hacia adentro incluye el extremo, hacia afuera lo excluye |
| $\vec v=(a,b)$ | Vector que parte en el origen y termina en $(a,b)$, salvo que digan otra cosa |
| Dado común | 6 caras numeradas del 1 al 6, todas igual de probables |
| Moneda | Cara y sello igual de probables, salvo que digan otra cosa |
| $\log$ | Logaritmo en base 10 |

## 6.3. Las cuatro habilidades

Cada pregunta mide una habilidad sobre un contenido. Reconocer cuál ayuda a saber qué te piden:

| Habilidad | Cómo se ve la pregunta |
|---|---|
| Resolver problemas | Una situación con datos, piden un número |
| Modelar | "¿Cuál expresión representa...?", o qué significa un parámetro del modelo |
| Representar | Pasar de texto a ecuación, de tabla a gráfico, leer un gráfico |
| Argumentar | "¿Cuál afirmación es verdadera?", o encontrar el paso con error en un desarrollo |

En las de argumentar conviene revisar cada afirmación por separado con un ejemplo numérico: una afirmación general que falla en un solo caso es falsa.

## 6.4. Suficiencia de Datos (M2)

**Cuándo aparece:** solo en M2. Un enunciado con una pregunta y dos afirmaciones, (1) y (2).

No se pide la respuesta, solo decidir si los datos alcanzan para obtenerla. Las alternativas son siempre las mismas:

| Alternativa | Cuándo |
|---|---|
| A) \(1) por sí sola | (1) basta y (2) no |
| B) (2) por sí sola | (2) basta y (1) no |
| C) Ambas juntas, (1) y (2) | Ninguna basta sola, pero juntas sí |
| D) Cada una por sí sola, (1) ó (2) | Cada una basta sola |
| E) Se requiere información adicional | Ni juntas alcanzan |

**Receta**

1. Anota qué dato da el enunciado y qué piden. Los datos del enunciado valen siempre, junto a cada afirmación.
2. Mira (1) sola, olvidando (2). ¿Sale un único valor?
3. Mira (2) sola, olvidando (1).
4. Si alguna bastó, la respuesta es A, B o D. Si ninguna bastó, júntalas: C o E.

"Basta" significa que sale **un único** valor. Si quedan dos posibles, no basta. No hace falta terminar la cuenta, solo saber que se puede.

::: flow
**Ejemplo resuelto: juntas sí, solas no**

¿Cuál es el perímetro de un rectángulo?

\(1) Su área es $24$ cm². (2) Su largo es el doble de su ancho.

Con (1) sola sirven un rectángulo de $4\times6$ o uno de $3\times8$, con perímetros distintos:

$$
\displaystyle 2(4+6)=20\qquad 2(3+8)=22
$$

Con (2) sola se conoce la forma pero no el tamaño. Juntas, con ancho $a$:

$$
\displaystyle 2a\cdot a=24\ \Rightarrow\ a=\sqrt{12}
$$

Sale un único ancho positivo, así que el perímetro queda determinado ($6a=12\sqrt3$ cm, aunque no hacía falta calcularlo).

::: sol
Respuesta

C) Ambas juntas, (1) y (2)
:::
:::

::: flow
**Ejemplo resuelto: el enunciado cambia la respuesta**

¿Cuál es el valor de $x$?

\(1) $3x-6=0$. (2) $x^2=4$.

\(1) da $x=2$, un único valor. (2) da $x=2$ o $x=-2$, dos valores, no basta.

::: sol
Respuesta

A) \(1) por sí sola
:::

Si el enunciado dijera "$x$ es un número positivo", (2) ahora sí bastaría, porque descarta el $-2$.

::: sol
Respuesta con ese enunciado

D) Cada una por sí sola, (1) ó (2)
:::
:::

::: flow
**Ejemplo resuelto: dos afirmaciones que dicen lo mismo**

¿Qué edad tiene Ana?

\(1) Ana tiene 4 años más que Bea. (2) En 3 años más, Ana seguirá teniendo 4 años más que Bea.

Las dos dan la misma relación $A=B+4$. Juntarlas no agrega nada: una ecuación con dos incógnitas.

::: sol
Respuesta

E) Se requiere información adicional
:::
:::

**Error típico:** gastar tiempo calculando el valor. Apenas sabes que sale un único valor, pasa a la siguiente afirmación.

**Error típico:** marcar C cuando (1) ya bastaba sola. C exige que ninguna baste por separado.

## 6.5. Práctica

Todas son de Suficiencia de Datos, se responde con A, B, C, D o E. La ayuda disminuye de nivel en nivel.

**Nivel 1: guiado**

1. ¿Cuál es el valor de $a+b$? (1) $2a+2b=16$. (2) $a-b=2$.
    - En (1) saca factor común 2: aparece $a+b$ completo.
    - (2) da una relación pero no la suma.
2. ¿Cuántos estudiantes tiene un curso? (1) Hay 18 mujeres. (2) Las mujeres son el 45% del curso.
    - Cada afirmación sola deja libre el total.
    - Juntas: 18 es el 45% de algo.

<details>
<summary>Respuestas, nivel 1</summary>

1. A, de (1) sale $a+b=8$, con (2) $a$ y $b$ pueden ser $3$ y $1$ o $6$ y $4$
2. C, juntas: $18/0{,}45=40$ estudiantes

</details>

**Nivel 2: una pista**

3. ¿Es par el número entero $n$? (1) $n$ es múltiplo de 3. (2) $n$ es múltiplo de 6.
    - Prueba con $n=3$ y $n=6$ en la afirmación (1).
4. ¿Cuál es el radio de un círculo? (1) Su área es $16\pi$ cm². (2) Su perímetro es $8\pi$ cm.
    - Cada fórmula tiene una sola incógnita.

<details>
<summary>Respuestas, nivel 2</summary>

3. B, (1) admite $3$ (impar) y $6$ (par), (2) obliga a que $n$ sea par
4. D, de (1) $r^2=16$ y de (2) $2r=8$, ambas dan $r=4$

</details>

**Nivel 3: una palabra**

5. ¿Cuál es la probabilidad de sacar una bolita roja de una caja? (1) La caja tiene 20 bolitas. (2) Hay 5 azules y el resto son verdes o rojas (juntas)
6. ¿Cuál era el precio original de un producto con descuento? (1) Con descuento cuesta \$18.000. (2) El descuento fue de \$2.000 (suma)

<details>
<summary>Respuestas, nivel 3</summary>

5. E, juntas solo se sabe que hay 15 entre verdes y rojas, no cuántas rojas
6. C, juntas el precio original es $18.000+2.000=20.000$ pesos

</details>

**Nivel 4: sin ayuda, estilo PAES**

7. (M2) En un triángulo $ABC$ rectángulo en $C$, el cateto $BC$ mide 6 cm. ¿Cuánto mide la hipotenusa $AB$?

    \(1) $\operatorname{sen}(\alpha)=0{,}6$, con $\alpha$ el ángulo en $A$. (2) El área del triángulo es $24$ cm².

    A) \(1) por sí sola  
    B) (2) por sí sola  
    C) Ambas juntas, (1) y (2)  
    D) Cada una por sí sola, (1) ó (2)  
    E) Se requiere información adicional

8. (M2) Una recta $L$ pasa por el punto $(1,3)$. ¿Cuál es su ecuación?

    \(1) $L$ es paralela a la recta $y=2x+5$. (2) $L$ pasa por el origen.

    A) \(1) por sí sola  
    B) (2) por sí sola  
    C) Ambas juntas, (1) y (2)  
    D) Cada una por sí sola, (1) ó (2)  
    E) Se requiere información adicional

<details>
<summary>Respuestas, nivel 4</summary>

7. D, con (1) $6/AB=0{,}6$ da $AB=10$, con (2) $6\cdot AC/2=24$ da $AC=8$ y Pitágoras da $AB=10$
8. D, con (1) $y=2x+1$, con (2) dos puntos determinan la recta $y=3x$

</details>

</details>
