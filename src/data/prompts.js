/**
 * Prompt Library — 24 curated prompts across 4 categories.
 *
 * Schema:
 *  - id: stable kebab-case identifier
 *  - category: "Coding" | "Writing" | "Research" | "Productivity"
 *  - title: short imperative title shown on the card
 *  - description: one-sentence explanation
 *  - prompt: the full prompt text inserted into the composer
 *  - keywords: extra search terms (in addition to title + description)
 */

export const PROMPT_CATEGORIES = ["Coding", "Writing", "Research", "Productivity"];

export const PROMPTS = [
  // ─── Coding ──────────────────────────────────────────────────────────────
  {
    id: "code-review",
    category: "Coding",
    title: "Review this code",
    description: "Find bugs, performance issues, and naming smells in a code snippet.",
    prompt:
      "Review the following code for bugs, performance issues, accessibility problems, and naming/clarity smells. Give me a prioritized list of changes with brief explanations.\n\n```\n// paste code here\n```",
    keywords: ["review", "bugs", "refactor", "smells", "lint"],
  },
  {
    id: "explain-code",
    category: "Coding",
    title: "Explain this code",
    description: "Walk me through what this snippet does, step by step.",
    prompt:
      "Walk me through the following code step by step. Explain what it does, why it's structured that way, and any non-obvious behavior. Assume I'm an intermediate developer.\n\n```\n// paste code here\n```",
    keywords: ["explain", "walk-through", "how", "works"],
  },
  {
    id: "write-tests",
    category: "Coding",
    title: "Write unit tests",
    description: "Generate unit tests for a function or module.",
    prompt:
      "Write thorough unit tests for the following code. Cover the happy path, edge cases, and error conditions. Use the test framework I prefer (Jest, Vitest, Pytest, etc.) and explain your choices.\n\n```\n// paste code here\n```",
    keywords: ["tests", "unit", "jest", "pytest", "coverage"],
  },
  {
    id: "debug-error",
    category: "Coding",
    title: "Debug an error",
    description: "Help diagnose an error message and propose a fix.",
    prompt:
      "I'm getting the following error. Help me diagnose the root cause and propose a fix. Show me how to verify the fix works.\n\nError:\n```\n// paste error here\n```\n\nContext:\n// brief description of what I was doing",
    keywords: ["debug", "error", "fix", "traceback", "stack"],
  },
  {
    id: "refactor",
    category: "Coding",
    title: "Refactor for clarity",
    description: "Clean up structure without changing behavior.",
    prompt:
      "Refactor the following code for clarity, readability, and maintainability. Do not change observable behavior. Briefly explain each refactoring choice.\n\n```\n// paste code here\n```",
    keywords: ["refactor", "clean", "structure", "maintainability"],
  },
  {
    id: "sql-query",
    category: "Coding",
    title: "Write a SQL query",
    description: "Translate a description into an optimized SQL query.",
    prompt:
      "Write a SQL query that does the following. Prefer portable SQL; flag any dialect-specific syntax. Include a brief explanation of the query plan if it's non-trivial.\n\nDescribe the result you want:\n// e.g. \"Top 5 customers by total order value in 2025, with their order count\"",
    keywords: ["sql", "query", "database", "select"],
  },

  // ─── Writing ──────────────────────────────────────────────────────────────
  {
    id: "rewrite-clear",
    category: "Writing",
    title: "Make this clearer",
    description: "Rewrite text to be more concise and direct.",
    prompt:
      "Rewrite the following text to be clearer, more concise, and more direct. Preserve the original tone unless it's working against clarity.\n\n---\n// paste text here",
    keywords: ["rewrite", "clarify", "concise", "edit"],
  },
  {
    id: "tone-shift",
    category: "Writing",
    title: "Adjust the tone",
    description: "Shift text to a different audience or register.",
    prompt:
      "Rewrite the following text in a different tone (e.g. formal, friendly, persuasive, technical). Preserve the core message.\n\nTarget tone: // e.g. friendly and confident\n\n---\n// paste text here",
    keywords: ["tone", "voice", "audience", "style"],
  },
  {
    id: "summarize",
    category: "Writing",
    title: "Summarize this",
    description: "Produce a tight summary at a specified length.",
    prompt:
      "Summarize the following text in 3–5 bullet points. Then provide a single sentence summary at the top.\n\n---\n// paste text or article here",
    keywords: ["summary", "tldr", "key points", "gist"],
  },
  {
    id: "email-draft",
    category: "Writing",
    title: "Draft an email",
    description: "Compose a professional email from a short brief.",
    prompt:
      "Draft a professional email from the following brief. Choose the appropriate tone and length.\n\nTo: // recipient\nPurpose: // what the email should accomplish\nKey points:\n- // point 1\n- // point 2\nTone: // e.g. friendly, formal, apologetic",
    keywords: ["email", "draft", "professional", "message"],
  },
  {
    id: "headlines",
    category: "Writing",
    title: "Suggest headlines",
    description: "Generate 5 alternative headlines for a piece.",
    prompt:
      "Suggest 5 alternative headlines for the following piece. Mix styles (curiosity, value-led, news-led, contrarian). Keep them under 12 words each.\n\n---\n// paste article or summary",
    keywords: ["headlines", "titles", "copywriting"],
  },
  {
    id: "proofread",
    category: "Writing",
    title: "Proofread",
    description: "Catch grammar, punctuation, and clarity issues.",
    prompt:
      "Proofread the following text. List every grammar, punctuation, or clarity issue with the suggested fix. Preserve the author's voice.\n\n---\n// paste text here",
    keywords: ["proofread", "grammar", "spelling", "copy"],
  },

  // ─── Research ─────────────────────────────────────────────────────────────
  {
    id: "literature-review",
    category: "Research",
    title: "Literature review",
    description: "Outline key themes across sources on a topic.",
    prompt:
      "I'm researching [TOPIC]. Help me outline a literature review: identify the major themes, seminal works, and open questions. Suggest a structure.\n\nSources / notes:\n// paste your notes or paper titles",
    keywords: ["research", "literature", "review", "academic"],
  },
  {
    id: "compare-options",
    category: "Research",
    title: "Compare two options",
    description: "Build a side-by-side comparison table.",
    prompt:
      "Compare [OPTION A] and [OPTION B] across these dimensions: [DIMENSIONS]. Use a markdown table. End with a recommendation under stated constraints.\n\nConstraints:\n// e.g. small team, low budget, must ship in 2 weeks",
    keywords: ["compare", "versus", "tradeoffs", "options"],
  },
  {
    id: "pros-cons",
    category: "Research",
    title: "Pros and cons",
    description: "List the tradeoffs of a decision.",
    prompt:
      "List the pros and cons of [DECISION]. Be balanced — surface non-obvious cons and non-obvious pros. End with the conditions under which I'd choose it.",
    keywords: ["pros", "cons", "tradeoffs", "decision"],
  },
  {
    id: "summarize-paper",
    category: "Research",
    title: "Summarize a paper",
    description: "Pull out problem, method, results, and limitations.",
    prompt:
      "Summarize the following paper. Use this structure: (1) problem, (2) method, (3) key results with numbers, (4) limitations, (5) why it matters.\n\n---\n// paste abstract or full text",
    keywords: ["paper", "abstract", "summary", "academic"],
  },
  {
    id: "explain-concept",
    category: "Research",
    title: "Explain a concept",
    description: "Explain a complex topic at a chosen level.",
    prompt:
      "Explain [CONCEPT] at three levels: (1) like I'm 12, (2) like I'm a peer in an adjacent field, (3) like I'm a specialist. Use analogies for the first two.",
    keywords: ["explain", "concept", "teach", "eli5"],
  },
  {
    id: "interview-questions",
    category: "Research",
    title: "Interview questions",
    description: "Generate thoughtful questions for a topic or expert.",
    prompt:
      "Generate 10 thoughtful questions to ask [INTERVIEWEE] about [TOPIC]. Mix factual, opinion, and forward-looking. Include 2–3 that would surprise them.",
    keywords: ["questions", "interview", "research"],
  },

  // ─── Productivity ─────────────────────────────────────────────────────────
  {
    id: "plan-week",
    category: "Productivity",
    title: "Plan my week",
    description: "Turn goals into a Monday-through-Friday plan.",
    prompt:
      "Help me plan my week. Here are my goals and constraints:\n\nGoals:\n- // goal 1\n- // goal 2\n\nConstraints:\n// e.g. 3 deep-work hours/day, no meetings Mondays\n\nOutput: a Mon–Fri plan with daily focus blocks.",
    keywords: ["plan", "week", "schedule", "goals"],
  },
  {
    id: "prioritize",
    category: "Productivity",
    title: "Prioritize a list",
    description: "Sort a backlog by impact and effort.",
    prompt:
      "Help me prioritize the following list. Use impact × effort and flag anything that's actually a dependency of another item.\n\nList:\n- // item 1\n- // item 2\n- // item 3",
    keywords: ["prioritize", "backlog", "todo", "impact"],
  },
  {
    id: "meeting-agenda",
    category: "Productivity",
    title: "Meeting agenda",
    description: "Draft an agenda with time boxes and outcomes.",
    prompt:
      "Draft a meeting agenda for [MEETING PURPOSE] with [N] attendees for [DURATION]. Include time boxes, a clear decision at the end, and owner for each item.",
    keywords: ["meeting", "agenda", "notes", "minutes"],
  },
  {
    id: "okrs",
    category: "Productivity",
    title: "Draft OKRs",
    description: "Turn a goal into measurable Objectives and Key Results.",
    prompt:
      "Help me write OKRs for [OBJECTIVE/TEAM]. One Objective, 3–5 measurable Key Results. Each KR should be falsifiable and time-boxed.",
    keywords: ["okrs", "goals", "objectives", "key results"],
  },
  {
    id: "retrospective",
    category: "Productivity",
    title: "Run a retrospective",
    description: "Set up a retro agenda with prompts.",
    prompt:
      "Set up a retrospective agenda. Use the [Start / Stop / Continue / More of / Less of] format. Include 5–7 prompts and a clear 'commit to one action' closer.",
    keywords: ["retro", "retrospective", "agile", "team"],
  },
  {
    id: "decision-frame",
    category: "Productivity",
    title: "Decision frame",
    description: "Structure a decision using a simple frame.",
    prompt:
      "I'm deciding between [OPTIONS]. Walk me through a decision frame: (1) what we're optimizing for, (2) reversibility, (3) second-order effects, (4) the deciding question. Recommend a default.",
    keywords: ["decision", "frame", "choose", "strategy"],
  },
];

/**
 * Filter prompts by category and search query.
 * Matches against title, description, category, prompt text, and keywords.
 */
export function filterPrompts(prompts, { category = "All", query = "" } = {}) {
  const q = query.trim().toLowerCase();
  return prompts.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (!q) return true;
    const haystack = [
      p.title,
      p.description,
      p.category,
      p.prompt,
      ...(p.keywords || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
