function Photo(props){
    return (
        <div className="card bg-dark text-white mb-4" style={{ width: "300px" }}>
            <img 
                className="card-img-top" 
                src={"http://localhost:3001/" + props.photo.path} 
                alt={props.photo.name} 
                style={{ maxHeight: "200px", objectFit: "cover" }} 
            />
            <div className="card-body">
                <h5 className="card-title">{props.photo.name}</h5>
                <p className="card-text">
                    Objavil: {props.photo.postedBy?.username ?? "neznano"}
                </p>
            </div>
        </div>
    );
}

export default Photo;
