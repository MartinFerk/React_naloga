
import { useState } from 'react';

function CommentForm({ photoId, onCommentAdded }) {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const res = await fetch(`http://localhost:3001/photos/${photoId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ message })
        });

        if (res.ok) {
            const newComment = await res.json();
            setMessage('');
            if (onCommentAdded) onCommentAdded(newComment);
        } else {
            alert('Komentar ni bil dodan.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                className="form-control mb-2"
                placeholder="Dodaj komentar..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Dodaj komentar</button>
        </form>
    );
}

export default CommentForm;
