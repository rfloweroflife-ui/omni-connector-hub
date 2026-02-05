import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { 
  Send, 
  Sparkles, 
  Mic, 
  MicOff, 
  Image as ImageIcon, 
  Loader2,
  User,
  Bot,
  Leaf
} from "lucide-react";
import Navigation from "@/components/Navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mycology-chat`;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to ADI~DAS! 🍄 I'm your AI mycology expert, here to help with all your cultivation questions.\n\nWhether you're just starting with your first spore syringe or troubleshooting a tricky grow, I'm here to guide you. Ask me about:\n\n- **Cultivation techniques** - agar work, grain spawn, substrate prep\n- **Troubleshooting** - contamination identification, stalled growth\n- **Species-specific advice** - oyster, lion's mane, shiitake, and more\n- **Equipment recommendations** - flow hoods, pressure cookers, fruiting chambers\n\nWhat would you like to explore today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Failed to get response");
    }

    if (!response.body) throw new Error("No response body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let assistantContent = "";

    // Add empty assistant message that we'll update
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      
      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                role: "assistant",
                content: assistantContent
              };
              return newMessages;
            });
          }
        } catch {
          // Incomplete JSON, will get more data
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages.slice(1)); // Skip the initial welcome message
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
      });
      // Remove the empty assistant message if there was an error
      setMessages(prev => prev.filter((_, i) => i !== prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "How do I start with agar work?",
    "What causes green mold contamination?",
    "Best substrate for oyster mushrooms?",
    "How to maintain proper humidity?",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="border-b border-border/40 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-accent to-mycelium flex items-center justify-center pulse-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-semibold">Mycology Expert</h1>
              <p className="text-sm text-muted-foreground">AI-powered cultivation assistant</p>
            </div>
            <Badge variant="outline" className="ml-auto border-accent/50 text-accent">
              Online
            </Badge>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" 
                    ? "bg-primary" 
                    : "bg-gradient-to-br from-primary via-accent to-mycelium"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Leaf className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border/50"
                  }`}>
                    {message.role === "assistant" ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-accent to-mycelium flex items-center justify-center pulse-glow">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-card border border-border/50 rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested questions (only show if few messages) */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs border-border/50 hover:border-accent/50 hover:text-accent"
                onClick={() => setInput(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border/40 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cultivation, contamination, species..."
              className="flex-1 bg-input/50 border-border/50 focus:border-accent"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="glow-purple">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            For research and educational purposes only. Not medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
