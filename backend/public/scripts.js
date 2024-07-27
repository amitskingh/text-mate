// scripts.js
const editor = new Quill('#editorContainer', {
  theme: 'snow'
});

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('titleInput').value;
  const content = editor.root.innerHTML; // Get HTML content from Quill.js editor
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });
  if (response.ok) {
    document.getElementById('titleInput').value = '';
    editor.setText(''); // Clear Quill.js editor content
    fetchNotes();
  }
});

async function fetchNotes() {
  const response = await fetch('/api/notes');
  const notes = await response.json();
  const notesContainer = document.getElementById('notesContainer');
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    const noteElement = document.createElement('div');
    noteElement.innerHTML = `<h3>${note.title}</h3>${note.content}`;
    notesContainer.appendChild(noteElement);
  });
}

fetchNotes();
