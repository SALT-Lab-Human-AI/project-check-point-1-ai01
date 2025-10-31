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
Based on the resume provided, here are the extracted attributes:

**Roles=**
- IT Intern
- Sales Assistant
- Server
- Greek Recruitment Counselor and Active Member
- Leadership Certificate Participant

**Skills=**
- C++ (Advanced)
- Adobe Photoshop (Intermediate)
- HTML (Basic)
- Database Systems
- Program Verification
- Scientific Visualization
- Customer service
- Training/mentoring
- Conflict management
- Sales/marketing
- Project coordination

**Years of experience=**
- Total professional experience: ~1.5 years (across internships and part-time roles from 2017-2019)
- IT/Tech experience: 3 months (Summer 2019)
- Sales/Business experience: 3 months (Summer 2018)
- Customer service experience: 3 months (Summer 2017)

**Seniority=**
- Entry-level / New Graduate (Bachelor's degree completed May 2020)

**Growth stage=**
- Early career / Individual contributor
- Moving from internships/part-time roles to full-time opportunities
- Active in skill development through coursework and leadership programs

**Spans=**
- Education: 2016-2020 (4 years, assuming standard timeline)
- Work experience span: June 2017 - August 2019 (2+ years, seasonal/summer positions)
- Leadership activities: January 2019 - Present (ongoing at time of resume)

**Confidences=**
- C++: Advanced (high confidence)
- Adobe Photoshop: Intermediate (medium confidence)
- HTML: Basic (low-medium confidence)
- Customer service/interpersonal skills: High confidence (demonstrated across multiple roles)
- Leadership/mentoring: Medium-high confidence (formal training and practical experience)
- Technical/IT support: Medium confidence (3-month internship with measurable outcomes)
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
# Job Match Analysis

## Match Score: **35/100** (Low Match)

---

## Detailed Breakdown:

### ✅ **Strengths/Matches:**

1. **Education Requirement - FULL MATCH**
   - Required: Bachelor's in Computer Science or Information Management
   - Candidate: B.S. in Computer Science from UIUC ✓

2. **Relevant Coursework - PARTIAL MATCH**
   - Has Database Systems coursework (relevant to data management)
   - Scientific Visualization (somewhat relevant to data analysis)

3. **Programming Foundation - PARTIAL MATCH**
   - Advanced C++ skills (demonstrates programming capability)
   - Basic understanding of programming concepts

4. **Soft Skills - MATCH**
   - Customer service experience
   - Cross-functional coordination experience
   - Documentation skills (from IT intern role)

---

### ❌ **Critical Gaps:**

1. **Experience Requirement - MAJOR GAP**
   - **Required:** 2 years as data management analyst/data analyst
   - **Candidate has:** 3 months IT intern experience only
   - **Gap:** ~1.7 years of specialized experience missing

2. **Special Skills Required - COMPLETE MISMATCH (0/3)**

   **Skill #1:** Blackbaud SDK, XML, SSIS, VB .Net, MS SQL, MS Visual Studio
   - **Candidate has:** None of these technologies mentioned
   - **Critical blocker**

   **Skill #2:** Blackbaud CRM adhoc query tool and API tools
   - **Candidate has:** No Blackbaud CRM experience
   - **Critical blocker**

   **Skill #3:** SQL analytical programming, SSRS audit reports, large datasets
   - **Candidate has:** No SQL experience listed, no SSRS experience
   - **Critical blocker**

3. **Technology Stack - SIGNIFICANT MISMATCH**
   - Required: VB .Net, MS SQL, SSRS, XML, SSIS
   - Candidate: C++, HTML (Basic), Photoshop
   - **0% technology overlap**

4. **Domain Experience - MISSING**
   - No CRM system experience
   - No data integration experience
   - No data quality/integrity project experience
   - No experience with external vendor data syncs

---

## Conclusion:

**This is NOT a suitable match.** The candidate is a recent graduate with entry-level skills, while the position requires:
- 2 years of specialized data analyst experience
- Extensive expertise in specific enterprise technologies (Blackbaud, SQL Server stack)
- Proven experience with complex data integration processes

The candidate would need significant additional training and 1-2 years of relevant work experience in data management, SQL development, and CRM systems before being qualified for this role.

**Recommendation:** The candidate should look for entry-level data analyst or junior developer positions that offer training in SQL, database management, and data integration technologies.
```
- **LLM-Explain**
Prompt:
```
Based on the match score provided, provide summary of the result with suggestive language.
```

Output:
```
# Match Summary & Recommendations

## Overall Assessment: **Not Recommended for This Position**

---

## Summary Statement:

While Mary Smith demonstrates strong academic credentials with a Computer Science degree from a reputable university and shows promise as an early-career professional, **this particular role is not aligned with her current skill set and experience level**. The position requires specialized expertise in enterprise data management systems and technologies that are not present in her background.

---

## Key Concerns:

**Experience Gap:** The role demands 2 years of dedicated data analyst experience, but Mary has only 3 months of general IT internship experience. She would be **significantly underprepared** for the technical responsibilities of this position.

**Technology Mismatch:** The job requires mandatory proficiency in Blackbaud CRM, SQL Server, SSIS, VB .Net, and SSRS—none of which appear in Mary's skill set. Her C++ and basic HTML knowledge, while valuable, **do not transfer to the specific enterprise technologies required**.

**Critical Skills Absent:** All three special skills requirements are completely unmet, which would likely result in **immediate disqualification** during the screening process.

---

## Suggestions for Mary:

### Short-term Actions:
- **Target entry-level positions** such as Junior Data Analyst, Associate Developer, or Data Analyst Trainee roles
- **Build SQL skills immediately** through online courses (Coursera, Udemy, DataCamp) or certifications
- **Seek positions** that offer training in database management and business intelligence tools
- **Leverage her C++ strength** to transition into backend development or data engineering roles with mentorship

### Medium-term Development (6-12 months):
- Gain hands-on experience with SQL Server, data integration, and reporting tools
- Complete projects involving CRM systems or data quality initiatives
- Build a portfolio demonstrating data analysis and database management capabilities
- Consider roles at companies using modern data stacks (Python, SQL, cloud databases)

### Better-Fit Opportunities:
- Junior Software Developer (C++ focused)
- IT Support Analyst (building on her internship)
- Entry-level Business Intelligence Analyst with training programs
- Associate positions at companies with robust onboarding for recent graduates

---

## Recommendation for Hiring Team:

**Do not proceed with this candidate** for this specific role. The skill and experience gaps are too substantial to bridge through on-the-job training, and the mandatory technical requirements cannot be met. Consider candidates with demonstrated experience in database management, SQL development, and ideally Blackbaud or similar CRM platforms.
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
Based on the resume provided, here are the extracted attributes:

**Roles=**
- Student Affairs Evaluation and Data Analysis Specialist
- Customer Experience Specialist
- Wireless Communication Equipment Operator/Maintenance (Military Service)
- Project Participant (Academic Projects)

**Skills=**
- Python (Intermediate)
- Numpy (Intermediate)
- Pandas (Intermediate)
- Scikit-learn (Intermediate)
- R (Basic)
- SPSS (crosstab analysis)
- Qualtrics (survey design with skip/display logic)
- Excel (data transformation)
- Data visualization (Sankey Chart, frequency plots)
- New York Times API
- Statistical analysis methods
- Data cleaning and optimization (stemming, grouping, word frequency)
- Survey design and analysis
- Customer service
- Korean (Native)
- English (Functional)

**Years of experience=**
- Total professional experience: ~2.9 years
- Data analysis experience: 5 months (Aug 2023 - Dec 2023)
- Customer service experience: 1.2 years (May 2020 - July 2021)
- Military service: 1.6 years (Oct 2018 - May 2020)
- Project experience: Multiple academic projects (2022)

**Seniority=**
- Entry-level / Junior
- Current student expected to graduate May 2024
- Transitioning from academic to professional data analysis roles

**Growth stage=**
- Early career development
- Building specialized data analysis expertise
- Transitioning from customer-facing roles to technical/analytical positions
- Active student gaining practical experience through university employment
- Progressing from basic to intermediate technical skills

**Spans=**
- Education span: September 2017 - May 2024 (expected) - approximately 6.5 years with interruption for military service
- University of Oregon: Sept 2017 - June 2018
- Military service: Oct 2018 - May 2020
- Hotel work: May 2020 - July 2021
- Current university (UIUC): Transfer student, Dean's List Fall 2021, Spring 2022, Spring 2023
- Data analysis role: Aug 2023 - Dec 2023 (5 months)
- Academic projects: Spring 2022

**Confidences=**
- Python, Numpy, Pandas, Scikit-learn: Intermediate (medium-high confidence) - demonstrated through multiple projects and work experience
- R: Basic (low-medium confidence)
- SPSS: Medium-high confidence (practical application with 6000+ records)
- Qualtrics: High confidence (complex survey design with 90 questions, skip logic)
- Excel: High confidence (data transformation across multiple datasets)
- Data visualization: Medium-high confidence (Sankey charts, frequency plots)
- Statistical analysis: Medium-high confidence (demonstrated through coursework and projects)
- Survey design and evaluation: High confidence (professional work experience)
- API integration: Medium confidence (NYT API project experience)
- Customer service: High confidence (1+ year professional experience, international guests)
- Korean language: Native (highest confidence)
- English language: Functional/professional (medium-high confidence)
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
# Job Match Analysis

## Match Score: **45/100** (Low-Medium Match)

---

## Detailed Breakdown:

### ✅ **Strengths/Matches:**

1. **Education Requirement - STRONG MATCH**
   - Required: Bachelor's in Computer Science or Information Management
   - Candidate: B.S. in Information Sciences + Data Science (Expected May 2024) ✓
   - Previous coursework in Computer and Information Science at U of Oregon ✓
   - **Strong GPA: 3.75/4.00**

2. **Data Analysis Experience - PARTIAL MATCH**
   - 5 months professional experience as Data Analysis Specialist
   - Worked with large datasets (6000+ student records, 2000+ news articles)
   - Experience with survey data, tabular datasets, and data transformation
   - Strong analytical mindset demonstrated through multiple projects

3. **Data Quality & Integrity - GOOD MATCH**
   - Experience transforming raw data to structured datasets
   - Data cleaning and optimization skills (stemming, removing, grouping)
   - Survey design with complex logic (90 questions, skip/display logic)
   - Data validation through statistical analysis

4. **API Integration - PARTIAL MATCH**
   - Experience with New York Times API in Python
   - Understanding of automated data extraction processes
   - Demonstrates capability to work with external data sources

5. **Programming & Technical Skills - MODERATE MATCH**
   - Python (Intermediate) with data libraries (Pandas, Numpy, Scikit-learn)
   - Statistical programming experience (SPSS, R)
   - Demonstrates ability to learn new technical tools
   - Experience with data visualization

6. **Soft Skills - GOOD MATCH**
   - Customer service background (relevant for understanding customer needs)
   - Cross-functional coordination through Student Affairs role
   - Documentation skills (military and administrative experience)
   - Bilingual (Korean/English) - asset for diverse stakeholder communication

---

### ❌ **Critical Gaps:**

1. **Experience Requirement - SIGNIFICANT GAP**
   - **Required:** 2 years as data management analyst/data analyst
   - **Candidate has:** 5 months professional data analysis + academic projects
   - **Gap:** ~1.5 years of specialized professional experience
   - **Note:** Still a student (graduates May 2024)

2. **Special Skills Required - COMPLETE MISMATCH (0/3)**

   **Skill #1:** Blackbaud SDK, XML, SSIS, VB .Net, MS SQL, MS Visual Studio
   - **Candidate has:** None of these technologies
   - **Critical blocker** - No .NET ecosystem experience

   **Skill #2:** Blackbaud CRM adhoc query tool and API tools
   - **Candidate has:** No Blackbaud CRM experience
   - **Critical blocker** - No CRM system experience

   **Skill #3:** SQL analytical programming, SSRS audit reports, large datasets
   - **Candidate has:** No SQL experience listed, no SSRS
   - **Partial:** Has worked with large datasets but in Python/SPSS, not SQL
   - **Major gap**

3. **Technology Stack - MAJOR MISMATCH**
   - Required: VB .Net, MS SQL, SSRS, XML, SSIS, Visual Studio
   - Candidate: Python, R, SPSS, Qualtrics
   - **0% core technology overlap**
   - Different programming paradigm (Python vs .NET)

4. **CRM Systems - COMPLETE GAP**
   - No experience with any CRM platforms
   - No Blackbaud-specific knowledge
   - No enterprise data management system experience

5. **Database Management - CRITICAL GAP**
   - No SQL database experience mentioned
   - No stored procedures, scripts, or database programming
   - Works with Excel and flat files, not relational databases

6. **Software Development Lifecycle - LIMITED**
   - No mention of version control (Git)
   - No experience with test plans, test scripts
   - No software release management experience
   - Academic projects don't demonstrate enterprise development practices

---

## Why Higher Score than Mary Smith (35/100)?

Jeo Kim scores 10 points higher because:
1. **More relevant data analysis experience** (5 months professional vs 3 months IT intern)
2. **Direct data quality work** with survey design, data transformation, and large datasets
3. **Stronger analytical foundation** with Information Sciences + Data Science degree
4. **API integration experience** shows understanding of data syncs (though not in required tech stack)
5. **Statistical analysis skills** closer to analytical programming requirements
6. **Currently specializing in data** vs generalist IT intern role

However, both candidates fail on the **mandatory technical requirements**.

---

## Conclusion:

**This is NOT a suitable match at present, but shows MORE POTENTIAL than the previous candidate.** Jeo Kim has the right educational background and is developing relevant data analysis skills, but lacks:
- Required years of professional experience (1.5 years short)
- Critical technology stack (SQL, .NET, SSRS, Blackbaud)
- Enterprise CRM system experience

**Timing Issue:** Candidate doesn't graduate until May 2024, so cannot meet immediate hiring needs.

---

## Recommendation:

### For Hiring Team:
**Do not proceed for immediate hire** due to:
- Mandatory skill requirements unmet (all 3 special skills absent)
- Student status (not yet graduated)
- Technology stack completely different

**Consider for future opportunities IF:**
- Willing to provide extensive training in SQL Server stack and Blackbaud
- Can wait until after May 2024 graduation
- Open to entry-level data analyst role with mentorship

### For Jeo Kim:

**Priority Actions Before Graduation (by May 2024):**
1. **Learn SQL immediately** - This is the #1 gap
   - Take SQL courses (Coursera: Google Data Analytics, Mode Analytics SQL Tutorial)
   - Practice on platforms like SQLZoo, LeetCode SQL
   - Build portfolio projects with SQL Server or PostgreSQL

2. **Gain database experience:**
   - Learn relational database concepts
   - Practice writing stored procedures, views, and queries
   - Understand data integrity and normalization

3. **Explore .NET basics:**
   - Understand C# fundamentals (similar to your Python knowledge)
   - Learn about Visual Studio IDE
   - Basic understanding of XML and data integration concepts

4. **Build relevant portfolio:**
   - Create projects demonstrating SQL-based data analysis
   - Document data quality initiatives
   - Show ETL (Extract, Transform, Load) processes

**Better-Fit Immediate Opportunities:**
- **Junior Data Analyst** roles using Python/R
- **Research Data Analyst** in academic settings
- **Business Intelligence Analyst Trainee** with SQL training programs
- **Data Quality Analyst** at companies using modern data stacks
- **Survey Research Analyst** leveraging Qualtrics expertise
- **Graduate assistantships** in data analysis (continue through graduation)

**6-Month Development Path:**
- Complete SQL certification
- Build 2-3 SQL-based data projects
- Apply for entry-level data analyst positions requiring SQL + Python
- Seek companies with training programs for recent graduates
- Target organizations using Python-first data stacks (more aligned with current skills)

**Long-term Trajectory:**
With SQL skills added, Jeo would be competitive for entry-level data analyst roles and could build toward CRM/database specialist positions over 1-2 years.
```
- **LLM-Explain**
Prompt:
```
Based on the match score provided, provide summary of the result with suggestive language.
```
Output:
```
# Match Summary & Recommendations

## Overall Assessment: **Not Recommended for Immediate Hire**

---

## Summary Statement:

Jeo Kim presents a **more promising profile** than typical entry-level candidates, with relevant data analysis experience and a specialized degree in Information Sciences + Data Science. However, **this position remains out of reach** due to mandatory technical requirements and experience gaps. While Jeo demonstrates strong analytical capabilities and the right educational foundation, the role requires enterprise-level database and CRM expertise that is entirely absent from their background.

---

## Key Concerns:

**Experience Shortfall:** The position demands 2 years of professional data analyst experience, but Jeo has only 5 months plus academic projects. Additionally, **they won't graduate until May 2024**, creating an immediate availability issue.

**Technology Stack Incompatibility:** This is the **deal-breaker**. The job mandates proficiency in the Microsoft/.NET ecosystem (SQL Server, VB .Net, SSRS, SSIS, Visual Studio) and Blackbaud CRM—technologies completely absent from Jeo's Python-centric skill set. While Jeo is clearly capable of learning new technologies, **all three special skills requirements are unmet**, which would result in **automatic disqualification** during screening.

**Enterprise Systems Gap:** Jeo's experience centers on academic surveys and research projects using Python, SPSS, and Qualtrics. The role requires **enterprise CRM data management**, stored procedures, and production-level data integration—a fundamentally different environment than academic data analysis.

---

## Why This Candidate Shows Promise (Despite Low Match):

**Strong Analytical Foundation:** Jeo has handled complex datasets (6000+ records), designed sophisticated surveys with conditional logic, and demonstrated statistical rigor through multiple projects. This analytical thinking **could translate well** to data integrity work—if the technology gap were bridged.

**Relevant Data Work:** Unlike a general IT intern, Jeo has **directly applicable experience** in data transformation, quality management, and visualization. The 5-month Student Affairs role shows they can handle real-world data problems, not just coursework.

**Learning Agility:** Successfully navigated API integration, multiple programming languages, and complex statistical tools. The progression from basic R to intermediate Python/Pandas suggests **strong capacity to acquire new technical skills**.

**Domain Awareness:** Experience with survey systems (Qualtrics) and data quality initiatives shows understanding of **data governance concepts**—relevant to the CRM data integrity focus of this role.

---

## Suggestions for Jeo Kim:

### 🚨 **Critical Action: Learn SQL Immediately** (Before Graduation)
This is **non-negotiable** for data analyst roles. Without SQL, Jeo will be eliminated from 70-80% of data analyst positions.

**Urgent Timeline (Now - May 2024):**
- **Month 1-2:** Complete SQL fundamentals (Coursera, Mode Analytics, SQLZoo)
- **Month 3-4:** Build 2 portfolio projects with SQL databases (PostgreSQL or SQL Server)
- **Month 5-6:** Practice SQL interview questions (LeetCode, HackerRank)
- **By graduation:** Be able to write complex queries, joins, subqueries, and basic stored procedures

### Short-Term Actions (Next 6 Months):

**Leverage Current Strengths:**
- **Emphasize your Qualtrics expertise**—survey platforms are valuable in market research and UX research roles
- **Highlight large dataset experience**—6000+ records shows you can handle production-scale data
- **Market your Python/statistics combination**—this is highly valued in modern analytics

**Target Appropriate Roles:**
- ✅ **Junior Data Analyst** (Python/SQL roles)
- ✅ **Research Data Analyst** (academic or market research)
- ✅ **Survey Data Analyst** (leverage Qualtrics background)
- ✅ **Business Intelligence Analyst - Entry Level** (with training programs)
- ✅ **Data Quality Analyst** (at tech companies using Python)
- ❌ Avoid: Senior roles, .NET-specific positions, or jobs requiring 2+ years experience

**Build Your Missing Skillset:**
1. **SQL** (highest priority)—Take Google Data Analytics Certificate or similar
2. **Database concepts**—Understand relational databases, normalization, keys
3. **Version control**—Learn Git/GitHub (essential for all technical roles)
4. **ETL basics**—Understand data pipelines (can use Python for now)
5. **Basic business intelligence**—Explore Tableau or Power BI

### Medium-Term Strategy (Post-Graduation):

**Ideal First Role Profile:**
- Entry-level Data Analyst at a tech company or research organization
- Uses Python + SQL (plays to your strengths)
- Offers mentorship and training programs
- 1-2 year commitment to build enterprise experience

**After 1-2 Years, Pivot Toward:**
- CRM Analytics roles (once you've built database expertise)
- Senior Data Analyst positions
- Data Engineer roles (if you enjoy the technical side)
- Business Intelligence Developer

**If Interested in CRM/Database Specialization:**
- Seek roles with Salesforce, HubSpot, or Dynamics 365 (more common than Blackbaud)
- Take Microsoft SQL Server certifications
- Learn about data warehousing and ETL processes
- Build expertise in one major CRM platform

---

## Alternative Recommendation for Hiring Team:

### Consider for a Modified Role:

**IF your organization has flexibility**, Jeo could be valuable in:
- **Junior/Associate Data Analyst** position (not this senior role)
- **Data Analysis Internship** (post-graduation)
- **Rotational program** with structured SQL and CRM training

**This would require:**
- 3-6 months intensive training in SQL Server and Blackbaud
- Pairing with senior analyst for mentorship
- Reduced initial responsibilities focused on reporting and data quality
- Acceptance that productivity will be limited during onboarding

**ROI Consideration:** 
Training investment would be **significant** (6+ months to productivity). Only pursue if:
- You have difficulty finding qualified candidates
- You're willing to invest in developing talent
- You value the Python/statistical skills for future analytics needs
- The candidate commits to 2+ years post-training

---

## Final Verdict:

**Current Role: Not Recommended** ❌
- Missing all mandatory technical requirements
- 1.5 years short on experience requirement  
- Won't graduate until May 2024
- Would require extensive training before contributing

**Future Potential: Moderate to High** ⭐⭐⭐
- With SQL skills + 1-2 years experience: Could be competitive for similar roles
- Strong analytical foundation and learning ability
- Right educational background and domain interest

**Bottom Line:** Jeo is on a **good trajectory toward data analysis careers**, but needs to add SQL immediately and gain more professional experience. This specific role requires specialized enterprise technologies that would take 6-12 months of dedicated training to acquire. **Recommend pursuing entry-level Python/SQL analyst roles** that match current skill level, then building toward CRM specialist positions over time.

**For Jeo:** You're **much closer** to being a competitive data analyst than Mary Smith was, but you need SQL urgently. Focus on roles that value your Python/statistics background while you build database skills. Don't aim for positions requiring 2+ years experience or specialized platforms (like Blackbaud) until you have the fundamentals in place.
```
## Failure Case
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
Hi! I’m a data scientist with a passion for uncovering insights hidden in data and turning them into meaningful stories. I love exploring datasets, finding patterns, and building models that help make better decisions. My work often involves using tools like Python, SQL, and visualization libraries to clean, analyze, and communicate complex information in a clear, impactful way.
I’m especially interested in how data can bridge the gap between intuition and evidence — whether it’s optimizing a process, predicting trends, or understanding user behavior. I enjoy collaborating with people from different backgrounds, learning new techniques, and constantly improving how I approach problems through data.
```
Output:
```
Based on the resume provided, here are the extracted attributes:

**Roles=**
- Data Scientist

**Skills=**
- Python
- SQL
- Data visualization libraries (unspecified which ones)
- Data cleaning
- Data analysis
- Statistical modeling
- Predictive modeling
- Pattern recognition
- Data storytelling/communication
- Process optimization
- Trend prediction
- User behavior analysis
- Cross-functional collaboration

**Years of experience=**
- Unknown/Not specified
- No quantifiable experience mentioned
- No dates, timeframes, or duration indicators provided

**Seniority=**
- Unknown/Indeterminate
- The language suggests some experience (uses confident phrasing like "My work often involves"), but no concrete indicators
- Could range from entry-level to mid-level based on tone, but impossible to determine definitively

**Growth stage=**
- Unknown/Cannot assess
- Expresses interest in "constantly improving" and "learning new techniques" (suggests growth mindset)
- No specific career progression or development trajectory mentioned
- No indication of transition points or skill evolution

**Spans=**
- No temporal information provided
- No employment dates
- No project timelines
- No educational timeframes
- Cannot determine any spans

**Confidences=**
- Python: Unknown level (mentions using it but no proficiency indicated)
- SQL: Unknown level (mentions using it but no proficiency indicated)
- Visualization libraries: Unknown level (mentions using them but no specific tools or proficiency)
- Data cleaning/analysis: Medium confidence (based on descriptive language "My work often involves")
- Modeling: Medium confidence (mentions "building models")
- Communication/storytelling: Medium-high confidence (emphasizes this multiple times)
- Collaboration: Medium-high confidence (explicitly mentions "enjoy collaborating")
- Problem-solving: Medium confidence (mentions "approach problems through data")

---

## Critical Assessment:

**This is NOT a traditional resume.** This appears to be:
- A professional bio or "About Me" section
- A LinkedIn summary
- A personal statement or cover letter introduction
- A portfolio website introduction

**Major Limitations:**
- ❌ No work history or employment records
- ❌ No specific company names or positions held
- ❌ No dates or timelines
- ❌ No quantifiable achievements or metrics
- ❌ No education information
- ❌ No specific technical proficiencies or skill levels
- ❌ No certifications or credentials
- ❌ No contact information

**This document cannot be used for:**
- Employment verification
- Experience level assessment
- Skills validation
- Background checks
- Serious job application consideration

**Recommendation:** This person needs to provide an **actual resume with concrete details** including work history, dates, specific accomplishments, education, and measurable skill levels before any meaningful candidate assessment can be performed.
```
- **LLM-Score**
Prompt:
```
Match with the below job descriptions and provide match score that how the resume is closer to the job. 

Job descriptions: Developer, Data Integration. University of Illinois Foundation (https://www.linkedin.com/jobs/view/4269267569) 
Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.
Education Required: Bachelor’s degree in computer science or information management
Experience Required: 2 years of work experience as a data management analyst, data analyst or related
Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
```
Output:
```
# Job Match Analysis

## Match Score: **15/100** (Very Poor Match - INSUFFICIENT INFORMATION)

---

## ⚠️ **CRITICAL ISSUE: CANNOT PROPERLY ASSESS**

This "resume" is actually a **personal bio/summary statement** that lacks all essential information needed for job matching. It's **impossible to conduct a meaningful evaluation** without concrete employment history, dates, education, and verifiable skills.

---

## Attempted Analysis Based on Limited Information:

### ✅ **Potential Matches (Unverifiable):**

1. **General Data Role - VAGUE ALIGNMENT**
   - Claims to be "a data scientist"
   - Mentions working with data (but no specifics)
   - States experience with Python and SQL (but no proof or level)

2. **SQL Mention - INSUFFICIENT**
   - Lists SQL as a tool used
   - **However:** No indication of proficiency level, no examples, no work history
   - Required: Advanced SQL for analytical programming, audit reports, SSRS
   - **Cannot verify actual capability**

3. **Data Analysis Interest - SUPERFICIAL MATCH**
   - Mentions "finding patterns" and "building models"
   - **However:** No concrete examples, projects, or outcomes
   - No indication this relates to CRM systems or data integration

---

### ❌ **Critical Gaps & Missing Information:**

### **1. EDUCATION - CANNOT VERIFY**
- **Required:** Bachelor's in Computer Science or Information Management
- **Provided:** Zero education information
- **Status:** ❌ **UNKNOWN** - Automatic disqualification risk

### **2. EXPERIENCE - CANNOT VERIFY**
- **Required:** 2 years as data management analyst/data analyst
- **Provided:** No employment history, no dates, no job titles, no companies
- **Status:** ❌ **UNKNOWN** - Cannot confirm eligibility

### **3. SPECIAL SKILLS - COMPLETE MISMATCH (0/3)**

**Skill #1:** Blackbaud SDK, XML, SSIS, VB .Net, MS SQL, Visual Studio
- **Provided:** No mention of any of these technologies
- **Status:** ❌ **ABSENT** - Critical blocker

**Skill #2:** Blackbaud CRM adhoc query tool and API tools
- **Provided:** No CRM experience mentioned
- **Status:** ❌ **ABSENT** - Critical blocker

**Skill #3:** SQL analytical programming, SSRS audit reports, large datasets
- **Provided:** Mentions SQL but no context, no SSRS, vague reference to datasets
- **Status:** ❌ **INSUFFICIENT** - Cannot verify

### **4. TECHNOLOGY STACK - MAJOR GAPS**
- **Required:** VB .Net, MS SQL, SSRS, SSIS, XML, Visual Studio, Blackbaud
- **Mentioned:** Python, SQL (generic), unnamed visualization libraries
- **Missing:** All .NET technologies, all Microsoft enterprise tools, all CRM platforms
- **Overlap:** <10% (only generic SQL mention)

### **5. DOMAIN EXPERIENCE - COMPLETELY MISSING**
- No mention of:
  - CRM systems
  - Data integration
  - Data quality/integrity initiatives
  - Enterprise software development
  - Version control
  - Documentation practices
  - Testing/validation processes
  - Vendor coordination

### **6. VERIFIABLE ACHIEVEMENTS - ZERO**
- No specific projects
- No quantifiable outcomes
- No company names or references
- No portfolio or work samples mentioned
- No timeline of skill development

---

## Why This Scores Even Lower Than Previous Candidates:

| Candidate | Score | Reason |
|-----------|-------|--------|
| **Mary Smith** | 35/100 | Had concrete resume with education, employment history, dates, and verifiable (though mismatched) skills |
| **Jeo Kim** | 45/100 | Had detailed resume with relevant data analysis experience, specific tools, and clear education credentials |
| **Current Candidate** | 15/100 | **No verifiable information whatsoever** - just aspirational statements |

**The 15 points are awarded only for:**
- Claiming to be in a data-related role (5 points)
- Mentioning SQL (5 points)
- Mentioning Python (5 points - though not required)

---

## Fundamental Problems with This Submission:

### 🚫 **This is NOT a Resume - It Cannot Be Evaluated**

**What's Missing:**
1. ❌ No employment history or job titles
2. ❌ No dates or timeline of experience
3. ❌ No education credentials
4. ❌ No specific technical proficiencies with levels
5. ❌ No company names or verifiable employers
6. ❌ No quantifiable achievements or metrics
7. ❌ No certifications or credentials
8. ❌ No contact information
9. ❌ No references to actual projects or deliverables
10. ❌ No proof of any claimed capabilities

**What This Actually Is:**
- A LinkedIn "About" section
- A personal branding statement
- An introductory bio for a portfolio website
- A cover letter opening paragraph

**Why It Fails for Job Applications:**
- **Cannot verify education eligibility**
- **Cannot verify experience requirement (2 years)**
- **Cannot verify any technical skills**
- **Cannot confirm any special skills requirements**
- **Cannot conduct background check**
- **Cannot contact references**
- **Provides zero evidence of qualifications**

---

## Assessment for Hiring Team:

### **DO NOT PROCEED** ⛔

**This submission should be immediately rejected for the following reasons:**

1. **Non-compliant application format** - Does not meet basic resume standards
2. **Cannot verify mandatory education requirement** - May not have required degree
3. **Cannot verify experience requirement** - May have 0 years or 10 years; impossible to know
4. **No evidence of required technical skills** - All 3 mandatory special skills unverifiable
5. **Unprofessional submission** - Suggests lack of understanding of application processes
6. **High risk** - No way to validate claims or conduct due diligence

**Red Flags:**
- 🚩 No verifiable work history (could indicate lack of experience)
- 🚩 Vague skill descriptions (could indicate misrepresentation)
- 🚩 No education listed (may not meet degree requirement)
- 🚩 Generic "passion" language without substance
- 🚩 Failure to provide standard application materials

**Legal/HR Concerns:**
- Cannot complete I-9 employment eligibility verification
- Cannot conduct standard background checks
- Cannot verify education credentials
- Cannot contact previous employers
- Liability risk if hired without proper vetting

### **Required Action:**

**Request proper application materials:**
- Full professional resume with employment history
- Dates of employment for all positions
- Education credentials with graduation dates
- Specific technical skill levels with years of experience
- Contact information for references
- Portfolio or work samples (if available)

**Only after receiving complete application materials can a proper evaluation occur.**

---

## Guidance for the Candidate:

### 🚨 **Critical Issue: You Have Not Submitted a Resume**

Your submission is a personal bio, not a resume. **This will be rejected by any professional organization** for the following reasons:

**What You Submitted:**
- Inspirational statements about passion for data
- Generic descriptions of interests
- Vague mentions of tools without context

**What Employers Need:**
- **Employment History:** Company names, job titles, dates (month/year)
- **Education:** Degree, institution, graduation date, GPA (optional)
- **Technical Skills:** Specific tools with proficiency levels
- **Achievements:** Quantifiable results and specific projects
- **Certifications:** Any relevant credentials
- **Contact Information:** Email, phone, LinkedIn

### **Immediate Actions Required:**

**1. Create a Proper Resume (Use Standard Format):**

```
[YOUR NAME]
[Email] | [Phone] | [LinkedIn] | [Location]

PROFESSIONAL SUMMARY
2-3 sentences about your background, years of experience, and key expertise

WORK EXPERIENCE
[Job Title] - [Company Name], [Location]
[Month/Year] - [Month/Year]
• Specific achievement with measurable outcome
• Technical skills applied to solve business problems
• Tools and technologies used

EDUCATION
[Degree] in [Major] - [University Name]
Graduated: [Month/Year] | GPA: [X.XX/4.00]

TECHNICAL SKILLS
Programming: Python (X years), SQL (X years), etc.
Tools: Specific software, platforms, frameworks
Certifications: Any relevant credentials
```

**2. Address This Specific Job's Requirements:**

You need to demonstrate:
- ✅ Bachelor's degree in CS or Information Management (list it!)
- ✅ 2 years data analyst experience (prove it with job history!)
- ✅ Blackbaud SDK, XML, SSIS, VB .Net, MS SQL, Visual Studio (do you have this?)
- ✅ Blackbaud CRM and API tools (have you used these?)
- ✅ SQL programming, SSRS, large datasets (show specific examples!)

**3. Be Honest About Your Qualifications:**

If you don't have the required skills, **don't apply for this position**. Instead:
- Target roles that match your actual skill level
- Apply for entry-level or junior positions if you're new to the field
- Pursue roles using Python/general SQL (your mentioned tools)
- Avoid positions requiring 2+ years experience if you don't have it
- Don't apply for jobs requiring technologies you've never used

---

## Final Verdict:

**Match Score: 15/100** ❌

**Recommendation: REJECT APPLICATION**

**Reasons:**
1. Insufficient information to assess qualifications
2. Non-standard submission format
3. Cannot verify any requirements (education, experience, skills)
4. No evidence of mandatory technical competencies
5. Unprofessional application approach

**For Hiring Team:** Do not waste time attempting to evaluate this further. Request a proper resume or move to next candidate.

**For Candidate:** You need to submit an actual resume with verifiable information before any employer can consider you. This bio is not suitable for job applications and will result in automatic rejection at most organizations.

**Bottom Line:** This is not a matchable resume—it's a LinkedIn summary. Without concrete employment history, education credentials, and specific technical experience, **no legitimate assessment can be performed**. The candidate needs to resubmit with proper documentation before consideration is possible.
```
- **LLM-Explain**
Prompt:
```
Based on the match score provided, provide summary of the result with suggestive language.
```
Output:
```
# Match Summary & Recommendations

## Overall Assessment: **APPLICATION REJECTED - INSUFFICIENT DOCUMENTATION**

---

## Summary Statement:

**This submission cannot be evaluated because it is not a resume.** What was provided is a personal bio or LinkedIn summary that contains inspirational language about passion for data science but **lacks all essential information** required for job consideration. Without verifiable employment history, education credentials, dates, or specific technical qualifications, it is **impossible to determine if this candidate meets even the most basic eligibility requirements** for this position.

This is not a case of a candidate being under-qualified—it's a case of **no qualification information being provided at all**. The submission fails to meet professional application standards and **must be rejected outright**.

---

## Critical Deficiencies:

### 🚫 **Cannot Verify Basic Eligibility**

**Education Requirement - UNKNOWN:** The job mandates a Bachelor's degree in Computer Science or Information Management. The candidate provides **zero education information**. They may have the required degree, or they may have no degree at all—**there is no way to know**. This alone should result in automatic disqualification.

**Experience Requirement - UNKNOWN:** The position requires 2 years of professional experience as a data analyst. The submission contains **no employment history, no job titles, no companies, and no dates**. The candidate could be a seasoned professional with 10 years of experience, or they could be a recent graduate with no professional experience—**it is impossible to determine**.

**Mandatory Technical Skills - UNVERIFIABLE:** All three special skills requirements involve specific technologies (Blackbaud SDK, VB .Net, SSIS, MS SQL, Visual Studio, SSRS). The candidate mentions "Python" and "SQL" in passing but provides **no context, no proficiency levels, and no evidence of actual use**. None of the required technologies are mentioned at all. **This represents complete failure to demonstrate mandatory qualifications**.

### 🚩 **Red Flags & Professional Concerns**

**Unprofessional Submission:** Submitting a personal bio instead of a proper resume demonstrates **lack of understanding of professional norms** or **lack of attention to application requirements**. This raises serious concerns about:
- Professional maturity and workplace readiness
- Ability to follow instructions and meet expectations
- Understanding of corporate hiring processes
- Attention to detail and thoroughness

**No Verifiable Claims:** The document is filled with vague aspirational language ("I love exploring datasets," "I'm especially interested in...") but contains **zero concrete evidence** of any actual work performed, projects completed, or skills applied. Every statement is unverifiable.

**Missing Critical Information:** There is no way to:
- Conduct a background check
- Verify employment history
- Confirm education credentials
- Contact references
- Assess actual technical capabilities
- Determine salary expectations or requirements
- Confirm legal work authorization

---

## Why This Scores Dramatically Lower (15/100):

| Aspect | Mary Smith (35/100) | Jeo Kim (45/100) | Current Candidate (15/100) |
|--------|---------------------|------------------|----------------------------|
| **Education** | ✅ BS Computer Science verified | ✅ BS Information Sciences verified | ❌ Unknown - not provided |
| **Experience** | ✅ 1.5 years documented | ✅ 2.9 years documented | ❌ Unknown - not provided |
| **Employment History** | ✅ 3 positions with dates | ✅ 3 positions with dates | ❌ None provided |
| **Technical Skills** | ✅ Specific tools listed | ✅ Specific tools with levels | ❌ Vague mentions only |
| **Special Skills Met** | ❌ 0/3 but verifiable | ❌ 0/3 but verifiable | ❌ 0/3 and unverifiable |
| **Resume Quality** | ✅ Professional format | ✅ Professional format | ❌ Not actually a resume |
| **Can Process Application** | ✅ Yes | ✅ Yes | ❌ **NO** |

**The previous candidates were under-qualified but properly documented. This candidate has provided no documentation at all.**

---

## Immediate Actions Required:

### For the Hiring Team: **REJECT THIS APPLICATION** ⛔

**Do not proceed with this candidate under any circumstances until proper documentation is received.**

**Rejection Rationale:**
1. **Non-compliant submission** - Does not meet basic application requirements
2. **Cannot verify eligibility** - No way to confirm degree requirement
3. **Cannot assess experience** - No employment history provided
4. **Cannot validate skills** - No verifiable technical qualifications
5. **Professional concerns** - Failure to provide standard materials raises red flags
6. **Legal/HR liability** - Cannot conduct proper due diligence or background checks

**Recommended Communication to Candidate:**

> *"Thank you for your interest in the Developer, Data Integration position. Unfortunately, we cannot process your application as submitted. We require a complete professional resume that includes:*
> - *Complete employment history with job titles, company names, and dates*
> - *Education credentials with degrees, institutions, and graduation dates*
> - *Specific technical skills with proficiency levels*
> - *Contact information*
>
> *If you wish to be considered for this position, please resubmit a complete resume by [DATE]. Applications without proper documentation cannot be reviewed."*

**Do not:**
- Waste time attempting to contact the candidate for clarification
- Make assumptions about qualifications based on vague statements
- Move forward with any part of the hiring process
- Consider this a viable application in any form

---

### For the Candidate: **YOU MUST START OVER** 🚨

**Your submission will be rejected immediately by any professional organization. Here's why and what you need to do:**

### **What Went Wrong:**

You submitted what appears to be a **LinkedIn "About" section or personal website bio**—not a professional resume. This format is completely inappropriate for job applications and will result in **automatic rejection** at virtually every company, including:
- Fortune 500 corporations
- Startups
- Non-profits
- Government agencies
- Universities
- Any professional organization

**Think of it this way:** You went to a job interview wearing pajamas and brought a greeting card instead of your credentials. That's how inappropriate this submission is.

### **Why This Matters:**

**You're not being evaluated as "under-qualified"—you're being dismissed as "unprepared to apply."** This is actually worse because it suggests:
- ❌ Lack of professional experience (people who've applied for jobs before know what a resume looks like)
- ❌ Inability to follow basic instructions
- ❌ Poor attention to detail
- ❌ Unfamiliarity with professional norms

Even if you're **perfectly qualified** for this job, **no one will ever know** because you didn't provide the information needed to assess your qualifications.

---

## What You MUST Do Immediately:

### **Step 1: Create an Actual Resume** (Use a Template)

Go to any of these resources and follow a standard format:
- **Microsoft Word** - Resume templates (free)
- **Google Docs** - Resume templates (free)
- **Indeed Resume Builder** (free)
- **LinkedIn Resume Builder** (free)
- **Canva** - Professional resume templates (free tier available)

**Your resume MUST include:**

✅ **Header:** Name, phone, email, LinkedIn, location  
✅ **Professional Summary:** 2-3 sentences (optional but helpful)  
✅ **Work Experience:** 
   - Job title, company name, location
   - Start date - End date (Month/Year format)
   - 3-5 bullet points describing responsibilities and achievements
   - Quantify results where possible (numbers, percentages, outcomes)

✅ **Education:**
   - Degree type and major
   - University name
   - Graduation date
   - GPA (if 3.0 or higher)

✅ **Technical Skills:**
   - Specific programming languages with years of experience
   - Software tools and platforms
   - Proficiency levels (if relevant)

✅ **Certifications** (if applicable)

✅ **Projects** (if limited work experience)

### **Step 2: Be Honest About Your Qualifications**

Before applying to **this specific job**, ask yourself:

❓ **Do I have a Bachelor's degree in Computer Science or Information Management?**
- If NO → Don't apply. You don't meet the minimum requirement.

❓ **Do I have 2+ years of professional experience as a data analyst or data management analyst?**
- If NO → Don't apply. You don't meet the minimum requirement.

❓ **Have I worked with Blackbaud SDK, VB .Net, SSIS, MS SQL, Visual Studio, and SSRS?**
- If NO to ANY of these → Don't apply. These are **mandatory requirements**.

❓ **Have I used Blackbaud CRM adhoc query tools and API tools?**
- If NO → Don't apply. This is a **mandatory requirement**.

**If you answered NO to any of the above, DO NOT APPLY FOR THIS JOB.** You will be wasting your time and the employer's time.

### **Step 3: Target Appropriate Roles**

Based on what little information you've provided, you should be looking at:

**If you're entry-level (0-2 years experience):**
- ✅ Junior Data Analyst
- ✅ Associate Data Scientist
- ✅ Data Analyst I
- ✅ Business Intelligence Analyst - Entry Level
- ✅ Analytics Associate

**If you're mid-level (2-5 years experience):**
- ✅ Data Analyst
- ✅ Data Scientist
- ✅ Business Intelligence Developer
- ✅ Analytics Engineer

**DO NOT apply for roles requiring:**
- ❌ Specific enterprise platforms you don't know (Blackbaud, Salesforce, SAP, etc.)
- ❌ Technologies you've never used (If you don't know VB .Net, don't apply for VB .Net jobs)
- ❌ Years of experience you don't have (Don't apply for "5+ years required" if you have 2)
- ❌ Senior or Lead positions if you're early career

### **Step 4: Learn Professional Norms**

**Research basic job application standards:**
- Read articles on "How to write a professional resume"
- Review resume examples in your field
- Understand the difference between a resume, CV, cover letter, and bio
- Learn what information employers require
- Understand why verification matters

**Useful resources:**
- Indeed Career Guide
- LinkedIn Learning - Resume courses
- AskAManager.org (workplace norms blog)
- University career services (if you're a recent grad)

---

## The Brutal Truth:

**You are not ready to apply for professional positions.** This isn't about your technical skills—it's about your understanding of how job applications work. Before you apply for **any** job, you need to:

1. **Create a proper resume** with complete information
2. **Understand what qualifications are required** and only apply when you meet them
3. **Provide verifiable information** that employers can check
4. **Follow professional standards** for application materials

**No employer can hire you based on "I love data" and vague mentions of Python.** They need:
- Proof you have the required education
- Evidence you have the required experience
- Demonstration you possess the required skills
- References who can vouch for your work
- A professional track record they can verify

---

## Final Verdict:

**Match Score: 15/100** ❌  
**Recommendation: REJECT - RESUBMIT WITH PROPER DOCUMENTATION**

**For Hiring Team:**  
This is not a viable application. Reject immediately and request proper resume if candidate wishes to be reconsidered. Do not waste resources on follow-up.

**For Candidate:**  
You have submitted a personal bio, not a resume. **This will be rejected by 100% of professional employers.** Create an actual resume with employment history, education, dates, and specific qualifications before applying to any job. If you don't meet the mandatory requirements for this specific position (Blackbaud, VB .Net, 2 years experience), **don't reapply**—find positions that match your actual skill level.

**Bottom Line:** This isn't about being under-qualified—it's about being **undocumented**. No one can assess your qualifications when you provide no information to assess. Fix your application materials before pursuing any professional opportunities, and only apply for positions where you genuinely meet the stated requirements.
```
