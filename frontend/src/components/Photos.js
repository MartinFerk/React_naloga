import { useState, useEffect } from 'react';
import Photo from './Photo';

function Photos(){
    const [photos, setPhotos] = useState([]);
    useEffect(function(){
        const getPhotos = async function(){
            const res = await fetch("http://localhost:3001/photos");
            const data = await res.json();
            setPhotos(data);
        }
        getPhotos();
    }, []);

    return(
        <div>
  {photos.map(photo => (
    <div style={{ marginBottom: "20px", marginLeft: "20px" }} key={photo._id}>
      <Photo photo={photo} />
    </div>
  ))}
</div>
    );
}

export default Photos;