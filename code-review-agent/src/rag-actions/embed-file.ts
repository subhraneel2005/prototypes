import { GoogleGeminiEmbeddingFunction } from "@chroma-core/google-gemini";
import type { EmbedFile } from "../types/embed-types";
import { generateDocId } from "../utils/gen-doc-id";
import { ChromaClient } from "chromadb";

const client = new ChromaClient();

const embedder = new GoogleGeminiEmbeddingFunction({
    apiKey: "<YOUR API KEY>",
    modelName: "gemini-embedding-001",
});

export async function embedFile({ fileContent, filename, repoName }: EmbedFile) {

    const documentId = generateDocId()

    const collection = await client.getOrCreateCollection({
        name: repoName,
        embeddingFunction: embedder
    })

    await collection.add({
        ids: [documentId],
        documents: [fileContent],
        metadatas: [
            {
                filename,
                type: "source_code_file",
                repoName,
                createdAt: new Date().toISOString()
            }
        ]
    })

    return { documentId }
}