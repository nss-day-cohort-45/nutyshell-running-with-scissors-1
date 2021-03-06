// author: Aaron Resch
// purpose: data provider for interacting with the friendRequests join table on the API

let friendRequests = [];

const eventHub = document.querySelector('.container');
const dispatchStateChangeEvent = () => {
  const requestChangeEvent = new CustomEvent('friendRequestsStateChanged');
  eventHub.dispatchEvent(requestChangeEvent);
  eventHub.dispatchEvent(new CustomEvent('eventsStateChanged'));
  eventHub.dispatchEvent(new CustomEvent('articlesStateChanged'));
  eventHub.dispatchEvent(new CustomEvent('messagesStateChanged'));
};

export const getFriendRequests = () => {
  return fetch('http://localhost:8088/friendRequests')
    .then((res) => res.json())
    .then((parsed) => {
      friendRequests = parsed;
    });
};

export const useFriendRequests = () => friendRequests.slice();

export const saveFriendRequest = (request) => {
  return fetch('http://localhost:8088/friendRequests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
    .then(getFriendRequests)
    .then(dispatchStateChangeEvent);
};

export const deleteFriendRequest = (requestId) => {
  return fetch(`http://localhost:8088/friendRequests/${requestId}`, {
    method: 'DELETE',
  })
    .then(getFriendRequests)
    .then(dispatchStateChangeEvent);
};

export const editFriendRequest = (request) => {
  return fetch(`http://localhost:8088/friendRequests/${request.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
    .then(getFriendRequests)
    .then(dispatchStateChangeEvent);
};
