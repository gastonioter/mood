import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import z from "zod";
import { JournalEntryType } from "./types";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    summary: z.string().describe("quick summary of entire entry."),
    subject: z.string().describe("the subject of the journal entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (e.g. does it contain negative emotions?)."
      ),
    color: z
      .string()
      .describe(
        "a hexadecimal color code which represents that mood. Don't be extremistis to choose the color. Example #0101fe for blue."
      ),
    // sentimentScore: z.number().describe("the sentiment score of the entry."),
  })
);

type analisis = z.infer<typeof parser.schema>;

const createPropmt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  // here we actually interpolate the content into the prompt
  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analize = async (content: string): Promise<analisis | false> => {
  const llm = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = await createPropmt(content);
  const completion = await llm.invoke(prompt);
  const output = completion.lc_kwargs.content;

  try {
    return parser.parse(output);
  } catch (e) {
    console.log(e);
    return false;
  }
};

const questionPromptTemplateString = `
You are a psychologist talking to a patient.

Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
Always say "thanks for asking!" at the end of the answer.

{context}

Question: {question}

Helpful Answer:`;

const refinePromptTemplateString = `The original question is as follows: {question}
We have provided an existing answer: {existing_answer}
We have the opportunity to refine the existing answer
(only if needed) with some more context below.
------------
{context}
------------
Given the new context, refine the original answer to better answer the question.
You must provide a response, either original answer or refined answer.`;

export const qa = async (
  question: string,
  entries: Array<JournalEntryType>
) => {
  const model = new ChatOpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });

  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  );

  // Embed and Store all of our document splits in a single command
  const store = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings()
  );

  // Contruct the prompts
  const questionPrompt = new PromptTemplate({
    inputVariables: ["context", "question"],
    template: questionPromptTemplateString,
  });

  const refinePrompt = new PromptTemplate({
    inputVariables: ["question", "existing_answer", "context"],
    template: refinePromptTemplateString,
  });

  const chain = loadQARefineChain(model, {
    questionPrompt,
    refinePrompt,
  });

  const relevantDocs = await store.similaritySearch(question);

  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  });

  return res.output_text;
};
