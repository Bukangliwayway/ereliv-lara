import { UUID } from "crypto";

export interface User {
    id: UUID;
    name: string;
    email: string;
    role: string;
    email_verified_at: string;
}

export interface Researches {
    id: UUID;
    title: Text;
    abstract: Text;
    publication_status: string;
    research_classification: string;
    publish_date: Date;
    authors: string[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    researches: {
        research: Researches;
    };
};
