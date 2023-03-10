export interface Task {
	name: string;
	priority: Priority;
}
export enum Priority {
	Low,
	Medium,
	High,
}

export function string_to_priority(s: string): Priority {
	switch (s) {
		case "Low":
			return Priority.Low;
		case "Medium":
			return Priority.Medium;
		case "High":
			return Priority.High;
	}

	throw new Error("Invalid priority");
}
export function priority_to_string(p: Priority): string {
	switch (p) {
		case Priority.Low:
			return "Low";
		case Priority.Medium:
			return "Medium";
		case Priority.High:
			return "High";
	}
}
