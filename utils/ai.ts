import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import z from "zod";

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
        "a hexadecimal color code which represents that mood. Example #0101fe for blue."
      ),
    // sentimentScore: z.number().describe("the sentiment score of the entry."),
  })
);

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

  console.log(input);

  return input;
};

export const analize = async (content: string) => {
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = await createPropmt(content);
  const completion = await model.invoke(prompt);
  const output = completion.lc_kwargs.content;

  try {
    return parser.parse(output);
  } catch (e) {}
};
