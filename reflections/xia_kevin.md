# Kevin's Reflection

Table of contents
- [NLP-Based Bi-Directional Recommendation System: Towards
 Recommending Jobs to Job Seekers and Resumes to Recruiters](#paper-1)
- [Encouraging Divergent Thinking in Large Language Models through Multi-Agent Debate](#paper-2)

---

<a id="paper-1"></a>

##  NLP-Based Bi-Directional Recommendation System: Towards Recommending Jobs to Job Seekers and Resumes to Recruiters 

Alsaif, S.A., Hidri, M.S., Ferjani, I., Eleraky, H.A., & Hidri, A. (2022). NLP-Based Bi-Directional Recommendation System: Towards Recommending Jobs to Job Seekers and Resumes to Recruiters. Big Data Cogn. Comput., 6, 147.

### Summary:  
- This paper proposes a bidirectional recommendation system based on natural language processing, designed to match job seekers with relevant positions while recommending suitable candidates to employers. Unlike traditional keyword search or information retrieval methods, this system employs advanced text preprocessing, word vector technology, and similarity scoring mechanisms to significantly enhance the matching accuracy between resumes and job descriptions. Data was obtained through web scraping of Saudi Arabian job listings and annotated resumes. spaCy performed named entity recognition (NER) to extract skills, educational background, and geographic information. Evaluation results demonstrate high precision across most job categories, achieving an overall accuracy rate of 80%.

Insights:
-  Extensive Pre-Processing Pipeline: The study emphasized  the importance of cleaning raw job/resume data (removing HTML tags, special characters, stop words, lemmatization). This shows that a robust preprocessing pipeline is essential before entity extraction.

- NER and embeddings: Using NER (spaCy) and word embeddings (Word2Vec + cosine similarity) effectively captures structured entities like skills and education, enabling more accurate matching.

- Real-world applicability: The approach showed high performance even with overlapping skills between roles (e.g., Data Scientist vs. Data Engineer), demonstrating practical value for complex labor markets.

Limitations / Risks:
- Dataset limitations: The study relied on a relatively small set of resumes (138 for training, 25 for testing), which may not generalize well across industries or larger, more diverse labor markets.
- Contextual blind spots: The model does not yet consider factors like experience, career progression, or soft skills, which are often critical in recruitment decisions.

Idea for our project:
- Recruit AI could utilize the idea of NER to extract structured information from resumes and job descriptions, then using LLM to generate compatibility scores based on these entities, enhancing the accuracy of candidate position analysis.

---

<a id="paper-2"></a>

## Encouraging Divergent Thinking in Large Language Models through Multi-Agent Debate
Liang, T., He, Z., Jiao, W., Wang, X., Wang, Y., Wang, R., Yang, Y., Tu, Z., & Shi, S. (2023). Encouraging Divergent Thinking in Large Language Models through Multi-Agent Debate. ArXiv, abs/2305.19118.

Summary:  
- This paper explores the problem of Deterioration of Thought (DoT) in large language models (LLMs)—where self-reflective methods fail to generate new insights once the model becomes confident in an initial (potentially wrong) answer. To address this, the authors propose the Multi-Agent Debate (MAD) framework: multiple agents engage in debate under the supervision using a tit-for-tat approach. In experiments involving common-sense machine translation and counterintuitive arithmetic reasoning, MAD significantly outperformed self-reflection methods, demonstrating the idea that structured debate can stimulate divergent thinking in LLMs.

Insights:
- Debate-based interactions help mitigate cognitive rigidity and bias in LLM by incorporating external feedback from multiple participants.
- Moderate levels of disagreement and adaptive stopping are crucial for achieving optimal results, where too much forced disagreement reduces performance.
- The quality of debaters matters more than the quality of the judge; however, LLM judges show bias toward agents using the same model, raising fairness concerns.

Limitations / Risks:
- MAD increases computational cost, as multiple debate rounds require more tokens and time.
- Current LLMs struggle with long-context debates, often losing coherence when the number of agents or iterations increases.

Idea for our project:
- We could apply a multi-agent debate framework to job–resume matching. Different AI agents will be asked to argue for a candidate’s fit based on skills, experiences, and job requirements. A moderator AI would then be used to summarize the debate into a balanced recommendation. This can help recruiters identify strong candidate–job matches while reducing bias from single-model judgments.

## Acknowledgements
I acknowledge the use of generative AI as a supporting tool for article searching (Ai2 Asta) and key information extraction (ChatGPT-5). All results are reviewed and rephrased by myself to ensure accuracy and authenticity.