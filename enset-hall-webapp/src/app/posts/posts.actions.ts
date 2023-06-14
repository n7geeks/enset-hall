import {Post, PostComment} from "./posts.models";

export namespace PostsActions {
    export class FetchPosts {
        static readonly type = "[Posts] Fetch Posts";
        constructor() {}
    }
    export class SetPosts {
        static readonly type = "[Posts] Set Posts";
        constructor(public posts: Post[]) {}
    }
    export class ToggleHeartPost {
        static readonly type = "[Posts] Toggle Heart Post";
        constructor(public post: Post) {}
    }
    export class ToggleHeartComment {
        static readonly type = "[Posts] Toggle Heart Comment";
        constructor(public comment: PostComment) {}
    }

    export class SubmitComment {
        static readonly type = "[Posts] Submit Comment";
        constructor(public postId: string, public comment: string) {}
    }
}