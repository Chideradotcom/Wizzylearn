// const SAMPLE_ARTICLES = [
//     {
//         title: "Sample News 1",
//         description: "This is a sample description for news article 1.",
//         url: "#",
//         urlToImage: "https://picsum.photos/600?random=1",
//         publishedAt: new Date().toISOString()
//     },
//     {
//         title: "Sample News 2",
//         description: "This is a sample description for news article 2.",
//         url: "#",
//         urlToImage: "https://picsum.photos/600?random=2",
//         publishedAt: new Date().toISOString()
//     }
//     // Add more sample articles as needed
// ];

const BASE_URL='https://newsapi.org/v2'
const API_KEY="a3bc3a96fcad48a59d83b2897af1ba31"

let newsContentWrapper, newsSearchInput, newsShowMessage

async function getNews(){
    showMessage("Loading...")
    try {
        const res = await fetch(`${BASE_URL}/top-headlines?country=us&category=technology&apiKey=${API_KEY}`)
        const data=await res.json()
        
        return data
    } catch (error) {
        showMessage("Failed to load news.")
        return { articles: [] }
    }
    return { articles: SAMPLE_ARTICLES }
}

async function getSearchNews(query) {
    showMessage("Loading...")
    try {
        const res = await fetch(`${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`)
        const data = await res.json()
        return data
    } catch (error){
        showMessage("Failed to load news.")
        return { articles: [] }
    }
    //     const filtered = SAMPLE_ARTICLES.filter(article =>
    //     article.title.toLowerCase().includes(query.toLowerCase()) ||
    //     article.description.toLowerCase().includes(query.toLowerCase())
    // );
    // return { articles: filtered };

}

function renderNews(newsData = []) {
    newsContentWrapper.innerHTML = ""
    if(!newsData.length){
        showMessage("No news found.")
        return
    }
    newsData.forEach(news => {
        const defaultImage = "https://picsum.photos/600"
        const data = {
            urlImage: news.urlToImage ?? defaultImage,
            date: news.publishedAt ? new Date(news.publishedAt).toLocaleString() : "",
            title: news.title,
            description: news.description ?? "",
            url: news.url
        }
        const card = `
            <div class="news-card">
                <div class="news-card-image-wrapper">
                    <img src="${data.urlImage}" alt="picture">
                </div>
                <div class="news-card-content">
                    <span class="news-card-date">${data.date}</span>
                    <h2 class="news-card-title">
                        <a href="${data.url}" target="_blank">${data.title}</a>
                    </h2>
                    <p class="news-card-description">${data.description}</p>
                </div>
            </div>`;
        newsContentWrapper.insertAdjacentHTML('beforeend', card)
    })
    showMessage("")
}

function showMessage(msg){
    newsShowMessage.textContent=msg
    newsShowMessage.style.display=msg ? "block" : "none"
}
function initNews(){
    newsContentWrapper=document.getElementById("news-content-wrapper")
    newsSearchInput=document.getElementById("news-search-input")
    newsShowMessage=document.getElementById("news-show-message")

    getNews()
        .then(data=>renderNews(data.articles))
        

    newsSearchInput.addEventListener("input", event=>{
        const inputSearchValue=event.target.value.trim()
        newsContentWrapper.innerHTML=''
        if (inputSearchValue==='') {
            getNews().then(data=>renderNews(data.articles))
        } else {
            getSearchNews(inputSearchValue)
                .then(data=>renderNews(data.articles))
        }
    })
}

export default{
    initNews
}