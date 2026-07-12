export type Language = "en" | "es";
export type LocalisedText = Record<Language, string>;
export type Difficulty = "introductory" | "intermediate" | "advanced";
export type ContentType = "concept" | "technology" | "threat" | "control" | "framework" | "process" | "architecture" | "case-study" | "checklist" | "comparison" | "diagram" | "reference";

export interface TopicSection { id: string; heading: LocalisedText; body: LocalisedText; bullets?: LocalisedText[]; }
export interface Category { id: string; slug: string; title: LocalisedText; description: LocalisedText; icon: string; accent: string; }
export interface Subcategory { id: string; categoryId: string; title: LocalisedText; description: LocalisedText; }
export interface Definition { term: LocalisedText; definition: LocalisedText; }
export interface RelatedTopic { topicId: string; reason: LocalisedText; }
export interface Diagram { id: string; title: LocalisedText; description: LocalisedText; nodes: { id: string; label: LocalisedText; detail: LocalisedText; tone?: "green" | "blue" | "amber" | "red" }[]; caption: LocalisedText; }
export interface ComparisonTable { id: string; title: LocalisedText; columns: LocalisedText[]; rows: LocalisedText[][]; }
export interface Reference { label: string; url: string; publisher: string; }
export interface DefensiveChecklist { id: string; title: LocalisedText; items: LocalisedText[]; note: LocalisedText; }
export interface PracticalExample { title: LocalisedText; scenario: LocalisedText; response: LocalisedText; outcome: LocalisedText; }

export interface CyberTopic {
  id: string;
  slug: string;
  category: string;
  difficulty: Difficulty;
  contentType: ContentType;
  technologies: string[];
  environments: string[];
  defensiveFunctions: string[];
  tags: string[];
  aliases: string[];
  title: LocalisedText;
  summary: LocalisedText;
  definition: LocalisedText;
  sections: TopicSection[];
  relatedTopicIds: string[];
  glossaryTermIds: string[];
  references: Reference[];
  lastReviewed: string;
  diagramId?: string;
  comparisonId?: string;
  checklistId?: string;
  example?: PracticalExample;
}

export interface GlossaryEntry {
  id: string;
  term: LocalisedText;
  acronym?: string;
  shortDefinition: LocalisedText;
  detailedDefinition: LocalisedText;
  category: string;
  relatedTerms: string[];
  aliases: string[];
}

export interface Translation { key: string; value: LocalisedText; }
export interface SavedTopic { topicId: string; savedAt: string; }
export interface RecentPage { path: string; title: LocalisedText; viewedAt: string; }
export interface UserPreferences {
  language: Language;
  theme: "light" | "dark";
  reducedMotion: boolean;
  density: "comfortable" | "compact";
  fontSize: "small" | "medium" | "large";
  savedTopics: SavedTopic[];
  recentlyViewed: RecentPage[];
  searchHistory: string[];
}
export interface SearchIndexEntry { id: string; type: "topic" | "glossary" | "category"; path: string; title: LocalisedText; description: LocalisedText; searchableText: string; category: string; }
