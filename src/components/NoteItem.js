import React from 'react';
import './NoteItem.css';

function NoteItem({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button 
            className="action-btn edit-btn" 
            onClick={() => onEdit(note)}
            title="Edit note"
          >
            ✏️
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={() => onDelete(note.id)}
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <span className="note-date">
          {note.updatedAt ? `Updated: ${formatDate(note.updatedAt)}` : `Created: ${formatDate(note.createdAt)}`}
        </span>
      </div>
    </div>
  );
}

export default NoteItem;