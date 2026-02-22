"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function PortfolioPage() {
  const { username } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/portfolio/${username}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [username]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  const projects = JSON.parse(data.projects || "[]").filter(
    (p: any) => p.title && p.title.trim() !== ""
  );

  const experience = JSON.parse(data.experience || "[]").filter(
    (e: any) => e.role && e.role.trim() !== ""
  );

  const achievements = data.achievements
    ? data.achievements.split("\n").filter((a: string) => a.trim() !== "")
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex justify-center px-4 md:px-10 py-8">
      <div className="max-w-5xl w-full space-y-16">

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-8 gap-6"
        >

          {/* LEFT SIDE */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left w-full md:w-auto">
            {data.image && (
              <img
                src={data.image}
                alt="profile"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-500 shadow-lg"
              />
            )}

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {data.name}
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl text-purple-400 mt-2">
                {data.role}
              </h2>
            </div>
          </div>

          {/* RIGHT SIDE - CONTACT */}
          {(data.email || data.location) && (
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center md:text-right space-y-2 text-sm w-full md:w-auto">
              {data.email && (
                <p className="text-gray-300 break-all">
                  📧 <span className="text-purple-400">{data.email}</span>
                </p>
              )}
              {data.location && (
                <p className="text-gray-300">
                  📍 <span className="text-purple-400">{data.location}</span>
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* ABOUT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-300 text-sm sm:text-base"
        >
          {data.about}
        </motion.p>

        {/* SKILLS */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {data.skills.split(",").map((skill: string, i: number) => (
              <span
                key={i}
                className="bg-purple-600/20 text-purple-400 px-3 py-2 rounded-full text-xs sm:text-sm hover:scale-110 transition"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">Projects</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-purple-500 hover:scale-[1.02] transition"
                >
                  <h4 className="text-lg sm:text-xl font-semibold mb-2">
                    {proj.title}
                  </h4>

                  <p className="text-gray-400 text-sm mb-3">
                    {proj.description}
                  </p>

                  <p className="text-sm text-purple-400 mb-4">
                    Tech: {proj.tech}
                  </p>

                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      className="inline-block bg-purple-600 px-4 py-2 rounded text-xs sm:text-sm hover:bg-purple-700 transition"
                    >
                      Live Demo
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">Experience</h3>

            {experience.map((exp: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6"
              >
                <h4 className="text-lg font-semibold">
                  {exp.role}
                </h4>

                <p className="text-purple-400 text-sm mt-1">
                  {exp.company} • {exp.duration}
                </p>

                <p className="text-gray-400 text-sm mt-3">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {data.education && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Education</h3>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <p className="text-gray-300 text-sm sm:text-base">
                {data.education}
              </p>
            </div>
          </motion.div>
        )}

        {/* ACHIEVEMENTS */}
        {achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Achievements</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
              {achievements.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}

      </div>
    </div>
  );
}