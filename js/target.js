function editGoalHeading() {
  const currentGoalHeading = document.getElementById("goalHeading").textContent;
  const newGoalHeading = prompt("Enter the new goal heading:", currentGoalHeading);
  if (newGoalHeading !== null && newGoalHeading.trim() !== "") {
    document.getElementById("goalHeading").textContent = newGoalHeading.trim();
  }
}

// Function to edit number items
function editNumber(elementId) {
  const currentValue = document.getElementById(elementId).textContent;
  const newValue = prompt(`Enter the new value for ${elementId}:`, currentValue);
  if (newValue !== null && !isNaN(newValue.trim())) {
    document.getElementById(elementId).textContent = newValue.trim();
  }
}

// Function to edit the engagement rate
function editEngagementRate() {
  const currentEngagementRate = document.getElementById("engagementRate").textContent;
  const currentRateValue = parseFloat(currentEngagementRate.replace("%", ""));
  const newEngagementRate = prompt("Enter the new engagement rate (%):", currentRateValue);
  if (newEngagementRate !== null && !isNaN(newEngagementRate.trim())) {
    document.getElementById("engagementRate").textContent = newEngagementRate.trim() + "%";
  }
}

function editGoal() {
  const goalHeading = document.getElementById('goalHeading').textContent;
  const followers = document.getElementById('followersCount').textContent;
  const profileVisits = document.getElementById('profileVisitsCount').textContent;
  const postInteractions = document.getElementById('postInteractionsCount').textContent;
  const engagementRate = document.getElementById('engagementRate').textContent;

  const data = {
    goalHeading,
    followers,
    profileVisits,
    postInteractions,
    engagementRate
  };

  fetch('https://social-media-dashboard-server.vercel.app/api/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      console.log('Goal data saved:', result);
      // Show success message or update UI as needed
    })
    .catch(error => {
      console.error('Error saving goal data:', error);
      // Show error message or handle the error as needed
    });
}

// Call the fetchGoalData function to update the UI with the latest goal data
fetchGoalData();
  
  