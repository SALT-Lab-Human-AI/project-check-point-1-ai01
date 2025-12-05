# HireShark Evaluation
Authors: Ashwin Shanmugam, Changho Jung, Kevin Xia, Ramprasath Loganda Sureshbabu

## Abstract 
Hiring platforms often leave applicants sifting through ill-fitted roles and manually tailoring applications. HireShark uses Gemini 2.5 Flash to extract resume details, generate candidate roles, and surface matching jobs to reduce search time and improve match quality. We evaluated the system with a survey study (n=10 job seekers) that covered task completion, usability, usefulness, and satisfaction after a guided product walk-through. Most participants reported easy workflows (4/10 “very easy,” 3/10 “easy”) and successful task completion (5/10 “very successful”). Usability and learnability were similarly positive (6/9 rated “easiest”; 5/9 believed most people could learn quickly). Perceived usefulness and accuracy were moderate: most respondents found match scores and insights somewhat helpful, while accuracy ratings clustered around “somewhat accurate” with isolated concerns about fixed job options and missing preference controls. Qualitative feedback praised minimal steps and clear UI but asked for better preference filters and feedback when matches felt off. Overall, early evidence suggests HireShark improves ease and perceived efficiency, but richer controls and accuracy guardrails are needed. 

## Introduction
Applying for a job is a time-consuming and challenging process. Several tools were using Natural Language Processing (NLP) created in areas like language understanding, information extraction, retrieval and recommendation, generation and interaction, and fairness considerations in recruitment contexts, but Smith, J. et al. (2023) revealed research that there is a lack of standardized datasets persistent across industries and potential algorithmic bias. In this situation, our team found that generative AI can be a useful tool, but Horodyski, P. (2023) warned that AI users may feel a lack of nuance in human judgment, low accuracy and reliability, and immature technology.
HireShark tries to enhance the job-seeking process by using an LLM to perform what traditional NLP performed before, but not heavily relying on standardized datasets: language understanding, information extraction, retrieval and recommendation, and generation and interaction. Also, HireShark tries to provide more nuanced judgment, accurate and reliable, and easy use for job applicants who are not even familiar with using AI technology.

Now HireShark is created, and our team decided to examine whether the tool is successfully providing nuanced, accurate, and reliable judgment, and is easy to use.

## Method
### System description:
1.	User uploads resume document (PDF or docx)
2.	LLM (Gemini 2.5 Flash) extracts information from the resume document
3.	User revision on the extracted information (if needed)
4.	LLM (Gemini 2.5 Flash) generates job titles based on the extracted information
5.	LLM call and sort job lists from Adzuna API
6.	

### Evaluation design:
Our team surveyed testers who are seeking jobs to evaluate how HireShark shortened their job searching time and how HireShark provides the desired job lists from the resume-job matched results. The survey was created on Google Survey, which consists of  4 sections: Task Context, Usability, Usefulness, and Overall Response

In the Task Context, surveyors are expected to answer what surveyors feel about the tasks and which tasks they surveyed.
Task Context consists of 1 multiple choice question (which HireShark function did user used) and 2 Likert scale questions (difficulties of overall tasks, users successfully finished using HireShark)

In Usability, surveyors were expected to respond to how easy to use HireShark.
Usability consists of 3 Likert scale questions (HireShark is easy to use, features felt well-organized, most people could learn to use HireShark quickly)

In Usefulness, surveyors expected to provide an opinion on did HireShark was actually helpful for job searching
Usefulness consists of 4 Likert scale questions (match score is useful, HireShark gives insights on improving resume, applying jobs felt more effective, matched jobs are accurate)

Lastly, in Overall Response, surveyors were expected to rate their satisfaction with HireShark and provide personal feedback about their experience.
Overall Response consists of 1 Likert-scale question and 4 short-answer questions that ask users about their feelings and opinions on the most liked and least liked parts of HireShark.

Metrics
Overall, there are 2 metrics collected for the study. One for a 5-level Likert scale and the other for short answers of qualitative feedback.

## Results
There are 10 respondents (n=10) in the survey. All participants are job seekers with a resume to search for their matched jobs.

Quantitative Results:
Task Context
 
Q1. For participants’ usage of HireShark, all participants tried uploading a resume, 7 viewed the match score, 6 read the explanation of the matched job, 5 edited retrieved information and custom job role, and lastly, 5 actually accessed to “Apply” button.

 
Q2. For difficulties in using HireShark (1 is the easiest, 5 is the hardest), 4 participants felt very easy, 3 participants felt easy, 1 felt neutral, and the last 1 participant felt hard.

 
Q3. For the question about participants who felt successful using the HireShark (1 is least successful and 5 is most successful), 5 participants felt very successful in completing the task, 2 felt successful, 1 felt neutral, and l felt not successful.

Usability
 
Q4. For the question about difficulties in using HireShark (1 is hardest and 5 is easiest), 6 participants felt easiest, 2 felt easy, and 1 felt neutral.

 
Q5. For features (uploading resume, information extraction, etc.) (1 is poorly organized and 5 is well organized), 4 felt well organized, 4 felt organized, and 3 felt neutral.

 
Q6. For adopting HireShark (1 is slowest to learn and 5 is easy and fast to learn to use HireShark), 5 respondents answered that people can learn quickly, 3 responded somewhat quickly, and 1 answered neutral. 

Usefulness
 
Q7. For a matched score between job skills and resume skills (1 is the score meaningless and 5 is most meaningful), 2 respondents found the score most useful, 4 felt somewhat useful, and 3 felt neutral.
 
Q8. HireShark can help improve a resume (1 is not useful and 5 is most useful), 2 felt very useful, 5 felt somewhat useful, and 2 felt neutral.

 
Q9. For the effectiveness of job application (1 is least effective and 5 is very effective), 2 felt very effective, 6 felt somewhat effective, and 1 felt neutral. 
 
Q10. For matched results between resume and job lists (1 is least accurate and 5 is very accurate), 1 felt very accurate, 5 felt somewhat accurate, 2 felt neutral, and 1 felt somewhat not accurate.

Overall Response
 
Q11. For user satisfaction on using HireShark (1 is least satisfied and 5 is very satisfied), 3 respondents answered very satisfied, 4 answered somewhat satisfied, and 2 answered neutral.

Qualitative Insights:
Q12. What did you like most about using HireShark?
A: Easy to use without complex steps (upload resume and review results), information extraction is accurate, providing a match score, clean UI/UX, and minimal click

Q13. What was confusing or frustrating?
A: Job options seem fixed, which are not able to select what other jobs want, and do not have options for selecting internships and CPT/OPT availability, no autofill for the job application page, some experiences on the resume are not correct. 

Q14. Did any scores or explanations feel wrong or inaccurate?
A: Slightly higher than expected

Q15. What’s one improvement you would make?
A: Provide feedback if the resume does not match, allow users to select multiple roles, and an options more preference options, setting a slider for minimum and maximum wage.

## Discussion
As HireShark aims to provide nuanced judgment, accurate and reliable, fast, and easy use for job applicants, our results indicate that, indeed, HireShark offers such services.
According to the quantitative results, 
Nuanced judgment: Q7 (Score meaningfulness), Q8 (Give insight on resume)
Accuracy and reliability: Q10 (Score accuracy)
Application speed: Q9 (Find job effectively)
Easy usage:Q2, Q3, Q4, Q5, Q6
From the survey responses, majority responses selected somewhat helpful to very helpful (In Likert scale, 4 and 5), which although HireShark may have some lack of providing those 4 aspects (Nuanced judgment, Accuracy and reliability, Application speed, and Easy usage), HireShark does provide and somewhat fulfill the 4 aspects.

## Limitations
Unfortunately, the sample size from the survey is too small to benefit from statistical high power. While our study can receive feedback from several respondents, we need to approach whether our findings can be generalized carefully.

## Conclusion
HireShark intended to be designed for providing easy and effective job application experience through using generative AI on language understanding, information extraction (skills and experiences from resume), retrieval and recommendation (match job lists from the retrieved information), and generation and interaction (let LLM generate job lists). Our study from the survey shows that most users indeed felt HireShark providing reliable, accurate, easy, and fast service.
For potential future works, probably gathering more sample size would be plausible for generalization. Also, comparing estimated application speed or effectiveness between traditional job searching and HireShark searching would needed to check relative performance of HireShark.

## References
Smith, J. et al. (2023). "Natural Language Processing in Recruitment: A Systematic Review." Journal of Human Resource Management, 45(3), 234-251.
Horodyski, P. (2023). Applicants’ perception of artificial intelligence in the recruitment process. Computers in Human Behavior Reports, 11, 100303. doi:10.1016/j.chbr.2023.100303

