const content = document.getElementById("content");
const sidebar = document.getElementById("sidebar");

async function fetchUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}

async function fetchPosts(userId) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch posts for user ${userId}:`, error);
  }
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
  if (posts) {
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
}

(async function init() {
  const users = await fetchUsers();
  if (users) {
    users.forEach(createSidebarItem);
    if (users.length > 0) {
      showPosts(users[0].id);
    }
  }
})();
