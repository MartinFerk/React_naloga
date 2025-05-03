import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

function PhotoDetail() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const isLoggedIn = !!localStorage.getItem("user");

    useEffect(() => {
        const fetchPhoto = async () => {
            const res = await fetch(`http://localhost:3001/photos/${id}`);
            const data = await res.json();
            setPhoto(data);
            setLikes(data.likes ?? 0);
            setDislikes(data.dislikes ?? 0);
        };

        const fetchComments = async () => {
            const res = await fetch(`http://localhost:3001/photos/${id}/comments`);
            const data = await res.json();
            setComments(Array.isArray(data) ? data : []);
        };

        fetchPhoto();
        fetchComments();
    }, [id]);

    const handleNewComment = () => {
        fetch(`http://localhost:3001/photos/${id}/comments`)
            .then(res => res.json())
            .then(data => setComments(Array.isArray(data) ? data : []));
    };

    const handleLike = async () => {
        const res = await fetch(`http://localhost:3001/photos/${id}/like`, {
            method: 'PUT',
            credentials: 'include'
        });
        const data = await res.json();
        setLikes(data.likes ?? 0);
    };

    const handleDislike = async () => {
        const res = await fetch(`http://localhost:3001/photos/${id}/dislike`, {
            method: 'PUT',
            credentials: 'include'
        });
        const data = await res.json();
        setDislikes(data.dislikes ?? 0);
    };

    if (!photo) return <p>Nalaganje slike...</p>;

    return (
        <div className="container mt-4">
            <h2>{photo.name}</h2>
            <p>Objavil: {photo.postedBy?.username ?? "neznano"}</p>
            <p>Objavljeno: {new Date(photo.createdAt).toLocaleString()}</p>
            <img
                src={"http://localhost:3001/" + photo.path}
                alt={photo.name}
                style={{ width: "100%", maxWidth: "600px", height: "auto" }}
            />
            <p className="mt-2">Opis: {photo.message ?? "ni opisa"}</p>

            {isLoggedIn && (
                <>
                    <button className="btn btn-outline-success me-2" onClick={handleLike}>👍 {likes}</button>
                    <button className="btn btn-outline-danger" onClick={handleDislike}>👎 {dislikes}</button>
                </>
            )}

            <hr />
            <h5>Komentarji</h5>
            <CommentList comments={comments} />

            {isLoggedIn ? (
                <CommentForm photoId={id} onCommentAdded={handleNewComment} />
            ) : (
                <p className="text-muted">Prijavi se za komentiranje.</p>
            )}
        </div>
    );
}

export default PhotoDetail;
