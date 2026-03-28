# Lesson 6: Root Cause Analysis and Continual Improvement

In the previous lesson, you analyzed the annotations produced by your team to determine where spans overlapped, where they didn't, which error categories were applied consistently, and which were not. That analysis gave you a clear picture of where agreement is breaking down, and what to do about it within the annotation process itself. Calibration issues are addressed through targeted training materials and calibration sessions.

But annotation data also tells a broader story. Once an evaluation team is deployed in a production environment, their annotations begin to generate data about frequently occurring errors across projects. It's worth noting that translation errors on their own are not a problem. In a standard TEP workflow, we expect a translation to arrive with some errors. That's precisely why editing is planned as a subsequent step. Still, an error that appears in one project is different from an error that appears in project after project. That second scenario is a process problem, and process problems have root causes that can be identified and addressed. The quality manager's job at this stage is to ask why, and to keep asking until the answer points to something actionable.

This is the work of **continual improvement**: the recurring activity of using production data to enhance performance over time. This lesson introduces two practical methods for identifying root causes, the Fishbone Diagram and the 5 Whys, and situates them within a translation and localization production context using the MQM root cause error list.

## Corrective Action and Continual Improvement

In ISO 9001 terms, **corrective action** is action taken to eliminate the cause of a nonconformity and prevent its recurrence. When a non-conforming product is identified, one that surpasses the error threshold for a given production step, the organization is required not only to address the product itself, but to investigate the root cause and act on it. The standard further requires that corrective actions be evaluated for their effectiveness and revisited until the root cause is genuinely resolved.

The work described in this lesson operates in the same spirit, even when no single project has technically crossed the threshold for non-conformity. By monitoring frequently occurring errors across a production environment and systematically addressing their causes, a TQMS compounds its value over time. As recurring errors are eliminated, the system produces cleaner feedback to translators, more reliable training data for LLMs, and a more efficient production workflow.

## Root Cause Analysis Methods

Two methods that are useful for identifying root causes in translation and localization workflows are **Fishbone Diagrams** and the **5 Whys**. These methods complement each other. Fishbone Diagrams are useful for mapping the full space of possible causes before you've identified the most likely one. The 5 Whys is useful for drilling into a specific cause once you've narrowed your focus. In practice, you might use a Fishbone Diagram in a team session to generate hypotheses, and then apply the 5 Whys to the most probable branch.

### Fishbone Diagrams

A Fishbone Diagram (also called an Ishikawa or cause-and-effect diagram) is a visual tool for mapping all the potential causes of a problem. The problem is written at the head of the "fish," and the causes branch off the spine, grouped by category. The value of the Fishbone approach is that it forces you to consider multiple domains of causation at once: not just the translator, but also the tools, the timeline, the brief, the source text, and the process itself.

<div class="video-wrapper">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/2rLB-1z9cPY" title="Fishbone Diagrams" allowfullscreen></iframe>
</div>
<figcaption>Citation: Western Region Public Health Training Center. 2013. "Fishbone Diagrams." YouTube.</figcaption>

### 5 Whys

The 5 Whys is an iterative questioning technique that drills down from a surface-level symptom to its underlying cause by repeatedly asking "why." The technique is simple but can be powerful when applied honestly. The goal is not to arrive at a convenient answer, but to keep asking until you reach a cause that is actionable.

<div class="video-wrapper">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/zZRmCs7Dag8" title="5 Whys Root Cause Analysis" allowfullscreen></iframe>
</div>
<figcaption>Citation: The Agile Business Analyst. 2021. "BEFORE You Do A 5 WHYS Root Cause Analysis Watch This..." YouTube.</figcaption>

## Root Causes in Translation Production

While people often assume that an error in the translation is the fault of the translator or post editor, root cause analysis often surfaces underlying causes, such as a missing glossary, an ambiguous source text, a timeline that didn't allow for adequate review. The goal of RCA in a TQMS is not to assign blame, but to identify where the workflow can be strengthened. Each round of analysis is an opportunity to remove a friction point, and over time, that slow iteration is what transforms a functional quality system into an optimized one.

<figure class="image-center image-full">
  <img src="../../assets/ProductionWorkflow.svg" alt="An illustration of a translation and localization production workflow including scoping, preparation, TEP, design, LQA and post production" />
  <figcaption>A translation and localization production workflow, from scoping through post-production. Root causes can originate at any stage.</figcaption>
  <figcaption>Image published in [Translation and localization project and process managers](https://www.degruyter.com/document/doi/10.1515/9783110716047-008/pdf), Handbook of the Language Industry, De Gruyter Mouton (2024).</figcaption>
</figure>

To support systematic RCA in translation and localization, the MQM framework provides a [Root Cause Error List](https://themqm.org/resources/root-causes/), a taxonomy of upstream causes that commonly give rise to errors in translated output. The list is organized to encourage quality managers to look beyond the translation itself and examine the preparation and process that preceded it.

### A Worked Example

To make this concrete, consider a recurring **Accuracy: Mistranslation** error identified across multiple projects for the same content type. Evaluators are consistently flagging translations where the intended meaning of the source does not seem to have been carried through, not because the translator misread the text, but because the source text itself was ambiguous enough to support more than one reading.

Applying the 5 Whys might look like this:

1. *Why does the translation convey the wrong meaning?* The translator interpreted an ambiguous source phrase in a way that differs from the author's intent.
2. *Why wasn't the ambiguity resolved before translation was completed?* The translator submitted a query, but it did not reach the requestor in time, or at all.
3. *Why didn't the query reach the requestor?* The agency's project management layer received the query but did not escalate it, either due to time pressure or an unclear escalation protocol.
4. *Why is there no clear escalation protocol?* Translator queries have not been identified as a formal step in the production workflow, so there is no defined path for routing them to the right person.
5. *Why not?* The workflow was designed around speed and handoffs, with no mechanism for taking time to resolve a content question.

The root cause is a workflow design failure: the production process has no formal path for resolving source text ambiguity once a project is underway. In this case, the corrective action is to establish a query escalation protocol that routes unresolved questions directly to the requestor with a defined response window. A second, upstream corrective action goes further still. if the source text had been pre-edited before translation began, the ambiguity would have been caught before it became the translator's problem at all, pointing to the value of building source text quality reviews into the project intake process.

## Active Learning
 
### Warmup: Exploring the Root Cause Error List
 
Review the [Root Cause Error List](https://themqm.org/resources/root-causes/) published on TheMQM.org. As you work through it, consider the following:
 
- Are any root causes unfamiliar to you? For those that are, do some research to understand what they refer to.
- What error types from the MQM typology might each root cause produce?
- What preventive action could be put in place to address each root cause?
 
Use the table below as a starting point and extend it with additional rows as you work through the list.
 
| Error Type | Root Cause | Preventive Action |
| ----- | ----- | ----- |
| Accuracy: Mistranslation | Ambiguous source text | Implement a source text review step before translation begins |
| Style: Register | No style guide provided | Add formality guidelines to a newly created style guide |
 
### RCA and Corrective Action Plan
 
Find an example of a translated or localized product with a substantial non-conformity. This could be something you have encountered in your own work, noticed in the world, or can locate through research. Then produce a short professional report, written as though it will be reviewed by decision-makers who control budgets and staffing.
 
Your report should include:
 
1. **Description of the non-conformity.** Identify the product, describe the non-conformity, and point to exactly where it occurs. Include a screenshot or another type of illustration if possible.
2. **Root cause analysis.** Apply either a Fishbone Diagram or the 5 Whys to surface the potential causes. Document your analysis visually, then narrate the most significant causal branches in writing. Explain why you believe one root cause to be most likely.
3. **Corrective action plan.** Describe the corrective action you would put in place. Address who would need to be involved, what the process would look like, and how the change would be incorporated into ongoing production.
4. **Follow-up.** Explain how you would verify that the corrective action was effective. Identify the next two most likely root causes you would investigate if the first turns out not to be the right one.
 
---

## Up Next: Conclusion and Lessons Learned

Up next, we'll bring the course full circle, reflecting on what you've learned and how your understanding of translation quality has evolved.