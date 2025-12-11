import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateObject } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";

const app = express();
app.use(cors());
app.use(express.json());

// Define the shape of the desired AI response
const schema = z.object({
	summary: z.string(),
	anomalies: z.array(z.string()),
});

app.post("/insight", async (req, res) => {
	try {
		const { prompt } = req.body;
		const { object } = await generateObject({
			model: openai("gpt-4o-mini"),
			schema, // Use the structured schema
			prompt,
		});
		res.json({ summary: object.summary, anomalies: object.anomalies });
	} catch (error) {
		// Log the specific error message from AI SDK to the Node.js terminal
		console.error("AI API Error:", error.message); 
		res.status(500).json({ error: "AI call failed" });
	}
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`AI insight server listening on port ${PORT}`);
});
