
function CommentList({ comments }) {
    if (!comments.length) return <p>Ni še komentarjev.</p>;

    return (
        <ul className="list-group">
            {comments.map(comment => (
                <li key={comment._id} className="list-group-item">
                    <strong>{comment.postedBy?.username ?? "neznano"}:</strong> {comment.message}
                </li>
            ))}
        </ul>
    );
}

export default CommentList;
