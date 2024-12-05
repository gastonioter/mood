export type JournalEntryType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  content: string;
  analysis?: AnalisysType;
};

export type AnalisysType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  userId: string;
  mood: string;
  summary: string;
  subject: string;
  color: string;
  negative: boolean;
  sentimentScore: number;
};
