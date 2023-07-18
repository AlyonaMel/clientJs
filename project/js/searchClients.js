import { findClient } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";

export const searchClients = (clients) => {
  const findList = document.querySelector(".find-list");
  const input = document.querySelector(".header__input");

  clients.forEach((client) => {
    const findItem = document.createElement("li");
    const findLink = document.createElement("a");

    findItem.classList.add("find-list__item");
    findLink.classList.add("find-list__link");

    findLink.textContent = `${client.surname} ${client.name} ${client.lastName}`;
    findLink.href = "#";

    findItem.append(findLink);
    findList.append(findItem);
  });

  const rewriteTable = async (str) => {
    const response = await findClient(str);
    const tbody = document.querySelector(".clients__tbody");
    tbody.innerHTML = "";

    for (const client of response) {
      tbody.append(createClientItem(client));
    }
  };

  input.addEventListener("input", async () => {
    const value = input.value.trim();
    const foundItems = document.querySelectorAll(".find-list__link");

    if (value !== "") {
      rewriteTable(value);

      foundItems.forEach((link) => {
        if (link.innerText.search(value) == -1) {
          // сработает, если value будет не пустым
          link.classList.add("hide");
          link.innerHTML = link.innerText;
        } else {
          // если удалим текст из инпута, то всё вернётся обратно
          link.classList.remove("hide");
          findList.classList.remove("hide");
          const str = link.innerText;
          link.innerHTML = insertMark(
            str,
            link.innerText.search(value),
            value.length
          );
        }
      });
    } else {
      //
      foundItems.forEach((link) => {
        const tbody = document.querySelector(".clients__tbody");
        tbody.innerHTML = "";

        clients.forEach((client) => tbody.append(createClientItem(client)));

        link.classList.remove("hide");
        findList.classList.add("hide");
        link.innerHTML = link.innerText;
      });
    }
  });
  // функция, которая будет выделять нужное, будет принимать в себя 3 параметра(изначальная строка, подходящая по совпадению строка и длина строки, введенной в инпут)
  const insertMark = (str, pos, len) =>
    str.slice(0, pos) +
    "<mark>" +
    str.slice(pos, pos + len) +
    "</mark>" +
    str.slice(pos + len);
};
