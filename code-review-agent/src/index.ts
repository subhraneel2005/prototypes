import { openrouter } from "@openrouter/ai-sdk-provider";
import { ToolLoopAgent } from "ai";

const codeReviewAgent = new ToolLoopAgent({
    model: openrouter(""),
    tools: {
        semanticSearch,
        getGithubDiff,
        generateReview,
        sendTelegram,
    },
})

// usage

// const parsedInput = AgentInputSchema.parse(userInput);
// const result = await codeReviewAgent.run({
//   input: parsedInput
// });