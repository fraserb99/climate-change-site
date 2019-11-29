

export const formatPosts = (posts, parent, userId, likes) => {
    var formattedPosts = posts.filter(post => post.parent === parent);
    console.log(formattedPosts);

    formattedPosts = formattedPosts.map(post => {
        const childPosts = formatPosts(posts, post.postId, userId, likes);
        const canDelete = userId === post.userId;
        const liked = !!likes.find(x => x.postId === post.postId);
        return {
            ...post, 
            posts: childPosts, 
            canDelete,
            liked
        }
    })

    return formattedPosts;
}