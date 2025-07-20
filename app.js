// AI Career Mentor - JavaScript Application Logic

// Global variables
let currentStep = 1;
let totalSteps = 8;
let assessmentData = {};
let currentSection = 'home';
let selectedCareer = null;

// Career data from the provided JSON
const careersData = {
  "software_engineer": {
    "title": "Software Engineer",
    "description": "Design, develop, and maintain software applications and systems",
    "salary_range": "$75,000 - $150,000",
    "growth_outlook": "22% growth (much faster than average)",
    "skills": ["Programming", "Problem-solving", "System design", "Testing", "Version control"],
    "education": "Bachelor's degree in Computer Science or related field",
    "certifications": ["AWS Certified Developer", "Oracle Java Certification", "Microsoft Azure Fundamentals"],
    "roadmap": [
      {"month": 1, "milestone": "Learn programming fundamentals", "skills": ["Python/JavaScript basics", "Data structures"]},
      {"month": 3, "milestone": "Build first projects", "skills": ["Web development", "Database basics"]},
      {"month": 6, "milestone": "Advanced concepts", "skills": ["Frameworks", "APIs", "Testing"]},
      {"month": 12, "milestone": "Professional development", "skills": ["System design", "Cloud platforms"]}
    ],
    "resources": [
      {"type": "Course", "name": "Complete Web Developer Bootcamp", "platform": "Udemy", "url": "#"},
      {"type": "Practice", "name": "LeetCode", "platform": "LeetCode", "url": "#"},
      {"type": "Documentation", "name": "MDN Web Docs", "platform": "Mozilla", "url": "#"}
    ]
  },
  "data_scientist": {
    "title": "Data Scientist",
    "description": "Analyze complex data to help organizations make better decisions",
    "salary_range": "$95,000 - $165,000",
    "growth_outlook": "36% growth (much faster than average)",
    "skills": ["Statistics", "Python/R", "Machine Learning", "Data visualization", "SQL"],
    "education": "Bachelor's in Statistics, Math, or Computer Science; Master's preferred",
    "certifications": ["Google Data Analytics", "IBM Data Science", "Certified Analytics Professional"],
    "roadmap": [
      {"month": 1, "milestone": "Statistics and Python basics", "skills": ["Descriptive statistics", "Python fundamentals"]},
      {"month": 3, "milestone": "Data manipulation", "skills": ["Pandas", "NumPy", "SQL"]},
      {"month": 6, "milestone": "Machine Learning", "skills": ["Scikit-learn", "Model evaluation"]},
      {"month": 12, "milestone": "Advanced techniques", "skills": ["Deep learning", "Big data tools"]}
    ],
    "resources": [
      {"type": "Course", "name": "Data Science Specialization", "platform": "Coursera", "url": "#"},
      {"type": "Practice", "name": "Kaggle Competitions", "platform": "Kaggle", "url": "#"},
      {"type": "Book", "name": "Python for Data Analysis", "platform": "O'Reilly", "url": "#"}
    ]
  },
  "cybersecurity_analyst": {
    "title": "Cybersecurity Analyst",
    "description": "Protect organizations from digital threats and security breaches",
    "salary_range": "$80,000 - $140,000",
    "growth_outlook": "33% growth (much faster than average)",
    "skills": ["Network security", "Risk assessment", "Incident response", "Ethical hacking", "Compliance"],
    "education": "Bachelor's in Cybersecurity, IT, or related field",
    "certifications": ["CompTIA Security+", "Certified Ethical Hacker (CEH)", "CISSP"],
    "roadmap": [
      {"month": 1, "milestone": "Security fundamentals", "skills": ["Network basics", "Security principles"]},
      {"month": 3, "milestone": "Tools and techniques", "skills": ["Vulnerability scanning", "SIEM tools"]},
      {"month": 6, "milestone": "Advanced security", "skills": ["Penetration testing", "Forensics"]},
      {"month": 12, "milestone": "Specialization", "skills": ["Cloud security", "Advanced threats"]}
    ],
    "resources": [
      {"type": "Course", "name": "Google Cybersecurity Certificate", "platform": "Coursera", "url": "#"},
      {"type": "Practice", "name": "TryHackMe", "platform": "TryHackMe", "url": "#"},
      {"type": "Certification", "name": "CompTIA Security+", "platform": "CompTIA", "url": "#"}
    ]
  },
  "ux_designer": {
    "title": "UX/UI Designer",
    "description": "Design user experiences and interfaces for digital products",
    "salary_range": "$65,000 - $120,000",
    "growth_outlook": "13% growth (faster than average)",
    "skills": ["User research", "Wireframing", "Prototyping", "Visual design", "Usability testing"],
    "education": "Bachelor's in Design, Psychology, or related field",
    "certifications": ["Google UX Design Certificate", "Adobe Certified Expert", "HFI Certification"],
    "roadmap": [
      {"month": 1, "milestone": "Design principles", "skills": ["Design thinking", "User research basics"]},
      {"month": 3, "milestone": "Tools mastery", "skills": ["Figma", "Adobe XD", "Sketch"]},
      {"month": 6, "milestone": "Portfolio development", "skills": ["Case studies", "Prototyping"]},
      {"month": 12, "milestone": "Advanced skills", "skills": ["Design systems", "Advanced prototyping"]}
    ],
    "resources": [
      {"type": "Course", "name": "Google UX Design Certificate", "platform": "Coursera", "url": "#"},
      {"type": "Tool", "name": "Figma", "platform": "Figma", "url": "#"},
      {"type": "Community", "name": "Designer Hangout", "platform": "Slack", "url": "#"}
    ]
  },
  "product_manager": {
    "title": "Product Manager",
    "description": "Guide product development from conception to launch",
    "salary_range": "$85,000 - $160,000",
    "growth_outlook": "14% growth (faster than average)",
    "skills": ["Strategic thinking", "Market research", "Analytics", "Communication", "Leadership"],
    "education": "Bachelor's degree; MBA preferred",
    "certifications": ["Certified Product Manager", "Google Project Management", "Scrum Master"],
    "roadmap": [
      {"month": 1, "milestone": "PM fundamentals", "skills": ["Product lifecycle", "Market analysis"]},
      {"month": 3, "milestone": "Technical skills", "skills": ["Analytics", "SQL basics", "A/B testing"]},
      {"month": 6, "milestone": "Leadership skills", "skills": ["Team management", "Stakeholder communication"]},
      {"month": 12, "milestone": "Strategic expertise", "skills": ["Product strategy", "Roadmapping"]}
    ],
    "resources": [
      {"type": "Course", "name": "Product Management Fundamentals", "platform": "LinkedIn Learning", "url": "#"},
      {"type": "Book", "name": "Inspired", "platform": "Amazon", "url": "#"},
      {"type": "Community", "name": "Product Manager HQ", "platform": "Slack", "url": "#"}
    ]
  }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
    setupEventListeners();
    updateSkillValues();
});

function initializeApp() {
    console.log('Initializing app...');
    
    // Set initial progress
    updateProgress();
    updateNavigationButtons();
    
    // Initialize navigation
    updateNavigation();
    
    // Setup navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Setup CTA button explicitly
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('CTA button clicked');
            startAssessment();
        });
    } else {
        console.error('CTA button not found');
    }
    
    console.log('App initialized successfully');
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Skill sliders
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            updateSkillValue(this);
        });
    });

    // Option selection - Updated to handle both radio and checkbox properly
    const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log('Input changed:', this.name, this.value, this.checked);
            updateNavigationButtons(); // Update buttons whenever any input changes
        });
    });

    // Navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevStep();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextStep();
        });
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            submitAssessment();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (currentSection === 'assessment' && e.key === 'Enter') {
            const nextBtn = document.getElementById('nextBtn');
            const submitBtn = document.getElementById('submitBtn');
            
            if (nextBtn && !nextBtn.disabled && !nextBtn.classList.contains('hidden')) {
                nextStep();
            } else if (submitBtn && !submitBtn.classList.contains('hidden')) {
                submitAssessment();
            }
        }
    });
    
    console.log('Event listeners set up successfully');
}

function updateSkillValues() {
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        updateSkillValue(slider);
    });
}

function updateSkillValue(slider) {
    const valueSpan = slider.parentNode.querySelector('.skill-value');
    if (valueSpan) {
        valueSpan.textContent = slider.value;
    }
    
    // Update slider background
    const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #007AFF 0%, #007AFF ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
}

function startAssessment() {
    console.log('Starting assessment...');
    showSection('assessment');
    updateNavigation();
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const assessmentLink = document.querySelector('.nav-link[href="#assessment"]');
    if (assessmentLink) {
        assessmentLink.classList.add('active');
    }
}

function nextStep() {
    console.log('Next step called, current step:', currentStep);
    
    if (!validateStep()) {
        console.log('Step validation failed');
        return;
    }
    
    collectStepData();
    
    if (currentStep < totalSteps) {
        // Hide current step
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }
        
        // Show next step
        currentStep++;
        const nextStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (nextStepElement) {
            nextStepElement.classList.add('active');
        }
        
        updateProgress();
        updateNavigationButtons();
        
        // Smooth scroll to top of assessment
        const assessmentSection = document.querySelector('.assessment-section');
        if (assessmentSection) {
            assessmentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

function prevStep() {
    console.log('Previous step called, current step:', currentStep);
    
    if (currentStep > 1) {
        // Hide current step
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }
        
        // Show previous step
        currentStep--;
        const prevStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (prevStepElement) {
            prevStepElement.classList.add('active');
        }
        
        updateProgress();
        updateNavigationButtons();
        
        // Smooth scroll to top of assessment
        const assessmentSection = document.querySelector('.assessment-section');
        if (assessmentSection) {
            assessmentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

function validateStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepElement) {
        console.log('Current step element not found');
        return false;
    }
    
    // Check for radio buttons
    const radioGroups = currentStepElement.querySelectorAll('input[type="radio"]');
    if (radioGroups.length > 0) {
        const isSelected = Array.from(radioGroups).some(radio => radio.checked);
        console.log('Radio validation - Step', currentStep, ':', isSelected);
        return isSelected;
    }
    
    // Check for checkboxes (at least one should be selected)
    const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length > 0) {
        const isSelected = Array.from(checkboxes).some(checkbox => checkbox.checked);
        console.log('Checkbox validation - Step', currentStep, ':', isSelected);
        console.log('Checked checkboxes:', Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value));
        return isSelected;
    }
    
    // For skill sliders, always valid
    console.log('Skills step - always valid');
    return true;
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = (currentStep / totalSteps) * 100;
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    const currentStepElement = document.getElementById('currentStep');
    const totalStepsElement = document.getElementById('totalSteps');
    
    if (currentStepElement) {
        currentStepElement.textContent = currentStep;
    }
    if (totalStepsElement) {
        totalStepsElement.textContent = totalSteps;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    console.log('Updating navigation buttons for step:', currentStep);
    
    if (prevBtn) {
        prevBtn.disabled = currentStep === 1;
    }
    
    const isValid = validateStep();
    console.log('Step is valid:', isValid);
    
    if (currentStep === totalSteps) {
        if (nextBtn) nextBtn.classList.add('hidden');
        if (submitBtn) {
            submitBtn.classList.remove('hidden');
            submitBtn.disabled = !isValid;
        }
    } else {
        if (nextBtn) {
            nextBtn.classList.remove('hidden');
            nextBtn.disabled = !isValid;
            console.log('Next button disabled:', !isValid);
        }
        if (submitBtn) submitBtn.classList.add('hidden');
    }
}

function collectStepData() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepElement) return;
    
    console.log('Collecting data for step:', currentStep);
    
    // Collect radio button data
    const radios = currentStepElement.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
        assessmentData[radio.name] = radio.value;
        console.log('Collected radio data:', radio.name, radio.value);
    });
    
    // Collect checkbox data
    const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length > 0) {
        const groupName = checkboxes[0].name;
        assessmentData[groupName] = Array.from(checkboxes).map(cb => cb.value);
        console.log('Collected checkbox data:', groupName, assessmentData[groupName]);
    }
    
    // Collect slider data
    const sliders = currentStepElement.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        assessmentData[slider.name] = parseInt(slider.value);
        console.log('Collected slider data:', slider.name, slider.value);
    });
}

function submitAssessment() {
    console.log('Submitting assessment...');
    
    if (!validateStep()) {
        console.log('Final step validation failed');
        return;
    }
    
    collectStepData();
    console.log('Final assessment data:', assessmentData);
    
    // Show loading animation
    showSection('loading');
    
    // Simulate AI processing
    setTimeout(() => {
        const recommendations = generateRecommendations();
        console.log('Generated recommendations:', recommendations);
        displayResults(recommendations);
        showSection('results');
    }, 3000);
}

function generateRecommendations() {
    const recommendations = [];
    const interests = assessmentData.interests || [];
    const goals = assessmentData.goals || '';
    const skills = {
        programming: assessmentData.programming || 5,
        analytics: assessmentData.analytics || 5,
        communication: assessmentData.communication || 5,
        leadership: assessmentData.leadership || 5,
        creativity: assessmentData.creativity || 5
    };
    
    console.log('Generating recommendations for:', { interests, goals, skills });
    
    // Simple matching algorithm
    Object.entries(careersData).forEach(([key, career]) => {
        let matchScore = 0;
        
        // Interest matching
        if (interests.includes('technology') && (key === 'software_engineer' || key === 'cybersecurity_analyst')) {
            matchScore += 30;
        }
        if (interests.includes('data-science') && key === 'data_scientist') {
            matchScore += 30;
        }
        if (interests.includes('design') && key === 'ux_designer') {
            matchScore += 30;
        }
        
        // Skills matching
        if (key === 'software_engineer' && skills.programming >= 7) matchScore += 20;
        if (key === 'data_scientist' && skills.analytics >= 7) matchScore += 20;
        if (key === 'ux_designer' && skills.creativity >= 7) matchScore += 20;
        if (key === 'product_manager' && skills.leadership >= 7) matchScore += 20;
        if (key === 'cybersecurity_analyst' && skills.programming >= 6) matchScore += 15;
        
        // Goals matching
        if (goals === 'salary' && (key === 'data_scientist' || key === 'software_engineer')) matchScore += 15;
        if (goals === 'balance' && key === 'ux_designer') matchScore += 15;
        if (goals === 'innovation' && (key === 'software_engineer' || key === 'data_scientist')) matchScore += 15;
        if (goals === 'leadership' && key === 'product_manager') matchScore += 15;
        
        // Base score for variety - ensure all careers get some score
        matchScore += Math.random() * 30 + 40; // 40-70 base score
        
        recommendations.push({
            key: key,
            career: career,
            matchScore: Math.min(matchScore, 98) // Cap at 98%
        });
    });
    
    // Sort by match score and return top 3
    return recommendations
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3);
}

function displayResults(recommendations) {
    const container = document.getElementById('careerRecommendations');
    if (!container) return;
    
    container.innerHTML = '';
    
    recommendations.forEach((rec, index) => {
        const career = rec.career;
        const matchScore = Math.round(rec.matchScore);
        
        const careerCard = document.createElement('div');
        careerCard.className = 'career-card';
        careerCard.style.animationDelay = `${index * 0.2}s`;
        
        careerCard.innerHTML = `
            <div class="career-header">
                <div>
                    <h3 class="career-title">${career.title}</h3>
                    <div class="career-salary">${career.salary_range}</div>
                </div>
                <div class="career-match">${matchScore}% Match</div>
            </div>
            <p class="career-description">${career.description}</p>
            <div class="career-tags">
                ${career.skills.slice(0, 3).map(skill => 
                    `<span class="career-tag">${skill}</span>`
                ).join('')}
            </div>
            <div class="career-actions">
                <button class="btn btn--primary btn--sm" onclick="viewRoadmap('${rec.key}')">
                    View Roadmap
                </button>
                <button class="btn btn--secondary btn--sm" onclick="viewResources('${rec.key}')">
                    Resources
                </button>
            </div>
        `;
        
        container.appendChild(careerCard);
    });
    
    // Update navigation to allow access to careers
    updateNavigation();
}

function viewRoadmap(careerKey) {
    console.log('Viewing roadmap for:', careerKey);
    selectedCareer = careerKey;
    const career = careersData[careerKey];
    
    const titleElement = document.getElementById('selectedCareerTitle');
    if (titleElement) {
        titleElement.textContent = `${career.title} Career Path`;
    }
    
    const timeline = document.getElementById('roadmapTimeline');
    if (timeline) {
        timeline.innerHTML = '';
        
        career.roadmap.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.style.animationDelay = `${index * 0.3}s`;
            
            timelineItem.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-month">Month ${item.month}</div>
                    <h4 class="timeline-milestone">${item.milestone}</h4>
                    <div class="timeline-skills">
                        ${item.skills.map(skill => 
                            `<span class="timeline-skill">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
            
            timeline.appendChild(timelineItem);
        });
    }
    
    showSection('roadmap');
    updateNavigation();
}

function viewResources(careerKey) {
    console.log('Viewing resources for:', careerKey);
    selectedCareer = careerKey;
    const career = careersData[careerKey];
    
    const resourcesGrid = document.getElementById('resourcesGrid');
    if (resourcesGrid) {
        resourcesGrid.innerHTML = '';
        
        career.resources.forEach((resource, index) => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            resourceCard.style.animationDelay = `${index * 0.2}s`;
            
            resourceCard.innerHTML = `
                <div class="resource-type">${resource.type}</div>
                <h4 class="resource-name">${resource.name}</h4>
                <p class="resource-platform">${resource.platform}</p>
            `;
            
            resourcesGrid.appendChild(resourceCard);
        });
        
        // Add additional resources
        const additionalResources = [
            {type: 'Platform', name: 'Coursera', platform: 'University courses'},
            {type: 'Platform', name: 'LinkedIn Learning', platform: 'Professional development'},
            {type: 'Community', name: 'Stack Overflow', platform: 'Developer community'},
            {type: 'Practice', name: 'GitHub', platform: 'Code repositories'}
        ];
        
        additionalResources.forEach((resource, index) => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            resourceCard.style.animationDelay = `${(career.resources.length + index) * 0.2}s`;
            
            resourceCard.innerHTML = `
                <div class="resource-type">${resource.type}</div>
                <h4 class="resource-name">${resource.name}</h4>
                <p class="resource-platform">${resource.platform}</p>
            `;
            
            resourcesGrid.appendChild(resourceCard);
        });
    }
    
    showSection('resources');
    updateNavigation();
    
    // Also show download section after a short delay
    setTimeout(() => {
        showSection('download');
    }, 1000);
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    const sections = ['home', 'assessment', 'loading', 'results', 'roadmap', 'resources', 'download'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('hidden');
        }
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // Smooth scroll to section
        setTimeout(() => {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
    
    currentSection = sectionId;
}

function updateNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    let activeSectionName = currentSection;
    if (currentSection === 'results' || currentSection === 'roadmap') {
        activeSectionName = 'careers';
    }
    
    const activeLink = document.querySelector(`.nav-link[href="#${activeSectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function handleNavigation(e) {
    e.preventDefault();
    const targetSection = e.target.getAttribute('href').substring(1);
    console.log('Navigation clicked:', targetSection);
    
    // Enhanced navigation logic
    if (targetSection === 'home') {
        showSection('home');
    } else if (targetSection === 'assessment') {
        showSection('assessment');
    } else if (targetSection === 'careers') {
        // Can access careers section if we have recommendations or are past assessment
        if (currentSection !== 'home' && currentSection !== 'assessment') {
            showSection('results');
        } else {
            console.log('Cannot access careers section yet');
            return;
        }
    } else if (targetSection === 'resources') {
        // Can access resources if we have a selected career
        if (selectedCareer) {
            showSection('resources');
        } else {
            console.log('Cannot access resources section yet');
            return;
        }
    }
    
    updateNavigation();
}

function generatePDF() {
    console.log('Generating PDF...');
    
    if (!selectedCareer) {
        alert('Please select a career path first.');
        return;
    }

    if (!window.jspdf) {
        alert('PDF generation library not loaded. Please try again.');
        return;
    }

    const career = careersData[selectedCareer];
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    try {
        // Title
        pdf.setFontSize(20);
        pdf.setTextColor(0, 122, 255);
        pdf.text('AI Career Mentor - Your Personalized Career Plan', 20, 30);

        // Career Title
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`Career Path: ${career.title}`, 20, 50);

        // Description
        pdf.setFontSize(12);
        pdf.text('Description:', 20, 70);
        const splitDescription = pdf.splitTextToSize(career.description, 170);
        pdf.text(splitDescription, 20, 80);

        // Salary Range
        pdf.text(`Salary Range: ${career.salary_range}`, 20, 100);
        pdf.text(`Growth Outlook: ${career.growth_outlook}`, 20, 110);

        // Skills
        pdf.text('Required Skills:', 20, 130);
        career.skills.forEach((skill, index) => {
            pdf.text(`• ${skill}`, 25, 140 + (index * 10));
        });

        // Roadmap
        let yPos = 170 + (career.skills.length * 10);
        pdf.text('Learning Roadmap:', 20, yPos);
        
        career.roadmap.forEach((milestone, index) => {
            yPos += 15;
            if (yPos > 270) {
                pdf.addPage();
                yPos = 30;
            }
            pdf.text(`Month ${milestone.month}: ${milestone.milestone}`, 25, yPos);
            yPos += 8;
            pdf.setFontSize(10);
            const skillsText = `Skills: ${milestone.skills.join(', ')}`;
            const splitSkills = pdf.splitTextToSize(skillsText, 160);
            pdf.text(splitSkills, 30, yPos);
            yPos += splitSkills.length * 5;
            pdf.setFontSize(12);
        });

        // Resources
        yPos += 20;
        if (yPos > 250) {
            pdf.addPage();
            yPos = 30;
        }
        
        pdf.text('Recommended Resources:', 20, yPos);
        career.resources.forEach((resource, index) => {
            yPos += 12;
            if (yPos > 270) {
                pdf.addPage();
                yPos = 30;
            }
            pdf.text(`• ${resource.name} (${resource.platform}) - ${resource.type}`, 25, yPos);
        });

        // Assessment Summary
        yPos += 30;
        if (yPos > 230) {
            pdf.addPage();
            yPos = 30;
        }
        
        pdf.text('Your Assessment Summary:', 20, yPos);
        yPos += 15;
        
        if (assessmentData.education) {
            pdf.text(`Education Level: ${assessmentData.education}`, 25, yPos);
            yPos += 10;
        }
        if (assessmentData.experience) {
            pdf.text(`Experience Level: ${assessmentData.experience}`, 25, yPos);
            yPos += 10;
        }
        if (assessmentData.interests && assessmentData.interests.length > 0) {
            pdf.text(`Interests: ${assessmentData.interests.join(', ')}`, 25, yPos);
            yPos += 10;
        }

        // Footer
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text('Generated by AI Career Mentor - Your Personalized Career Path Guide', 20, 280);

        // Save the PDF
        const fileName = `${career.title.replace(/\s+/g, '_')}_Career_Plan.pdf`;
        pdf.save(fileName);
        
        console.log('PDF generated successfully:', fileName);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    }
}

function retakeAssessment() {
    console.log('Retaking assessment...');
    
    // Reset all data
    currentStep = 1;
    assessmentData = {};
    selectedCareer = null;
    
    // Reset form
    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });
    
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        slider.value = 5;
        updateSkillValue(slider);
    });
    
    // Reset UI
    document.querySelectorAll('.assessment-step').forEach(step => {
        step.classList.remove('active');
    });
    const firstStep = document.querySelector('[data-step="1"]');
    if (firstStep) {
        firstStep.classList.add('active');
    }
    
    updateProgress();
    updateNavigationButtons();
    
    // Show assessment section
    showSection('assessment');
    updateNavigation();
}

// Global functions for inline onclick handlers
window.startAssessment = startAssessment;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.submitAssessment = submitAssessment;
window.viewRoadmap = viewRoadmap;
window.viewResources = viewResources;
window.generatePDF = generatePDF;
window.retakeAssessment = retakeAssessment;

console.log('JavaScript loaded successfully');