## Typical Case
- **LLM-Extract**
Prompt:
```
Extract attributes from the resume, including roles, skills, years of experience, seniority, growth stage, spans, and confidence levels, in the following format. 
Role=
years=
seniority=
growth stage=
spans=
confidences=

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
Role=IT Intern, Sales Assistant, Server, Greek Recruitment Counselor, Leadership Certificate Participant  
years=IT Intern: 0.25 years (June 2019-August 2019), Sales Assistant: 0.25 years (June 2018-August 2018), Server: 0.25 years (June 2017-August 2017), Greek Recruitment Counselor: 1+ year (August 2019-Present), Leadership Certificate Participant: 1+ year (January 2019-Present)  
seniority=Entry-level (IT Intern, Sales Assistant, Server), Mid-level (Greek Recruitment Counselor, Leadership Certificate Participant)  
growth stage=Early career (recent graduate with internship and part-time roles)  
spans=Technology (IT Intern: software development, technical support), Sales/Marketing (Sales Assistant: advertising plans, office coordination; Server: marketing campaigns), Leadership/Community (Greek Recruitment Counselor: conflict management, mentoring; Leadership Certificate Participant: leadership development)  
confidences=C++: Advanced, Adobe Photoshop: Intermediate, HTML: Basic, Technical Support: High (handled 40+ employee requests with 99.5% accuracy), Leadership/Mentoring: High (supervised 80+ women, elected to scholarship committee), Marketing/Advertising: Moderate (assisted in campaigns and planning), Customer Service: High (trained employees, provided quality service)
```
- **LLM-Score**
Prompt:
```
Match with the below job descriptions and provide a match score indicating how the resume is closer to the job.

Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.

Education Required: Bachelor’s degree in computer science or information management

Experience Required: 2 years of work experience as a data management analyst, data analyst or related

Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
```

Output:
```
To evaluate how closely Mary Smith's resume matches the provided job description, I'll assess her qualifications against the job's requirements in terms of education, experience, roles, skills, and specific duties. I'll then assign a match score out of 100 based on the alignment.

### Job Description Requirements
- **Education**: Bachelor’s degree in Computer Science or Information Management.
- **Experience**: 2 years of work experience as a data management analyst, data analyst, or related role.
- **Special Skills**:
  1. Experience with Blackbaud SDK, XML specifications, SSIS packaging solutions, version control tools, VB .Net, MS SQL, MS Visual Studio, and PC-based applications for data integration processes.
  2. Using Blackbaud CRM ad hoc query tool and API tools for automated export processes for data syncs with external vendors.
  3. Analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
- **Duties**: Designing and implementing data solutions, managing data quality/integrity, enhancing Blackbaud CRM functionality, coordinating with stakeholders, developing documentation, validating data integration processes, and performing analytical programming.

### Resume Analysis
**Education**:
- Mary Smith holds a **Bachelor of Science in Computer Science** from the University of Illinois at Urbana-Champaign (May 2020, GPA: 3.67/4.00).
- Relevant coursework includes **Database Systems**, which aligns with data management and SQL-related skills.
- **Match**: Fully meets the education requirement.

**Experience**:
- **IT Intern at Aon Corporation (June 2019–August 2019, 0.25 years)**:
  - Responded to employee requests for computer issues, aided in developing a software application, and expedited reviewing processes with 99.5% accuracy.
  - **Relevance**: Involves technical support and software development, but not specifically data management or analysis. Limited duration (3 months).
- **Other Roles** (Sales Assistant, Server, Greek Recruitment Counselor, Leadership Certificate Participant):
  - These roles focus on sales, marketing, customer service, and leadership, with no direct relevance to data management or analysis.
- **Total Relevant Experience**: Approximately 0.25 years in a technical role (IT Intern). The job requires 2 years as a data management analyst or related role, which Mary does not meet.
- **Match**: Low, as her technical experience is brief and not directly in data management or analysis.

**Skills**:
- **Listed Skills**: C++ (Advanced), Adobe Photoshop (Intermediate), HTML (Basic).
- **Relevant Coursework**: Database Systems suggests familiarity with SQL or data management concepts.
- **Job-Specific Skills**:
  1. **Blackbaud SDK, XML, SSIS, VB .Net, MS SQL, MS Visual Studio, Version Control**: No evidence of experience with these specific tools or languages in the resume.
  2. **Blackbaud CRM Ad Hoc Query Tool and API Tools**: No mention of Blackbaud CRM or API tools for data syncs.
  3. **SQL, SSRS, Large Data Sets**: Coursework in Database Systems implies basic SQL knowledge, but no professional experience with SQL, SSRS, or large data sets is documented.
- **Other Relevant Skills**:
  - Software development experience (IT Intern) suggests some programming capability.
  - High accuracy (99.5%) in reviewing processes indicates attention to detail, relevant for data integrity tasks.
- **Match**: Partial match due to likely SQL exposure via coursework, but lacks specific experience with Blackbaud tools, SSRS, VB .Net, and large data sets.

**Duties Alignment**:
- **Data Solutions and Data Quality**: No direct experience in designing/implementing data solutions or managing data quality/integrity.
- **Blackbaud CRM Functionality**: No experience with Blackbaud CRM or related tools.
- **Coordination with Stakeholders**: Experience coordinating an office opening and working with sales teams suggests some stakeholder coordination skills.
- **Documentation**: No explicit mention of developing technical or functional specifications, but reviewing processes may imply some documentation skills.
- **Validation and Testing**: High accuracy in reviewing suggests attention to detail, but no experience with test plans or scripts.
- **Analytical Programming**: Likely basic SQL knowledge from coursework, but no evidence of SSRS or complex data analysis.
- **Match**: Limited alignment, primarily in general coordination and attention to detail, but lacks specific technical duties.

### Match Score Calculation
- **Education (20%)**: Fully meets (Bachelor’s in Computer Science, relevant coursework). **Score: 20/20**.
- **Experience (30%)**: Only 0.25 years in a semi-relevant IT role vs. 2 years required in data management/analysis. **Score: 5/30** (partial credit for IT internship).
- **Skills (30%)**: Has basic SQL knowledge (assumed from coursework) but lacks Blackbaud SDK, VB .Net, SSRS, MS SQL, and other required tools. **Score: 8/30** (credit for SQL and general programming).
- **Duties (20%)**: Some alignment in coordination and accuracy, but minimal overlap with data-specific tasks. **Score: 5/20**.
- **Total Score**: (20 + 5 + 8 + 5) / 100 = **38/100**.

### Final Answer
**Match Score: 38/100**

**Explanation**: Mary Smith’s resume shows a strong educational foundation in Computer Science with relevant coursework in Database Systems, suggesting basic SQL knowledge. However, her professional experience is limited to a 3-month IT internship, far short of the 2 years required in data management or analysis. She lacks specific experience with Blackbaud SDK, VB .Net, SSRS, and other required tools, and her roles do not demonstrate direct alignment with the job’s data-focused duties. Her strengths in coordination, accuracy, and general programming provide some fit, but the lack of specialized skills and experience results in a low match score.
```
- **LLM-Explain**
Prompt:
```
Based on the match score provided, provide summary of the result with suggestive language.
```

Output:
```
**Summary of Resume Match for Data Management Analyst Role**

Mary Smith's resume yields a match score of 38/100 for the Data Management Analyst position. While she meets the educational requirement with a Bachelor’s degree in Computer Science and relevant coursework in Database Systems, her professional experience and specialized skills fall short of the job’s expectations. Her brief 3-month IT internship provides some technical exposure, but it does not fulfill the required 2 years of experience in data management or analysis. Additionally, Mary lacks demonstrated proficiency in critical tools such as Blackbaud SDK, VB .Net, SSRS, and MS SQL, which are essential for the role. Her strengths in coordination, accuracy, and general programming suggest potential for growth, but she currently does not align closely with the position’s technical demands.

**Suggestions**: To improve her fit for this role, Mary could pursue additional training or certifications in Blackbaud CRM, SQL, and SSRS, and seek opportunities (e.g., internships or entry-level roles) to gain hands-on experience with data integration, large data sets, and the specific tools outlined in the job description. Building a portfolio of projects involving data management or analytical programming could also strengthen her candidacy for similar roles in the future.
```
## Edge Case
- **LLM-Extract**
Prompt:
```
Extract attributes from the resume, including roles, skills, years of experience, seniority, growth stage, spans, and confidence levels, in the following format. 
Role=
years=
seniority=
growth stage=
spans=
confidences=

Resume to extract: 
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
Output:
```
Role=Student Affairs Evaluation and Data Analysis Specialist, Customer Experience Specialist, Wireless Equipment Operator/Maintainer, Project Participant (Car Insurance Fraud Detection, South Korea Cold War Newspaper)  
years=Student Affairs Evaluation and Data Analysis Specialist: 0.33 years (August 2023–December 2023), Customer Experience Specialist: 1.17 years (May 2020–July 2021), Wireless Equipment Operator/Maintainer: 1.58 years (October 2018–May 2020), Project Participant (Car Insurance Fraud Detection): 0.08 years (April 2022–May 2022), Project Participant (South Korea Cold War Newspaper): 0.08 years (April 2022–May 2022)  
seniority=Entry-level (Student Affairs Evaluation and Data Analysis Specialist, Customer Experience Specialist, Wireless Equipment Operator/Maintainer), Junior-level (Project Participant roles)  
growth stage=Early career (recent graduate with short-term professional and project-based experience)  
spans=Data Analysis (Student Affairs: survey analysis, data transformation, visualization; Projects: statistical analysis, API data extraction), Customer Service (Customer Experience Specialist: guest support, booking management), Operations/Administration (Wireless Equipment Operator: equipment maintenance, document management)  
confidences=Python: Intermediate, Numpy: Intermediate, Pandas: Intermediate, Scikit-learn: Intermediate, R: Basic, SPSS: High (used for crosstab analysis), Qualtrics: High (modeled complex surveys), Excel: High (transformed raw text to tabular data), Data Visualization: High (created Sankey charts, frequency plots), Statistical Analysis: High (applied in projects and work), API Usage: Moderate (used New York Times API), Customer Service: Moderate (handled 5–15 guests daily), Document Management: Moderate (managed confidential documents)
```
- **LLM-Score**
Prompt:
```
Match with the below job description and provide a match score indicating how the resume is closer to the job.

Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.

Education Required: Bachelor’s degree in computer science or information management

Experience Required: 2 years of work experience as a data management analyst, data analyst or related

Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
```
Output:
```
To evaluate how closely Jeo Kim's resume matches the provided job description for the Data Management Analyst role, I’ll assess his qualifications against the job’s requirements in terms of education, experience, roles, skills, and specific duties. A match score out of 100 will be assigned based on the alignment.

### Job Description Requirements
- **Education**: Bachelor’s degree in Computer Science or Information Management.
- **Experience**: 2 years of work experience as a data management analyst, data analyst, or related role.
- **Special Skills**:
  1. Experience with Blackbaud SDK, XML specifications, SSIS packaging solutions, version control tools, VB .Net, MS SQL, MS Visual Studio, and PC-based applications for data integration processes.
  2. Using Blackbaud CRM ad hoc query tool and API tools for automated export processes for data syncs with external vendors.
  3. Analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
- **Duties**: Designing and implementing data solutions, managing data quality/integrity, enhancing Blackbaud CRM functionality, coordinating with stakeholders, developing documentation, validating data integration processes, and performing analytical programming.

### Resume Analysis
**Education**:
- Jeo Kim is pursuing a **Bachelor of Science in Information Sciences + Data Science** from the University of Illinois at Urbana-Champaign (expected May 2024, GPA: 3.75/4.00).
- He also completed coursework toward a Bachelor’s in Computer and Information Science at the University of Oregon (2017–2018, GPA: 3.40/4.00).
- The job requires a completed Bachelor’s degree in Computer Science or Information Management. Jeo’s degree in Information Sciences + Data Science is closely aligned with Information Management, and his prior coursework in Computer and Information Science strengthens this fit. However, as of October 2025, he is a recent graduate (May 2024), which meets the requirement assuming completion.
- **Match**: Fully meets the education requirement.

**Experience**:
- **Student Affairs Evaluation and Data Analysis Specialist (August 2023–December 2023, 0.33 years)**:
  - Analyzed student satisfaction data (6,000+ students) using SPSS, modeled surveys on Qualtrics, transformed raw text to tabular datasets in Excel, and visualized data with Sankey charts.
  - **Relevance**: Directly involves data analysis, survey modeling, and data visualization, aligning with data management/analyst duties.
- **Project Participant (Car Insurance Fraud Detection, April 2022–May 2022, 0.08 years)**:
  - Analyzed 1,000 car insurance cases using Python, applying statistical methods and creating visualizations.
  - **Relevance**: Demonstrates data analysis and programming skills relevant to the role.
- **Project Participant (South Korea Cold War Newspaper, April 2022–May 2022, 0.08 years)**:
  - Used New York Times API to extract and analyze 2,000 news articles, optimized datasets, and visualized results with frequency plots.
  - **Relevance**: Shows experience with API data extraction, data processing, and visualization.
- **Customer Experience Specialist (May 2020–July 2021, 1.17 years)**:
  - Handled guest interactions and recorded booking information, but no direct data management relevance.
- **Wireless Equipment Operator/Maintainer (October 2018–May 2020, 1.58 years)**:
  - Managed wireless communication devices and confidential documents, but not directly relevant to data analysis.
- **Total Relevant Experience**: Approximately 0.49 years (0.33 years from Student Affairs role + 0.16 years from projects). The job requires 2 years in data management/analyst roles, which Jeo does not meet due to limited duration.
- **Match**: Moderate, as the Student Affairs role and projects are highly relevant but fall short of the 2-year requirement.

**Skills**:
- **Listed Skills**: Python (Intermediate), Numpy (Intermediate), Pandas (Intermediate), Scikit-learn (Intermediate), R (Basic).
- **Inferred Skills** (from experience/projects):
  - **SPSS**: Used for crosstab analysis on large datasets.
  - **Qualtrics**: Modeled surveys with complex logic.
  - **Excel**: Transformed raw text to tabular data.
  - **Data Visualization**: Created Sankey charts and frequency plots.
  - **API Usage**: Worked with New York Times API.
  - **Statistical Analysis**: Applied in projects and work.
- **Job-Specific Skills**:
  1. **Blackbaud SDK, XML, SSIS, VB .Net, MS SQL, MS Visual Studio, Version Control**: No evidence of experience with these specific tools or languages.
  2. **Blackbaud CRM Ad Hoc Query Tool and API Tools**: Experience with API data extraction (New York Times API) suggests familiarity with API workflows, but no specific Blackbaud CRM experience.
  3. **SQL, SSRS, Large Data Sets**: Likely SQL knowledge from Information Sciences + Data Science coursework and data analysis tasks. Experience with large datasets (6,000+ student records, 2,000 news articles, 1,000 insurance cases). No experience with SSRS.
- **Other Relevant Skills**:
  - Strong data analysis and visualization skills (Python, Pandas, SPSS, Sankey charts, frequency plots).
  - Survey design and data transformation (Qualtrics, Excel).
- **Match**: Strong in SQL (assumed), large data sets, and API usage; weak in Blackbaud-specific tools, VB .Net, SSRS, and version control.

**Duties Alignment**:
- **Data Solutions and Data Quality**: Experience transforming raw text to tabular data and analyzing large datasets suggests capability in data solutions and quality management.
- **Blackbaud CRM Functionality**: No direct experience with Blackbaud CRM or its tools.
- **Coordination with Stakeholders**: Coordinated data connections across 10+ organizations in Student Affairs, indicating stakeholder collaboration skills.
- **Documentation**: No explicit mention of technical/functional specifications, but survey modeling and data transformation imply some documentation skills.
- **Validation and Testing**: Survey design with skip/display logic and statistical analysis suggest attention to data integrity, but no specific experience with test plans/scripts.
- **Analytical Programming**: Strong in Python-based data analysis and likely SQL; no SSRS or VB .Net experience.
- **Match**: Strong in data analysis, visualization, and stakeholder coordination; weak in Blackbaud-specific duties and formal documentation/validation.

### Match Score Calculation
- **Education (20%)**: Fully meets (Information Sciences + Data Science degree aligns with Information Management). **Score: 20/20**.
- **Experience (30%)**: 0.49 years of relevant data analysis experience vs. 2 years required. **Score: 15/30** (credit for highly relevant but short-term experience).
- **Skills (30%)**: Strong in SQL (assumed), large data sets, and API usage; lacks Blackbaud tools, VB .Net, SSRS. **Score: 20/30** (credit for Python, SPSS, and data handling).
- **Duties (20%)**: Aligns well in data analysis, visualization, and coordination; lacks Blackbaud-specific and documentation experience. **Score: 15/20**.
- **Total Score**: (20 + 15 + 20 + 15) / 100 = **70/100**.

### Final Answer
**Match Score: 70/100**

**Explanation**: Jeo Kim’s resume shows a strong fit in education, with a Bachelor’s in Information Sciences + Data Science, closely aligned with the job’s requirements. His experience as a Student Affairs Evaluation and Data Analysis Specialist and project work demonstrates relevant data analysis, visualization, and API skills, but the total duration (0.49 years) falls short of the required 2 years. He excels in handling large datasets, Python-based analysis, and survey design, but lacks experience with Blackbaud SDK, VB .Net, SSRS, and specific CRM tools. His ability to coordinate across organizations and transform data suggests potential for data management tasks, but the absence of specialized tools and limited experience lowers the overall match. For comparison, Mary Smith’s match score was 38/100, indicating Jeo is a closer fit due to stronger data analysis experience and relevant technical skills.
```
- **LLM-Explain**
Prompt:
```
Based on the match score provided, provide summary of the result with suggestive language.
```
Output:
```
**Summary of Resume Match for Data Management Analyst Role**

Jeo Kim's resume achieves a match score of 70/100 for the Data Management Analyst position, indicating a strong but not perfect alignment with the job requirements. His Bachelor’s degree in Information Sciences + Data Science fully satisfies the educational criteria, and his experience as a Student Affairs Evaluation and Data Analysis Specialist, combined with data-focused projects, demonstrates relevant skills in data analysis, visualization, and API usage. However, his total relevant experience (approximately 0.49 years) falls significantly short of the required 2 years, and he lacks specific experience with critical tools like Blackbaud SDK, VB .Net, SSRS, and Blackbaud CRM. Jeo’s proficiency in Python, SPSS, Qualtrics, and large dataset handling, along with his ability to coordinate across organizations, positions him as a promising candidate with strong potential. Compared to Mary Smith’s score of 38/100, Jeo’s resume is a closer match due to his more relevant data analysis experience and technical skills.

**Suggestions**: To enhance his fit for this role, Jeo should seek opportunities to gain hands-on experience with Blackbaud CRM, VB .Net, SSRS, and MS SQL through internships, freelance projects, or online certifications. Building expertise in version control tools and SSIS packaging solutions would further strengthen his profile. Additionally, pursuing roles or projects that extend his data management experience to meet the 2-year requirement and documenting technical specifications could close the gap, making him a highly competitive candidate for similar positions.
```
