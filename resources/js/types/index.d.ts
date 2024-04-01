import { UUID } from "crypto";

export interface User {
    id: UUID;
    name: string;
    email: string;
    role: string;
    email_verified_at: string;
}


export interface Research {
    id: UUID;
    title: string;
    abstract: string;
    publication_status: string;
    research_classification: string;
    publish_date: string;
    authors: string[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> =
    T & {
        auth: {
            user: User;
        };
        researches: {
            data: Research[];
            links: {};
            meta: {};
        };
        meta: {};
    };
