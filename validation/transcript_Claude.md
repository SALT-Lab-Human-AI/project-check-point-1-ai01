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
