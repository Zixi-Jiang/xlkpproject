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

    const patterns = [
        {
            name: '扎土盖',
            image: 'images/zatuogai.jpg',
            story: '土家人崇拜太阳，以农历六月初六为太阳的生辰，太阳河流域，不仅是土家文化的故乡，土家织锦也在这里生息发展，土家族人对火的崇拜则是对太阳崇拜的延伸，户户都设有“火床”太阳是正神之祖，象征光明、正气、吉祥。火可以驱邪，保护人间不受邪鬼骚扰。所以，象征太阳和火的“十”在土家民俗中普遍被重视，也是处处事事不可少的文化符号。“扎土盖”的最初本意显然是一个带有原始宗教信仰和道、佛宗教内含的双重图纹形态，它与太阳崇拜及太极图是一脉相承的，象征光明、正中，吉祥，生生不息的卐及其变异，更普遍和直接的大量用于土家织锦中，并表现得淋漓尽致。卐既可单独成型，作为主体图纹使用，也可将其分解成各种勾纹，大量作为陪衬和填充物，成为土家织锦中突出的装饰特征之一。'
        },
        // 其他纹样数据...
    ];

    patterns
.forEach(pattern => {
        const img = document.createElement('img');
        img
.src = pattern.image;
        img
.alt = pattern.name;
        img
.classList.add('pattern-image');
        img
.addEventListener('click', () => {
            patternName
.textContent = pattern.name;
            patternStory
.textContent = pattern.story;
            storyModal
.style.display = 'block';
        });
        patternContainer
.appendChild(img);
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
