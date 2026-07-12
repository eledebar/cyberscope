import { categories } from "../content/categories";
import { glossary } from "../content/glossary";
import { topics } from "../content/topics";
import { checklists, comparisons, diagrams } from "../content/visuals";

function unique(name: string, ids: string[]) {
  if (new Set(ids).size !== ids.length) throw new Error(`CyberScope content validation failed: duplicate ${name} id`);
}

export function validateContent() {
  unique("topic", topics.map(item => item.id)); unique("glossary", glossary.map(item => item.id)); unique("category", categories.map(item => item.id));
  if (topics.length < 60 || glossary.length < 150 || diagrams.length < 20 || comparisons.length < 10 || checklists.length < 10) throw new Error("CyberScope content validation failed: minimum content coverage not met");
  const categoryIds = new Set(categories.map(item => item.id));
  for (const topic of topics) {
    if (!categoryIds.has(topic.category) || !topic.title.en.trim() || !topic.title.es.trim() || !topic.summary.en.trim() || !topic.summary.es.trim() || topic.sections.length < 8) throw new Error(`CyberScope content validation failed for topic ${topic.id}`);
  }
  for (const entry of glossary) if (!entry.term.en.trim() || !entry.term.es.trim() || !entry.detailedDefinition.en.trim() || !entry.detailedDefinition.es.trim()) throw new Error(`CyberScope glossary validation failed for ${entry.id}`);
}
