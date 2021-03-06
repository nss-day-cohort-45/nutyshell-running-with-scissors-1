import { getUsers, useUsers } from './users/userDataProvider.js';
import { getArticles } from './articles/articleDataProvider.js';
import { getEvents } from './events/eventProvider.js';
import { getTasks } from './tasks/taskDataProvider.js';
import { getUserMessages } from './messages/userMessagesDataProvider.js';
import { getMessages } from './messages/messagesDataProvider.js';
import { getFriends } from './friends/friendDataProvider.js';
import { LoginForm } from './auth/LoginForm.js';
import { RegisterForm } from './auth/RegisterForm.js';
import { weatherList } from './weather/weatherList.js';
import { EventList } from './events/EventList.js';
import { messageList } from './messages/messageList.js';

import { taskList } from './tasks/taskList.js';
import { FriendList } from './friends/FriendList.js';
import { ArticleList } from './articles/ArticleList.js';
import { getFriendRequests } from './friends/friendRequestDataProvider.js';

const eventHub = document.querySelector('.container');
const contentTarget = document.querySelector('.dashboard');

const promises = [
  getUsers(),
  getArticles(),
  getEvents(),
  getTasks(),
  getMessages(),
  getFriends(),
  getUserMessages(),
  getFriendRequests(),
];

// logout button event handler
eventHub.addEventListener('click', (e) => {
  if (e.target.id === 'logout') {
    sessionStorage.clear();
    contentTarget.innerHTML = '';
    LoginForm();
    RegisterForm();
  }
});

export const Nutshell = () =>
  getUsers().then(() => {
    Promise.all(promises).then(render);
  });

const CurrentUser = () => {
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
  const users = useUsers();
  const name = users.find((u) => u.id === activeUserId);
  return `<div class="top-row__current-user">Current User: <b>${name.username}</b></div>`;
};

const render = () => {
  // Initialize local weather
  weatherList();

  // Render all your UI components here
  contentTarget.innerHTML = `
    <article class="top-row">
      ${CurrentUser()}
      <div class="top-row__current-weather text-center text-white">
        <h4>CURRENT WEATHER</h4>  
      </div>
      <div class="top-row__logout-button"><button id="logout">Log Out</button></div>
    </article>
    <main>
      <aside class="friend-list">
      <h2 class="text-center">FRIENDS</h2>
        ${FriendList()}
      </aside>
      <div class="nutshell-main-view">
        <article>
          <section class="event-list">
          <h2 class="text-center">EVENTS</h2>
            ${EventList()}
          </section>
          <section class="article-list">
          <h2 class="text-center">ARTICLES</h2>
          ${ArticleList()}   
        </section>
        </article>
        <article>
        <section class="message-list">
        <h2 class="text-center">MESSAGES</h2>
          ${messageList()}
        </section>
          <section class="task-list">
            <h2 class="text-center">TASKS</h2>
            ${taskList()}   
            </section>
        </article>
      </div>
    </main>
    `;
};

eventHub.addEventListener('eventsStateChanged', () => {
  document.querySelector('.event-list').innerHTML = `
  <h2 class="text-center">EVENTS</h2>${EventList()}`;
});
// Listen for a state change in articles
eventHub.addEventListener("articlesStateChanged", () => 
  document.querySelector('.article-list').innerHTML = `
  <h2 class="text-center">ARTICLES</h2>${ArticleList()}`
);

// Listen for a state change in messages
eventHub.addEventListener('messagesStateChanged', () => {
  // Update my app state data to properly update the DOM
  getUsers()
    .then(getMessages)
    .then(getUserMessages)
    .then(() => {
      // Rend to the DOM
      document.querySelector('.message-list').innerHTML = `
      <h2 class="text-center">MESSAGES</h2>${messageList()}`
      // Define the chat area
      let chatBox = document.getElementById('chatMessages');
      // Keep the chat area scrolled to the bottom to show most recent messages only
      chatBox.scrollTop = chatBox.scrollHeight;
    });
});
eventHub.addEventListener('friendsStateChanged', () => {
  document.querySelector('.friend-list').innerHTML = `
  <h2 class="text-center">FRIENDS</h2>${FriendList()}`;
});

//Listen for state change of tasks
eventHub.addEventListener('tasksStateChanged', () => {
  document.querySelector('.task-list').innerHTML = `
  <h2 class="text-center">TASKS</h2>${taskList()}`;
});
