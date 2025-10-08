# Prompting protocol
- Situations: LLM-Extract, LLM-Score, LLM-Explain
- **LLM-Extract** – Extract attributes like roles, skills, years, seniority, growth stage, spans from the resume.
- **LLM-Score** – Compute normalized match metrics (overall % and axis breakdown) between resume and job(s) from the extracted attributes and job descriptions.
- **LLM-Explain** – Provide explanation in suggestive language based on the generated score from the resume matching with job description.

## Task cases:
### Typical case:
-	LLM-Extract: LLM extracts attributes from ordinary or normal resume.
-	LLM-Score: LLM provides score from the extracted attribute.
-	LLM-Explain: LLM presents the score with explanation in suggestive language.
### Edge case:
-	LLM-Extract: LLM extracts attributes from almost empty, mixed with different format, or ambiguous resume.
-	LLM-Score: LLM provides suspicious score from the extracted attribute.
-	LLM-Explain: LLM presents the score with explanation in suggestive language, but ambiguous or not clear.
### Failure case:
-	LLM-Extract: LLM failed to extracts more than one attributes from resume or hallucinate attribute that never existed or not match. (e.g. match engineer -> such job not exist) Maybe user submitted document that is not resume.
-	LLM-Score: LLM failed provides score or not suggestive score from the extracted attribute.
-	LLM-Explain: LLM presents the score with explanation in suggestive language, but score and explanation shows different story. (e.g. 25% match with data engineer -> Yes, you are fit with this job!)

## Prompts used in the protocol
### LLM-Extract
```
Extract attributes roles, skills, years, seniority, growth stage, spans, and confidences in following format. Role= , years= , seniority= .
Resume to extract:
```

### LLM-Score
```
Match with the job descriptions and provide match score that how the resume is closer to the job. Job descriptions: Developer, Data Integration. University of Illinois Foundation (https://www.linkedin.com/jobs/view/4269267569) 
Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.
Education Required: Bachelor’s degree in computer science or information management
Experience Required: 2 years of work experience as a data management analyst, data analyst or related
Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
```
### LLM-Explain
```
Based on the match score provided, provide summary of the result with suggestive language.
```

### Resume used in the protocol
- For typical case:
```
MARY SMITH
msmith2@illinois.edu | 4004 Helix Lane Urbana, IL 61801 | (217) 765-3458
University of Illinois at Urbana-Champaign May 2020 Bachelor of Science in Computer Science GPA: 3.67/4.00
• Dean’s List: Fall 2018, Spring 2019
• Relevant coursework: Database Systems, Program Verification, Scientific Visualization
Aon Corporation Glenview, IL
IT Intern June 2019-August 2019
• Responded to over 40 employees’ requests in order to assist with any computer malfunctioning problems
• Aided in developing a new software application by utilizing programming skills
• Contributed to reaching daily goals by expediting the reviewing process with a 99.5% accuracy rate
Chicago Marketing Corporation Chicago, IL
Sales Assistant June 2018-August 2018
• Assisted in developing and implementing integrated advertising plans which included newspaper, internet and
alternative advertising sources
• Planned and participated in weekly meetings for a sales staff of over 50 representatives
• Coordinated an office opening in Springfield, which subsequently generated over $315,000 in revenue and
$57,000 in operating income
Outback Steakhouse Highland Park, IL Server June 2017-August 2017
• Promoted and implemented effective marketing campaigns for specific food items
• Trained 15 new employees by teaching them necessary daily procedures to provide an enjoyable dining
experience for guests
• Provided quality customer service by responding to customer needs promptly and efficiently
Panhellenic Council Champaign, IL Greek Recruitment Counselor and Active Member August 2019-Present
• Receive training in conflict management, decision making, and mentoring in order to effectively supervise 80+
women going through the formal recruitment process
• Promote and participate in service events raising ~$15,000 for the Champaign Country Court
• Appoint Special Advocates Program and Circle of Sisterhood Foundation
• Elected to scholarship committee in order to oversee chapter’s weekly participation in study hours and maintain
knowledge about campus tutoring and academic assistance programs
Illinois Leadership Center, Leadership Certificate Champaign, IL Active Participant January 2019-Present
• Develop leadership skills in self, organizational and interpersonal settings through experiential learning under the
guidance of a Leadership Coach
• Augment critical insight into intrapersonal and interpersonal skills through innovative leadership
retreats/workshops
Computer
• C++ (Advanced), Adobe Photoshop (Intermediate), HTML (Basic)
```

- For edge case:
```
Jeo Kim
700 South Eight Street, Champaign, Illinois 61833 | (217) 000-0000 | 0000@illinois.edu

Education
University of Illinois at Urbana-Champaign	Expected Graduation: May 2024
Bachelors of Science in Information Sciences + Data Science	GPA: 3.75/4.00
-	Dean’s List: Fall 2021, Spring 2022, Spring 2023

University of Oregon	September 2017-June 2018
Bachelors degree of Computer and Information Science	GPA: 3.40/4.00

Work Experience
University of Illinois Urbana-Champaign Student Affairs	Champaign, IL
Student Affairs Evaluation and Data Analysis Specialist	August 2023-December 2023
-	Analyzed from at least 6000 student’s satisfaction on academics using crosstab on SPSS to clarify difference in subgroups like gender, nationality, or age
-	Modeled student survey that consists of around 90 questions including at least 5 to 6 skip and display logics on Qualtrics
-	Transformed raw texts to tabular dataset on Excel sheets that connected and consist of at least 10 organizations in UIUC
-	Visualized cooperation frequencies between over 10 organizations within Student Affairs using Sankey Chart

메이커스 호텔	서울, 남한
Customer Experience Specialist	May 2020-July 2021
-	Greeted and supported check-in and check-out guests at hotel front desk
-	Informed and recorded booked information offline and online both for international guests, approximately 5 to 15 guests per day
-	Prepared to interact with 3 to 5 guests relating with booking, room condition, or possible customer inconvenience

대한민국 국방부 – 대한민국 육군	경기도, 대한민국
무선장비 운용/정비	October 2018-May 2020
-	Operated and maintained approximately 20 wireless communication devices from infantry to heavy vehicle 
-	Received and reported army operations from sub and higher units to the officer in charge
-	Managed confidential documents and passwords of wireless communication
-	Supported operational and administrational tasks within company through paperwork and intranet

Project
STAT 207 Project: Car Insurance Fraud Detection	Champaign, IL
Project Participant	April 2022-May 2022
-	Analyzed 1000 car insurance cases to identify a relationship between 2 to 6 fraud situations and utilized statistical methods in Python
-	Examined relationship between insurance fraud cases and incident hours, education level of car owners, or insurance claim amount with statistical methods
-	Extracted results with 5 different graphs to reinforce the understanding of car insurance and fraud data relationships

IS 310 Project: South Korea shown in Cold War Newspaper	Champaign, IL
Project Participant	April 2022-May 2022
-	Conducted 4 newspaper datasets with 2000 news article data related with keyword ‘Korea’ for identifying how South Korea was introduced during the Cold War era
-	Extracted 4 newspaper datasets in a 10-year timeframe using New York Times API on Python
-	Optimized raw API dataset by selecting, stemming, removing, and grouping words in 4 datasets to measuring word mentioned in each of 4 timeframes
-	Visualized measured words using frequency plot by 4 timeframes to present the most mentioned words in New York Times related to South Korea in the 1950s to 1990s

Skills
Languages: Korean (Native), English (Functional)
Computer: Python (Intermediate), Numpy (Intermediate), Pandas (Intermediate), Scikit-learn (Intermediate), R (Basic)
```

- For failure case:
```
Hi! I’m a data scientist with a passion for uncovering insights hidden in data and turning them into meaningful stories. I love exploring datasets, finding patterns, and building models that help make better decisions. My work often involves using tools like Python, SQL, and visualization libraries to clean, analyze, and communicate complex information in a clear, impactful way.
I’m especially interested in how data can bridge the gap between intuition and evidence — whether it’s optimizing a process, predicting trends, or understanding user behavior. I enjoy collaborating with people from different backgrounds, learning new techniques, and constantly improving how I approach problems through data.
```
#### Reference
- Typical case resume is adapted from [here](https://www.careercenter.illinois.edu/sites/default/files/2023-03/Sample%20Resumes-Handout.pdf)
- Edge case resume is adapted from Changho's resume with some modification.
- Failure case resume (not even resume) is generated from ChatGPT with GPT-5 model, [here](https://chatgpt.com/share/68e6c75a-a274-8003-b586-30d1995b33c8)
- Description of the job is adapted from LinkedIn UIUC job page [here](https://www.linkedin.com/jobs/view/4269267569)

#### AI Usage
- GPT-5 model in ChatGPT used for figuring out examples of typical, edge, and failure cases for the tasks using LLM. Also get support from LLM to extend understanding on the possible examples from attributes description.
- GPT-5 used for generating a mock introduction of data scientist that would used for a failure case as submission of wrong document.