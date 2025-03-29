import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MoodTracking.css"; // Ensure you have CSS for styling

function MoodTracker() {
  const [date, setDate] = useState(new Date());
  const [moods, setMoods] = useState([]);
  const [editingMood, setEditingMood] = useState(null);
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  // Convert Date object to YYYY-MM-DD format
  const formattedDate = date.toISOString().split("T")[0];

  // Fetch moods when date changes
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/mood-tracking/${formattedDate}`);
        if (!response.ok) {
          throw new Error("Failed to fetch moods");
        }
        const data = await response.json();
        console.log("Fetched moods:", data);
        setMoods(data);
      } catch (error) {
        console.error("Error fetching moods:", error);
      }
    };

    fetchMoods();
  }, [date]); // Runs every time the date changes

  // Handle mood submission (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: formattedDate,
      mood,
      notes,
    };

    try {
      const response = await fetch(
        editingMood
          ? `http://localhost:5001/api/mood-tracking/${editingMood._id}`
          : "http://localhost:5001/api/mood-tracking",
        {
          method: editingMood ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save mood");
      }

      const data = await response.json();
      console.log("Mood saved:", data);

      // Refresh mood list after saving
      setMoods(editingMood ? moods.map(m => m._id === data._id ? data : m) : [...moods, data]);

      // Reset form
      setMood("");
      setNotes("");
      setEditingMood(null);
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mood?")) return;

    try {
      const response = await fetch(`http://localhost:5001/api/mood-tracking/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete mood");
      }

      // Remove the deleted mood from the list
      setMoods(moods.filter((m) => m._id !== id));
    } catch (error) {
      alert("Failed to delete mood");
      console.error(error);
    }
  };

  // Handle edit
  const handleEdit = (mood) => {
    setEditingMood(mood);
    setMood(mood.mood);
    setNotes(mood.notes);
  };

  return (
    <div className="mood-tracker-container">
      <h1>Mood Tracking Calendar</h1>
      <Calendar onChange={setDate} value={date} className="custom-calendar" />

      <div className="mood-list">
        {moods.length > 0 ? (
          moods.map((mood) => (
            <div key={mood._id} className="mood-item">
              <p><strong>{mood.mood}</strong> - {mood.notes}</p>
              <button className="edit-btn" onClick={() => handleEdit(mood)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(mood._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No moods recorded for this day.</p>
        )}
      </div>

      <form className="mood-form" onSubmit={handleSubmit}>
        <select value={mood} onChange={(e) => setMood(e.target.value)} required>
          <option value="">Select your mood</option>
          <option value="Happy">Happy 😊</option>
          <option value="Sad">Sad 😢</option>
          <option value="Anxious">Anxious 😰</option>
          <option value="Excited">Excited 😃</option>
        </select>
        <textarea
          placeholder="Add notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">{editingMood ? "Update Mood" : "Save Mood"}</button>
      </form>
    </div>
  );
}

export default MoodTracker;
