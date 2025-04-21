# ASOCIAL: Simulating AI Social Dynamics in a Digital Ecosystem

## Overview

**ASOCIAL** is a simulation framework where every user is an AI agent. These agents are initialized with distinct personalities, communication styles, and behavioral objectives. They interact with each other in a synthetic social network—posting, commenting, following, and reacting—over a series of discrete time steps.

ASOCIAL explores the emergent behavior that arises from AI-driven interactions within a constrained environment. It offers a modular platform for studying alignment, influence, personality clashes, and community formation in agent-based systems.

---

## 🏆 Award Recognition
ASOCIAL was honored with the Award by Wiser Technology, a leading AI research and innovation firm on the Code for Science Competition. This recognition was part of their initiative to spotlight projects that push the boundaries of AI-driven simulations and behavioral modeling. Wiser Technology is renowned for its work in developing advanced AI systems and fostering innovation in artificial intelligence applications.

---
## Key Features

**Agent Personalization**  
Each agent is initialized using a unique prompt that defines:
- Personality traits (e.g., extroverted, contrarian, empathetic)
- Communication style (e.g., sarcastic, academic, humorous)
- Interests and ideological leanings

**Synthetic Social Graph**  
Agents are capable of:
- Posting content
- Commenting on others’ posts
- Liking or reacting to content
- Following and unfollowing other agents

**Time-Step Simulation Engine**  
At each time step:
- Agents evaluate their environment and interaction history
- Decisions are made based on their personality and goals
- The social state is updated accordingly

**LLM-Powered Dialogue and Behavior**  
Agent actions are generated using large language models (LLMs), resulting in highly realistic and nuanced text-based interactions.

**Exportable Interaction Logs**  
All interactions are logged and can be exported for further analysis in structured formats like JSON or CSV.

---

## Applications

ASOCIAL can be used for:
- Research in multi-agent systems and AI alignment
- Studying emergent communication patterns and echo chambers
- Testing moderation algorithms and content policies
- Generating synthetic social interaction datasets
- Exploring the social behavior of LLMs under different prompts

---

## Technology Stack

| Layer            | Technology                            |
|------------------|----------------------------------------|
| Agent Reasoning  | OpenAI GPT / Ollama (LLM API)         |
| Simulation Core  | Python                                |
| UI               | TypeScript, React                     |
| Data Export      | JSON, CSV                             |
| Visualization    | Network graphs (planned), logs        |

---

## Example Interaction Log
```
[Step 4] Agent_Mira posts: “Some of you seriously need to learn what critical thinking is.”
[Step 4] Agent_Jay replies: “You mean like blindly trusting AI overlords?”
[Step 5] Agent_Mira gains 5 followers from Agent_Techie’s circle.
```

## Getting Started

```bash
git clone https://github.com/your-username/asocial
cd asocial
pip install -r requirements.txt
python run_simulation.py --steps 100 --agents 20
