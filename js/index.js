document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github_form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    let searchType = 'user'; // ensures default search type is 'user'

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            if (searchType === 'user') {
                searchUsers(searchTerm);
            } else if (searchType === 'repo') {
                searchRepos(searchTerm);
            }
        }
    });

    // Search user function
    function searchUsers(searchTerm) {
        const apiUrl = `https://api.github.com/search/users?q=${searchTerm}`;
        fetch(apiUrl, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Bad Network reponse was not ok');
            }

            return response.json();
        })
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }

    // Function to display search results for users

    function displayUsers(users) {
        userList.innerHTML = ''
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `<img src="${user.avatar_url}" alt="${user.login}" width="50px">`
            li.addEventListener('click', function() {
                getUserRepos(user.login);
            });
            userList.appendChild(li);
        });
    }

    // Function to search for repositories
    function searchRepos(searchTerm) {
        const apiUrl = `https://api.github.com/search/repositories?q=${searchTerm}`;
        fetch(apiUrl, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();

        })
        .then(data => {
            displayRepos(data.items);

        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }

    // Function to display search results for repositiories 
    function displayRepos(repos) {
        reposList.innerHTML = '';
        repos.forEach(repo => {
            const li = document.createElement('li');
            li.textContent = repo.full_name;
            reposList.appendChild(li);
        });
    }

    // Function to get repositories for a specific user
    function getUserRepos(username) {
        const apiUrl = `https://api.github.com/users/${username}/repos`;
        fetch(apiUrl, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(' Bad network response');
            }
            return response.json()
        })
        .then(data => {
            displayRepos(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }

    // Bonus: Toggle search type between user and repo
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Search Type';
    toggleButton.addEventListener('click', function () {
        searchType = searchType === 'user' ? 'repo' : 'user';
        searchInput.placeholder = `Search ${searchType === 'user' ? 'Users' : 'Repos'}`;
    });

    form.appendChild(toggleButton);

});