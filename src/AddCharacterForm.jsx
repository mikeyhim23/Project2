// // src/components/AddCharacterForm.jsx

// import React, { useState } from 'react';

// const AddCharacterForm = ({ onAddCharacter }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     imageUrl: '',
//     description: '',
//   });

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent page reload on submit

//     // Pass the form data to the parent (App component) to handle the POST request
//     onAddCharacter(formData);

//     // Optionally, reset the form fields
//     setFormData({ name: '', imageUrl: '', description: '' });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Character Name"
//       />
//       <input
//         type="text"
//         name="imageUrl"
//         value={formData.imageUrl}
//         onChange={handleChange}
//         placeholder="Image URL"
//       />
//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Character Description"
//       />
//       <button type="submit">Add Character</button>
//     </form>
//   );
// };

// export default AddCharacterForm;
