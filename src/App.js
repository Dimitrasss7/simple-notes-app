import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      ...note,
      createdAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() } : note
    ));
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📝 Simple Notes</h1>
          <p>Create, manage, and search your notes</p>
        </header>

        <NoteForm 
          onSubmit={editingNote ? (note) => updateNote(editingNote.id, note) : addNote}
          editingNote={editingNote}
          onCancel={() => setEditingNote(null)}
        />

        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="notes-stats">
          <span>Total Notes: {notes.length}</span>
          {searchQuery && <span>Found: {filteredNotes.length}</span>}
        </div>

        <NoteList 
          notes={filteredNotes}
          onEdit={setEditingNote}
          onDelete={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;