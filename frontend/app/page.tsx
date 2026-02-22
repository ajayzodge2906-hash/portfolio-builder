"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
  username: "",
  name: "",
  role: "",
  about: "",
  skills: "",
  image: "",
  linkedin: "",
  github: "",
  email: "",
  location: "",
  education: "",
  achievements: "",
  projects: [
    { title: "", description: "", tech: "", live: "" },
    { title: "", description: "", tech: "", live: "" },
    { title: "", description: "", tech: "", live: "" }
  ],
  experience: [
    { role: "", company: "", duration: "", description: "" },
    { role: "", company: "", duration: "", description: "" }
  ]
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    console.log("FORM DATA:", form);
    for (const key in form) {
      if (!form[key as keyof typeof form]) {
        alert(`Please fill the ${key} field`);
        return;
      }
    }

    try {
      const response = await fetch("https://portfolio-builder-ia50.onrender.com/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = `/portfolio/${form.username}`;
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Backend connection failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-indigo-950 to-purple-950 text-white flex flex-col items-center px-4 md:px-10 py-10">
      
      <h1 className="text-4xl font-bold mb-10">
        🚀 Portfolio Builder
      </h1>

      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-2xl shadow-lg space-y-6">

        {/* Username */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Username (unique link)
          </label>
          <input
  type="text"
  name="username"
  value={form.username}
  placeholder="example: ajaydev"
  onChange={handleChange}
  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
/>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="example: Ajay Zodge"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Professional Role
          </label>
          <input
            type="text"
            name="role"
            value={form.role}
            placeholder="example: Full Stack Developer"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* About */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            About You
          </label>
          <textarea
            name="about"
            value={form.about}
            placeholder="Short professional summary..."
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 h-28"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            placeholder="example: Python, Flask, Next.js, SQL"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <h2 className="text-2xl font-bold mt-10 mb-4">Projects</h2>

{form.projects.map((project, index) => (
  <div key={index} className="bg-gray-800 p-4 rounded mb-6 space-y-3">

    <input
      type="text"
      placeholder="Project Title"
      value={project.title}
      onChange={(e) => {
        const updated = [...form.projects];
        updated[index].title = e.target.value;
        setForm({ ...form, projects: updated });
      }}
      className="w-full p-2 rounded bg-gray-900 border border-gray-700"
    />

    <textarea
      placeholder="Project Description"
      value={project.description}
      onChange={(e) => {
        const updated = [...form.projects];
        updated[index].description = e.target.value;
        setForm({ ...form, projects: updated });
      }}
      className="w-full p-2 rounded bg-gray-900 border border-gray-700"
    />

    <input
      type="text"
      placeholder="Tech Stack (e.g. Flask, NLP, SQL)"
      value={project.tech}
      onChange={(e) => {
        const updated = [...form.projects];
        updated[index].tech = e.target.value;
        setForm({ ...form, projects: updated });
      }}
      className="w-full p-2 rounded bg-gray-900 border border-gray-700"
    />

    <input
      type="text"
      placeholder="Live Project Link"
      value={project.live}
      onChange={(e) => {
        const updated = [...form.projects];
        updated[index].live = e.target.value;
        setForm({ ...form, projects: updated });
      }}
      className="w-full p-2 rounded bg-gray-900 border border-gray-700"
    />

  </div>
))}

        
        {/* Profile Image URL */}
<div>
  <label className="block text-sm mb-1">Profile Image URL</label>
  <input
    type="text"
    name="image"
    placeholder="Paste image URL (e.g., from Imgur)"
    value={form.image}
    onChange={handleChange}
    className="w-full p-3 rounded bg-gray-800 border border-gray-700"
  />
</div>
<h2 className="text-2xl font-bold mt-10 mb-4">Experience</h2>

{form.experience.map((exp, index) => (
  <div key={index} className="bg-gray-800 p-4 rounded mb-6 space-y-3">

    <input
      type="text"
      placeholder="Role"
      value={exp.role}
      onChange={(e) => {
        const updated = [...form.experience];
        updated[index].role = e.target.value;
        setForm({ ...form, experience: updated });
      }}
      className="w-full p-2 rounded bg-gray-900 border border-gray-700"
    />

    <input
      type="text"
      placeholder="Company"
      value={exp.company}
      onChange={(e) => {
        const updated = [...form.experience];
        updated[index].company = e.target.value;
        setForm({ ...form, experience: updated });
      }}
      className="w-full p-2 rounded bg-gray-900 border border-gray-700"
    />

    <input
      type="text"
      placeholder="Duration (e.g. Jan 2024 - May 2024)"
      value={exp.duration}
      onChange={(e) => {
        const updated = [...form.experience];
        updated[index].duration = e.target.value;
        setForm({ ...form, experience: updated });
      }}
      className="w-full p-2 rounded bg-gray-900 border border-gray-700"
    />

    <textarea
      placeholder="Description"
      value={exp.description}
      onChange={(e) => {
        const updated = [...form.experience];
        updated[index].description = e.target.value;
        setForm({ ...form, experience: updated });
      }}
      className="w-full p-2 rounded bg-gray-900 border border-gray-700"
    />

  </div>
))}
<h2 className="text-2xl font-bold mt-10 mb-4">Education</h2>

<input
  type="text"
  placeholder="Degree - Institution (Year)"
  value={form.education}
  onChange={(e) => setForm({ ...form, education: e.target.value })}
  className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-6"
/>

<h2 className="text-2xl font-bold mt-10 mb-4">Achievements</h2>

<textarea
  placeholder="Write each achievement on new line"
  value={form.achievements}
  onChange={(e) => setForm({ ...form, achievements: e.target.value })}
  className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-6"
/>

{/* LinkedIn */}
<div>
  <label className="block text-sm mb-1">LinkedIn URL</label>
  <input
    type="text"
    name="linkedin"
    placeholder="https://linkedin.com/in/yourname"
    value={form.linkedin}
    onChange={handleChange}
    className="w-full p-3 rounded bg-gray-800 border border-gray-700"
  />
</div>

{/* GitHub */}
<div>
  <label className="block text-sm mb-1">GitHub URL</label>
  <input
    type="text"
    name="github"
    placeholder="https://github.com/yourname"
    value={form.github}
    onChange={handleChange}
    className="w-full p-3 rounded bg-gray-800 border border-gray-700"
  />
</div>
<h2 className="text-2xl font-bold mt-10 mb-4">Contact</h2>

<input
  type="email"
  placeholder="Email"
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
  className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-4"
/>

<input
  type="text"
  placeholder="Location"
  value={form.location}
  onChange={(e) => setForm({ ...form, location: e.target.value })}
  className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-6"
/>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-lg font-bold text-lg hover:scale-105 transition-transform"
        >
          Generate Portfolio
        </button>

      </div>
    </div>
  );
}