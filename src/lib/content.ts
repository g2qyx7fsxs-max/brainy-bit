import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { PillarSlug } from "./pillars";

const CONTENT_DIR = path.join(process.cwd(), "src/content/articles");

export type AgeRange = "9-10" | "11-12" | "9-12";
export type ReadingLevel = "easy" | "medium" | "challenge";

export interface ArticleSource {
  name: string;
  url: string;
}

export interface RelatedBook {
  title: string;
  author: string;
}

export interface RelatedEvent {
  name: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ArticleFrontmatter {
  title: string;
  dek: string;
  pillar: PillarSlug;
  ageRange: AgeRange;
  readingLevel: ReadingLevel;
  publishedDate: string;
  tags: string[];
  source?: ArticleSource;
  relatedBooks?: RelatedBook[];
  relatedEvents?: RelatedEvent[];
  quiz?: QuizQuestion[];
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTimeMinutes: number;
}

function readArticleFile(pillarDir: string, filename: string): Article {
  const filePath = path.join(CONTENT_DIR, pillarDir, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug: filename.replace(/\.mdx$/, ""),
    content,
    readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
  };
}

export function getAllArticles(): Article[] {
  const pillarDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());

  const articles = pillarDirs.flatMap((dir) => {
    const files = fs.readdirSync(path.join(CONTENT_DIR, dir.name)).filter((f) => f.endsWith(".mdx"));
    return files.map((file) => readArticleFile(dir.name, file));
  });

  return articles.sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getArticlesByPillar(pillar: PillarSlug): Article[] {
  return getAllArticles().filter((a) => a.pillar === pillar);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

/**
 * Rotates deterministically through all articles, one per day, based on the
 * current date — no scheduled job needed, it just changes on its own.
 */
export function getTodaysPick(articles: Article[]): Article {
  const stableOrder = [...articles].sort((a, b) => a.slug.localeCompare(b.slug));
  const startOfYear = new Date(new Date().getFullYear(), 0, 0).getTime();
  const dayOfYear = Math.floor((Date.now() - startOfYear) / 86_400_000);
  return stableOrder[dayOfYear % stableOrder.length];
}
