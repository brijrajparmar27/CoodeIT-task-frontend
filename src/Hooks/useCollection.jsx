import { useState } from "react";
import API from "../Axios/Axios";
import useAuthContext from "./useAuthContext";

const useCollection = (setNotes, config) => {

    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();

    const addNote = (note) => {
        setLoading(true);
        API.post("/notes", note, config).then(data => {
            getNotes();
        }).catch(err => {
            console.log(err.messsage);
        })
    }

    const getNotes = () => {
        setLoading(true);
        API.get(`/notes/${user._id}`, config).then((data) => {
            setNotes(data.data);
            setLoading(false)
        }).catch(err => {
            console.log(err.messsage);
            setLoading(false)
        })
    }

    const deleteNotes = (id) => {
        setLoading(true);
        API.delete(`/notes/${id}`, config).then(() => {
            getNotes();
        }).catch(err => {
            console.log(err.message);
            setLoading(false)
        })
    }

    const updateNotes = (id, data) => {
        setLoading(true);
        API.patch(`/notes/${id}`, data, config).then(() => {
            getNotes();
        }).catch(err => {
            console.log(err.message);
            setLoading(false)
        })
    }
    return { addNote, getNotes, deleteNotes, updateNotes, loading }
}
export default useCollection;