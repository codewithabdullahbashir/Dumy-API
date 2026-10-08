import { API } from "./api.js";

const uId = new URLSearchParams(location.search).get("userId");

async function UserData() {
  const userResp = await fetch(`${API.users}/${uId}`);
  const userdata = await userResp.json();

  document.title = `${userdata.name} -- Profile`;
  document.getElementById("name").textContent = userdata.name;
  document.getElementById("email").textContent = userdata.email;

  const postResp = await fetch(`${API.posts}?userId=${uId}`);
  const postdata = await postResp.json();

  let postsHTML = "";

  for (const post of postdata) {
    postsHTML += `
      <article>
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </article>
    `;
  }

  document.getElementById("posts").innerHTML = postsHTML;

  const albumResp = await fetch(`${API.albums}?userId=${uId}`);
  const albumdata = await albumResp.json();

  let albumHTML = "";

  for (const album of albumdata) {
    albumHTML += `
      <article>
        <h3>${album.title}</h3>
      </article>
    `;
  }

  document.getElementById("albums").innerHTML = albumHTML;

  let photosHTML = "";

  for (const album of albumdata) {
    const photosResp = await fetch(`${API.photos}?albumId=${album.id}`);
    const photos = await photosResp.json();

    for (const photo of photos) {
      photosHTML += `
        <img src="${photo.thumbnailUrl}" alt="${photo.title}">
      `;
    }
  }

  document.getElementById("photos").innerHTML = photosHTML;

  const commentsResp = await fetch(`${API.comments}`);
  const commentsData = await commentsResp.json();

  let commentsHTML = "";

  for (const comment of commentsData) {
    for (const post of postdata) {
      if (comment.postId === post.id) {
        commentsHTML += `
          <article class="item-card">
            <h3>${comment.name}</h3>
            <p>${comment.email}</p>
            <p>${comment.body}</p>
          </article>
        `;
      }
    }
  }

  document.getElementById("comments").innerHTML = commentsHTML;

  const todoResp = await fetch(`${API.todos}?userId=${uId}`);
  const todoData = await todoResp.json();

  let todosHTML = "";

  for (const todo of todoData) {
    let status = "Not Complete";

    if (todo.completed) {
      status = "Complete";
    }

    todosHTML += `
      <article class="card">
        <p>${todo.title}</p>
        <p>${status}</p>
      </article>
    `;
  }

  document.getElementById("todos").innerHTML = todosHTML;
}

UserData();
