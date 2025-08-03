// Function to show the clicked section and hide others
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
  
    // Show the clicked section
    const sectionToShow = document.getElementById(sectionId);
    sectionToShow.classList.add('active');
  }
  
  // Make 'Courses' section active by default on page load
  document.addEventListener("DOMContentLoaded", function() {
    showSection('courses');
  });