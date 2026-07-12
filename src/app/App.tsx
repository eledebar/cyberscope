import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { AboutPage, NotFoundPage, OfflinePage, PrivacyPage, ResourcesPage } from "../pages/StaticPages";
import { CategoryPage } from "../pages/CategoryPage";
import { ExplorePage } from "../pages/ExplorePage";
import { GlossaryDetailPage, GlossaryPage } from "../pages/GlossaryPage";
import { HomePage } from "../pages/HomePage";
import { SavedPage } from "../pages/SavedPage";
import { SearchPage } from "../pages/SearchPage";
import { SettingsPage } from "../pages/SettingsPage";
import { TopicPage } from "../pages/TopicPage";
import { ErrorBoundary } from "./ErrorBoundary";

function KeyboardSearch() { const navigate = useNavigate(); useEffect(() => { const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); navigate("/search"); } }; addEventListener("keydown", handler); return () => removeEventListener("keydown", handler); }, [navigate]); return null; }

export function App() { return <ErrorBoundary><KeyboardSearch /><Routes><Route element={<AppShell />}><Route index element={<HomePage />} /><Route path="explore" element={<ExplorePage />} /><Route path="search" element={<SearchPage />} /><Route path="category/:slug" element={<CategoryPage />} /><Route path="topic/:slug" element={<TopicPage />} /><Route path="critical-infrastructure" element={<CategoryPage categoryId="critical-infrastructure" />} /><Route path="operational-technology" element={<CategoryPage categoryId="operational-technology" />} /><Route path="system-hardening" element={<CategoryPage categoryId="hardening" />} /><Route path="glossary" element={<GlossaryPage />} /><Route path="glossary/:id" element={<GlossaryDetailPage />} /><Route path="saved" element={<SavedPage />} /><Route path="resources" element={<ResourcesPage />} /><Route path="settings" element={<SettingsPage />} /><Route path="about" element={<AboutPage />} /><Route path="privacy" element={<PrivacyPage />} /><Route path="offline" element={<OfflinePage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes></ErrorBoundary>; }
