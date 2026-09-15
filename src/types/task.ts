export type Recurrence = "quotidien" | "hebdo" | "bi-hebdo" | "mensuel" | "tri-mensuel" | "test";

export type Task = {
    id: number;
    name: string;
    description: string;
    recurrence: Recurrence;
    day: number;
    roommateAssigned?: number
    done?: boolean;
};