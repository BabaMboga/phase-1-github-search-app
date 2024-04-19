document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github_fornm');
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
        const apiUrl = `https://api.github.com/searcg/users?q=${searchTerm}`;
        fetch(apiUrl)
    }

})