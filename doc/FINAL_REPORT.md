# HireShark Evaluation
Authors: Ashwin Shanmugam, Changho Jung, Kevin Xia, Ramprasath Loganda Sureshbabu

## Abstract 
Hiring platforms often leave applicants sifting through ill-fitted roles and manually tailoring applications. HireShark uses Gemini 2.5 Flash to extract resume details, generate candidate roles, and surface matching jobs to reduce search time and improve match quality. We evaluated the system with a survey study that covered task completion, usability, usefulness, and satisfaction after a guided product walk-through. Most participants reported easy workflows (4/10 “very easy,” 4/10 “easy”) and successful task completion (5/10 “very successful”). Usability and learnability were similarly positive (6/10 rated “easiest”; 9/10 believed most people could learn quickly). Perceived usefulness and accuracy were moderate: most respondents found match scores and insights somewhat helpful, while accuracy ratings clustered around “somewhat accurate” with isolated concerns about fixed job options and missing preference controls. Qualitative feedback praised minimal steps and clear UI but asked for better preference filters and feedback when matches felt off. Overall, early evidence suggests HireShark improves ease and perceived efficiency, but richer controls and accuracy guardrails are needed. 

## Introduction & Related Work
Job seekers often face mismatched recommendations, generic search filters, and manual effort tailoring applications to each role. Traditional applicant tracking systems rely on keyword matching and historical data that can entrench bias and struggle with sparse or domain-specific resumes (Smith et al., 2023). Applicants also report mixed trust in AI recruiting tools, citing speed benefits but concerns about nuance, accuracy, and fairness (Horodyski, 2023). At the same time, collaboration between recruiters and AI has been proposed as a way to mitigate human prejudice, though responsible design remains essential (Chen, 2023). Recommendation systems that connect resumes and job postings show promise but depend heavily on data quality and feature engineering (Alsaif et al., 2022). Human–AI collaboration literature emphasizes measuring not only accuracy but also user experience, trust, and decision support quality (Fragiadakis et al., 2025).

HireShark leverages generative AI (Gemini 2.5 Flash) to extract skills and experiences from resumes, propose candidate roles, and surface matching jobs with minimal manual tuning. This generative approach aims to overcome rigid keyword filters and provide more contextual matches while retaining transparency and user control. The survey instrument in this study explicitly probed user actions (uploading, editing extracted information and custom roles, viewing scores/explanations, opening job details, clicking “Apply”), task difficulty/success, usability/organization/learnability, usefulness (match score meaning, resume/search insights, application effectiveness), perceived accuracy, overall satisfaction, and open-ended likes/pain points/improvements. Grounded in these prompts and gaps from prior work (nuance, accuracy, trust), we focus on:
- RQ1 (Usability): How easy are the core tasks (upload, review, edit, apply), and how well-organized do the features feel?
- RQ2 (Learnability): Do users believe most people could learn HireShark quickly?
- RQ3 (Usefulness): Do match scores, explanations, and insights improve perceived effectiveness of applying for jobs?
- RQ4 (Accuracy and trust): How accurate do users perceive the match results and explanations, and what improvements or controls would increase their confidence?

We designed and ran a small survey study with job seekers to evaluate these questions and to gather formative feedback on usability, usefulness, and perceived accuracy. The sections that follow describe the system, study design, results, and implications for improving HireShark and similar AI job-matching tools.

## Method
### System description
HireShark is a web-based assistant that ingests a resume and returns tailored job matches. The workflow is:
1) Upload: Users drag-and-drop or choose a PDF/DOCX resume and click Continue (password provided in the survey form).
2) Extraction: Gemini 2.5 Flash parses the resume to identify skills, roles, and experiences.
3) Review/edit: Users can correct or add extracted fields and propose custom job titles to steer matching.
4) Role generation: Gemini proposes related job titles based on the cleaned profile.
5) Retrieval/ranking: The system queries the Adzuna API for current postings, then ranks and surfaces matches with a compatibility score and explanation.
6) Exploration: Users can open job details and click "Apply" to reach the source listing.
The UI emphasizes a short number of clicks, inline editing, and transparent scoring to build trust. Personal resumes remain client-side during upload and are sent only to the LLM/API calls required for extraction and retrieval; no accounts or long-term storage are used in the pilot.

### Evaluation design
We ran a formative, task-based survey with job seekers to assess usability, usefulness, perceived accuracy, and desired improvements. Participants received a short instruction script (upload, review/edit extracted info, set preferences, view matches, optionally apply) and then completed a Google Forms questionnaire. The instrument contained four sections aligned to our research questions:
- Task context: Which actions they used (upload, edit extracted info, edit custom role, view score/explanation, open job detail, click Apply) plus perceived task difficulty and task success (5-point Likert, 1=very easy/unsuccessful, 5=very difficult/successful).
- Usability/learnability: Ease of use, feature organization, and whether most people could learn HireShark quickly (5-point agreement).
- Usefulness and accuracy: Helpfulness of match score, usefulness for improving resume/job search, perceived application effectiveness, and accuracy of match results (5-point agreement).
- Overall response and qualitative feedback: Overall satisfaction (5-point) and four open-ended prompts (likes, confusions/frustrations, inaccuracies, desired improvement).

### Metrics and analysis
We collected two data types: (1) Likert responses coded 1–5 for descriptive statistics and distribution counts; (2) open-text feedback for thematic coding. Because the study was small (n=10) and exploratory, we report descriptive summaries only and treat qualitative feedback as formative signals rather than definitive evidence.

## Results
There were 10 respondents (n=10), all active job seekers with a resume ready to match.

### Quantitative findings
- Feature use (Q1): 10/10 uploaded a resume; 9 viewed the match score; 8 read the score explanation; 7 edited retrieved information; 6 edited a custom role; 7 read a job detail page; 5 clicked “Apply” to open a source posting.  
![Q1 feature use](../img/Q1.png)
- Task difficulty (Q2): Tasks were largely easy (4 “very easy,” 4 “easy,” 1 neutral, 1 hard).  
![Q2 task difficulty](../img/Q2.png)
- Task success (Q3): Perceived success was high (5 “very successful,” 3 “successful,” 1 neutral, 1 not successful).  
![Q3 task success](../img/Q3.png)
- Usability (Q4): Ease-of-use ratings skewed positive (6 “easiest,” 3 “easy,” 1 neutral).  
![Q4 ease of use](../img/Q4.png)
- Feature organization (Q5): Rated well-organized or organized by 9 respondents, with 1 neutral.  
![Q5 feature organization](../img/Q5.png)
- Learnability (Q6): Most believed people could learn quickly (6 strongly agree, 3 somewhat agree, 1 neutral).  
![Q6 learnability](../img/Q6.png)
- Match score meaning (Q7): 2 “most useful,” 4 “somewhat,” 4 neutral.  
![Q7 match score meaning](../img/Q7.png)
- Resume/search insight (Q8): 2 “very useful,” 5 “somewhat,” 3 neutral.  
![Q8 resume/search insight](../img/Q8.png)
- Application effectiveness (Q9): 3 “very effective,” 6 “somewhat,” 1 neutral.  
![Q9 application effectiveness](../img/Q9.png)
- Perceived accuracy (Q10): Clustered at “somewhat accurate” (1 very accurate, 6 somewhat accurate, 2 neutral, 1 somewhat not accurate).  
![Q10 perceived accuracy](../img/Q10.png)
- Satisfaction (Q11): Leaned positive (3 very satisfied, 5 somewhat satisfied, 2 neutral).  
![Q11 satisfaction](../img/Q11.png)

### Qualitative insights
- Likes: Very low-friction flow (upload-review-apply), clear extraction outputs, and a clean UI with a helpful match score.  
- Confusions/frustrations: Recommendations felt fixed with limited control; missing filters for internships and CPT/OPT; lack of autofill; occasional extraction mislabels; preference setting felt constrained.  
- Accuracy concerns: Most perceived scores as reasonable, though a few noted overestimation or unclear extracted skills.  
- Requested improvements: Add mismatch feedback and edit freedom; expand filters and multi-selects (roles, internships, international status, wage range); streamline application via autofill. 

## Discussion
Overall, HireShark met core usability expectations (RQ1/RQ2) and showed early signs of usefulness (RQ3) but needs stronger controls to bolster perceived accuracy and trust (RQ4). Ease-of-use and organization scores were concentrated at the top of the scales, suggesting the upload–review–apply path is straightforward. High feature adoption (upload, view score/explanation, open job detail) indicates users could navigate the flow without hand-holding. Learnability ratings imply a short ramp-up time, aligning with the goal of serving job seekers who may be new to AI tools.

Usefulness signals were positive but not definitive. Most participants found the match score and insights at least somewhat helpful, and a majority believed HireShark could make applications more effective. However, accuracy ratings clustered at “somewhat accurate,” and a few users felt scores were inflated or extraction mislabeled experiences. This gap suggests that while the scoring/explanation experience is legible, users want clearer grounds for the score and stronger guardrails against overclaiming.

Qualitative feedback highlights control as the primary missing piece. Users asked for richer filters (internship, CPT/OPT, wage range), multi-select role preferences, and the ability to edit or override extracted fields more freely. They also wanted feedback when a resume poorly matches available roles. These requests map directly to building trust: more visible levers and corrective paths can reduce the feeling of fixed recommendations and help users calibrate scores.

From a human–AI collaboration perspective, the study demonstrates that a generative pipeline can deliver a smooth experience but must expose preference tuning and verification affordances to maintain confidence. Given the small, self-report sample, results should be treated as formative; nonetheless, the patterns are consistent: usability is strong, usefulness is moderate, and trust hinges on controllability and transparency. Prior work on AI-assisted hiring (e.g., Horodyski, 2023) notes tension between speed and nuance; our findings mirror that tradeoff and point to preference controls and clearer explanations as the next levers to close the accuracy/trust gap.

## Limitations
- Small, convenience sample (n=10) limits statistical power and generalizability; results are descriptive and formative.  
- Self-report measures only; no behavioral logs or objective time-on-task, so perceived ease/efficiency may differ from actual gains.  
- No control/baseline condition against traditional job search, so relative efficiency/accuracy improvements are unmeasured.  
- Limited demographic/role diversity; findings may not transfer to other industries, experience levels, or international contexts.  
- The survey instrument focused on single-use impressions; longitudinal trust, repeat use, and outcome metrics (e.g., interview callbacks) were not captured.  
- LLM-based extraction/matching may vary with resume structure/quality and job-posting freshness; the study did not assess robustness across these factors.  

## Conclusion
HireShark delivers a smooth upload–review–apply flow and early evidence of usefulness: participants rated usability and learnability highly, adopted core features, and generally saw the match score and insights as helpful. However, perceived accuracy plateaued at “somewhat accurate,” and qualitative feedback underscored a need for more control and transparency. To move from a convenient assistant to a trusted copilot, HireShark should add richer preference filters (roles, internships, CPT/OPT, wage range), multi-select controls, clearer score explanations, and feedback when resumes misalign with available roles. Future work should expand the sample, include behavioral and time-on-task measures, and compare against traditional job search baselines to quantify efficiency and accuracy gains. Longer-term, testing across more diverse roles and geographies—and adding objective outcome metrics (e.g., interview callbacks)—will clarify real-world impact. 

## References
Alsaif, S., Hidri, M. S., Ferjani, I., Eleraky, H. A., & Hidri, A. (2022). NLP-based bi-directional recommendation system: Towards recommending jobs to job seekers and resumes to recruiters. *Big Data and Cognitive Computing, 6*, 147.

Chen, Z. (2023). Collaboration among recruiters and artificial intelligence: Removing human prejudices in employment. *Cognition, Technology & Work*. https://pmc.ncbi.nlm.nih.gov/articles/PMC9516509/

Fragiadakis, G., Diou, C., Kousiouris, G., & Nikolaidou, M. (2025). Evaluating human-AI collaboration: A review and methodological framework. *arXiv*. https://doi.org/10.48550/arXiv.2407.19098

Horodyski, P. (2023). Applicants’ perception of artificial intelligence in the recruitment process. *Computers in Human Behavior Reports, 11*, 100303. https://doi.org/10.1016/j.chbr.2023.100303

Smith, J., Lee, M., & Patel, R. (2023). Natural language processing in recruitment: A systematic review. *Journal of Human Resource Management, 45*(3), 234–251.

## Appendices
- **Appendix A: UI screenshots**  
  - Landing page: ![Landing page](../img/Landing_Page.jpeg)  
  - Resume upload: ![Resume upload](../img/Resume_Upload.jpeg)  
  - Review extracted info: ![Review extracted info](../img/Review.jpeg)  
  - Skills view: ![Skills view](../img/Skills.jpeg)  
  - View matches: ![View matches](../img/View_Matches.jpeg)  
  - No matches state: ![No matches](../img/No_Matches.jpeg)

- **Appendix B: Survey result charts (Q1–Q11)**  
  - Feature use: ![Q1 feature use](../img/Q1.png)  
  - Task difficulty: ![Q2 task difficulty](../img/Q2.png)  
  - Task success: ![Q3 task success](../img/Q3.png)  
  - Ease of use: ![Q4 ease of use](../img/Q4.png)  
  - Feature organization: ![Q5 feature organization](../img/Q5.png)  
  - Learnability: ![Q6 learnability](../img/Q6.png)  
  - Match score meaning: ![Q7 match score meaning](../img/Q7.png)  
  - Resume/search insight: ![Q8 resume/search insight](../img/Q8.png)  
  - Application effectiveness: ![Q9 application effectiveness](../img/Q9.png)  
  - Perceived accuracy: ![Q10 perceived accuracy](../img/Q10.png)  
  - Satisfaction: ![Q11 satisfaction](../img/Q11.png)

- **Appendix C: Data and materials**  
  - Participant resumes are not distributed for privacy.  
  - System prompts were ad hoc for extraction/matching and are not versioned in this repository.  
  - Additional assets: `../img/logo.png`.  
