// URL da API para notícias do Wall Street Journal
const apiUrl = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=7f0cc8a418064a56b96cd8201018f56c';

// Seleciona o contêiner onde as notícias serão exibidas
const newsContainer = document.getElementById('news-container');

// Função para buscar e exibir as notícias
async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        
        // Verifica se a API retornou artigos
        if (data.articles && data.articles.length > 0) {
            // Itera sobre cada artigo e cria um elemento HTML para ele
            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('news-article');
                
                // Use a imagem, se disponível, ou uma imagem padrão
                const imageUrl = article.urlToImage || 'https://via.placeholder.com/150';

                articleElement.innerHTML = `
                    <img src="${imageUrl}" alt="Imagem da notícia" style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 10px;">
                    <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                    <p>${article.description || 'Descrição não disponível.'}</p>
                `;
                
                newsContainer.appendChild(articleElement);
            });
        } else {
            newsContainer.innerHTML = '<p>Nenhum artigo encontrado.</p>';
        }

    } catch (error) {
        console.error('Falha ao buscar as notícias:', error);
        newsContainer.innerHTML = `<p>Não foi possível carregar as notícias. Por favor, verifique a chave da API ou a URL. Detalhes: ${error.message}</p>`;
    }
}

// Chama a função para buscar as notícias quando a página é carregada
fetchNews();