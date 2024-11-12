// components/AddCharacterForm.jsx

import React, { useState } from 'react';

const AddCharacterForm = () => {
  // State to track form data
  const [formData, setFormData] = useState({
    name: '',
    race: '',
    class: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit

    // Create a new character object to send in the POST request
    const newCharacter = {
      name: formData.name,
      race: formData.race,
      class: formData.class,
    };

    // Make the POST request to create the new character
    fetch('https://api.example.com/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tell the server we are sending JSON data
      },
      body: JSON.stringify(newCharacter), // Send the new character data as JSON
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // If response is okay, parse JSON
        } else {
          throw new Error('Failed to add character'); // Handle error if response isn't OK
        }
      })
      .then((data) => {
        console.log('Character added:', data); // Log the data returned from the API
        // Optionally, clear form after success
        setFormData({ name: '', race: '', class: '' });
      })
      .catch((error) => {
        console.error('Error adding character:', error); // Log error if the fetch fails
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Character Name"
      />
      <input
        type="text"
        name="race"
        value={formData.race}
        onChange={handleChange}
        placeholder="Race"
      />
      <input
        type="text"
        name="class"
        value={formData.class}
        onChange={handleChange}
        placeholder="Class"
      />
      <button type="submit">Add Character</button>
    </form>
  );
};

export default AddCharacterForm;
