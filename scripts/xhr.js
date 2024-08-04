const content = document.getElementById("content");
const sidebar = document.getElementById("sidebar");

(function () {
  const dataTo = { id: "223", title: "Moamen", views: 200 };
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          data.forEach(function (element) {
            const name = document.createElement("h2");
            name.innerText = element.name;
            const mail = document.createElement("h3");
            mail.innerText = element.email;
            const label = document.createElement("label");
            label.appendChild(name);
            label.appendChild(mail);
            const area = document.createElement("input");
            area.type = "radio";
            area.name = "user";
            area.id = `user${element.id}`;
            label.setAttribute("for", area.id);
            label.addEventListener("click", (e) => {
              showPosts(element.id);
            });
            const cont = document.createElement("div");
            cont.appendChild(area);
            cont.appendChild(label);
            sidebar.appendChild(cont);
          });
          showPosts(data[0].id);
        } catch (error) {
          console.error("JSON parse error: ", error);
        }
      } else {
        console.error("HTTP request failed with status: ", xhr.status);
      }
    }
  };
  xhr.send();
})();

function showPosts(userId) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    true
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          content.innerHTML = "";
          const data = JSON.parse(xhr.responseText);
          data.forEach((element) => {
            const title = document.createElement("h3");
            title.innerText = element.title;
            const contentBody = document.createElement("h4");
            contentBody.innerText = element.body;
            const container = document.createElement("div");
            container.appendChild(title);
            container.appendChild(document.createElement("hr"));
            container.appendChild(contentBody);
            content.appendChild(container);
          });
        } catch (error) {
          console.error("JSON parse error: ", error);
        }
      } else {
        console.error("HTTP request failed with status: ", xhr.status);
      }
    }
  };
  xhr.send();
}
