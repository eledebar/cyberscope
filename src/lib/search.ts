import { categories } from "../content/categories";
import { glossary } from "../content/glossary";
import { topics } from "../content/topics";
import type { SearchIndexEntry } from "../types/content";

const text = (...values: unknown[]) => values.flat(Infinity).filter(Boolean).join(" ").toLowerCase();
export const searchIndex: SearchIndexEntry[] = [
  ...topics.map(topic => ({ id: topic.id, type: "topic" as const, path: `/topic/${topic.slug}`, title: topic.title, description: topic.summary, category: topic.category, searchableText: text(topic.title.en, topic.title.es, topic.summary.en, topic.summary.es, topic.definition.en, topic.definition.es, topic.aliases, topic.tags, topic.sections.map(section => [section.heading.en, section.heading.es, section.body.en, section.body.es])) })),
  ...glossary.map(entry => ({ id: entry.id, type: "glossary" as const, path: `/glossary/${entry.id}`, title: entry.term, description: entry.shortDefinition, category: entry.category, searchableText: text(entry.term.en, entry.term.es, entry.acronym, entry.shortDefinition.en, entry.shortDefinition.es, entry.detailedDefinition.en, entry.detailedDefinition.es, entry.aliases) })),
  ...categories.map(category => ({ id: category.id, type: "category" as const, path: `/category/${category.slug}`, title: category.title, description: category.description, category: category.id, searchableText: text(category.title.en, category.title.es, category.description.en, category.description.es) }))
];

export function searchContent(query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return searchIndex.map(entry => ({ entry, score: terms.reduce((score, term) => score + (entry.title.en.toLowerCase().includes(term) || entry.title.es.toLowerCase().includes(term) ? 8 : 0) + (entry.searchableText.includes(term) ? 2 : 0), 0) })).filter(result => result.score > 0).sort((a, b) => b.score - a.score || a.entry.title.en.localeCompare(b.entry.title.en));
}

export function highlight(value: string, query: string) {
  const terms = query.trim().split(/\s+/).filter(Boolean).map(term => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return terms.length ? value.split(new RegExp(`(${terms.join("|")})`, "gi")) : [value];
}
