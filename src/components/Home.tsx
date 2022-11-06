import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';


interface IState {
    notes: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { notes: [] }
    }

    public componentDidMount(): void {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            if(key){
                // deencrypt item
                let decrypt = localStorage.getItem(key)
                if(decrypt){
                const convertToJson = atob(decrypt);
                data.push(JSON.parse(convertToJson));
                }
        }
        }
        this.setState({ notes: data })
    }

    public deleteNote(id: number) {
        localStorage.removeItem(id.toString());
        const index = this.state.notes.findIndex(note => note.id === id);
        this.state.notes.splice(index, 1);
        this.props.history.push('/')
    }

    // convert to pdf and download
    public downloadPDF = (id: number) => {
        const data = localStorage.getItem(id.toString());
        if (data) {
        const decrypt = atob(data);
        if (decrypt) {
            const note = JSON.parse(decrypt);
            const doc = new jsPDF();
            doc.text(note.title, 10, 10);
            doc.text(note.description, 10, 20);
            doc.save('note.pdf');
        }
    }
    }

    // export note in json
    public exportNote = (id: number) => {
        const data = localStorage.getItem(id.toString());
        if (data) {
        const decrypt = atob(data);
        if (decrypt) {
            const note = JSON.parse(decrypt);
            const element = document.createElement("a");
            const file = new Blob([JSON.stringify(note)], {type: 'application/json'});
            element.href = URL.createObjectURL(file);
            element.download = "note.json";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    }

    // export all notes
    public exportAllNotes = () => {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            if(key){
                // deencrypt item
                let decrypt = localStorage.getItem(key)
                if(decrypt){
                const convertToJson = atob(decrypt);
                data.push(JSON.parse(convertToJson));
                }
        }
        }
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(data)], {type: 'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = "notes.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
// search notes in localStorage
    public searchNotes = (e: React.FormEvent<HTMLInputElement>) => {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            if(key){
                // deencrypt item
                let decrypt = localStorage.getItem(key)
                if(decrypt){
                const convertToJson = atob(decrypt);
                data.push(JSON.parse(convertToJson));
                }
        }
        }
        const search = e.currentTarget.value;
        const filteredNotes = data.filter(note => note.title.toLowerCase().includes(search.toLowerCase()));
        this.setState({ notes: filteredNotes })
    }
    
    // Sort notes in list view
    public sortNotes = (e: React.FormEvent<HTMLSelectElement>) => {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            if(key){
                // deencrypt item
                let decrypt = localStorage.getItem(key)
                if(decrypt){
                const convertToJson = atob(decrypt);
                data.push(JSON.parse(convertToJson));
                }
        }
        }
        const sort = e.currentTarget.value;
        if (sort === 'title') {
            const sortedNotes = data.sort((a, b) => a.title.localeCompare(b.title));
            this.setState({ notes: sortedNotes })
        } 
    }

    // Filter notes in list view
    public filterNotes = (e: React.FormEvent<HTMLSelectElement>) => {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            if(key){
                // deencrypt item
                let decrypt = localStorage.getItem(key)
                if(decrypt){
                const convertToJson = atob(decrypt);
                data.push(JSON.parse(convertToJson));
                }
        }
        }
        const filter = e.currentTarget.value;
        if (filter === 'title') {
            const filteredNotes = data.filter(note => note.title);
            this.setState({ notes: filteredNotes })
        } else if (filter === 'description') {
            const filteredNotes = data.filter(note => note.description);
            this.setState({ notes: filteredNotes })
        }
    }
    //Add printable version
    public printNote = (id: number) => {
        const data = localStorage.getItem(id.toString());
        if (data) {
        const decrypt = atob(data);
        if (decrypt) {
            const note = JSON.parse(decrypt);
            const doc = new jsPDF();
            doc.text(note.title, 10, 10);
            doc.text(note.description, 10, 20);
            doc.autoPrint();
            doc.output('dataurlnewwindow');
        }
    }
    }


    public render() {
        const notes = this.state.notes;
        return (
            <div>
                {notes.length === 0 && (
                    <div className="text-center">
                        <h2>No note found at the moment</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search notes" onChange={this.searchNotes} />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <select className="form-control" onChange={this.sortNotes}>
                                    <option value="">Sort by</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <select className="form-control" onChange={this.filterNotes}>
                                    <option value="">Filter by</option>
                                    <option value="title">Title</option>
                                    <option value="description">Description</option>
                                </select>
                            </div>
                        </div>
                        <table className="table table-bordered">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => this.exportAllNotes()}>Export All Note</button>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Tile</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes && notes.map(note =>
                                    <tr key={note.id}>
                                        <td>{note.title}</td>
                                        <td>{note.description}</td>
                                        <td>{note.created_at}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${note.id}`} className="btn btn-sm btn-outline-secondary">Edit Note </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteNote(note.id)}>Delete Note</button>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.downloadPDF(note.id)}>Download Note</button>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.exportNote(note.id)}>Export Note</button>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.printNote(note.id)}>Print Note</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}
