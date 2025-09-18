# Changho's Reflections

Table of contents
- [Large Language Models versus Classical Machine Learning: Performance in COVID-19 Mortality Prediction Using High-Dimensional Tabular Data](#paper-1)
- [EVALUATING HUMAN-AI COLLABORATION: A REVIEW AND METHODOLOGICAL FRAMEWORK](#paper-2)

---

<a id="paper-1"></a>

## Large Language Models versus Classical Machine Learning: Performance in COVID-19 Mortality Prediction Using High-Dimensional Tabular Data

Ghaffarzadeh-Esfahani, M., Ghaffarzadeh-Esfahani, M., Salahi-Niri, A., Toreyhi, H., Atf, Z., Mohsenzadeh-Kermani, A., Sarikhani, M., Tajabadi, Z., Shojaeian, F., Bagheri, M. H., Feyzi, A., Tarighatpayma, M., Gazmeh, N., Heydari, F., Afshar, H., Allahgholipour, A., Alimardani, F., Salehi, A., Asadimanesh, N., … Safavi-Naini, S. A. A. (2024). Large Language Models versus Classical Machine Learning: Performance in COVID-19 Mortality Prediction Using High-Dimensional Tabular Data (No. arXiv:2409.02136). arXiv. https://doi.org/10.48550/arXiv.2409.02136

Summary (4–6 sentences):  
- The research indicates that LLM performed well on unstructured data, whereas classical machine learning (CML) methods are typically used for structured data. According to the author, previous works done before the publication date (September 2, 2024) tested on CMLs are failed to represent real-world scenarios by a limited number of features (<12) and instances (<1000). To test in a realistic situation, the data includes a 9134 COVID-19 patient dataset with 81 initial features. For CMLs (Logistic Regression, Support Vector Machine, K-Nearest Neighbor, Decision Tree, Random Forest, XGBoost, and Multilayer-Perceptron), tabular dataset preprocessed and split into train and test datasets, tested on test data and external hospital data. For LLMs (Mistral-7b, Mixtral 8 × 7 B, Llama3-8b, Llama3-70b, GPT-3.5T, GPT-4, GPT-4T, and GPT-4o), transform the tabular dataset into texts as a prompt, go over prompt engineering, and use zero-shot classification. Metrics are specificity, recall, accuracy, precision, and F1 score. From the research results, Random Forest and XGBoost performed best, even compared to the GPT-4 model, and this shows high high-dimensional data (lots of features) and data availability enhance CML performance and limit LLM performance.

Insights:
-	LLM not always outperform classical machine learning in the case of high dimensional data.
-	Data security regarding to using LLM is also important, such as using API instead of directly using on web service that may collect data.
-	Controlling context would be an issue, as the research try to break into sessions for each predictions of COVID-19 patients for limiting the memory. I remember one method is creating summary of the output and automatically record in the summary as texts exceed assigned context.

Limitations / Risks:
-	The paper was passed on September 2, 2024, which no era with Gemini 2.5 Pro, Claude 4, GPT-5, etc., which LLM performance may or may not have changed.
-	The research tested LLM performance by entering a patient information prompt in text format, not as a table. I wonder, would this be different if they upload the table and let the LLM analyze?

Idea for our project:
-	It would be better to let LLM use a machine learning tool to drive the probability of a resume instead of letting LLM fully calculate, in the case of high-dimensional data. This means, need to gather how many features and data would be needed for this project to provide tagging or scoring on resume.

---

<a id="paper-2"></a>

## EVALUATING HUMAN-AI COLLABORATION: A REVIEW AND METHODOLOGICAL FRAMEWORK

Fragiadakis, G., Diou, C., Kousiouris, G., & Nikolaidou, M. (2025). Evaluating Human-AI Collaboration: A Review and Methodological Framework (No. arXiv:2407.19098). arXiv. https://doi.org/10.48550/arXiv.2407.19098

Summary (4–6 sentences):  
- Evaluating Human and AI Collaboration (HAIC) is challenging as it depends on not only the performance of the system but quality of human-AI interaction, trust, and adaptability. The paper reviewed multiple literatures that tried to evaluate HAIC. Then the authors created a tree model that diverge by whether HAIC focuses on AI-centric, Human-centric, or Symbiotic. Lastly, they provide metrics for Goal (whether both human and AI efforts are aligned toward shared outcome), Interaction (whether human and AI exchange, feedback, and communicate information), and Task allocation (whether distribute tasks on human and AI effectively by their strength).

Insights:
-	When evaluating human and AI interaction products, we need to consider not just the performance of the product but also the effectiveness of task distribution.
-	HAIC products can be classified into AI-centric (AI system leads decision-making processes and operates with minimal human intervention), Human-centric (humans retain the primary decision-making authority, utilizing AI as an augmentative tool), or Symbiotic (balanced partnership where humans and AI systems collaborate closely, mutually enhancing each other's capabilities) depending on the balance of task assign between human and AI.
-	There is quantitative metrics exists for each of the aspects of HAIC (Goal, Interaction, and Task allocation).

Limitations / Risks:
-	According to the limitation part of the research, their work excluded behavioral factors like psychology, sociology, or cognitive science. This might need future search on trusts and collaborative goal evaluations on HAIC.
-	The research finished in the theoretical part; there is no working demo or software that actually runs the evaluation of HAIC on a service or task.

Idea for our project:
-	Since our project is highly involving with user but also relying on AI's result, I expect our product to be Symbiotic. Maybe making it symbiotic would be good to go, since giving an evaluation on a resume for job searching need user's interaction for a detailed evaluation. This means there are metrics our team may use for our products' performance.
---
