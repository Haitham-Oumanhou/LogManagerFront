export interface LogEntry {
  timestamp: Date;
  label: string;
  info: string;
  message: string;
  service: string;
  method_name: string;
  frequency: number;
}
