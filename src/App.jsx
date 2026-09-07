import { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [mark, setMark] = useState("");

  const fetchStudents = () => {
    fetch("http://localhost:8080/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  };

  useEffect(() => { fetchStudents(); }, []);

  const addStudent = () => {
    if(!name || !subject || !mark) return alert("Fill all fields bro!");
    fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subject, mark: parseInt(mark) })
    }).then(() => {
      fetchStudents();
      setName(""); setSubject(""); setMark("");
    });
  };

  const deleteStudent = (id) => {
    fetch(`http://localhost:8080/students/${id}`, { method: "DELETE" })
    .then(() => fetchStudents());
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "30px", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", background: "white", borderRadius: "20px", padding: "30px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        
        <h1 style={{ textAlign: "center", color: "#333", marginBottom: "5px" }}>🎓 Student Marks Manager</h1>
        

        <div style={{ background: "#f8f9ff", padding: "20px", borderRadius: "15px", display: "flex", gap: "10px", flexWrap: "wrap", margin: "25px 0", justifyContent: "center" }}>
          <input placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: "12px 15px", borderRadius: "10px", border: "1px solid #ddd", width: "180px", outline: "none" }} />
          <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} style={{ padding: "12px 15px", borderRadius: "10px", border: "1px solid #ddd", width: "180px", outline: "none" }} />
          <input placeholder="Mark" type="number" value={mark} onChange={e => setMark(e.target.value)} style={{ padding: "12px 15px", borderRadius: "10px", border: "1px solid #ddd", width: "100px", outline: "none" }} />
          <button onClick={addStudent} style={{ background: "#667eea", color: "white", border: "none", padding: "12px 25px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>+ Add Student</button>
        </div>

        <h2 style={{ color: "#333" }}>All Students ({students.length})</h2>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
            <thead>
              <tr style={{ background: "#667eea", color: "white" }}>
                <th style={{ padding: "14px", textAlign: "left", borderRadius: "10px 0 0 0" }}>ID</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Name</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Subject</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Mark</th>
                <th style={{ padding: "14px", textAlign: "center", borderRadius: "0 10px 0 0" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} style={{ borderBottom: "1px solid #eee", transition: "0.2s" }}>
                  <td style={{ padding: "14px", fontWeight: "bold" }}>#{s.id}</td>
                  <td style={{ padding: "14px" }}>{s.name}</td>
                  <td style={{ padding: "14px" }}><span style={{ background: "#eef2ff", color: "#667eea", padding: "5px 12px", borderRadius: "20px", fontSize: "13px" }}>{s.subject}</span></td>
                  <td style={{ padding: "14px" }}><span style={{ background: s.mark >= 90 ? "#d1fae5" : "#fef3c7", color: s.mark >= 90 ? "#065f46" : "#92400e", padding: "5px 12px", borderRadius: "20px", fontWeight: "bold" }}>{s.mark}</span></td>
                  <td style={{ padding: "14px", textAlign: "center" }}>
                    <button onClick={() => deleteStudent(s.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "6px 14px", borderRadius: "8px", cursor: "pointer" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>No students yet. Add one above! 👆</p>}
        </div>

        <p style={{ textAlign: "center", marginTop: "30px", color: "#999", fontSize: "13px" }}>Built by Nithyasri 💜 </p>
      </div>
    </div>
  );
}
export default App;