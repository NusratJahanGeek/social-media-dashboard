document.addEventListener('DOMContentLoaded', () => {

    function fetchAndPopulateData() {
        fetch("https://social-media-dashboard-server.vercel.app/instagram")
          .then((response) => response.json())
          .then((data) => {
            const tableBody = document.querySelector("#data-table tbody");
    
            // Clear existing data from the table
            tableBody.innerHTML = "";
    
            // Sort the data by date in descending order (latest day on top)
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
    
            // Loop through the data and add rows to the table
            data.forEach((item) => {
              const row = document.createElement("tr");
              const engagementRate = calculateEngagementRate(item.followerCount, item.totalInteractions);
              row.innerHTML = `
                <td>${item.date}</td>
                <td>${item.followerCount}</td>
                <td>${item.profileVisits}</td>
                <td>${item.totalInteractions}</td>
                <td>${engagementRate}</td>
                <td>
                  <button onclick="editData('${item._id}')">Edit</button>
                  <button onclick="deleteData('${item._id}')">Delete</button>
                </td>
              `;
              tableBody.appendChild(row);
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            // Show error message if needed
          });
      }
    
      // Function to calculate Engagement Rate
      function calculateEngagementRate(followerCount, totalInteractions) {
        const engagementRate =
        (totalInteractions / followerCount) * 100;
        return engagementRate.toFixed(2) + "%";
      }
    
      // Function to edit data (you'll need to implement this)
      function editData(id) {
        // Fetch the data for the specified ID from the backend
        fetch(`https://social-media-dashboard-server.vercel.app/api/instagram/${id}`)
          .then((response) => response.json())
          .then((data) => {
            // Implement the logic to show a modal or form and populate it with the fetched data
            // For example, you can use a library like Bootstrap Modal or create a custom modal.
            // You can use the data returned from the server to populate the form fields.
            // Once the user submits the edited data, make a PUT request to the backend to update the data.
          })
          .catch((error) => {
            console.error("Error fetching data for editing:", error);
            // Show error message if needed
          });
      }
    
     
      // Call the function to fetch and populate data on page load
      fetchAndPopulateData();

      
});
