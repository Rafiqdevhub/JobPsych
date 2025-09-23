import React from "react";

import {
  BriefcaseIcon,
  AcademicCapIcon,
  ChartBarIcon,
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const ResumeDetails = ({ resumeData }) => {
  if (!resumeData) {
    console.error("ResumeDetails: No resume data provided");
    return null;
  }

  const {
    personalInfo = {},
    workExperience = [],
    education = [],
    skills = [],
    highlights = [],
  } = resumeData;

  const isPersonalInfoEmpty =
    !personalInfo || Object.keys(personalInfo).length === 0;
  const isWorkExperienceEmpty = !workExperience || workExperience.length === 0;
  const isEducationEmpty = !education || education.length === 0;
  const isSkillsEmpty = !skills || skills.length === 0;

  const isIncompleteData =
    isPersonalInfoEmpty &&
    isWorkExperienceEmpty &&
    isEducationEmpty &&
    isSkillsEmpty;

  if (isIncompleteData) {
    return (
      <div className="bg-slate-700/80 rounded-xl shadow-lg p-6 mt-8 border border-slate-600">
        <div className="flex items-center mb-6">
          <ClipboardDocumentCheckIcon className="h-6 w-6 text-indigo-400 mr-2" />
          <h2 className="text-2xl font-semibold text-white">Resume Analysis</h2>
        </div>
        <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30 mb-6">
          <p className="text-yellow-300">
            The resume analysis could not be completed. This might be due to:
          </p>
          <ul className="list-disc list-inside mt-2 text-yellow-300">
            <li>The resume format was not fully readable</li>
            <li>Important sections might be missing from the resume</li>
            <li>The file might be password protected or encrypted</li>
          </ul>
          <p className="mt-4 text-yellow-300">
            Try uploading a different version or format of your resume.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-700/80 rounded-xl shadow-lg p-6 mt-8 transform transition-all duration-300 hover:shadow-xl border border-slate-600">
      <div className="flex items-center mb-6">
        <ClipboardDocumentCheckIcon className="h-6 w-6 text-indigo-400 mr-2" />
        <h2 className="text-2xl font-semibold text-white">
          Candidate Assessment
        </h2>
      </div>

      {highlights && (
        <div className="mb-8 bg-indigo-500/20 rounded-lg p-4 border border-indigo-500/30">
          <div className="flex items-center mb-3">
            <StarIcon className="h-5 w-5 text-indigo-400 mr-2" />
            <h3 className="text-lg font-medium text-indigo-300">
              Key Highlights
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {highlights.map((highlight, index) => (
              <li key={index} className="text-indigo-200">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <UserCircleIcon className="h-6 w-6 text-indigo-400 mr-2" />
          <h3 className="text-xl font-medium text-slate-200">
            Candidate Profile
          </h3>
        </div>
        <div className="bg-slate-600/50 rounded-lg p-4 hover:bg-slate-600/70 transition-colors duration-200 border border-slate-500">
          <div className="grid md:grid-cols-2 gap-4">
            {personalInfo &&
              Object.entries(personalInfo).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-slate-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-slate-200 font-medium">{value}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <BriefcaseIcon className="h-6 w-6 text-indigo-400 mr-2" />
          <h3 className="text-xl font-medium text-slate-200">
            Professional Experience
          </h3>
        </div>
        <div className="space-y-4">
          {workExperience &&
            workExperience.map((exp, index) => (
              <div
                key={index}
                className="bg-slate-600/50 rounded-lg p-4 hover:bg-slate-600/70 transition-colors duration-200 border border-slate-500"
              >
                <h4 className="font-medium text-indigo-300">{exp.title}</h4>
                <p className="text-slate-200 font-medium">{exp.company}</p>
                <p className="text-sm text-slate-400">{exp.duration}</p>
                {exp.description && exp.description.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-slate-300 mb-2">
                      Description:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="text-sm text-slate-300">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <ChartBarIcon className="h-6 w-6 text-indigo-400 mr-2" />
          <h3 className="text-xl font-medium text-slate-200">
            Skills Assessment
          </h3>
        </div>
        <div className="bg-slate-600/50 rounded-lg p-4 hover:bg-slate-600/70 transition-colors duration-200 border border-slate-500">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills &&
              skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 shadow-sm hover:bg-slate-600 transition-colors"
                >
                  <span className="text-sm text-slate-200">{skill}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-4">
          <AcademicCapIcon className="h-6 w-6 text-indigo-400 mr-2" />
          <h3 className="text-xl font-medium text-slate-200">
            Educational Background
          </h3>
        </div>
        <div className="space-y-4">
          {education &&
            education.map((edu, index) => (
              <div
                key={index}
                className="bg-slate-600/50 rounded-lg p-4 hover:bg-slate-600/70 transition-colors duration-200 border border-slate-500"
              >
                <h4 className="font-medium text-indigo-300">{edu.degree}</h4>
                <p className="text-slate-200">{edu.institution}</p>
                <p className="text-sm text-slate-400">{edu.year}</p>
                {edu.details && edu.details.length > 0 && (
                  <div className="mt-2">
                    <ul className="list-disc list-inside space-y-1">
                      {edu.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-slate-300">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;
