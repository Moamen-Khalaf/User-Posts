const content = document.getElementById("content");
const sidebar = document.getElementById("sidebar");

async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
}

async function fetchPosts(userId) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
}

function createSidebarItem(user) {
  const name = document.createElement("h2");
  name.innerText = user.name;

  const mail = document.createElement("h3");
  mail.innerText = user.email;

  const label = document.createElement("label");
  label.appendChild(name);
  label.appendChild(mail);

  const area = document.createElement("input");
  area.type = "radio";
  area.name = "user";
  area.id = `user${user.id}`;
  label.setAttribute("for", area.id);

  label.addEventListener("click", () => showPosts(user.id));

  const cont = document.createElement("div");
  cont.appendChild(area);
  cont.appendChild(label);

  sidebar.appendChild(cont);
}

async function showPosts(userId) {
  const posts = await fetchPosts(userId);
  content.innerHTML = "";
  posts.forEach((post) => {
    const title = document.createElement("h3");
    title.innerText = post.title;

    const contentBody = document.createElement("h4");
    contentBody.innerText = post.body;

    const container = document.createElement("div");
    container.appendChild(title);
    container.appendChild(document.createElement("hr"));
    container.appendChild(contentBody);

    content.appendChild(container);
  });
}

(async function init() {
  try {
    const users = await fetchUsers();
    users.forEach(createSidebarItem);
    if (users.length > 0) {
      await showPosts(users[0].id);
    }
  } catch (error) {
    console.error("Initialization failed:", error);
  }
})();
