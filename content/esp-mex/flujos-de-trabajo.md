# Lección 3: Flujos de trabajo en la gestión de calidad de traducción

Esta lección presenta los componentes de un Sistema de Gestión de Calidad en Traducción (SGCT) diseñado para capacitar a las personas evaluadoras en la evaluación del desempeño de traducciones para un tipo de contenido específico. El sistema se divide en tres etapas superpuestas que se repiten de manera cíclica: **preparación**, **trabajo con las personas evaluadoras** y **análisis y lecciones aprendidas**.

El sistema presentado aquí parte del supuesto de que un equipo de personas evaluadoras trabajará en conjunto en los mismos proyectos de evaluación de calidad en traducción (ECT). Tras cada proyecto, se mide la consistencia de sus resultados. Hasta que el equipo alcance el umbral de concordancia deseado, sus anotaciones no se despliegan en entornos de producción activa. Una vez alcanzado ese umbral, las anotaciones pueden utilizarse para capacitar a nuevas personas evaluadoras, proporcionar retroalimentación al personal traductor y enseñar a los LLMs a realizar evaluaciones de calidad.

El SGCT descrito aquí requiere que el equipo de evaluación alcance el umbral de concordancia deseado, ya que la evaluación de calidad es una actividad altamente subjetiva. Sin un proceso de armonización, cada integrante del equipo producirá resultados que pueden ser correctos de manera individual, pero inconsistentes respecto a los de sus pares. Cuando los resultados son inconsistentes, se introduce ruido en los entornos de producción, lo que dificulta que el personal traductor, las personas evaluadoras y los LLMs puedan mejorar a partir de esos datos.

## Concordancia entre personas evaluadoras: el desafío de llegar a acuerdos

En la lección anterior, conociste los tipos de error que deben identificarse durante la ECT, organizados en categorías y con niveles de impacto asignados. El principal obstáculo para alcanzar la concordancia entre personas evaluadoras radica precisamente en los múltiples niveles de clasificación sobre los que debe haber acuerdo:

1. ¿Las personas evaluadoras coinciden en que hay un error?
2. ¿Marcaron el mismo fragmento de texto como erróneo?
3. ¿Asignaron la misma categoría al error?
4. ¿Asignaron el mismo tipo al error?
5. ¿Asignaron el mismo nivel de impacto al error?

Al comprender que se requiere acuerdo en tantos niveles a la vez, resulta más comprensible por qué las mediciones iniciales de concordancia entre evaluadoras son tan bajas. No es inusual que las mediciones iniciales —incluso aquellas que consideran fragmentos de texto superpuestos— se sitúen por debajo del 5%. Estos niveles iniciales bajos también pueden deberse a la concordancia intrapersonal: la misma persona evaluadora puede evaluar un texto de manera diferente en cada ocasión.

Es a través del trabajo conjunto en una serie de proyectos que se logra una mayor concordancia, tanto intra como interpersonal.

## Generalización del flujo de trabajo

El siguiente cuadro ilustra los roles y las etapas involucradas en el establecimiento de un SGCT para un tipo de contenido específico. El flujo de trabajo requiere que las personas evaluadoras completen varios proyectos, incluidos proyectos de **capacitación tecnológica** y de **capacitación en tipología**. Una vez concluida la capacitación, el equipo de evaluación continúa realizando proyectos de ECT adicionales como parte de su formación, hasta alcanzar el umbral de concordancia deseado.

| | 1 | 2 | 3 | 4 | 5 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **Personas evaluadoras** | | Realizan proyectos de capacitación | | Realizan proyecto de ECT | |
| **Personas que administran** | | Administran proyectos de capacitación | | Administran proyecto de ECT | |
| **Personal de ingeniería** | Configura proyectos de capacitación | | Configura proyecto de ECT | | Configura proyecto de ECT |
| **Quienes gestionan la calidad** | Seleccionan proyectos de capacitación | | Analizan resultados<br>Aplican lecciones aprendidas<br>Seleccionan proyecto de ECT | | Analizan resultados<br>Aplican lecciones aprendidas<br>Seleccionan proyecto de ECT |

### Más sobre los proyectos

Como se señaló anteriormente, las personas evaluadoras necesitan completar varios proyectos en conjunto para lograr consistencia en sus resultados. Los proyectos que se describen a continuación están estructurados de manera que guían al equipo a través de su curva de aprendizaje de forma progresiva, sin dispersar su atención en demasiados aspectos al mismo tiempo.

- **Proyecto de capacitación tecnológica:** Es un proyecto ligero en el que las personas evaluadoras aprenden a usar el sistema tecnológico en el que realizarán sus evaluaciones. El objetivo es que el equipo aprenda a navegar el sistema, qué información debe ingresar y qué pasos seguir en cada momento.
- **Proyecto de capacitación en tipología:** Es un proyecto también ligero, centrado en que las personas evaluadoras se familiaricen con la tipología de errores que deberán aplicar. En la capacitación, es recomendable comenzar con los errores más fáciles de categorizar y avanzar hacia aquellos con mayor probabilidad de generar variación en su clasificación.
- **Proyectos de Evaluación de Calidad en Traducción:** Una vez concluida la capacitación, los equipos realizan una serie de proyectos de ECT en los que las personas evaluadoras llevan a cabo evaluaciones, mientras que quienes gestionan la calidad y quienes analizan los datos examinan los resultados para medir la consistencia e incorporar las lecciones aprendidas al siguiente proyecto. Por ejemplo, puede ser necesario distinguir entre errores de vocabulario y errores de terminología, o entre errores de cohesión y errores de coherencia.

### Recursos necesarios para construir los proyectos

Para cada proyecto se requieren los siguientes recursos:

- Un **texto fuente** que haya sido traducido y el **texto meta** para su evaluación
- **Especificaciones** que definan los requisitos que debe cumplir la traducción
- La **tipología de errores** que se utilizará durante la evaluación
- Un **proyecto** configurado en la plataforma en la que las personas evaluadoras realizarán su trabajo
- Un **análisis de datos** de concordancia entre evaluadoras que oriente las mejoras del sistema

Lo ideal es que cada proyecto corresponda a la misma área de contenido y aplique la misma tipología de errores, de modo que el equipo evaluador pueda construir una comprensión cohesiva de los errores dentro de un dominio específico.

Con el tiempo, también es posible desarrollar un sólido banco de materiales de capacitación, como tablas de ejemplos de errores, árboles de decisión y recursos similares.

## Elevar el nivel de producción

Este proceso puede parecer muy laborioso para establecer un sistema de gestión de calidad en traducción, pero los resultados justifican el esfuerzo. Cuando los equipos de evaluación alcanzan niveles altos de concordancia, los equipos de producción pueden dar un salto de calidad. Los errores más frecuentes pueden priorizarse para el análisis de causa raíz y la implementación de acciones preventivas, lo que genera un entorno de producción en el que las traducciones se producen con mayor rapidez y mayor calidad desde el primer intento. Además, todos esos datos pueden utilizarse para entrenar sistemas basados en LLMs que produzcan borradores iniciales de alta calidad para su verificación profesional.

## Aprendizaje activo

Reflexiona sobre todas las personas y los materiales que trabajan en conjunto para construir el SGCT descrito aquí.

1. Resume los tipos de archivos que se necesitan.
2. Decide cómo presentarías estos materiales. ¿En qué orden se presentarían y utilizarían?
3. ¿Quiénes usarían cada uno de los materiales descritos y de qué manera?
4. ¿Qué tipos de materiales añadirías a los mencionados para desarrollar tu sistema?
5. Piensa en una línea de productos específica para la que te gustaría construir este tipo de sistema. ¿Qué proyectos incluirías? ¿Qué especificaciones? ¿Qué tipología de errores?

---

## A continuación: Entorno de anotación de errores

En la próxima lección, exploraremos los entornos de anotación utilizados para llevar a cabo la evaluación de calidad, y practicaremos de manera directa la anotación de errores de traducción en Label Studio.