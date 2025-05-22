document.addEventListener('DOMContentLoaded', () => {
    const patternContainer = document.getElementById('pattern-container');
    const storyModal = document.getElementById('story-modal');
    const patternName = document.getElementById('pattern-name');
    const patternStory = document.getElementById('pattern-story');
    const closeBtn = document.querySelector('.close');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageNumbersContainer = document.getElementById('pageNumbers');

    let patterns = [];
    let originalPatterns = []; // 用于存储从后端获取的原始数据
    let currentPage = 1;
    const itemsPerPage = 6;

    // 从后端接口获取数据
    fetch('http://127.0.0.1:5000/patterns')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            originalPatterns = data; // 存储原始数据
            patterns = data; // 初始化 patterns 为原始数据
            renderPatterns(currentPage);
            renderPagination();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data: ' + error.message);
        });

    // 搜索功能
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            // 如果搜索框不为空，过滤数据
            patterns = originalPatterns.filter(pattern => pattern.name.toLowerCase().includes(searchTerm));
        } else {
            // 如果搜索框为空，重置为原始数据
            patterns = originalPatterns;
        }
        currentPage = 1; // 重置当前页为第一页
        renderPatterns(currentPage);
        renderPagination();
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    searchInput.addEventListener('focus', () => {
        searchInput.classList.add('expanded');
    });

    searchInput.addEventListener('blur', () => {
        if (!searchInput.value) {
            searchInput.classList.remove('expanded');
        }
    });

    // 分页功能
    const renderPatterns = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        patternContainer.innerHTML = '';
        patterns.slice(start, end).forEach(pattern => {
            const img = document.createElement('img');
            img.src = `/images/${pattern.name}.jpg`;
            img.alt = pattern.name;
            img.classList.add('pattern-image');
            img.addEventListener('click', () => {
                patternName.textContent = pattern.name;
                patternStory.textContent = pattern.background_story;
                storyModal.style.display = 'block';
            });
            patternContainer.appendChild(img);
        });
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(patterns.length / itemsPerPage);
        pageNumbersContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('button');
            pageItem.className = 'page-number';
            pageItem.innerText = i;
            if (i === currentPage) pageItem.classList.add('active');
            pageItem.addEventListener('click', () => {
                currentPage = i;
                renderPatterns(currentPage);
                renderPagination();
            });
            pageNumbersContainer.appendChild(pageItem);
        }
    };

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPatterns(currentPage);
            renderPagination();
        }
    });

    nextPageButton.addEventListener('click', () => {
        const totalPages = Math.ceil(patterns.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPatterns(currentPage);
            renderPagination();
        }
    });

    closeBtn.addEventListener('click', () => {
        storyModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === storyModal) {
            storyModal.style.display = 'none';
        }
    });
});