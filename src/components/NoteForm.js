import React, { useState, useEffect } from 'react';
import './NoteForm.css';

function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
      setTitle('');
      setContent('');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onCancel();
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{editingNote ? '✏️ Edit Note' : '➕ Add New Note'}</h2>
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-input"
        required
      />
      <textarea
        placeholder="Note content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-textarea"
        rows="5"
        required
      />
      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
        {editingNote && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;