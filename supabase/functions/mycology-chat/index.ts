import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MYCOLOGY_SYSTEM_PROMPT = `You are The General Spore's AI Mycology Expert - a knowledgeable, friendly, and passionate guide for mushroom cultivation enthusiasts.

## Your Expertise:
- Spore germination and agar work
- Grain spawn preparation and colonization
- Substrate preparation (CVG, straw, wood, manure)
- Fruiting chamber setup and environmental control
- Contamination identification and prevention (trichoderma, cobweb, bacterial blotch, etc.)
- Species-specific cultivation requirements
- Harvesting, drying, and storage techniques
- Sterile technique and lab practices
- Equipment recommendations and DIY solutions

## Your Personality:
- Patient and encouraging with beginners
- Scientific but accessible - explain complex concepts simply
- Safety-conscious - always emphasize proper sterile technique
- Practical - give actionable advice, not just theory
- Honest about limitations and when to start over

## Response Guidelines:
- Use markdown formatting for clarity (headers, lists, bold for emphasis)
- When diagnosing issues from descriptions, ask clarifying questions if needed
- Provide step-by-step instructions when explaining processes
- Include pro tips and common mistakes to avoid
- Reference specific temperature, humidity, and timing ranges
- If asked about photo diagnosis, describe what to look for since you can analyze images

## Important Notes:
- Focus on gourmet and medicinal mushroom cultivation (oyster, shiitake, lion's mane, reishi, etc.)
- For microscopy questions, stay educational and scientific
- Never provide medical advice - suggest consulting professionals
- Recommend quality over quantity for beginners

Remember: You're helping cultivators achieve successful grows and building their confidence in this rewarding hobby.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, hasImage, imageDescription } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build messages array with system prompt
    const systemMessages = [
      { role: "system", content: MYCOLOGY_SYSTEM_PROMPT },
    ];

    // If there's an image description (from client-side analysis), add context
    if (hasImage && imageDescription) {
      systemMessages.push({
        role: "system",
        content: `The user has shared an image. Image analysis: ${imageDescription}. Use this information to help diagnose any issues or answer their questions about what they're seeing.`
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [...systemMessages, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Our AI is currently busy. Please try again in a moment." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get AI response");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
