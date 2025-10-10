## ChatGPT (GPT-5)
#### Accuracy: Some issues shared with reliability. 
-	In the extraction stage, the model sometimes provide a role that is not correct (e.g. user of edge cases never being an Evaluation Specialist before).
-	In the score stage, the model consider experience as both educational and work experience, which consider students' studies in university also as experience. However, this is incorrect since the job description refers to 'work experience', which, other than an internship or practicum, does not count. This is the same for both the typical case and the edge case. (Failure case resume does not include work experience time)
#### Reliability: 
-	Maybe prompting issue, some attributes (e.g. year) extracted vaguely. For example, year attribute provides overall year of user's year mentioned in resume but not years per role.
-	ChatGPT indeed provides score for confidence and match score, but it is unclear how confidences and weighted scores measured. This might indicate use tools other than just LLM.
Latency: ChatGPT starts generating the responses immediately as the prompts are passed; there was no noticeable latency.

#### UX Friction: 
- No UX friction found on the ChatGPT webpage.

#### Safety: 
- It is important to turn off ‘sharing personal data for model improvement’ to prevent personal data leakage from inputting a resume. This is one reason all resumes used in the tool are either anonymized (edge case resume), mock resume (typical case resume), or generated (failure case).

#### Costs: 
- Although following prompts tested in the free tier, the tester faced limitations on usage during testing the Edge Case prompt. In case of a test required immediately, there might be an additional cost for plans, 20$ for the Plus Plan and 200$ for the Pro Plan. If using the GPT-5 model directly from the API, it costs $1.25 for input and $10.00 for output per 1 million tokens. https://platform.openai.com/docs/pricing

#### Overall for ChatGPT:
- We need to adjust the prompt to get a more detailed or accurate answer. Also, it is crucial to gain an understanding of metrics and scoring.

## Gemini (Gemini 2.5 Pro)
#### Accuracy:
- Strengths: correctly extracts explicit roles and many obvious skills from resumes.
- Errors: incorrect time calculations (e.g., "Greek Recruitment Counselor" labeled "<1 year" despite "August 2019–Present"); using of different language in extraction leds to inconsistent results.

#### Reliability:
- Issues: no per-attribute confidence values; inconsistent scoring scales and formats across examples; occasional extraction errors in edge/failure cases.

#### UX friction:
- No significant UX friction noted; Gemini interface is straightforward and responsive.

#### Safety:
- Risks: Personally Identifiable Information exposure (full names, emails, phone numbers) in transcripts, as it does not redact PII by default. Users must manually redact sensitive information before inputting resumes.

#### Cost implications:
- Cost is pretty low for Gemini 2.5 Pro, since there is no charge for webpage usage. There will be some cost if using Gemini 2.5 Pro via API, while it also does not cost much since token use is low for resume analysis.

## Overall for Gemini:
- Gemini shows promise in resume analysis but needs improvements in extraction accuracy, consistency, and safety measures. Further refinement of prompts and handling of PII is essential.

## **Grok (Model not explicitly disclosed)**

### **Accuracy**

* Extracted attributes such as roles and skills correctly for most resumes but occasionally merged unrelated information (e.g., combining academic projects into roles).
* Scoring outputs were general, lacking clarity in how match percentages were computed.
* Explanations were short and less structured, missing detailed reasoning or category-wise breakdowns.

### **Reliability**

* Attribute extraction was inconsistent — skipped values like “growth stage” or “spans.”
* Did not provide normalized scoring logic or confidence measures.
* Resume coverage was shallow, summarizing profiles rather than analyzing role-by-role details.

### **UX Friction**

* Responses were fast and concise, though sometimes too brief for analysis.
* Lacked clear sectioning or formatting, making it less readable compared to ChatGPT.

### **Safety**

* No major data concerns noted; still advisable to anonymize resumes before upload.
* Occasionally paraphrased identifiable information instead of fully redacting it.

### **Costs**

* This testing uses the free tier. There are Supergrok and Heavy models available based on subscription which might perform better

### **Overall for Grok**

* Delivers quick, surface-level results but lacks structure and interpretability.
* Suitable for initial resume-job screening, not for detailed attribute extraction or score reasoning.

## **Claude (Sonnet 4.5)**

### **Accuracy**

* Extracted roles, skills, and education with high precision and clear formatting.
* Scoring aligned closely with job requirements, with logical and consistent match reasoning.
* Provided structured explanations but occasionally over-generalized technical matches (e.g., mapping unrelated tools under same skill category).

### **Reliability**

* Maintained consistent format across all resumes and prompts.
* Match scores were stable and reproducible.
* Occasionally verbose, but reasoning followed a coherent analytical structure.

### **UX Friction**

* Smooth and human-readable responses; explanations were naturally phrased.
* Slight latency observed for longer prompts, but overall user experience remained positive.
* Markdown structure was clear with headings and lists, improving readability.

### **Safety**

* Displayed strong privacy adherence — no personal identifiers surfaced.
* Did not rephrase or expose identifiable details from resumes.
* Safe for testing with anonymized data.

### **Costs**

* Claude’s web version responses were free during evaluation; API pricing varies by tier.
* There are Pro and Max version available for different pricing ranges that would perform better

### **Overall for Claude**

* Produced the most balanced and interpretable outputs among tested tools.
* Well-structured extraction, consistent scoring, and contextual explanations make it suitable for practical deployment in LLM-based resume evaluation pipelines.
