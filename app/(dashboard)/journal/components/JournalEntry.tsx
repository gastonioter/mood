type JournalEntry = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  content: string;
};

export default function JournalEntry({ entry }: { entry: JournalEntry }) {
  return <li>{entry.content}</li>;
}
