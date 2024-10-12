export interface Message {
  id: number;
  content: string | { [key: string]: unknown }[];
  type: "text" | "image" | "file" | "table";
  sender: string;
  timestamp: Date;
}
