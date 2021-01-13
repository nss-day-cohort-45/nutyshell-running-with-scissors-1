// Ryan DeVault - Purpose: Converts provided article object 
// into an HTML representation and returns it.
export const ArticleConverter = (articleObject) => {
    // Initialize Variables
    let owner = "";
    let editBtn ="";
    let deleteBtn = "";

    // Check to see if the current article is owned by the current user or a friend
    if(articleObject.isFriend){
        // If this is a friend's article, specify that it is and disallow the delete & edit buttons
        owner = "friendArticle";
        editBtn = "";
        deleteBtn = "";
    } else {
        // If this is the current user's article, specify that it is and allow the delete and edit buttons
        owner = "userArticle";
        editBtn = `<button id="editArticle--${articleObject.id}">Edit Article</button>`;
        deleteBtn = `<button id="deleteArticle--${articleObject.id}">Delete Article</button>`;
    };
    return `
        <div class="article-card, ${owner}" id="article-card--${articleObject.id}">
            <div class="article__title">${articleObject.title}</div>
            <div class="article__url">${articleObject.url}</div>
            <div class="article__synopsis">${articleObject.synopsis}</div>
            <div class="article__buttons">
                ${editBtn}
                ${deleteBtn}
            </div>
            
        </div>
    `;
};