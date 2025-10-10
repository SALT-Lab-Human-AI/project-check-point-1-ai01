## **Typical case**
### **LLM-Extract**
#### Prompt:

> Extract attributes roles, skills, years, seniority, growth stage, spans, and confidences in following format. Role= , years= , seniority= .
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

#### Output:
> Here are the extracted attributes from the resume.
>
> ***
>
> **Role:** IT Intern
>- **Skills:** Programming
>- **Years:** <1
>- **Seniority:** Intern
>- **Growth Stage:** N/A
>- **Spans:** 0
>- **Confidences:** N/A
>
>---
>
>**Role:** Sales Assistant
>- **Skills:** Advertising planning, coordination
>- **Years:** <1
>- **Seniority:** Assistant
>- **Growth Stage:** N/A
>- **Spans:** 0
>- **Confidences:** N/A
>
>---
>
>**Role:** Server
>- **Skills:** Marketing, training, customer service
>- **Years:** <1
>- **Seniority:** Entry-level
>- **Growth Stage:** N/A
>- **Spans:** 15
>- **Confidences:** N/A
>
>---
>
>**Role:** Greek Recruitment Counselor
>- **Skills:** Conflict management, decision making, mentoring, fundraising
>- **Years:** <1
>- **Seniority:** Counselor/Member
>- **Growth Stage:** N/A
>- **Spans:** 80+
>- **Confidences:** N/A

### **LLM-Score**
#### Prompt:
> Match with the job descriptions and provide a match score indicating how the resume is closer to the job.
Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.
>
> Education Required: Bachelor’s degree in computer science or information management
>
> Experience Required: 2 years of work experience as a data management analyst, data analyst or related
>
> Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
> Resume to score:
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

#### Output:

> Based on a detailed comparison, the resume is a **very poor match** for the job description.
> 
> **Match Score: 15/100**
> 
> This low score is due to a significant lack of required professional experience and a complete absence of the specific technical skills mandated by the employer.
>
> ***
>
> ### Breakdown of the Score
>
> #### **Education: Strong Match**
> * The candidate has a Bachelor of Science in **Computer Science**, which perfectly aligns with the required degree.
> * Relevant coursework in "Database Systems" is a positive point, though it doesn't specify the technologies used.
>
> #### **Work Experience: Significant Mismatch**
> * **Years of Experience:** The job requires **2 years** of experience in a data analyst role or similar. The resume shows only a **3-month IT internship**, which falls far short of the requirement. Other roles listed (Sales Assistant, Server) are not relevant.
> * **Relevance of Experience:** The internship duties described are very general ("aided in developing a new software application"). They do not provide any evidence of experience with data management, CRM systems, or data integration processes as described in the job duties.
>
> #### **Special Skills: Complete Mismatch**
> This is the most critical area where the resume fails to meet the job's requirements. The job description lists three mandatory sets of special skills, and the resume shows **zero evidence** of possessing any of them.
>
> * ❌ **Requirement 1:** Experience with Blackbaud SDK, XML, SSIS, VB .Net, MS SQL, and MS Visual Studio.
>    * **Resume:** Lists C++, Adobe Photoshop, and HTML. There is no mention of any of the required technologies.
>* ❌ **Requirement 2:** Experience with Blackbaud CRM adhoc query tool and API tools.
>    * **Resume:** No mention of Blackbaud CRM or any API tools for data syncing.
>* ❌ **Requirement 3:** Experience with analytical programming using SQL and writing audit reports using SSRS.
>    * **Resume:** No mention of SQL or SSRS. While the "Database Systems" course likely involved SQL, it is not listed as a skill or demonstrated in a work context.

### **LLM-Explain**
#### Prompt:

> Based on the match score provided, provide summary of the result with suggestive language.

#### Output:

> Based on the analysis, it's suggested that Mary Smith is **not a suitable candidate** for this specific role at this time.
>
> ***
>
> ### Summary of Findings
>
> While the candidate's educational background in Computer Science is a perfect match, her profile shows significant gaps in the most critical areas of the job description.
>
> * **Experience Discrepancy:** There is a major shortfall in the required **2 years of professional experience**. The resume only lists a 3-month internship, which doesn't meet the minimum qualifications.
> * **Technical Skills Mismatch:** More importantly, there appears to be a **complete disconnect** with the mandatory special skills. The resume does not mention any of the required technologies, such as **Blackbaud CRM, MS SQL, SSIS, SSRS, or .Net**. The role is highly specialized, and the candidate's listed skills (C++, Photoshop) are not relevant.
>
> ***
>
> ### Suggestion
>
> Given the lack of required experience and the absence of any of the mandatory technical skills, it would be advisable to **prioritize other candidates** whose resumes more closely align with the specific qualifications outlined for this position. This role appears to require a specialist with direct experience in the specified software stack, rather than a general entry-level applicant.

## **Edge case:**
### **LLM-Extract**
#### Prompt:
> Extract attributes roles, skills, years, seniority, growth stage, spans, and confidences in following format. Role= , years= , seniority= .
> Resume to extract: Jeo Kim
> 700 South Eight Street, Champaign, Illinois 61833 | (217) 000-0000 | 0000@illinois.edu
>
> Education
> University of Illinois at Urbana-Champaign	Expected Graduation: May 2024
> Bachelors of Science in Information Sciences + Data Science	GPA: 3.75/4.00
> -	Dean’s List: Fall 2021, Spring 2022, Spring 2023
>
> University of Oregon	September 2017-June 2018
> Bachelors degree of Computer and Information Science	GPA: 3.40/4.00
>
> Work Experience
> University of Illinois Urbana-Champaign Student Affairs	Champaign, IL
> Student Affairs Evaluation and Data Analysis Specialist	August 2023-December 2023
> -	Analyzed from at least 6000 student’s satisfaction on academics using crosstab on SPSS to clarify difference in subgroups like gender, nationality, or age
> -	Modeled student survey that consists of around 90 questions including at least 5 to 6 skip and display logics on Qualtrics
> -	Transformed raw texts to tabular dataset on Excel sheets that connected and consist of at least 10 organizations in UIUC
> -	Visualized cooperation frequencies between over 10 organizations within Student Affairs using Sankey Chart
>
> 메이커스 호텔	서울, 남한
> Customer Experience Specialist	May 2020-July 2021
> -	Greeted and supported check-in and check-out guests at hotel front desk
> -	Informed and recorded booked information offline and online both for international guests, approximately 5 to 15 guests per day
> -	Prepared to interact with 3 to 5 guests relating with booking, room condition, or possible customer inconvenience
>
> 대한민국 국방부 – 대한민국 육군	경기도, 대한민국
> 무선장비 운용/정비	October 2018-May 2020
> -	Operated and maintained approximately 20 wireless communication devices from infantry to heavy vehicle
> -	Received and reported army operations from sub and higher units to the officer in charge
> -	Managed confidential documents and passwords of wireless communication
> -	Supported operational and administrational tasks within company through paperwork and intranet
>
> Project
> STAT 207 Project: Car Insurance Fraud Detection	Champaign, IL
> Project Participant	April 2022-May 2022
> -	Analyzed 1000 car insurance cases to identify a relationship between 2 to 6 fraud situations and utilized statistical methods in Python
> -	Examined relationship between insurance fraud cases and incident hours, education level of car owners, or insurance claim amount with statistical methods
> -	Extracted results with 5 different graphs to reinforce the understanding of car insurance and fraud data relationships
>
> IS 310 Project: South Korea shown in Cold War Newspaper	Champaign, IL
> Project Participant	April 2022-May 2022
> -	Conducted 4 newspaper datasets with 2000 news article data related with keyword ‘Korea’ for identifying how South Korea was introduced during the Cold War era
> -	Extracted 4 newspaper datasets in a 10-year timeframe using New York Times API on Python
> -	Optimized raw API dataset by selecting, stemming, removing, and grouping words in 4 datasets to measuring word mentioned in each of 4 timeframes
> -	Visualized measured words using frequency plot by 4 timeframes to present the most mentioned words in New York Times related to South Korea in the 1950s to 1990s
>
> Skills
> Languages: Korean (Native), English (Functional)
> Computer: Python (Intermediate), Numpy (Intermediate), Pandas (Intermediate), Scikit-learn (Intermediate), R (Basic)

#### Output:
> **University of Illinois Urbana-Champaign Student Affairs**
> Role= Student Affairs Evaluation and Data Analysis Specialist, years= 0.4, seniority= Specialist
>
> **메이커스 호텔 (Makers Hotel)**
> Role= Customer Experience Specialist, years= 1.25, seniority= Specialist
>
> **대한민국 국방부 – 대한민국 육군 (Republic of Korea Ministry of National Defense – ROK Army)**
> Role= 무선장비 운용/정비 (Wireless Equipment Operator/Maintainer), years= 1.6, seniority= Military Service
>
> **STAT 207 Project**
> Role= Project Participant, years= 0.2, seniority= Participant
>
> **IS 310 Project**
> Role= Project Participant, years= 0.2, seniority= Participant

### **LLM-Score**
#### Prompt:
> Match with the job descriptions and provide a match score indicating how the resume is closer to the job.
Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.
> 
> Education Required: Bachelor’s degree in computer science or information management
> 
> Experience Required: 2 years of work experience as a data management analyst, data analyst or related
> 
> Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
>
> Resume to score:
> Resume to extract: Jeo Kim
> 700 South Eight Street, Champaign, Illinois 61833 | (217) 000-0000 | 0000@illinois.edu
>
> Education
> University of Illinois at Urbana-Champaign	Expected Graduation: May 2024
> Bachelors of Science in Information Sciences + Data Science	GPA: 3.75/4.00
> -	Dean’s List: Fall 2021, Spring 2022, Spring 2023
>
> University of Oregon	September 2017-June 2018
> Bachelors degree of Computer and Information Science	GPA: 3.40/4.00
>
> Work Experience
> University of Illinois Urbana-Champaign Student Affairs	Champaign, IL
> Student Affairs Evaluation and Data Analysis Specialist	August 2023-December 2023
> -	Analyzed from at least 6000 student’s satisfaction on academics using crosstab on SPSS to clarify difference in subgroups like gender, nationality, or age
> -	Modeled student survey that consists of around 90 questions including at least 5 to 6 skip and display logics on Qualtrics
> -	Transformed raw texts to tabular dataset on Excel sheets that connected and consist of at least 10 organizations in UIUC
> -	Visualized cooperation frequencies between over 10 organizations within Student Affairs using Sankey Chart
>
> 메이커스 호텔	서울, 남한
> Customer Experience Specialist	May 2020-July 2021
> -	Greeted and supported check-in and check-out guests at hotel front desk
> -	Informed and recorded booked information offline and online both for international guests, approximately 5 to 15 guests per day
> -	Prepared to interact with 3 to 5 guests relating with booking, room condition, or possible customer inconvenience
>
> 대한민국 국방부 – 대한민국 육군	경기도, 대한민국
> 무선장비 운용/정비	October 2018-May 2020
> -	Operated and maintained approximately 20 wireless communication devices from infantry to heavy vehicle
> -	Received and reported army operations from sub and higher units to the officer in charge
> -	Managed confidential documents and passwords of wireless communication
> -	Supported operational and administrational tasks within company through paperwork and intranet
>
> Project
> STAT 207 Project: Car Insurance Fraud Detection	Champaign, IL
> Project Participant	April 2022-May 2022
> -	Analyzed 1000 car insurance cases to identify a relationship between 2 to 6 fraud situations and utilized statistical methods in Python
> -	Examined relationship between insurance fraud cases and incident hours, education level of car owners, or insurance claim amount with statistical methods
> -	Extracted results with 5 different graphs to reinforce the understanding of car insurance and fraud data relationships
>
> IS 310 Project: South Korea shown in Cold War Newspaper	Champaign, IL
> Project Participant	April 2022-May 2022
> -	Conducted 4 newspaper datasets with 2000 news article data related with keyword ‘Korea’ for identifying how South Korea was introduced during the Cold War era
> -	Extracted 4 newspaper datasets in a 10-year timeframe using New York Times API on Python
> -	Optimized raw API dataset by selecting, stemming, removing, and grouping words in 4 datasets to measuring word mentioned in each of 4 timeframes
> -	Visualized measured words using frequency plot by 4 timeframes to present the most mentioned words in New York Times related to South Korea in the 1950s to 1990s
>
> Skills
> Languages: Korean (Native), English (Functional)
> Computer: Python (Intermediate), Numpy (Intermediate), Pandas (Intermediate), Scikit-learn (Intermediate), R (Basic)

#### Output:

> Based on a review of the resume against the job description, the match is very low.
>
> **Match Score: 15%**
>
> ***
>
> ### Summary
>
> The candidate, Jeo Kim, has a relevant educational background in Information and Data Science and demonstrates foundational data analysis skills through projects using Python. However, there is a significant mismatch with the core requirements of this specific role. The job requires 2 years of experience and a very specific technical skill set centered around **Blackbaud CRM** and the **Microsoft data stack (SQL, SSIS, SSRS, .Net)**, none of which are present on the resume.
>
> ***
>
> ### Detailed Breakdown
>
> * **Education**: **Good Match.** The candidate is pursuing a Bachelor of Science in Information Sciences + Data Science, which aligns well with the required degree in computer science or information management.
>
> * **Required Experience**: **No Match.** The position requires **2 years** of work experience in a data management or data analyst role. The candidate's most relevant experience is a 4-month position as a Student Affairs Evaluation and Data Analysis Specialist. The other roles listed are not in the data analysis field.
>
> * **Special Skills Required**: **No Match.** This is the most critical area of mismatch. The job description lists three sets of mandatory skills, and the resume shows no experience with any of them.
>     * **Skill 1 (Blackbaud SDK, XML, SSIS, VB.Net, MS SQL, etc.)**: There is **no mention** of any of these technologies on the resume. The candidate's experience is with Python and SPSS.
>     * **Skill 2 (Blackbaud CRM ad-hoc query tool & API)**: There is **no mention** of Blackbaud CRM. While the candidate has experience with an API in a project, it is not the required tool.
>     * **Skill 3 (SQL, SSRS, large data sets)**: There is **no mention of SQL or SSRS** (SQL Server Reporting Services). Experience with SQL is fundamental to this role, and its absence is a major gap.

### **LLM-Explain**
#### Prompt:

> Based on the match score provided, provide summary of the result with suggestive language.

#### Output:

> ### Candidate Summary
>
> While Jeo Kim presents a strong academic foundation in Information and Data Science and shows promise as an emerging data professional, his resume suggests he is **not a suitable candidate for this specific position**.
>
> He demonstrates a solid grasp of data analysis fundamentals through his project work with **Python**, but there is a significant gap between his current skill set and the job's core requirements. The role calls for specialized, hands-on experience with the **Blackbaud CRM platform** and the **Microsoft data stack** (MS SQL, SSIS, SSRS, .Net), none of which are reflected in his experience.
>
> Furthermore, his relevant work history does not yet meet the **two-year minimum** requirement.
>
> **Suggestion:** This candidate may be a better fit for an entry-level data analyst or data scientist role where skills in Python and general statistical analysis are prioritized. However, for a position requiring expertise in this particular enterprise software ecosystem, it is recommended to **pass** on this applicant.

## **Failure case:**
### **LLM-Extract**
#### Prompt:

> Extract attributes roles, skills, years, seniority, growth stage, spans, and confidences in following format. Role= , years= , seniority= . 
> Resume to extract: 
> Hi! I’m a data scientist with a passion for uncovering insights hidden in data and turning them into meaningful stories. I love exploring datasets, finding patterns, and building models that help make better decisions. My work often involves using tools like Python, SQL, and visualization libraries to clean, analyze, and communicate complex information in a clear, impactful way.
> I’m especially interested in how data can bridge the gap between intuition and evidence — whether it’s optimizing a process, predicting trends, or understanding user behavior. I enjoy collaborating with people from different backgrounds, learning new techniques, and constantly improving how I approach problems through data.

#### Output:

> Based on the text provided, here are the extracted attributes:
>
> * **Role**: Data Scientist
> * **Skills**: Python, SQL, visualization libraries, data cleaning, data analysis, building models, communication.
> * **Years**: Not specified.
> * **Seniority**: Not specified.
> * **Growth Stage**: Not applicable.
> * **Spans**: Not specified.
> * **Confidences**: Not specified.

### **LLM-Score**
#### Prompt:
> Match with the job descriptions and provide match score that how the resume is closer to the job. Job descriptions: Developer, Data Integration. University of Illinois Foundation (https://www.linkedin.com/jobs/view/4269267569) 
Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.
Education Required: Bachelor’s degree in computer science or information management
Experience Required: 2 years of work experience as a data management analyst, data analyst or related
Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.

#### Output:
> Based on the provided resume and job description, the match score is very low, approximately **2 out of 10**.
>
> ---
>
> ### **Role and Responsibilities**
> * **Resume:** The individual identifies as a **Data Scientist** focused on "uncovering insights," "finding patterns," and "building models" to help with decision-making. The role is analytical and research-oriented.
> * **Job Description:** The position is a **Developer, Data Integration**. This role is highly technical and focused on the engineering side of data: designing, building, and maintaining data solutions, managing data quality, and ensuring data integrity within specific systems, primarily Blackbaud CRM.
>
> **Mismatch:** The roles are fundamentally different. The resume points to an analytical/statistical profile, while the job requires a data engineering/developer profile.
>
> ---
>
> ### **Skills and Technologies**
> * **Resume Skills:**
>     * **Direct Match:** SQL
>     * **Mentioned:** Python, data visualization, data cleaning, analysis.
> * **Required Job Skills:**
>     * **Core Stack:** **Blackbaud CRM**, Blackbaud SDK, SSIS, VB .Net, MS SQL, MS Visual Studio, SSRS.
>     * **General Skills:** Data integration, data management, API usage.
>
> **Mismatch:** This is the most significant gap. The job requires deep experience with a specific, non-negotiable technology stack (Blackbaud, Microsoft BI tools, VB .Net). The resume

### **LLM-Explain**
#### Prompt:

> Based on the match score provided, provide summary of the result with suggestive language.

#### Output:
> ### Summary of Your Fit for the Developer, Data Integration Role
>
> Based on your resume, it appears your strengths lie in the analytical domain of a **Data Scientist**, focused on uncovering insights and telling stories with data. This is a valuable and in-demand skill set.
>
> This particular role at the University of Illinois Foundation leans more towards a **Data Integration Developer** profile, which is a different, more technical specialization within the data field. Think of it as being more of a data "plumber" or "architect"—someone who builds and maintains the pipelines that data flows through—rather than the person who analyzes the data at its destination.
>
> Here are a few suggestions to consider for your job search:
>
> 1.  **Highlight Your Foundation:** You have a solid foundation in **SQL**, which is a great bridge between your analytical background and more technical data roles. For roles that have some overlap, be sure to emphasize any experience you have with data management, cleaning, or transformation processes.
>
> 2.  **Bridge the Technology Gap:** This role requires a very specific toolkit (Blackbaud CRM, Microsoft SSIS, VB .Net, SSRS). If you are passionate about pursuing data integration or engineering roles, it would be beneficial to gain hands-on experience with an ETL (Extract, Transform, Load) tool like SSIS or a similar platform.
>
> 3.  **Target Aligned Roles:** Your current profile is a much stronger match for positions titled **"Data Analyst," "Business Intelligence Analyst,"** or **"Data Scientist."** You will likely find that your skills in Python, data visualization, and modeling are exactly what employers are looking for in those positions.
>
> In short, this specific job may not be the most direct fit, but your skills are highly relevant for other data-focused opportunities. By targeting roles that align with your analytical strengths, you'll be a very competitive candidate.