import {Post} from "./posts.models";

export namespace PostsActions {
    export class FetchPosts {
        static readonly type = "[Posts] Fetch Posts";
        constructor() {}
    }
    export class SetPosts {
        static readonly type = "[Posts] Set Posts";
        constructor(public posts: Post[]) {}
    }
}