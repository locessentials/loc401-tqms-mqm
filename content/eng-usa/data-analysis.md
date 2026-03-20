# Lesson 5: Exploratory Data Analysis

In the previous lesson, you completed your first annotations in Label Studio. Now comes a question that every quality manager eventually faces: once a team of evaluators has annotated the same text, how do you make sense of what they produced? How do you know whether their results are consistent enough to be useful — and when they're not, how do you figure out why?

This is where **exploratory data analysis (EDA)** comes in. EDA is the process of examining annotation data to understand what it contains, where patterns emerge, and where problems lie. In the context of a TQMS, EDA is the primary tool for diagnosing disagreement and deciding what to do about it. Without it, the workflow described in Lesson 3 - evaluate, measure, improve, repeat - has no direction.

This lesson introduces the EDA tools provided in the [Translation Quality Evaluation repository](https://locessentials.github.io/translation-quality-evaluation/) that accompanies this course. You'll learn what the Jupyter notebook produces, how to read the HTML report it generates, and how to use both to drive calibration among evaluators.

## Two Tools, Two Audiences

The repository includes a Jupyter notebook (`Translation_Annotator_Agreement.ipynb`) that processes Label Studio annotation exports and produces an HTML report. These two artifacts serve different purposes and different people.

The **HTML report** is designed for quality managers and evaluators who need to act on findings without necessarily running code. It presents visualizations and scores in a readable format that can be shared across a team, discussed in a calibration session, and archived as a record of how a team's agreement developed over time.

The **Jupyter notebook** is for those who want to understand how the calculations work, explore the analysis more deeply, adjust parameters, or adapt the analysis to a different project setup. It exposes the full pipeline, from raw Label Studio JSON to finished report, and is documented throughout so that it can be modified without having to reverse-engineer the logic.

If your role is closer to training and evaluation, the HTML report is your primary tool. If your role involves building or maintaining the system, the notebook is where you'll spend most of your time.

## What the EDA Covers

The notebook and report are organized around four areas of analysis. Each one adds a layer of understanding to the raw annotation data.

### Span Overlap Visualization

The first thing the notebook produces is a visual rendering of the annotated text itself. Each span that was marked as an error is highlighted, and the shade of the highlight reflects how many annotators agreed that the span contained a problem. Darker highlights mean more annotators flagged that region; lighter highlights mean fewer did.

Hovering over a highlighted span in the HTML report reveals a summary: the number of annotators who marked it, their error categories, subcategories, impact ratings, and comments. This makes it possible to quickly see not just *where* agreement is high or low, but *what* annotators were saying when they agreed or disagreed.

This visualization is often the most immediately useful output for calibration sessions, because it gives the whole team a shared visual reference for discussing specific spans in the text.

### Annotator Summaries

Before diving into agreement scores, it helps to understand the basic shape of each annotator's work. The notebook surfaces several annotator-level metrics:

- **Span count**: how many errors each annotator flagged. Large differences here - say, one annotator marking 88 spans while another marks 7 - are a signal worth investigating before looking at agreement scores at all. An annotator who is systematically over- or under-flagging will show low agreement with everyone, for reasons that have more to do with calibration than category confusion.
- **Completeness**: whether each annotator filled in all required fields: subcategory, impact level, span comment, and document-level correspondence and readability ratings. Incomplete annotations affect downstream calculations.
- **Timing**: how long each annotator spent on the task, as recorded by Label Studio. Unusually short review times can indicate that an annotator rushed through the work.

These summaries don't produce a score, but they give important context for interpreting the scores that follow.

### Error Type Distribution

The notebook also visualizes the distribution of error categories and subcategories across all annotators. These charts answer questions like: Are annotators identifying the same kinds of errors, even if not always in the same spans? Is one category surfacing more than others? Are certain subcategories being avoided, which might suggest confusion about when they apply?

Distribution analysis is particularly useful for identifying systematic patterns in disagreement. If most annotators are flagging Accuracy errors but one annotator is consistently classifying the same problems as Style errors, that's a calibration conversation waiting to happen, and it's much easier to have that conversation when you can point to the data.

### Holistic Ratings

In addition to span-level annotations, evaluators assign overall **correspondence** and **readability** scores to the translation as a whole. The notebook visualizes the distribution of these ratings across annotators and, where multiple documents have been evaluated, across documents.

These scores are useful as a sanity check. If annotators broadly agree on holistic quality but disagree significantly on individual span annotations, that tells you something different than if both the holistic scores and the span-level work are inconsistent.

## Agreement Calculations

The EDA section describes what the data looks like. The agreement calculations describe how consistent it is. The notebook produces three types of agreement scores, each answering a different question.

### Exact Matching

The most straightforward measure is **exact matching**: did two annotators mark the identical span of text? Exact matching compares the start and end positions of every annotated span and counts how many times they align precisely across annotators.

In practice, exact matching tends to be low even when annotators are working well together. A span that one annotator marks as starting at the beginning of a sentence and another marks as starting at the third word may represent the same underlying judgment about the same error, just with slightly different boundaries. Exact matching will count that as a miss.

This is why exact matching is most useful as a floor: if exact matching is high, you know annotators are working with exceptional harmony. If it is low, that doesn't necessarily mean they disagree, it may just mean their boundaries differ slightly. The next metric handles that case.

### F1 Score (Precision and Recall)

**F1** is a measure that gives annotators partial credit for overlapping spans, even when the boundaries don't match exactly. To understand F1, it helps to understand the two measures it combines.

**Precision** answers the question: of all the spans an annotator marked, how many overlapped with a span marked by another annotator? An annotator with high precision is flagging things that others are also flagging. They are not marking errors that no one else sees.

**Recall** answers the question: of all the spans marked by other annotators, how many did this annotator also catch? An annotator with high recall is not missing things that others are seeing.

F1 is the harmonic mean of precision and recall, a single number that balances both. A score of 1.0 means perfect agreement on span detection. A score of 0 means no overlapping spans at all.

In the context of a TQMS, F1 is the most informative measure of whether annotators are finding the same errors in the text, even if they don't mark them with pixel-perfect boundary agreement. When F1 is low, the team needs to work on which spans to flag. When F1 is acceptable but category agreement is low, the issue is how to classify what they've already found, which is where Cohen's Kappa comes in.

### Cohen's Kappa

**Cohen's Kappa** measures agreement on *how* annotators classified the spans they both marked. It is calculated for error category, subcategory, and impact level, and it is reported for every pair of annotators in the project.

The reason Kappa is calculated pairwise, rather than as a single score for the whole team, is that it can reveal which specific pairs of annotators are well-calibrated with each other and which are not. If annotator A and annotator B consistently agree but both disagree with annotator C, that is a different situation than if all three are equally inconsistent with each other.

Kappa scores range from -1 to 1. A score of 1.0 means perfect agreement; a score of 0 means no better than chance; a negative score means the annotators are systematically disagreeing, actually *less* consistent than random. In early rounds of a TQMS, Kappa scores below 0.2 or even below 0 are not uncommon. That is expected. The goal of the calibration process is to bring those scores up over successive projects.

The notebook presents pairwise Kappa scores in a table. When reading that table, look first for outliers: an annotator whose Kappa scores are consistently low across all their pairs is a candidate for additional training, while an annotator whose Kappa is low with just one partner may simply have a specific point of disagreement that can be resolved in a calibration session.

## From Analysis to Action

EDA is only useful if it leads somewhere. After running the notebook, studying the calculations, and reviewing the HTML report, the quality manager and proctor should be able to answer two questions:

1. **Where is agreement breaking down?** Is the problem at the span detection level (F1 is low), the classification level (Kappa is low), or both? Are there specific annotators who are consistent outliers?

2. **What is the most likely cause?** Are annotators under-flagging because they are uncertain what counts as an error? Are they classifying the same span differently because two error categories are genuinely ambiguous for this content type? Is one annotator applying a stricter standard than the others?

The answers to these questions should directly shape the materials and discussions prepared for the next calibration round. Over time, this cycle of annotate, analyze, calibrate, and repeat is what moves a team from initial disagreement to the consistent, deployable annotations that are the goal of the whole system.

## Active Learning

Once you've completed your annotations in Label Studio, you'll have a chance to see how your work compares to the other annotators' in the system via a report like the one shared below.

Open the [sample HTML report](https://locessentials.github.io/translation-quality-evaluation/6_annotator_agreement/reports/QUALITY%20REVIEWS_report_2026-03-19.html) generated from the annotator agreement notebook.

As you review it, consider the following:

1. Look at the span overlap visualization. Are there regions of the text where annotators broadly agreed? Are there regions where agreement was sparse? What might explain the difference?
2. Review the annotator summaries. Are there notable differences in how many spans different annotators flagged? What might those differences suggest about how they interpreted their task?
3. Look at the error type distribution. Do annotators seem to be using the typology in similar ways, or are some categories distributed unevenly across annotators?
4. Look at the Span F1 chart. Recall is much higher than precision. What does that imbalance tell you about how the annotators in this example project were working? If you were the quality manager, what would you investigate first?

---

## Up Next: Root Cause Analysis and Preventative Action

