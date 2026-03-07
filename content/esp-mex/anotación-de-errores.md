# Lección 4: Entorno de anotación de errores

Como se describió en la lección anterior, los sistemas de gestión de calidad en traducción presentado aquí requiere que los proyectos se evalúen dentro de un entorno de anotación. En esta lección se analizan dos tipos de entornos de anotación, junto con sus ventajas y desventajas. En particular, se comparan las **herramientas de entorno de traducción** tradicionales con las **herramientas de anotación profesional** utilizadas en el aprendizaje automático.

## Las limitaciones de las herramientas de entorno de traducción

El norma actual de la industria de la traducción es la traducción oración por oración realizada en herramientas de entorno de traducción. Esta metodología no surgió de una preocupación por la calidad, sino del deseo de reducir los costos de traducción reutilizando oraciones previamente traducidas, almacenadas en memorias de traducción (MT), en nuevos proyectos. En el fondo, esta metodología refleja una visión de la traducción como un producto de consumo; su uso generalizado ha deprimido las tarifas del personal traductor y ha contribuido a la difusión de traducciones que distorsionan la naturaleza real de la actividad traductora.

A causa de la tecnología CAT y de las metodologías de traducción automática construidas sobre las MT, la traducción se concibe como la tarea de trasladar oraciones aisladas. Esta forma de trabajar puede describirse como el enfoque de la [celda de aislamiento](https://alainambrandt.locessentials.com/why-sentence-translation-wont-deliver/): impide la reformulación de párrafos, secciones de texto e incluso documentos completos para adaptarlos al estilo de escritura de la lengua meta. Incluso los sistemas de puntuación de traducción automática como [BLEU](https://arxiv.org/pdf/1911.03823) privilegian las traducciones literales.

Esta visión se extiende también a la localización. En lugar de diseñar sistemas que sean [culturalmente ergonómicos](https://loc801.locessentials.com/ref/Tsai_CulturalErgonomics_2024.pdf) para las audiencias meta, la localización se reduce a insertar traducciones literales, oración por oración, en un sistema concebido para una sola audiencia. En el contexto de Estados Unidos —y en muchas partes del mundo, dada la influencia global del ecosistema tecnológico de Silicon Valley— esto significa que quienes hablan inglés (o una lengua franca) utilizan sistemas diseñados específicamente con su forma de ver el mundo. Todas las demás personas quedan atrapadas en sistemas que no han sido diseñados para ellas, salvo por la incorporación de traducciones literales y difíciles de comprender.

En la práctica, la traducción debería adoptar un enfoque de documento completo, en el que el texto se escriba como una unidad cohesiva, considerando también el contexto más amplio del [contenido relacionado](https://www.ttt.org/wp-content/uploads/2022/05/Melby-Foster-Context-in-Translation.pdf) que existe sobre un tema en el mundo. El artículo "[Escaping the sentence-level paradigm in machine translation](https://arxiv.org/pdf/2304.12959)" identifica desafíos concretos de los entornos de traducción segmentada que podrían resolverse tomando en cuenta un contexto más amplio, como elementos textuales tales como la anáfora, la deixis y la conectividad discursiva.

Dado que las herramientas de entorno de traducción —y también los sistemas de traducción automática— están diseñados para producir traducciones literales y segmentadas que resultan de baja calidad, construir un sistema de gestión de calidad en traducción sobre esta metodología estructuralmente deficiente no puede subsanar sus carencias de fondo. La pregunta más urgente es si la traducción a nivel de oración debería seguir siendo el norma de la industria.

| **Desventajas** | **Ventajas** |
| ----- | ----- |
| La segmentación por oración impide producir traducciones cohesivas a nivel de documento completo | El personal traductor y editor ya está familiarizado con el trabajo en entornos CAT |
| Las MT incentivan la reutilización de traducciones heredadas de baja calidad en lugar de producir traducciones mejores | Para contenido altamente repetitivo y estandarizado, el reciclaje de MT puede ser genuinamente apropiado; la metodología no es inadecuada para todos los tipos de contenido |
| Los marcos de evaluación de calidad construidos sobre la metodología de segmentación no pueden evaluar características del discurso como la anáfora, la deixis y la cohesión | |

### ¿Qué ocurre con la evaluación de calidad en las herramientas CAT?

Algunas herramientas CAT ofrecen funcionalidades integradas de evaluación de calidad, incluyendo anotación al estilo MQM y marcado de errores. Sin embargo, estas implementaciones tienden a reflejar las mismas limitaciones estructurales de las herramientas en sí: la asignación de errores suele restringirse a uno por segmento, las tipologías son fijas para todos los proyectos en lugar de adaptarse al tipo de contenido, y los datos de anotación quedan encerrados dentro del editor XLIFF de la herramienta, lo que dificulta su exportación para su uso en pipelines de aprendizaje automático o en análisis transversales entre proyectos.

Para quienes deseen realizar evaluaciones de calidad rigurosas y reutilizables, un entorno de anotación dedicado resulta más adecuado. El resto de esta página presenta Label Studio como herramienta de anotación profesional diseñada precisamente para este tipo de trabajo.

## Label Studio

[Label Studio](https://labelstud.io/guide/get_started) es una plataforma de anotación de datos de código abierto diseñada para construir y gestionar conjuntos de datos etiquetados para el aprendizaje automático. A diferencia de las herramientas CAT, está construida desde cero para flujos de trabajo de anotación estructurados y exportables, lo que la hace especialmente adecuada para la evaluación de calidad en traducción basada en MQM. Label Studio ofrece interfaces de etiquetado altamente configurables, lo que permite adaptar las tipologías a tipos de contenido y proyectos específicos.

### Entornos de anotación vs. herramientas CAT para la evaluación MQM

**Ventajas**
- Los datos de anotación pueden exportarse fácilmente para su uso en pipelines de aprendizaje automático y en análisis transversales entre proyectos
- Es posible asignar múltiples errores a un mismo segmento, lo que permite anotaciones detalladas y superpuestas
- Las tipologías pueden configurarse por proyecto, con categorías de error específicas al contenido en lugar de una única tipología aplicable a todo

**Desventajas**
- El texto fuente debe consultarse fuera de la plataforma, lo que obliga a las personas evaluadoras a alternar entre ventanas
- La interfaz no filtra dinámicamente las subcategorías según la categoría principal seleccionada, por lo que es necesario navegar la lista completa independientemente del tipo de error que se esté trabajando
- La anotación de documentos extensos implica desplazarse considerablemente por la pantalla, ya que al seleccionar subcategorías no se regresa automáticamente al punto de anotación

### Cómo usar Label Studio

<figure class="image-center image-full">
  <img src="../../assets/TQMS-Label-Studio.png" alt="Interfaz de anotación de Label Studio que muestra una tarea de anotación de errores de traducción utilizando el marco MQM. El panel izquierdo muestra el texto fuente con fragmentos resaltados; el panel central presenta las casillas de categoría y subcategoría MQM junto con un campo para calificación de impacto y comentario; el panel derecho lista las anotaciones completadas por región." />
  <figcaption>La interfaz de anotación de Label Studio configurada para la anotación de errores de traducción basada en MQM, con categorías de error, subcategorías, calificaciones de impacto y el panel de regiones de anotación.</figcaption>
</figure>

**Anotación de errores y marcadores de calidad**

- Selecciona una categoría de etiqueta y resalta un fragmento de texto
- Elige la subcategoría correspondiente, asegurándote de que coincida con la categoría principal seleccionada
- Los marcadores de calidad pueden asignarse dentro de cualquier categoría de error
- Asigna un nivel de impacto
- Deja un comentario breve (de una a dos oraciones) que explique el error
- Agrega relaciones bidireccionales o unidireccionales entre anotaciones cuando sea pertinente

**Edición de anotaciones**

- Para cambiar la categoría de una anotación, selecciónala y elige una categoría diferente
- Para eliminar una anotación, selecciónala y haz clic en el ícono de eliminación

**Al concluir la anotación**

- Revisa tus resultados en el panel de Regiones y verifica que todas las anotaciones estén completas y sean correctas
- Según la naturaleza de los errores, deja un comentario sobre cualquier problema a nivel de documento
- Asigna calificaciones generales de correspondencia y legibilidad, con un comentario que explique tus puntuaciones
- Envía tu evaluación

**Notas importantes**

- Al trabajar en el entorno de Label Studio, tendrás acceso a todos los proyectos del sistema. Por favor, trabaja únicamente en los proyectos que te hayan sido asignados. Los proyectos relacionados con LocEssentials están marcados con una portada azul en el panel de control.
- Tus anotaciones se almacenan junto con las de otras personas evaluadoras. Evita consultar las anotaciones ajenas hasta haber completado tu propia revisión, para no sesgar tus resultados.

### Aprendizaje activo

En la lección sobre [normas](normas.md) te presentamos el artículo "[AI Could Actually Help Rebuild the Middle Class](https://www.noemamag.com/how-ai-could-help-rebuild-the-middle-class/)" y te pedimos que redactaras especificaciones de traducción para él. Ahora tendrás la oportunidad de practicar la anotación de errores en una traducción al español mexicano de ese texto.

Para comenzar, crea una cuenta en la instancia de Label Studio que hemos configurado para LocEssentials. Puedes registrarte [aquí](https://labelstudio.locessentials.com/user/signup/?token=NmyTDpp4Z6g3Ebhd2YKkMyEoGayNIuY4nEisW3hs).

Ten en cuenta que el sistema no cuenta con una función para restablecer tu contraseña si la olvidas. En ese caso, escribe a [alaina@locessentials.com](mailto:alaina@locessentials.com) para solicitar ayuda.

En el panel de control verás dos proyectos con fondo azul: uno se llama TQMS - Tech Training y el otro, TQMS - Typology Training.

<figure class="image-md">
  <img src="../../assets/Label-Studio-Training.png" alt="El panel de proyectos de Label Studio muestra dos tarjetas de proyecto con fondo azul: TQMS - Typology Training (actualizado el 6 de marzo de 2026 a las 15:46) y TQMS - Tech Training (actualizado el 6 de marzo de 2026 a las 15:09). Ambos proyectos muestran 0 de 1 tareas completadas y están asignados a la persona anotadora AB." />
  <figcaption>El panel de proyectos de Label Studio con los dos proyectos de capacitación asignados para esta lección.</figcaption>
</figure>

Comienza con el proyecto Tech Training, cuyo único objetivo es familiarizarte con la navegación de la interfaz. Cuando te sientas lista o listo, avanza al proyecto Typology Training para completarlo.

Mientras trabajas, reflexiona sobre las siguientes preguntas:
- ¿Cómo se compara el entorno de Label Studio con la edición en una herramienta CAT?
- ¿Cuáles errores fueron más difíciles de clasificar y por qué?
- Al terminar, explora las pestañas de otras personas evaluadoras para ver en qué difiere su trabajo del tuyo. En la próxima lección aprenderás a realizar análisis exploratorio de datos a partir de las anotaciones del equipo.

---

## A continuación: Análisis exploratorio de datos