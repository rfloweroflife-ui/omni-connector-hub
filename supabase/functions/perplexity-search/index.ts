import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || query.length > 500) {
      return new Response(
        JSON.stringify({ error: "Invalid query" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      throw new Error("PERPLEXITY_API_KEY is not configured");
    }

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: "You are a mycology research assistant. Provide accurate, science-backed information about mushroom cultivation, species identification, and mycology. Always cite sources. Format responses with clear headers and bullet points. Keep responses focused and practical for cultivators.",
          },
          { role: "user", content: query },
        ],
        search_domain_filter: ["shroomery.org", "reddit.com/r/mycology", "reddit.com/r/mushroomgrowers", "mushroomexpert.com", "fungi.com", "ncbi.nlm.nih.gov"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Perplexity error:", response.status, errorText);
      throw new Error(`Perplexity API failed: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        content: data.choices?.[0]?.message?.content || "No results found.",
        citations: data.citations || [],
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Search error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Search failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
