import {AppUser} from "../authentication/models/AppUser";
import {Club} from "../clubs/club.models";

export interface StatelessPost {
    id: string;
    posterId: string;
    hasImage: boolean;
    isClub: boolean;
    imageUrl?: string;
    content: string;
    heartsNumber: number;
    commentsNumber: number;
    scopeIds: string[];
    createdAt: number;
    commentIds: string[];
}

export interface StatelessComment {
    id: string;
    commenterId: string;
    content: string;
    heartsNumber: number;
    createdAt: string;
}

export interface UserPost {
    hearted: boolean;
    seen: boolean;
}

export interface UserComment {
    hearted: boolean;
}

export interface PostComment extends StatelessComment, UserComment {}

export interface Post extends StatelessPost, UserPost {
    comments: PostComment[];
    poster?: AppUser;
    club?: Club;
}
