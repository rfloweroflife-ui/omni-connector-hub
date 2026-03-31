import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { 
  Send, 
  Sparkles, 
  Volume2,
  VolumeX,
  Loader2,
  User,
  Bot,
  Leaf,
  Zap,
  BookOpen,
  Bug,
  Droplets,
  Mic,
  StopCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mycology-chat`;
const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to **ADI~DAS**! 🍄 I'm your AI mycology expert, here to help with all your cultivation questions.\n\nWhether you're just starting with your first spore syringe or troubleshooting a tricky grow, I'm here to guide you. Ask me about:\n\n- **Cultivation techniques** — agar work, grain spawn, substrate prep\n- **Troubleshooting** — contamination identification, stalled growth\n- **Species-specific advice** — oyster, lion's mane, shiitake, and more\n- **Equipment recommendations** — flow hoods, pressure cookers, fruiting chambers\n\nYou can also 🔊 **listen** to my responses read aloud!\n\nWhat would you like to explore today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [ttsLoading, setTtsLoading] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
          // Incomplete JSON
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
      await streamChat(newMessages.slice(1));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
      });
      setMessages(prev => prev.filter((_, i) => i !== prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayTTS = useCallback(async (text: string, index: number) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (playingIndex === index) {
      setPlayingIndex(null);
      return;
    }

    // Strip markdown for cleaner TTS
    const cleanText = text
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[-•]\s/g, '')
      .slice(0, 2000);

    setTtsLoading(index);
    try {
      const response = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text: cleanText }),
      });

      if (!response.ok) throw new Error("TTS failed");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setPlayingIndex(null);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);
      };

      setPlayingIndex(index);
      await audio.play();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Voice unavailable",
        description: "Could not generate audio. Please try again.",
      });
    } finally {
      setTtsLoading(null);
    }
  }, [playingIndex, toast]);

  const suggestedQuestions = [
    { text: "How do I start with agar work?", icon: BookOpen },
    { text: "What causes green mold contamination?", icon: Bug },
    { text: "Best substrate for oyster mushrooms?", icon: Droplets },
    { text: "How to maintain proper humidity?", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="border-b border-border/40 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent to-mycelium flex items-center justify-center pulse-glow shadow-lg shadow-accent/30">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-lg font-semibold tracking-wide">Mycology Expert</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                AI-powered cultivation assistant
                <span className="flex items-center gap-1 text-accent">
                  <Volume2 className="w-3 h-3" />
                  Voice enabled
                </span>
              </p>
            </div>
            <Badge variant="outline" className="border-accent/50 text-accent bg-accent/10 shadow-sm shadow-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse" />
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
                className={`flex gap-3 animate-fade-in ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  message.role === "user" 
                    ? "bg-primary shadow-primary/30" 
                    : "bg-gradient-to-br from-primary via-accent to-mycelium shadow-accent/30"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Leaf className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block rounded-2xl px-5 py-3.5 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "glass-card"
                  }`}>
                    {message.role === "assistant" ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                  {/* TTS Button for assistant messages */}
                  {message.role === "assistant" && message.content && (
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-full"
                        onClick={() => handlePlayTTS(message.content, index)}
                        disabled={ttsLoading === index}
                      >
                        {ttsLoading === index ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                        ) : playingIndex === index ? (
                          <VolumeX className="w-3.5 h-3.5 mr-1" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 mr-1" />
                        )}
                        {ttsLoading === index ? "Loading..." : playingIndex === index ? "Stop" : "Listen"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-accent to-mycelium flex items-center justify-center pulse-glow shadow-lg shadow-accent/30">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="glass-card rounded-2xl px-5 py-3.5">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested questions */}
        {messages.length <= 2 && (
          <div className="px-4 py-3">
            <p className="text-xs text-muted-foreground mb-2 font-medium tracking-wide uppercase">Quick questions</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs border-border/50 hover:border-accent/50 hover:text-accent hover:bg-accent/5 h-auto py-2.5 px-3 transition-all"
                  onClick={() => setInput(question.text)}
                >
                  <question.icon className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                  <span className="text-left">{question.text}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border/40 p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cultivation, contamination, species..."
                className="pr-4 bg-input/50 border-border/50 focus:border-accent focus:ring-1 focus:ring-accent/30 h-12 rounded-xl"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              className="glow-purple h-12 w-12 rounded-xl"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground mt-2 text-center tracking-wide">
            For research and educational purposes only. Not medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
