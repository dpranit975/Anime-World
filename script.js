document.addEventListener('DOMContentLoaded', () => {
    fetch('api/anime.php')
        .then(response => response.json())
        .then(data => {
            const animeContainer = document.getElementById('home');
            data.forEach(anime => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <a href="#" class="button">
                        <img src="${anime.image}" alt="${anime.title}">
                        <div class="card-content">
                            <h3>${anime.title}</h3>
                        </div>
                    </a>
                `;
                animeContainer.appendChild(card);
            });
        });
});

function dismissMessage() {
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        messageBox.style.display = 'none';
    }
}

setTimeout(dismissMessage, 5000);

const animeData = [
    { title: "Solo Leveling", link: 'solo_leveling.html' },
    { title: "Mashle Magic and Muscles", link: 'mashle_magic_&_muscles.html' },
    { title: "Tokyo Revengers", link: 'Tokyo_Revengers.html' },
    { title: "Spy X Family", link: 'Spy_X_Family.html' },
    { title: "Wind Breaker", link: 'Wind_Breaker.html' },
    { title: "Baki Hanma", link: 'Baki_Hanma.html' },
    { title: "Your Name", link: 'Movies/your name.mp4' },
    { title: "5 Centimeter Per Second", link: 'Movies/5 Centimeter per second .mp4' },
    { title: "Weathering With You", link: 'Movies/weathering with you.mp4' },
    { title: "Suzume", link: 'Movies/Suzume.mp4' },
    { title: "Naruto The Last Tower", link: 'Movies/naruto the last tower.mp4' },
    { title: "Naruto The Last Movie", link: 'Movies/naruto the last movie.mp4' },
    { title: "86 (Eighty Six)", link: '86.html' },
];

function showSuggestions(input) {
    const suggestionList = document.getElementById("suggestionList");
    suggestionList.innerHTML = ""; // Clear previous suggestions

    if (input.trim().length === 0) return; // Stop if input is empty

    const suggestions = animeData.filter(anime =>
        anime.title.toLowerCase().includes(input.toLowerCase())
    );

    suggestions.forEach(anime => {
        const li = document.createElement("li");
        li.textContent = anime.title;
        li.onclick = () => openAnime(anime);
        suggestionList.appendChild(li);
    });
}

function openAnime(anime) {
    window.open(anime.link, '_blank'); // Open the anime link in a new tab
}

function searchAnime() {
    const input = document.getElementById("searchBar").value.trim().toLowerCase();
    if (!input) return; // Stop if input is empty

    const anime = animeData.find(a => a.title.toLowerCase() === input);
    if (anime) {
        openAnime(anime);
    } else {
        alert("Anime not found!");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById('searchBar');
    const searchIcon = document.getElementById('searchIcon');

    if (searchBar) {
        searchBar.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchAnime();
            }
        });
    }

    if (searchIcon) {
        searchIcon.addEventListener('click', function () {
            searchAnime();
        });
    }
});


// Form submission
document.getElementById("animeForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevents the default form submission (no page refresh)

    // Collect the form data
    let formData = new FormData(this);

    // Send the data to submit.php using fetch (AJAX)
    fetch("https://anime-world.epizy.com/submit.php", {  // Update with your PHP URL on InfinityFree
        method: "POST",
        body: formData
    })
    .then(response => response.text())  // Convert the response to text
    .then(data => {
        alert(data);  // Show the success/error message from PHP
        // Optionally, clear the form after submission
        document.getElementById("animeForm").reset();
    })
    .catch(error => {
        console.error("Error:", error);  // Log any error in the console
        alert("There was an error with the submission.");
    });
});
