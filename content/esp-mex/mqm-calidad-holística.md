# Lección 2: Tipología de errores MQM y calidad holística

En esta lección trabajaremos con la Tipología de Errores MQM, un marco para el marcado de errores de traducción que puede aplicarse tanto a traducciones humanas como automáticas. Según el [sitio web de MQM](https://themqm.org), "MQM puede utilizarse para identificar problemas de calidad en productos de traducción, clasificarlos conforme a una tipología de errores estandarizada, abierta y compartida, y generar métricas de calidad que permitan evaluar en qué medida el producto de traducción cumple con los requisitos de calidad establecidos". El marcado de errores que sigue un marco estandarizado como MQM también habilita el análisis de causa raíz y la incorporación de acciones preventivas que, con el tiempo, hacen que la producción de traducciones sea más eficiente y alcance mayor calidad desde el primer intento.

Las anotaciones producidas con sistemas como MQM pueden utilizarse para capacitar a las personas evaluadoras en la realización de evaluaciones más precisas, para entrenar LLMs en la evaluación de calidad, y para generar retroalimentación que apoye el aprendizaje y el desarrollo del personal traductor. Las traducciones humanas de mayor calidad, a su vez, pueden usarse para entrenar a los LLMs a traducir mejor.

<figure class="image-center image-md">
  <img src="../../assets/translation-annotations.svg" alt="Diagrama que muestra nodos de Traducción y Anotación, cada uno conectado a un Agente LLM, con flechas bidireccionales entre Traducción y Anotación" />
  <figcaption>Flujo de trabajo de traducción y anotación con agentes LLM</figcaption>
</figure>

Aunque este curso se centra en MQM, es importante señalar que este marco puede no ser adecuado para anotar traducciones en todas las lenguas. Antes de adoptarlo, conviene evaluar si su organización corresponde con los mapas mentales con los que las personas piensan sobre los errores de traducción en una lengua específica.

## Tipología MQM personalizada

La tipología núcleo de MQM incluye treinta y ocho tipos de error en siete categorías. Aquí presentamos una versión personalizada —y simplificada— de esa tipología núcleo, con **diecisiete tipos de error** en **seis categorías**. El criterio detrás de esta decisión es que, cuantos más tipos de error deban verificar las personas evaluadoras, mayor es la probabilidad de que los errores se clasifiquen incorrectamente o pasen inadvertidos.

Si bien los sistemas tecnológicos que incorporan la tipología MQM suelen permitir que una sola versión se aplique a todos los tipos de contenido y proyectos, recomendamos diseñar tipologías específicas que atiendan los tipos de error relevantes para cada tipo de contenido, tomando como base las especificaciones establecidas para el trabajo.

Por ejemplo, la etiqueta de error "omisión" se asigna generalmente cuando la traducción meta omite información presente en el texto fuente. Sin embargo, realizar omisiones selectivas suele ser necesario en contenido con restricciones de espacio, como los límites de caracteres asociados a los subtítulos. Si las omisiones son necesarias para respetar esas restricciones, puede convenir incluir un tipo de error más específico que oriente hacia la omisión del tipo *correcto* de información. Si la traducción omitió el rema (información nueva) en lugar del tema (información conocida), eso podría constituir un error de "omisión de rema" en trabajos de subtitulado.

A continuación presentamos la tipología de errores personalizada, junto con una descripción de cada tipo de error y orientaciones para aplicar los marcadores de calidad.

### Terminología

| Tipo | Descripción |
| ----- | ----- |
| Corrección | El uso terminológico debe ser correcto según el contexto del campo temático y la audiencia. Si se han proporcionado glosarios, deben seguirse (salvo que sean incorrectos). |
| Consistencia | En algunos tipos de texto, el uso terminológico debe ser consistente. En otros tipos de texto y en algunas lenguas, se prefiere la variación elegante de la terminología. |

### Exactitud

| Tipo | Descripción |
| ----- | ----- |
| Traducibilidad | Todo el texto que debía traducirse fue traducido. Ningún texto que debía conservarse sin traducir fue traducido. |
| Completitud | Una traducción completa evita generalmente las omisiones y las adiciones, así como la sobretraducción y la infratraducción. La sobretraducción introduce una especificidad incorrecta (por ejemplo, se nombra un tipo específico de flor en lugar de referirse a las flores en general); la infratraducción introduce generalizaciones incorrectas (por ejemplo, se menciona una herramienta específica y se hace referencia a ella de forma genérica). |
| Mala traducción | Las malas traducciones son resultado de haber malinterpretado el sentido transmitido en el texto fuente. |

### Estilo

| Tipo | Descripción |
| ----- | ----- |
| Naturalidad | Las traducciones deben leerse de manera natural para la audiencia a la que van dirigidas y deben evitar rendiciones literales que dificulten la comprensión. |
| Consistencia | Por lo general, las convenciones estilísticas deben ser consistentes a lo largo de una traducción. La consistencia en el estilo se refleja en el tratamiento de ciertos elementos textuales, como encabezados y pies de imagen. |
| Registro | El registro es el nivel de formalidad del texto. Se manifiesta de diversas formas: en algunas lenguas, el registro se refleja en la gramática; la elección de palabras también incide en la formalidad del texto. |
| Tipo de texto | Los tipos de texto tienen sus propias convenciones que deben respetarse. Por ejemplo, un prompt escrito para un LLM debe usar generalmente la segunda persona. |
| Guías de estilo | Cuando se proporcionan guías de estilo, deben seguirse (salvo que sean incorrectas). |
| Referencias externas | Las referencias externas pueden influir en cómo debe redactarse un texto. Por ejemplo, quien solicita el servicio puede requerir que se siga el formato de citación APA. |

### Convenciones lingüísticas

| Tipo | Descripción |
| ----- | ----- |
| Gramática | Los textos deben seguir las reglas gramaticales de la lengua. Según la audiencia, es posible que las reglas gramaticales consideradas "estándar" no sean las más adecuadas. |
| Ortografía | La corrección ortográfica implica no solo evitar erratas, sino también el uso correcto de guiones y mayúsculas. La ortografía debe corresponder a la variante lingüística en la que debía redactarse el texto. |
| Puntuación | La puntuación no se usa de la misma manera en todas las lenguas. Debe emplearse conforme a las convenciones de la lengua meta. |

### Convenciones regionales

| Tipo | Descripción |
| ----- | ----- |
| Números | Los números aparecen en los textos de diversas formas: como fechas, monedas, medidas, entre otras. |

### Adecuación a la audiencia

| Tipo | Descripción |
| ----- | ----- |
| Referencias culturales | Dependiendo de si se ha seguido un enfoque domesticador o extranjerizante, es posible que las referencias culturales específicas deban localizarse para el mercado meta. En contenido web, los enlaces deben actualizarse para dirigir a versiones en la lengua meta. |
| Contenido ofensivo | Las traducciones no deben ser ofensivas. Una traducción ofensiva puede surgir de la traducción automática o del uso de una variante lingüística incorrecta. |

### Marcadores de calidad

Una brecha que identificamos en el marco MQM es la ausencia de una forma natural de destacar los aspectos de una traducción que están particularmente bien logrados. Si bien identificar errores es fundamental, centrarse únicamente en los problemas implica desaprovechar una oportunidad clave: sin refuerzo positivo, las personas traductoras y quienes gestionan la calidad no se entrenan sistemáticamente para reconocer las fortalezas. Se pierde así la posibilidad de reforzar y desarrollar de manera consciente lo que alguien ya hace bien.

Nuestro sistema incorpora una etiqueta de **marcador de calidad** que puede asignarse a cualquiera de las categorías anteriores (terminología, exactitud, estilo, etc.). El propósito de este marcador no es señalar traducciones que simplemente son correctas —eso debe ser la línea base—, sino destacar aquellas en las que la traducción ha resuelto un aspecto particularmente difícil del texto fuente.

### Niveles de impacto

El marco MQM asigna niveles de gravedad a los errores de traducción: neutro, menor, mayor y crítico. Un error clasificado como neutro puede ser aquel en que una traducción alternativa sería mejor, aunque la existente sea correcta. Un error menor es aquel que no afecta la posibilidad de usar el contenido. Un error mayor sí afecta esa posibilidad. Un error crítico es aquel que podría causar daños severos, ya sea físicos o reputacionales.

Dado que hemos incorporado marcadores de calidad a nuestra tipología personalizada, consideramos necesario pasar de "Niveles de gravedad" a "Niveles de impacto". Nuestros niveles se denominan **neutro**, **moderado**, **fuerte** y **contundente**, y cualquiera de ellos puede aplicarse con sentido tanto a errores como a marcadores de calidad.

## Calidad holística

Una vez marcados los errores individuales y comprendida la naturaleza de los errores reflejados en la traducción, es posible calificar las traducciones en función de su **correspondencia** y **legibilidad** generales, donde:

- Para correspondencia: 1 significa diferencias significativas en el significado y 4 significa una excelente correspondencia de sentido, y
- Para legibilidad: 1 significa difícil de leer y 4 significa natural para leer,

Ambas considerando las especificaciones establecidas, como audiencia y propósito.

Aquí, la correspondencia es qué tan bien la traducción refleja los sentidos transmitidos en el texto fuente, y la legibilidad es qué tan bien se leería la traducción para la audiencia específica a la que va dirigida. Si el texto contiene incluso un solo error **fuerte**, tendemos a calificar la traducción con no más de dos en la categoría de correspondencia.

## Efectividad de la traducción

Una vez establecidas las calificaciones holísticas, pueden utilizarse para determinar la efectividad general de la traducción.

| | Correspondencia | Legibilidad | Descripción |
| ----- | ----- | ----- | ----- |
| Efectiva | 4 | 4 | La traducción facilita plenamente la comprensión de la audiencia específica y permite que el texto sea utilizado de manera adecuada. |
| Mayormente efectiva | 3 | 3 | La traducción facilita en su mayor parte la comprensión general de la audiencia. Presenta errores menores que no impiden el uso del texto. |
| Parcialmente inefectiva | 2 | 2 | Partes de la traducción dificultan la comprensión y el uso general del contenido. |
| Inefectiva | 1 | 1 | La traducción no puede comprenderse o está significativamente incompleta. |

Nótese que cuando una traducción recibe una puntuación baja de legibilidad, esto también afecta negativamente su correspondencia. La vía para lograr la correspondencia en traducción no son las traducciones literales que dificultan la comprensión, aunque métricas automáticas de calidad provenientes de la comunidad de traducción automática, como BLEU, favorezcan precisamente ese tipo de traducciones.

## Aprendizaje activo

Busca, escribe o genera ejemplos de traducciones que ilustren los tipos de error descritos anteriormente. Puedes recurrir a ejemplos que hayas encontrado al trabajar con contenido bilingüe, redactar o describir un ejemplo propio, o pedirle a un LLM que genere uno. Si trabajas en equipo, los ejemplos son una excelente forma de identificar los tipos de problemas que distintas personas están categorizando de manera diferente, mientras avanzan hacia una comprensión armonizada de los errores de traducción. Más adelante, los ejemplos recopilados pueden utilizarse para capacitar a las personas que se integren al equipo y ayudarles a entender cómo ustedes clasifican los errores.

---

## A continuación: Flujos de trabajo de gestión de calidad en traducción

En la próxima lección, exploraremos cómo construir un sistema que capacite a las personas evaluadoras para aplicar esta tipología de manera consistente en un entorno de producción.