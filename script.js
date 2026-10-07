import { API } from "./api.js";
const container = document.getElementById("users-container");

async function getUsers() {
  const response = await fetch(API.users);
  const users = await response.json();

  let html = "";

  for (const user of users) {
    html += `
      <a class="user-link" href="user.html?userId=${user.id}">
        <h2>${user.name}</h2>
        <p class="username">${user.username}</p>
        <p class="email">${user.email}</p>
        <p class="phone">${user.phone}</p>
        <p class="city">${user.address.city}</p>
      </a>
    `;
  }

  container.innerHTML = html;
}

getUsers();
