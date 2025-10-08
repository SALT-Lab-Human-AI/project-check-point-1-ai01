## Typical case:
- **LLM-Extract**
Prompt:
```
Extract attributes roles, skills, years, seniority, growth stage, spans, and confidences in following format. Role= , years= , seniority= .
Resume to extract:
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
Output:
```
Here’s the extracted information in the requested format:

**Role =** IT Intern; Sales Assistant; Server; Greek Recruitment Counselor; Leadership Certificate Participant
**Years =** 2017–2020 (total ~3 years of experience across roles)
**Seniority =** Entry-level / Intern / Undergraduate
**Skills =** C++ (Advanced), Adobe Photoshop (Intermediate), HTML (Basic), Software development, Database Systems, Scientific Visualization, Customer service, Sales support, Leadership, Mentoring, Conflict management, Communication, Team coordination
**Growth stage =** Early career / Student transitioning to professional
**Spans =** Academia, IT services, Marketing, Hospitality, Leadership/Student organization
**Confidences =**

* IT Intern → 0.95
* Sales Assistant → 0.9
* Server → 0.85
* Greek Recruitment Counselor → 0.9
* Leadership Certificate Participant → 0.88
```

- **LLM-Score**
Prompt:
```
Match with the job descriptions and provide a match score indicating how the resume is closer to the job.
Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.

Education Required: Bachelor’s degree in computer science or information management

Experience Required: 2 years of work experience as a data management analyst, data analyst or related

Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.

```
Output:
```
Here’s the structured **resume-to-job match analysis** for Mary Smith’s resume against the provided **Data Management Analyst** position:

---

### 🔍 **Resume–Job Match Summary**

**Overall Match Score:** **45% (Moderate-Low match)**

---

### **Attribute Comparison**

| **Category**                                             | **Job Requirements**                                                  | **Resume Evidence**                                                                                    | **Match Level**         |
| -------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------- |
| **Education**                                            | Bachelor’s in Computer Science or Information Management              | ✅ Bachelor of Science in Computer Science, University of Illinois                                      | **Strong Match (100%)** |
| **Experience (2+ years in data management or analysis)** | Requires professional data management or data analysis experience     | ⚠ Internship and part-time experience in IT and sales, not directly in data management                 | **Partial Match (40%)** |
| **Programming / Technical Skills**                       | MS SQL, VB .Net, SSIS, XML, Visual Studio, Blackbaud SDK, APIs        | ❌ Not mentioned in resume; only C++, HTML, Adobe Photoshop                                             | **Low Match (10%)**     |
| **CRM / Data Integration**                               | Blackbaud CRM, data quality, mass updates, data integrity initiatives | ❌ No mention of CRM or database integration work                                                       | **No Match (0%)**       |
| **Data Analysis & Reporting**                            | SQL, SSRS, large datasets, analytical programming                     | ⚠ Some analytical and programming exposure through coursework (Database Systems, Program Verification) | **Partial Match (40%)** |
| **Documentation & Collaboration**                        | Work with business analysts, developers, vendors                      | ⚠ Demonstrated teamwork and communication skills in leadership roles                                   | **Partial Match (50%)** |
| **Seniority & Career Stage**                             | Mid-level, 2+ years of experience                                     | Entry-level undergraduate with internships                                                             | **Low Match (25%)**     |

---

### **Qualitative Observations**

* **Strengths:** Solid foundation in computer science, early exposure to programming and IT systems, teamwork and communication skills.
* **Weaknesses:** No evidence of professional-level experience with **data systems, SQL, CRM tools, or .NET technologies** required for this job.
* **Potential Fit:** Could qualify for a **junior data analyst or IT assistant** role with training, but **not yet ready** for this specialized data management analyst position.

---

### **Attribute Summary (Estimated Confidence)**

**Role Match Confidence:** 0.45
**Skill Match Confidence:** 0.35
**Experience Match Confidence:** 0.40
**Education Match Confidence:** 1.00
**Overall Weighted Match Score:** **≈ 45%**

---

Would you like me to **show how this 45% score was computed numerically** (e.g., weighting categories like skills = 40%, experience = 30%, etc.) for reproducibility or comparison across multiple resumes?

```

- **LLM-Explain**
Prompt:
```
Based on the match score provided, provide summary of the result with suggestive language.
```
Output:
```
Here’s a concise, suggestive summary based on the **45% match score**:

---

### **Match Summary (45%)**

Mary Smith’s profile shows a **moderate foundational fit** for the Data Management Analyst role, primarily due to her **strong educational background in Computer Science** and **early exposure to IT-related work**. However, her experience and technical skill set are **not yet aligned with the specialized requirements** of the position, such as **SQL-based data integration, CRM systems, .NET development, and large-scale data handling**.

To move closer to this type of role, Mary could consider:

* **Gaining hands-on experience** with data tools such as **MS SQL, SSIS, and Visual Studio**.
* **Completing a short course or certification** in **data management or CRM systems** (e.g., Salesforce, Blackbaud).
* **Building small-scale data integration projects** or **SQL-based dashboards** to demonstrate practical skills.

With these targeted improvements, she could strengthen her profile and **significantly increase her compatibility** with data-focused analyst positions in the near future.
```

## Edge case:
- **LLM-Extract**
Prompt:
```
Extract attributes roles, skills, years, seniority, growth stage, spans, and confidences in following format. Role= , years= , seniority= .
Resume to extract: Jeo Kim
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
Output:
```
Here’s the extracted structured attribute summary from **Jeo Kim’s resume**:

---

**Role** = Data Analyst / Evaluation Specialist / Customer Experience Specialist
**Skills** = Data analysis, SPSS, Qualtrics, Excel, Sankey Chart visualization, Python, Numpy, Pandas, Scikit-learn, R, data cleaning, statistical modeling, survey design, API data processing, word frequency analysis, bilingual (Korean/English)
**Years** = ~3 years total experience (Aug 2023–Dec 2023, May 2020–Jul 2021, Oct 2018–May 2020)
**Seniority** = Entry-level / Junior
**Growth stage** = Early-career professional transitioning from academic to applied data roles
**Spans** = Education (Information Science + Data Science), Public Sector (University), Hospitality (Hotel), Military Service, Academic Projects (Data Analysis, NLP)
**Confidences** =

* Role identification: **0.92**
* Skills extraction: **0.95**
* Years estimation: **0.88**
* Seniority classification: **0.93**
* Growth stage assessment: **0.90**
* Span categorization: **0.94**

---

Would you like me to format this in a **JSON style** (for programmatic use) or **tabular format** (for reporting use)?
```

- **LLM-Score**
Prompt:
```
Match with the job descriptions and provide a match score indicating how the resume is closer to the job.
Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.

Education Required: Bachelor’s degree in computer science or information management

Experience Required: 2 years of work experience as a data management analyst, data analyst or related

Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
```
Output:
```
Here’s the **resume–job match analysis** for **Jeo Kim** vs. the provided **Data Management Analyst (Blackbaud CRM) job description**:

---

### 🔹 **Match Summary**

**Resume Role:**
Data Analyst / Evaluation Specialist / Data Science Undergraduate

**Job Role:**
Data Management Analyst (CRM / SQL / .NET / Data Integration)

---

### 🔹 **Match Breakdown**

| **Category**                                          | **Job Requirement**                                            | **Resume Evidence**                                                      | **Match Level**            | **Comments**                                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------- | --------------------------------------------------------------------------------------- |
| **Education**                                         | Bachelor’s in Computer Science or Information Management       | B.S. in Information Sciences + Data Science                              | ✅ **Strong Match**         | Closely related major; matches educational background.                                  |
| **Experience (2 years)**                              | 2 years in data analysis or management roles                   | ~3 years combined experience (data analysis, military, customer service) | ⚪ **Partial Match (0.7)**  | Has academic and internship experience, but limited full-time data management exposure. |
| **CRM / Blackbaud SDK**                               | Work with CRM systems (esp. Blackbaud SDK, XML, SSIS, VB .Net) | No explicit mention of CRM or SDK                                        | ❌ **Low Match (0.2)**      | No mention of CRM or related frameworks.                                                |
| **Data Integration Tools (SQL, SSIS, Visual Studio)** | SQL, SSIS, VB .Net, Visual Studio                              | Used Python, R, SPSS, Excel; no SQL or .NET                              | ⚪ **Low Match (0.3)**      | Has analytical skills but lacks enterprise data integration tool experience.            |
| **Analytical Programming**                            | SQL, SSRS, large data sets                                     | Python, Pandas, Scikit-learn; handled large datasets (6,000+ students)   | ⚪ **Medium Match (0.6)**   | Similar data analysis context, though tools differ.                                     |
| **Data Quality / Integrity Management**               | Maintain data quality and audit systems                        | Designed and cleaned survey data, performed crosstabs                    | ✅ **Good Match (0.8)**     | Demonstrates applied experience managing data accuracy.                                 |
| **Cross-team Coordination**                           | Work with analysts, developers, vendors                        | Collaborated with multiple university orgs                               | ✅ **Moderate Match (0.7)** | Experience with collaboration, though not technical teams.                              |
| **Documentation & Process Design**                    | Develop technical & functional documentation                   | Documented survey structures and visualizations                          | ⚪ **Medium Match (0.6)**   | Has partial documentation experience, more academic than technical.                     |

---

### 🔹 **Quantitative Match Score**

| Category                      | Weight   | Score | Weighted         |
| ----------------------------- | -------- | ----- | ---------------- |
| Education                     | 0.15     | 0.9   | 0.135            |
| Experience                    | 0.15     | 0.7   | 0.105            |
| Technical Tools               | 0.25     | 0.35  | 0.0875           |
| Analytical Programming        | 0.15     | 0.6   | 0.09             |
| Data Quality / Integration    | 0.15     | 0.8   | 0.12             |
| Collaboration / Documentation | 0.15     | 0.65  | 0.0975           |
| **Total**                     | **1.00** |       | **0.635 (~64%)** |

---

### 🔹 **Match Score: 64%**

**Summary:**
Jeo Kim shows **a strong educational alignment** and **solid foundational data analysis experience**, especially in cleaning, transforming, and visualizing data. However, **technical tool gaps (SQL, .NET, SSIS, CRM systems)** and **limited professional data integration experience** reduce the overall fit.

---

### 🔹 **Suggested Framing (for improvement)**

* Emphasize transferable skills: data cleaning, transformation, visualization, and cross-department collaboration.
* Learn or highlight any exposure to SQL, SSIS, or CRM-related data tools.
* Mention experience documenting data processes or workflow automation in academic or work projects.

---

Would you like me to generate a **short summary paragraph (recruiter-style)** summarizing the 64% match result in a natural language tone?
```

- **LLM-Explain**
Prompt:
```
```
Output:
```
```

## Failure case:
- **LLM-Extract**
Prompt:
```
```
Output:
```
```

- **LLM-Score**
Prompt:
```
```
Output:
```
```

- **LLM-Explain**
Prompt:
```
```
Output:
```
```