// Ryan DeVault - Purpose: listens for the delete button within an article 
// to be pressed which promptly deletes the related article and refreshes the list

// Imports
import { deleteArticle } from "./articleDataProvider.js";

// Selectors
const eventHub = document.querySelector(".container");

eventHub.addEventListener("deleteArticle", event => deleteArticle(event.detail.articleId));