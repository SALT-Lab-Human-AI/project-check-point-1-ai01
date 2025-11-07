# List of Prompts used in HireShark
This document lists every LLM prompt that ships with the HireShark app. Keep it in sync whenever a prompt string changes in code.

---

## Resume Parsing (hire-shark/src/lib/gemini_parser.ts)
```
Extract the following information from the resume and return it as a JSON object.
The JSON object should have the following structure:
{
  "name": "",
  "email": "",
  "phone": "",
  "location": "",
  "summary": "",
  "skills": [],
  "education": [
    {
      "degree": "",
      "field": "",
      "institution": "",
      "location": "",
      "start": "",
      "end": "",
      "gpa": "",
      "honors": []
    }
  ],
  "experiences": [
    {
      "company": "",
      "title": "",
      "start": "",
      "end": "",
      "bullets": []
    }
  ],
  "confidence": {
    "personalInfo": 0.0,
    "experience": 0.0,
    "skills": 0.0,
    "education": 0.0
  }
}

Important: Extract all education entries including degrees, certifications, and educational qualifications. 
Include the degree type (e.g., Bachelor's, Master's, PhD), field of study, institution name, location, dates, GPA (if available), and any honors or distinctions.
If you cannot find any information for a field, leave it as an empty string or an empty array.
If the uploaded file is not a resume, try your best and you should still return a JSON object.
When nothing is found for a section, The confidence for that section should be low.
```

---

## Job Role Suggestions (hire-shark/src/store/ResumeContext.tsx)
```
Based on the following resume, generate a list of 5-10 potential job roles that would be a good fit for this person. Return the list as a JSON array of strings. Job title should be concise and simple.

Resume:
${JSON.stringify(editedResume.parsed, null, 2)}
```
