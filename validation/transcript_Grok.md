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


