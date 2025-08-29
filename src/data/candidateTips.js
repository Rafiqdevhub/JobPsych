export const generalTips = [
  "Tailor your resume for each role by highlighting relevant skills and experience.",
  "Use clear, concise language and avoid long paragraphs in your resume.",
  "Quantify your achievements with numbers or measurable results where possible.",
  "Keep your LinkedIn profile updated and consistent with your resume.",
  "Check your resume for grammar, formatting, and spelling errors.",
  "Show continuous learning by adding certifications or courses.",
];

export const generateDynamicTips = (resume) => {
  const tips = [];

  if (!resume.skills || resume.skills.length === 0) {
    tips.push(
      "Add a dedicated skills section with both technical and soft skills."
    );
  }

  if (!resume.projects || resume.projects.length === 0) {
    tips.push("Include 2-3 key projects to showcase practical experience.");
  }

  if (!resume.experience || resume.experience.length === 0) {
    tips.push(
      "Highlight internships, freelance work, or volunteer roles as experience."
    );
  }

  if (!resume.education) {
    tips.push("Add your highest level of education with relevant coursework.");
  }

  if (!resume.achievements || resume.achievements.length === 0) {
    tips.push(
      "List measurable achievements like awards, recognitions, or KPIs met."
    );
  }

  if (!resume.contact || !resume.contact.email) {
    tips.push(
      "Ensure your resume has a professional email address and phone number."
    );
  }

  return tips.length > 0
    ? tips
    : ["Your resume looks strong. Just tailor it for each application."];
};
