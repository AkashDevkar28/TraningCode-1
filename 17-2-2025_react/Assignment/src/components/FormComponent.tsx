import { useState } from "react";

const FormComponent = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    skills: "",
    email: "",
    phone: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form Submitted!!!!!!!!!!");
    setFormData(initialFormData); // Reset the form fields after submission
  };

  return (
    <div className="app-container">
      <h1 className="title">User Registration Form</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input-field"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input-field"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="number"
          name="age"
          placeholder="Age"
          className="input-field"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <div className="form-group">
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>

        <select
          name="skills"
          className="input-field"
          value={formData.skills}
          onChange={handleChange}
          required
        >
          <option value="">Select Skill</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          className="input-field"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          className="textarea-field"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
