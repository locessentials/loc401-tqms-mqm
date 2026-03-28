# Lesson 3: Translation Quality Management Workflows

This lesson presents the components of a Translation Quality Management System (TQMS) designed to train evaluators to evaluate translation performance for a specific content type. The system here is divided into three overlapping stages, which are repetitive: **preparation**, **work with evaluators**, **analysis and lessons learned**.

The system presented assumes that a team of evaluators will work together evaluating the same translation quality evaluation (TQE) projects. After each project, the consistency of their results is measured. Until they have met the desired agreement threshold, their annotations are not deployed in live production environments. Once they have met the desired agreement threshold, their annotations can be deployed to train new evaluators, give feedback to translators, and to teach LLMs to perform quality evaluations.

The TQMS described here requires a team of evaluators to meet the desired agreement threshold because quality evaluation is a very subjective activity. Without harmonization, each individual in a team will produce results that may be good, but that are inconsistent with the results of their peers. When results are inconsistent, that introduces confusion into production environments where translators, evaluators, and LLMs will not be able to improve due to noisy data.

## Inter-rater reliability: The Challenge of Reaching Agreement

Think back to the last lesson, in which you learned about the error types to be identified during TQE. You learned that error types are organized into categories and that they have severity levels assigned to them. The number of levels of classification that evaluators need to agree on is the main challenge to achieving inter-rater reliability.

1. Do the evaluators agree that there is an error?
2. Did they mark the same span of text as an error?
3. Did they assign the same category to the error?
4. Did they assign the same type to the error?
5. Did they assign the same impact to the error?

Once we understand that agreement needs to be roughly reached on so many levels, it also becomes much more understandable why initial inter-rater reliability measurements are so low. It's not usual for initial measurements, even those that take into account overlapping spans of text, to be below 5%. The initially low agreement levels can also stem from intra-rater reliability, or the fact that the same evaluator may evaluate texts differently each time they do an evaluations.

It's through working together on a series of projects that higher intra- and inter-rater reliability is gained.

## Generalization of the Workflow

The chart below illustrates the roles and stages involved in establishing a TQMS for a specific content type. The workflow requires numerous projects to be evaluated by the quality evaluators, including **technological training** and **typology training** projects. After completing the training projects, evaluators continue carrying out evaluations on additional **TQE projects** as part of their training until the reach the desired agreement threshold.

| | 1 | 2 | 3 | 4 | 5 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **Evaluators** | | Do training projects | | Do TQE project | |
| **Proctors** | | Administer training projects | | Administer TQE project | |
| **Engineers** | Setup training projects | | Setup TQE project | | Setup TQE project | |
| **Quality Managers** | Select training projects | | Analyze results<br>Apply lessons learned<br>Select TQE project | | Analyze results<br>Apply lessons learned<br>Select TQE project |

### More about Projects

As discussed above, evaluators need to complete a number of projects together to reach consistency in their results. The projects we discuss here are scaffolded so as to guide evaluators through their learning curve reasonably, without spreading their attention too thin at one time. 

- **Technology training project:** This is a lightweight project in which evaluators learn to use the technological system in which they'll be doing evaluations. The point here is for evaluators to learn how to navigate the system, what information needs to be added, and what buttons to click when.
- **Typology training project:** This is a lighter-weight project in which evaluators learn about the error typology they'll need to apply. In training, it's a good idea to move from errors that are easier to categorize on to those that are most likely to have variance in their classification.
- **Translation Quality Evaluation projects:** After going through training, teams complete a series of TQE projects, in which evaluators perform evaluations and quality managers and data analysts analyze their results to measure consistency and incorporate lessons learned into the next project. For example, vocabulary errors may need to be distinguished from terminology errors. Cohesion errors may need to be distinguished from coherence errors. 

### Assets Needed When Building Projects

For each project, the following assets are needed:

- A **source text** that has been translated and the **target text** for evaluation
- **Specifications** that outline the requirements to be met in the translation
- The **error typology** to be used during evaluation
- A **project** on the platform in which evaluators will do their evaluation
- **Data analysis** of inter-rater agreement that informs system improvements

Ideally, each project will be within the same content area and apply the same error typology so that evaluators can build up cohesive understanding of errors within a specific domain.

Over time, you can also develop a strong bank of training materials, such as error example charts, decision trees, and the like.

## Level Up Your Production

This may seem like a lot of effort to go through to establish a translation quality management system, but the results make all of this effort worth it. When evaluation teams have high inter-rater reliability that enables production teams to level up. Frequently occurring errors can be prioritized for root cause analysis and preventative action, leading to a production environment in which translations are produced faster and at a higher quality levels. Plus, all that data can be used to train LLM-based systems to produce high-quality initial draft translations for professional verification.

## Active Learning

Think about all of people and materials that work together to build the TQMS described here.

1. Summarize the types of files that are needed.
2. Decide how you would present these materials. In what order would the materials be presented and used?
3. Who would use each of the materials described and how?
4. What types of materials would you add to those mentioned to develop your system?
5. Think of a specific product line for which you'd like to build this kind of a system. What projects would you include? What specifications? What error typology?

---

## Up Next: Error Annotation Environment

Up next, we'll explore the annotation environments used to carry out quality evaluation, and get hands-on practice annotating translation errors in Label Studio.

