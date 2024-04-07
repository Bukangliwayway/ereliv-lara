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
    authors: {
        id: string;
        name: string;
    }[];
}

export interface FullResearch {
    id: UUID;
    title: string;
    abstract: string;
    introduction: string;
    methodology: string;
    result: string;
    discussion: string;
    conclusion: string;
    keywords: string;
    publication_status: string;
    research_classification: string;
    editable: boolean;
    publish_date: string;
    authors: {
        id: string;
        name: string;
    }[];
}

export interface AuthorName {
    name: string;
    user_id: string;
}

export interface Years {
    year: string;
}
export type QueryParams = {
    author: string[] | null;
    keyword: string | null;
    year: string[] | null;
};

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
        authors: {
            data: AuthorName[];
        };
        years: {
            data: Years[];
        };
        queryParams: {
            [key: string]: string | null;
        };
        research: {
            data: FullResearch;
        };
    };
