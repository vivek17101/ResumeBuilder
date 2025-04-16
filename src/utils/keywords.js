export const extractKeywords = (jobDescription) => {
  const commonKeywords = [
    "react", "javascript", "python", "node.js", "html/css",
    "project management", "machine learning", "aws", "azure",
    "agile", "scrum", "rest api", "git", "docker", "kubernetes"
  ];
  
  if (!jobDescription) return [];
  
  return commonKeywords.filter(keyword => 
    jobDescription.toLowerCase().includes(keyword)
  );
};

export const suggestImprovements = (resume, keywords) => {
  const suggestions = [];
  
  // Check for metrics in achievements
  resume.experience.forEach(exp => {
    if (!/\d+%|\$\d+/.test(exp.achievements)) {
      suggestions.push(`Add quantifiable results to "${exp.role}" experience (e.g., "Increased X by 40%")`);
    }
  });
  
  // Check for missing keywords
  const missingKeywords = keywords.filter(kw => 
    !JSON.stringify(resume).toLowerCase().includes(kw)
  );
  
  if (missingKeywords.length > 0) {
    suggestions.push(`Add these keywords: ${missingKeywords.join(", ")}`);
  }
  
  return suggestions;
};