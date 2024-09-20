const API_KEY = 'AIzaSyDXJCgq_5ZmQyPLKAozjWC4etG_W-l4LD0';

const loginForm = document.getElementById('login-form');
const videoSearchContainer = document.querySelector('.video-search-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const videoPlayer = document.getElementById('video-player');
const videoFrame = document.getElementById('video-frame');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Simulate login logic (replace with your actual authentication logic)
  const user = authenticateUser(username, password);
  
  if (user) {
    // Hide login form and show video search
    loginForm.reset();
    loginForm.parentElement.classList.add('hidden');
    videoSearchContainer.classList.remove('hidden');
  } else {
    alert('Invalid username or password. Please try again.');
  }
});

searchButton.addEventListener('click', function() {
  const searchTerm = searchInput.value.trim();
  
  if (searchTerm === '') {
    alert('Please enter a search term.');
    return;
  }
  
  // Fetch YouTube search results using API
  searchYouTubeVideos(searchTerm);
});

function authenticateUser(username, password) {
  // Simulated user data (replace with your actual authentication logic)
  const users = [
    { username: 'bhoomi', password: 'password1' },
    { username: 'mouli', password: 'password2' },
    { username: 'bhuvan', password: 'nithya' }
  ];
  
  return users.find(user => user.username === username && user.password === password);
}

async function searchYouTubeVideos(searchTerm) {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    if (data.items.length === 0) {
      alert('No videos found for the search term.');
      return;
    }
    
    const videoId = data.items[0].id.videoId;
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    
    // Display video player
    videoFrame.src = videoUrl;
    videoPlayer.classList.remove('hidden');
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    alert('Failed to fetch YouTube data. Please try again later.');
  }
}