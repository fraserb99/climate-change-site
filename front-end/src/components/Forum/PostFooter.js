import React from 'react';

export const PostFooter = ({post, liked, handleLiked, handleShowReply, setShowChildren}) => (
    <Row className='post-footer'>
        <FontAwesomeIcon icon={faHeart} onClick={() => handleLiked(!liked)} className={liked ? 'liked' : 'not-liked'} />
        <small>{'\xa0'}{likes ? likes : 0}{` likes`} - 
            <a onClick={() => handleShowReply()} className='reply-btn'> {showReply ? 'Cancel Reply' : 'Reply'}</a>
            {post.posts.length > 0 &&
                <a onClick={() => setShowChildren(!showChildren)} className='reply-btn'>
                    {' - '}{showChildren ? 'Hide Replies' : `Show ${post.posts.length} Repl${post.posts.length > 1 ? 'ies' : 'y'}`}
                </a>
            }
        </small>
    </Row>
)