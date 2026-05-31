import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables. Gemini calls will fail.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API Endpoint - Gemini Safety Buddy
app.post("/api/safety-buddy", async (req, res) => {
  try {
    const { message, context, travelDetails } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.status(503).json({
        error: "Aura Safety AI is temporarily offline because the system administrator has not configured the GEMINI_API_KEY. Please set up the GEMINI_API_KEY in Settings > Secrets."
      });
    }

    // Curate powerful system instructions for an empathetic female safety companion & navigator
    const systemInstruction = `
      You are Aura-Sister, the advanced AI Travel Companion, Safety Navigator & Advisor for RydeOn, a premium ride-hailing app designed primarily for women.
      Your tone is extremely warm, reassuring, hyper-vigilant about safety, clear, and companion-like.
      Your primary directives:
      1. Provide actionable security, travel safety, and logistical advice.
      2. If the user mentions being in danger or uncomfortable, provide immediate, calm, step-by-step instructions (e.g. check ride PIN, share live location, call SOS, go to a public litigation zone, speak firmly).
      3. For route planning requests, offer detailed safety insights and suggestions tailored for women travelers (e.g., recommend well-lit public transit junctions, alert about quiet streets, advice for solo drivers).
      4. Avoid jargon, keep formatting beautiful with bullet points, brief sections, and high contrast typography. Encourage and reassure them. Keep answers concise, highly readable, and under 200 words.
    `;

    let contentPrompt = `User asks: ${message}`;
    if (context) {
      contentPrompt += `\nContext/Emergency level: ${context}`;
    }
    if (travelDetails) {
      contentPrompt += `\nUser's current Route details: Pickup ${travelDetails.pickup} to Dropoff ${travelDetails.dropoff}. Travel mode: ${travelDetails.mode}.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Safety Buddy error:", error);
    res.status(500).json({ error: error?.message || "Internal server error querying safety companion." });
  }
});

// App health status check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "RydeOn Full-Stack Portal",
    hasApiKey: !!process.env.GEMINI_API_KEY
  });
});

// Serve Vite-managed React App or compiled static assets
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT node mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION node mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[RydeOn Server Ready] Listening on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error("Failed to bootstrap server:", err);
  process.exit(1);
});
