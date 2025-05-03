import { useState, useEffect } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

function Photo(props) {
    const [likes, setLikes] = useState(props.photo.likes ?? 0);
    const [dislikes, setDislikes] = useState(props.photo.dislikes ?? 0);
    const [comments, setComments] = useState([]);
    const isLoggedIn = !!localStorage.getItem("user"); 

    const fetchComments = async () => {
        const res = await fetch(`http://localhost:3001/photos/${props.photo._id}/comments`);
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleLike = async () => {
        const res = await fetch(`http://localhost:3001/photos/${props.photo._id}/like`, { 
            method: "PUT", 
            credentials: 'include' 
        });
        const updated = await res.json();
        setLikes(updated.likes ?? 0);
    };

    const handleDislike = async () => {
        const res = await fetch(`http://localhost:3001/photos/${props.photo._id}/dislike`, { 
            method: "PUT", 
            credentials: 'include' 
        });
        const updated = await res.json();
        setDislikes(updated.dislikes ?? 0);
    };

    const handleNewComment = () => {
        fetchComments();
    };

    return (
        <div className="card bg-light text-dark mb-4" style={{ width: "300px", border: "1px solid #ccc" }}>
            {isLoggedIn ? (
            <a href={`/photo/${props.photo._id}`}>
                <img 
                    src={"http://localhost:3001/" + props.photo.path} 
                    alt={props.photo.name} 
                    style={{ width: "100%", height: "auto" }} 
                />
            </a>
            ) : (
                <img 
                    src={"http://localhost:3001/" + props.photo.path} 
                    alt={props.photo.name} 
                    style={{ width: "100%", height: "auto", cursor: "not-allowed", opacity: 0.8 }} 
                    title="Za podrobnosti se prijavi." 
                />
            )}
            <div className="card-body">
                <h5 className="card-title">{props.photo.name}</h5>
                <p className="card-text">Objavil: {props.photo.postedBy?.username ?? "neznano"}</p>
                <p>Opis: {props.photo.message ?? "ni opisa"}</p>

                        <button className="btn btn-outline-success me-2" >
                            👍 {likes}
                        </button>
                        <button className="btn btn-outline-danger">
                            👎 {dislikes}
                        </button>
                    
                <hr />
                <p>Objavljeno: {new Date(props.photo.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
}

export default Photo;
