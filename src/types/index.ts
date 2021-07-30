export interface Word {
    value: string;
    type: "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "preposition" | "conjunction" | "determiner" | "exclamation";
    id: number;
}