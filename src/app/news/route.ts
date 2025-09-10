import { NextRequest } from "next/server";
import OpenAI from "openai";

type NewsApiArticle = {
  source?: { id: string | null; name: string };
  author?: string | null;
  title?: string;
  description?: string | null;
  url?: string;
  urlToImage?: string | null;
  publishedAt?: string;
  content?: string | null;
};

type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
};

const NEWS_API_URL =
  "https://newsapi.org/v2/top-headlines?pageSize=100&country=us";


export async function GET(_req: NextRequest) {
  try {
    const newsApiKey = process.env.NEWSAPI_API_KEY || '';

    const newsUrl = `${NEWS_API_URL}&apiKey=${encodeURIComponent(newsApiKey)}`;
    const newsRes = await fetch(newsUrl, { next: { revalidate: 60 } });
    if (!newsRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch top headlines" }),
        { status: 502, headers: { "content-type": "application/json" } },
      );
    }
    const newsData = (await newsRes.json()) as NewsApiResponse;
    console.log(JSON.stringify(newsData, null, 2));

    const openaiKey = process.env.OPENAI_API_KEY || '';
    if (!openaiKey) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY" }),
        { status: 500, headers: { "content-type": "application/json" } },
      );
    }

    const systemPrompt =
      "Read the following data and return only the articles that can affect existing businesses or create new business opportunities.";

    const openai = new OpenAI({ apiKey: openaiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content:
            "Return strictly valid JSON array of articles from the provided input. Input JSON follows NewsAPI structure with an 'articles' array. Output must be a JSON array of article objects that were selected, preserving original fields.\n\nInput:" +
            "\n\n" +
            JSON.stringify(newsData),
        },
      ],
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const content = completion.choices?.[0]?.message?.content;

    let filteredArticles: NewsApiArticle[] = [];
    try {
      // Expecting a JSON object because response_format json_object is used
      const contentString = typeof content === "string" ? content : "";
      const parsed = JSON.parse(contentString || "{}");
      // Accept either an object with articles property or a raw array
      if (Array.isArray(parsed)) {
        filteredArticles = parsed as NewsApiArticle[];
      } else if (parsed && Array.isArray(parsed.articles)) {
        filteredArticles = parsed.articles as NewsApiArticle[];
      }
    } catch (_err) {
      // If parsing fails, return empty list rather than erroring the request
      filteredArticles = [];
    }

    console.log("filteredArticles", filteredArticles);

    return new Response(
      JSON.stringify({ articles: filteredArticles }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}


