document.addEventListener('DOMContentLoaded', () => {
  
      // Function to update the cards with fetched data
      async function updateCards() {
        try {
          const response = await fetch("https://social-media-dashboard-server.vercel.app/instagram");
          const data = await response.json();
      
          // Sort the data array based on the dates in descending order
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
      
          // Get the latest data entry
          const latestData = data[0];
      
          // Convert string values to integers
          latestData.followerCount = parseInt(latestData.followerCount, 10);
          latestData.profileVisits = parseInt(latestData.profileVisits, 10);
          latestData.totalInteractions = parseInt(latestData.totalInteractions, 10);
      
          // Calculate and update the engagement rate
          const engagementRate =
            (latestData.totalInteractions / latestData.followerCount) * 100;
      
          // Update the card elements with the fetched data
          document.getElementById("followersCount").textContent =
            latestData.followerCount;
          document.getElementById("profileVisitsCount").textContent =
            latestData.profileVisits;
          document.getElementById("postInteractionsCount").textContent =
            latestData.totalInteractions;
          document.getElementById("engagementRate").textContent =
            engagementRate.toFixed(2) + "%";
        } catch (error) {
          console.error("Error fetching data:", error);
          // Show error message
          const errorMessage = document.createElement("p");
          errorMessage.textContent =
            "Error fetching data. Please try again later.";
          errorMessage.classList.add("error-message");
          document.querySelector(".main-container").appendChild(errorMessage);
        }
      }

      function clearSuccessMessage() {
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }
      }
      

      // Call the updateCards function to fetch and update the data on page load
      updateCards();

      const analyticsForm = document.getElementById("instagramForm");

      analyticsForm.addEventListener("submit", (e) => {
        e.preventDefault();
      
        const formData = new FormData(analyticsForm);
        const data = Object.fromEntries(formData.entries());
      
        fetch("https://social-media-dashboard-server.vercel.app/api/instagram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("Form data submitted:", result);
            // Show success message
            const successMessage = document.createElement("p");
            successMessage.textContent = "Form data submitted successfully!";
            successMessage.classList.add("success-message");
            document.querySelector(".form-container").appendChild(successMessage);
            // Clear the success message after a few seconds
            clearSuccessMessage();
            // Fetch and update the cards with the latest data
            updateCards();
          })
          .catch((error) => {
            console.error("Error submitting form data:", error);
            // Show error message
            const errorMessage = document.createElement("p");
            errorMessage.textContent =
              "Error submitting form data. Please try again later.";
            errorMessage.classList.add("error-message");
            document.querySelector(".form-container").appendChild(errorMessage);
          });
      });      
    
  
  });
  

  