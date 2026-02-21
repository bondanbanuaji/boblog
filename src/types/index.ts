import type { Role } from "@prisma/client";
import type { User, Session } from "lucia";

// Extend Astro's locals to include auth data
declare global {
    namespace App {
        interface Locals {
            session: Session | null;
            user: User | null;
        }
    }
}

// Article with relations for display
export interface ArticleWithRelations {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    thumbnail: string | null;
    status: string;
    publishedAt: Date | null;
    readingTime: number | null;
    viewCount: number;
    author: {
        id: string;
        username: string;
        displayName: string;
        avatar: string | null;
    };
    category: {
        id: string;
        name: string;
        slug: string;
        color: string | null;
    } | null;
    tags: {
        tag: {
            id: string;
            name: string;
            slug: string;
        };
    }[];
    _count?: {
        comments: number;
        likes: number;
        bookmarks: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

// Pagination
export interface PaginationMeta {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

// API Response types
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Navigation link
export interface NavLink {
    label: string;
    href: string;
    icon?: string;
    badge?: number;
}

// Admin dashboard stat
export interface DashboardStat {
    label: string;
    value: number | string;
    change?: number;
    icon?: string;
}
