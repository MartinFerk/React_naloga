import { useState } from 'react';

function Photo(props) {
    const [likes, setLikes] = useState(props.photo.likes ?? 0);
    const [dislikes, setDislikes] = useState(props.photo.dislikes ?? 0);

    const handleLike = async () => {
        console.log("Kliknjen like gumb za: ", props.photo._id); // ➕ test
        const res = await fetch(`http://localhost:3001/photos/${props.photo._id}/like`, { method: "PUT" });
        const updated = await res.json();
        console.log("Response from backend:", updated); // ➕ test
        setLikes(updated.likes ?? 0);
    };

    const handleDislike = async () => {
        const res = await fetch(`http://localhost:3001/photos/${props.photo._id}/dislike`, { method: "PUT" });
        const updated = await res.json();
        setDislikes(updated.dislikes ?? 0);
    };

    return (
        <div className="card bg-light text-dark mb-4" style={{ width: "300px", border: "1px solid #ccc" }}>
            <img 
                src={"http://localhost:3001/" + props.photo.path} 
                alt={props.photo.name} 
                style={{ width: "100%", height: "auto" }} 
            />
            <div className="card-body">
                <h5 className="card-title">{props.photo.name}</h5>
                <p className="card-text">Objavil: {props.photo.postedBy?.username ?? "neznano"}</p>
                <p>Opis: {props.photo.message ?? "ni opisa"}</p>
                <button className="btn btn-outline-success me-2" onClick={handleLike}>
                    👍 {likes}
                </button>
                <button className="btn btn-outline-danger" onClick={handleDislike}>
                    👎 {dislikes}
                </button>
            </div>
        </div>
    );
}

export default Photo;
