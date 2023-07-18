import { addClientModal } from "./addClient.js";
import { createPreloader } from "./preloader.js";
import { svgAddUser } from "./svg.js";

export const createClientsSection = () => {
  // создадим структуру
  const section = document.createElement("section");
  const h1 = document.createElement("h1");
  const container = document.createElement("div");
  const main = document.createElement("main");
  const sortingDisplay = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const sortingDisplayId = document.createElement("th");
  const sortingDisplayName = document.createElement("th");
  const sortingDisplayCreate = document.createElement("th");
  const sortingDisplayEdit = document.createElement("th");
  const sortingDisplayContacts = document.createElement("th");
  const sortingDisplayActions = document.createElement("th");
  const sortingDisplaySpan = document.createElement("span");
  const addUserBtn = document.createElement("button");
  const addUserBtnSvg = document.createElement("span");
  const tableWrapper = document.createElement("div");
  const clientsTable = document.createElement("table");
  const tbody = document.createElement("tbody");
  const createSpan = document.createElement("span");
  const editSpan = document.createElement("span");
  // создадим массив с элементами, по которым возможна сортировка
  const sortDisplayItems = [
    sortingDisplayId,
    sortingDisplayName,
    sortingDisplayCreate,
    sortingDisplayEdit,
  ];
  // далее будем брать этот массив, проходиться по item и делать проверку на положение иконки стрелки
  for (const item of sortDisplayItems) {
    item.addEventListener("click", () => {
      if (item.classList.contains("sort-down")) {
        item.classList.remove("sort-down");
        item.classList.add("sort-up");
      } else {
        item.classList.add("sort-down");
        item.classList.remove("sort-up");
      }
    });
  }
  // т.к. в некоторые элементы стрелки вложены, для них будет отдельная логика
  sortingDisplayCreate.addEventListener("click", () => {
    if (sortingDisplayCreate.classList.contains("sort-down")) {
      createSpan.classList.add("sort-up");
    } else {
      createSpan.classList.remove("sort-up");
    }
  });

  sortingDisplayEdit.addEventListener("click", () => {
    if (sortingDisplayEdit.classList.contains("sort-down")) {
      editSpan.classList.add("sort-up");
    } else {
      editSpan.classList.remove("sort-up");
    }
  });

  // добавим атрибуты
  sortingDisplayId.setAttribute("data-type", "id");
  sortingDisplayName.setAttribute("data-type", "text");
  sortingDisplayCreate.setAttribute("data-type", "create");
  sortingDisplayEdit.setAttribute("data-type", "update");
  // добавим классы
  main.classList.add("main");
  section.classList.add("clients");
  tableWrapper.classList.add("clients__wrapper");
  h1.classList.add("clients__heading", "section-text");
  theadTr.classList.add("clients__thead");
  tbody.classList.add("clients__tbody");
  sortingDisplay.classList.add("clients__display", "display-info");
  sortingDisplayId.classList.add(
    "display-info__item",
    "display-info__item--id",
    "sort-up"
  );
  sortingDisplayName.classList.add(
    "display-info__item",
    "display-info__item--name",
    "sort-down"
  );
  sortingDisplayCreate.classList.add(
    "display-info__item",
    "display-info__item--create",
    "sort-down"
  );
  sortingDisplayEdit.classList.add(
    "display-info__item",
    "display-info__item--change",
    "sort-down"
  );
  sortingDisplayContacts.classList.add(
    "display-info__item",
    "display-info__item--contacts"
  );
  sortingDisplayActions.classList.add(
    "display-info__item",
    "display-info__item--actions"
  );
  sortingDisplaySpan.classList.add("display-info__sorting");
  addUserBtn.classList.add("clients__btn", "btn-reset");
  addUserBtnSvg.classList.add("clients__svg");
  container.classList.add("container", "clients__container");
  clientsTable.classList.add("clients__table");
  createSpan.classList.add("create__span");
  editSpan.classList.add("change__span");
  // заполним контент
  h1.textContent = "Клиенты";
  sortingDisplayId.textContent = "id";
  sortingDisplayName.textContent = "Фамилия Имя Отчество";
  sortingDisplaySpan.textContent = "а-я";
  sortingDisplayCreate.textContent = "Дата и время создания";
  sortingDisplayEdit.textContent = "Последние изменеия";
  sortingDisplayContacts.textContent = "Контакты ";
  sortingDisplayActions.textContent = "Действия ";
  addUserBtn.textContent = "Добавить клиента";
  addUserBtnSvg.innerHTML = svgAddUser;

  addUserBtn.addEventListener("click", () => {
    const app = document.querySelector(".app");
    app.append(addClientModal());
  });
  // разместим элементы
  main.append(section);
  section.append(container);
  sortingDisplayName.appendChild(sortingDisplaySpan);
  sortingDisplayCreate.append(createSpan);
  sortingDisplayEdit.append(editSpan);
  theadTr.append(
    sortingDisplayId,
    sortingDisplayName,
    sortingDisplayCreate,
    sortingDisplayEdit,
    sortingDisplayContacts,
    sortingDisplayActions
  );
  sortingDisplay.append(theadTr);
  tableWrapper.append(clientsTable, createPreloader());
  clientsTable.append(sortingDisplay, tbody);
  addUserBtn.append(addUserBtnSvg);
  container.append(h1, tableWrapper, addUserBtn);

  return {
    main,
    clientsTable,
    tbody,
  };
};
