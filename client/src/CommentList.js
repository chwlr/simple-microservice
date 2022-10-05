import React from "react"

const CommentList = ({comments}) => {

    const renderedComments = comments.map(comment => {
        let content
        switch (comment.status) {
            case 'approved':
                content = comment.content
                break
            case 'rejected':
                content = 'Comment is rejected'
                break
            case 'pending':
                content = 'Your comment is on pending'
                break
            default:
                break;
        }

        return <li key={comment.id}>{content}</li>
    })


    return (
        <ul>
            {renderedComments}
        </ul>
    )
}

export default CommentList