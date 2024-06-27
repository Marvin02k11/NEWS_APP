document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '80d7555970a64a799e5d7e2f7a023339';
    let page = 1;

    const newsContainer = document.getElementById('news-container');
    const loadMoreButton = document.getElementById('load-more');

    const fetchNews = async () => {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${page}&pageSize=9`);
        const data = await response.json();
        return data.articles;
    };

    const renderNews = (articles) => {
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'news-article';

            const articleContent = `
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;

            articleElement.innerHTML = articleContent;
            newsContainer.appendChild(articleElement);
        });
    };

    const loadMoreNews = async () => {
        const articles = await fetchNews();
        renderNews(articles);
        page++;
    };

    loadMoreButton.addEventListener('click', loadMoreNews);

    // Initial load
    loadMoreNews();
});
