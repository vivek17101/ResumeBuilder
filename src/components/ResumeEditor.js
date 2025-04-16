import { useState, useContext } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyDocument } from './PDFExport';
import { AuthContext } from '../context/AuthContext';

export default function ResumeEditor() {
  const { currentUser } = useContext(AuthContext);
  const [resume, setResume] = useState({
    name: currentUser?.displayName || '',
    summary: '',
    experience: [{ role: '', company: '', achievements: '' }],
    skills: [],
  });
  const [jobDescription, setJobDescription] = useState("");

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    if (section === "experience") {
      const newExp = [...resume.experience];
      newExp[index][name] = value;
      setResume({ ...resume, experience: newExp });
    } else {
      setResume({ ...resume, [section]: value });
    }
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [...resume.experience, { role: "", company: "", achievements: "" }]
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
      
      <div className="mb-6">
        <label className="block mb-2">Paste Job Description (for keyword suggestions)</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-2 border rounded h-32"
          placeholder="Paste the job description here..."
        />
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={resume.name}
            onChange={(e) => handleChange(e, "name")}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Professional Summary</label>
          <textarea
            value={resume.summary}
            onChange={(e) => handleChange(e, "summary")}
            className="w-full p-2 border rounded"
            placeholder="Example: Frontend developer with 3+ years of React experience..."
            rows={3}
          />
        </div>

        {resume.experience.map((exp, index) => (
          <div key={index} className="border p-4 rounded">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block mb-1">Job Title</label>
                <input
                  name="role"
                  value={exp.role}
                  onChange={(e) => handleChange(e, "experience", index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Company</label>
                <input
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleChange(e, "experience", index)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <label className="block mb-1">Achievements</label>
            <textarea
              name="achievements"
              value={exp.achievements}
              onChange={(e) => handleChange(e, "experience", index)}
              className="w-full p-2 border rounded"
              placeholder="Example: Increased page speed by 40%..."
              rows={3}
            />
          </div>
        ))}

        <button 
          onClick={addExperience}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Experience
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <PDFDownloadLink
          document={<MyDocument resume={resume} />}
          fileName="resume.pdf"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download Resume PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
}