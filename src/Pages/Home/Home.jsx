import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAuthContext from "../../Hooks/useAuthContext";
import useCollection from "../../Hooks/useCollection";
import "./Home.css";

const Home = () => {
    const [newNote, setNewNote] = useState();
    const [notes, setNotes] = useState();
    const [editNote, setEditNote] = useState();
    const [enableEdit, setEnableEdit] = useState(false);
    const { logout } = useAuth();

    const { user } = useAuthContext();
    const navigate = useNavigate();

    let config = user && {
        headers: {
            'Authorization': 'Bearer ' + user.jwt
        }
    }

    const { addNote, getNotes, deleteNotes, updateNotes, loading } = useCollection(setNotes, config);

    useEffect(() => {
        if (!user) {
            navigate("/auth")
        }
    }, [user])

    useEffect(() => {
        getNotes();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newNote) {
            addNote({ note: newNote, createdBy: user._id });
            setNewNote("");
        }
        e.target.reset();
    }

    const handleEdit = (e, each) => {
        e.preventDefault();
        updateNotes(each._id, { note: editNote })
        setEnableEdit(false)
    }

    return <div className="homepage">
        <div className="createSection">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => { setNewNote(e.target.value.trim()) }} placeholder="enter to add" />
                <input type="submit" value="add Note" />
            </form>
            <p className="update" onClick={() => { setEnableEdit(prev => !prev) }}>update notes</p>
        </div>
        {!loading && <div className="notesSection">
            {
                notes && notes.map(each => {
                    return <div key={each._id} className="notescard">
                        <h2 >{each.note}</h2>
                        <p className="delete" onClick={() => { deleteNotes(each._id) }}>delete</p>
                        {enableEdit && <form onSubmit={(e) => { handleEdit(e, each) }}>
                            <input type="text" placeholder="enter new value" onChange={(e) => { setEditNote(e.target.value) }} />
                        </form>}
                    </div>
                })
            }
            {
                notes && notes.length == 0 && <h1>Add Notes</h1>
            }
        </div>}
        {loading && <h1>Loading....</h1>}
        <p onClick={logout} className="logout">logout</p>
    </div >
}
export default Home