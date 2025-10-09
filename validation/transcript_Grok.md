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
Match with the below job descriptions and provide a match score indicating how the resume is closer to the job.

Duties: Work with different customer relationship management systems to design and implement data solutions and support the ongoing management of data quality and data integrity for the Foundation. Work with supervisor to create and enhance Blackbaud CRM functionality or data solutions to allow mass updates through batches and audits for data integrity initiatives. Coordinate with business analysts, application developers, and external vendors to gather data management requirements and construct solutions for customer needs. Develop and maintain documentation of technical specifications, functional specifications and business processes that define how requirements will be technically established. Work with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes. Validate new and existing data integration processes by developing and implementing test plans, test scripts and scenarios for data design, tool design, data extracts, annual software service packs and quarterly release of software changes. Use Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors. Perform analytical programming using SQL, writing audit reports using SSRS, and working with large data sets. Apply principles and techniques of computer science and related areas to develop complex data analysis code using SQL and .Net programming languages to create data solutions or data fixes through scripts, global changes or storage procedures.

Education Required: Bachelor’s degree in computer science or information management

Experience Required: 2 years of work experience as a data management analyst, data analyst or related

Special Skills Required: Must have work experience in each of the following: 1) Working with Blackbaud SDK, using XML specifications, SSIS packaging solutions, version control tools, VB .Net programming language, MS SQL, MS Visual Studio and other PC based applications to build and document data integration processes; 2) Using Blackbuad CRM adhoc query tool and API tools to create automated export processes for data syncs with external data vendors; and 3) Performing analytical programming using SQL, writing audit reports using SSRS, and working with large data sets.
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
