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
  color: string;
  createdAt: Date;
  updatedAt: Date;
  mood: string;
  summary: string;
  subject: string;
  negative: boolean;
};
