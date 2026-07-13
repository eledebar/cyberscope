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
  const requiredSectionIds = ["explanation", "why", "how", "risks", "controls"];
  for (const topic of topics) {
    const sectionIds = new Set(topic.sections.map(section => section.id));
    const hasRequiredSections = requiredSectionIds.every(id => sectionIds.has(id));
    const hasCompleteSections = topic.sections.every(section =>
      section.heading.en.trim() && section.heading.es.trim() && section.body.en.trim() && section.body.es.trim()
    );
    if (!categoryIds.has(topic.category) || !topic.title.en.trim() || !topic.title.es.trim() || !topic.summary.en.trim() || !topic.summary.es.trim() || !hasRequiredSections || !hasCompleteSections) {
      throw new Error(`CyberScope content validation failed for topic ${topic.id}`);
    }
  }
  for (const entry of glossary) if (!entry.term.en.trim() || !entry.term.es.trim() || !entry.detailedDefinition.en.trim() || !entry.detailedDefinition.es.trim()) throw new Error(`CyberScope glossary validation failed for ${entry.id}`);
}
