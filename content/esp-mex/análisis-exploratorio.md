# Lección 5: Análisis exploratorio de datos

En la lección anterior completaste tus primeras anotaciones en Label Studio. Ahora surge una pregunta que toda persona responsable de la calidad enfrenta tarde o temprano: cuando un equipo de evaluadores ha anotado el mismo texto, ¿cómo se interpreta lo que produjeron? ¿Cómo saber si sus resultados son lo suficientemente consistentes para ser útiles, y cuando no lo son, cómo identificar la causa?

Para eso sirve el **análisis exploratorio de datos** (AED). El AED es el proceso de examinar los datos de anotación para entender qué contienen, dónde emergen patrones y dónde radican los problemas. En el contexto de un sistemas de gestión de calidad en traducción, el AED es la herramienta principal para diagnosticar el desacuerdo y decidir qué hacer al respecto. Sin él, el flujo de trabajo descrito en la Lección 3 de evaluar, medir, mejorar y repetir carece de dirección.

Esta lección presenta las herramientas de AED disponibles en el [repositorio de Evaluación de Calidad en Traducción](https://locessentials.github.io/translation-quality-evaluation/) (en inglés) que acompaña este curso. Aprenderás qué produce el cuaderno de Jupyter, cómo leer el reporte HTML que genera y cómo utilizar ambos para orientar la calibración entre personas evaluadoras.

## Dos herramientas, dos audiencias

El repositorio incluye un cuaderno de Jupyter (`Translation_Annotator_Agreement.ipynb`) que procesa exportaciones de anotaciones de Label Studio y genera un reporte HTML. Estos dos artefactos tienen propósitos distintos y están dirigidos a públicos diferentes.

El **reporte HTML** está diseñado para personas responsables de la calidad y evaluadoras que necesitan actuar sobre los hallazgos sin necesidad de ejecutar código. Presenta visualizaciones y puntuaciones en un formato legible que puede compartirse con el equipo, discutirse en una sesión de calibración y archivarse como registro del desarrollo de la concordancia a lo largo del tiempo.

El **cuaderno de Jupyter** es para quienes desean entender el funcionamiento de los cálculos, explorar el análisis con mayor profundidad, ajustar parámetros o adaptar el análisis a una configuración de proyecto distinta. Expone todo el pipeline, desde el JSON en bruto de Label Studio hasta el reporte terminado, y está documentado de principio a fin para que pueda modificarse sin necesidad de descifrar la lógica desde cero.

Si tu función está más cerca de la capacitación y la evaluación, el reporte HTML es tu herramienta principal. Si tu función implica construir o mantener el sistema, el cuaderno es donde pasarás la mayor parte del tiempo.

## Qué cubre el AED

El cuaderno y el reporte se organizan en torno a cuatro áreas de análisis, cada una de las cuales agrega una capa de comprensión a los datos de anotación en bruto.

### Visualización de superposición de fragmentos

Lo primero que produce el cuaderno es una representación visual del texto anotado. Cada fragmento marcado como error aparece resaltado, y la intensidad del color refleja cuántas personas anotadoras coincidieron en señalar ese fragmento como problemático. Los colores más oscuros indican mayor concordancia; los más claros, menor.

Al colocar el cursor sobre un fragmento resaltado en el reporte HTML, se despliega un resumen: el número de personas anotadoras que lo marcaron, las categorías y subcategorías de error que asignaron, los niveles de impacto y los comentarios. Esto permite identificar no solo *dónde* es alta o baja la concordancia, sino también *qué estaban señalando* las personas evaluadoras en cada caso.

Esta visualización suele ser el resultado más inmediatamente útil para las sesiones de calibración, ya que ofrece a todo el equipo una referencia visual compartida para discutir fragmentos específicos del texto.

### Resúmenes por anotador

Antes de examinar las puntuaciones de concordancia, conviene comprender las características generales del trabajo de cada anotador. El cuaderno presenta varias métricas a nivel individual:

- **Número de fragmentos**: cuántos errores marcó cada persona anotadora. Diferencias grandes, por ejemplo, una persona que marca 88 fragmentos mientras otra marca 7, son una señal que vale la pena investigar antes de revisar las puntuaciones de concordancia. Una persona que sistemáticamente marca demasiado o muy poco mostrará baja concordancia con todas las demás, por razones que tienen más que ver con la calibración que con confusión en las categorías.
- **Completitud**: si cada persona anotadora completó todos los campos requeridos: subcategoría, nivel de impacto, comentario de fragmento y calificaciones generales de correspondencia y legibilidad. Las anotaciones incompletas afectan los cálculos posteriores.
- **Tiempos**: cuánto tardó cada persona en completar la tarea, según lo registrado por Label Studio. Tiempos de revisión inusualmente cortos pueden indicar que una persona trabajó de manera apresurada.

Estos resúmenes no producen una puntuación, pero ofrecen contexto importante para interpretar las que siguen.

### Distribución de tipos de error

El cuaderno también visualiza la distribución de categorías y subcategorías de error entre todas las personas anotadoras. Estas gráficas responden preguntas como: ¿están identificando los mismos tipos de errores, aunque no siempre en los mismos fragmentos? ¿Hay una categoría que aparece con más frecuencia que las demás? ¿Hay subcategorías que se evitan, lo que podría indicar confusión sobre cuándo aplicarlas?

El análisis de distribución es especialmente útil para identificar patrones sistemáticos en el desacuerdo. Si la mayoría de las personas anotadoras marca errores de exactitud, pero una de ellas clasifica sistemáticamente los mismos problemas como errores de estilo, esa es una conversación de calibración que está esperando ocurrir, y es mucho más fácil tenerla cuando se puede señalar directamente a los datos.

### Calificaciones holísticas

Además de las anotaciones a nivel de fragmento, las personas evaluadoras asignan puntuaciones generales de **correspondencia** y **legibilidad** a la traducción en su conjunto. El cuaderno visualiza la distribución de estas calificaciones entre anotadores y, cuando se han evaluado varios documentos, también entre documentos.

Estas puntuaciones son útiles como verificación de coherencia. Si las personas anotadoras coinciden ampliamente en la calidad holística pero difieren significativamente en las anotaciones individuales de fragmentos, eso dice algo diferente a si tanto las puntuaciones holísticas como el trabajo a nivel de fragmento son inconsistentes.

## Cálculos de concordancia

La sección de AED describe el aspecto de los datos. Los cálculos de concordancia describen qué tan consistentes son. El cuaderno produce tres tipos de puntuaciones de concordancia, cada una respondiendo a una pregunta distinta.

### Coincidencia exacta

La medida más directa es la **coincidencia exacta**: ¿marcaron dos personas anotadoras el mismo fragmento de texto de manera idéntica? La coincidencia exacta compara las posiciones de inicio y fin de cada fragmento anotado y contabiliza cuántas veces coinciden con precisión entre anotadores.

En la práctica, la coincidencia exacta tiende a ser baja incluso cuando las personas anotadoras trabajan bien en conjunto. Un fragmento que una persona marca desde el inicio de una oración y otra desde la tercera palabra puede representar el mismo juicio sobre el mismo error, solo con límites ligeramente distintos. La coincidencia exacta lo contará como un desacuerdo.

Por eso la coincidencia exacta es más útil como umbral mínimo: si es alta, significa que las personas anotadoras trabajan con una concordancia excepcional. Si es baja, eso no significa necesariamente que no estén de acuerdo. Puede simplemente indicar que sus límites difieren un poco. La siguiente métrica contempla precisamente ese caso.

### Puntuación F1 (precisión y exhaustividad)

La **F1** otorga crédito parcial por fragmentos superpuestos, incluso cuando los límites no coinciden exactamente. Para entender la F1, conviene entender las dos medidas que combina.

La **precisión** responde a la pregunta: de todos los fragmentos que marcó una persona anotadora, ¿cuántos se superponen con algún fragmento marcado por otra persona? Una persona con alta precisión está señalando cosas que otras también señalan: no marca errores que nadie más ve.

La **exhaustividad** responde a la pregunta: de todos los fragmentos marcados por otras personas anotadoras, ¿cuántos también los capturó esta persona? Una persona con alta exhaustividad no pasa por alto cosas que otras sí están detectando.

La F1 es la media armónica de precisión y exhaustividad: un único número que equilibra ambas. Una puntuación de 1,0 significa concordancia perfecta en la detección de fragmentos; una puntuación de 0 significa que no hay fragmentos superpuestos en absoluto.

En el contexto de un sistema de gestión de calidad en traducción, la F1 es la medida más informativa de si las personas anotadoras están encontrando los mismos errores en el texto, aunque no los marquen con límites exactamente idénticos. Cuando la F1 es baja, el equipo necesita trabajar en qué fragmentos señalar. Cuando la F1 es aceptable pero la concordancia en las categorías es baja, el problema es cómo clasificar lo que ya encontraron, y ahí es donde entra la Kappa de Cohen.

### Kappa de Cohen

La **Kappa de Cohen** mide la concordancia en *cómo* clasificaron los fragmentos que ambas personas anotadoras marcaron. Se calcula para la categoría de error, la subcategoría y el nivel de impacto, y se reporta para cada par de anotadores en el proyecto.

La razón por la que la Kappa se calcula por pares, en lugar de como una única puntuación para todo el equipo, es que puede revelar cuáles pares específicos están bien calibrados entre sí y cuáles no. Si la persona A y la persona B coinciden de manera consistente, pero ambas discrepan de la persona C, esa es una situación diferente a que las tres sean igualmente inconsistentes entre sí.

Las puntuaciones de Kappa van de -1 a 1. Una puntuación de 1,0 indica concordancia perfecta; una puntuación de 0 indica que el nivel de concordancia no es mejor que el azar; una puntuación negativa indica que las personas anotadoras están en desacuerdo sistemático, lo que significa que son *menos* consistentes que el azar. En las primeras rondas de evaluaciones, puntuaciones de Kappa inferiores a 0,2 o incluso negativas no son inusuales, es lo esperado. El objetivo del proceso de calibración es elevar esas puntuaciones con cada proyecto sucesivo.

El cuaderno presenta las puntuaciones de Kappa por pares en una tabla. Al leerla, conviene buscar primero los valores atípicos: una persona cuyos resultados son consistentemente bajos con todos sus pares es candidata a recibir capacitación adicional; una persona cuya Kappa es baja con un único compañero o compañera puede tener simplemente un punto de desacuerdo concreto que puede resolverse en una sesión de calibración.

## Del análisis a la acción

El AED solo es útil si conduce a algo. Después de ejecutar el cuaderno, estudiar las calculaciones y revisar el reporte HTML, la persona responsable de la calidad y quien facilita el proceso deben poder responder dos preguntas:

1. **¿Dónde se está fragmentando la concordancia?** ¿El problema está en la detección de fragmentos (F1 baja), en la clasificación (Kappa baja) o en ambas? ¿Hay personas anotadoras que son sistemáticamente atípicas?

2. **¿Cuál es la causa más probable?** ¿Las personas anotadoras están subidentificando errores porque no tienen claro qué cuenta como tal? ¿Están clasificando el mismo fragmento de manera diferente porque dos categorías de error son genuinamente ambiguas para este tipo de contenido? ¿Está aplicando alguna persona un estándar más estricto que las demás?

Las respuestas a estas preguntas deben orientar directamente los materiales y las discusiones preparados para la siguiente ronda de calibración. Con el tiempo, este ciclo de anotar, analizar, calibrar y repetir es lo que lleva a un equipo desde el desacuerdo inicial hasta las anotaciones consistentes y reutilizables que son el objetivo de todo el sistema.

## Aprendizaje activo

Una vez que hayas completado tus anotaciones en Label Studio, podrás ver cómo se compara tu trabajo con el de las demás personas anotadoras en el sistema a través de un reporte como el que se comparte a continuación.

Abre el [reporte HTML de ejemplo](https://locessentials.github.io/translation-quality-evaluation/6_annotator_agreement/reports/QUALITY%20REVIEWS_report_2026-03-19.html) (en inglés) generado a partir del cuaderno de concordancia entre anotadores.

Mientras lo revisas, considera lo siguiente:

1. Observa la visualización de superposición de fragmentos. ¿Hay zonas del texto donde las personas anotadoras coincidieron ampliamente? ¿Hay zonas donde la concordancia fue escasa? ¿Qué podría explicar la diferencia?
2. Revisa los resúmenes por anotador. ¿Hay diferencias notables en cuántos fragmentos marcaron distintas personas? ¿Qué podrían sugerir esas diferencias sobre cómo interpretaron su tarea?
3. Observa la distribución de tipos de error. ¿Parecen las personas anotadoras usar la tipología de manera similar, o hay categorías distribuidas de manera desigual entre ellas?
4. Observa la gráfica de F1 de fragmentos. La exhaustividad es notablemente mayor que la precisión. ¿Qué te dice ese desequilibrio sobre cómo trabajaban las personas anotadoras en este proyecto de ejemplo? Si fueras la persona responsable de la calidad, ¿qué investigarías primero?

---

## A continuación: Análisis de causa raíz y mejora continua

En la próxima lección, aprenderás a identificar las causas raíz de los errores recurrentes en producción y a diseñar acciones correctivas que fortalezcan el proceso a lo largo del tiempo.