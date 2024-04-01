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
    introduction: Text;
    methodology: Text;
    result: Text;
    abstract: Text;
    discussion: Text;
    conclusion: Text;
    keywords: Text;
    is_active: boolean;
    publication_status: string;
    research_classification: string;
    publish_date: Date;
    modified_by: User;
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
