import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddPhoto(props) {
    const userContext = useContext(UserContext); 
    const[name, setName] = useState('');
    const [message, setMessage] = useState('');
    const[file, setFile] = useState('');
    const[uploaded, setUploaded] = useState(false);

    async function onSubmit(e){
        e.preventDefault();

        if(!name){
            alert("Vnesite ime!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('message', message);
        formData.append('image', file);
        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();

        setUploaded(true);
    }

    return (
        <form className="form-group" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            {uploaded ? <Navigate replace to="/" /> : ""}
            
            <input
                type="text"
                className="form-control mb-2"
                name="ime"
                placeholder="Ime slike"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <textarea
                className="form-control mb-2"
                name="message"
                placeholder="Sporočilo / opis slike"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <label>Izberi sliko</label>
            <input
                type="file"
                id="file"
                className="form-control mb-2"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <input className="btn btn-primary" type="submit" value="Naloži" />
        </form>
    )
}

export default AddPhoto;