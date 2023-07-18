import { svgDelete } from "./svg.js";

export const createContactItem = () => {
  const contact = document.createElement("div");
  const contactType = document.createElement("div");
  const contactName = document.createElement("button");
  const contactList = document.createElement("ul");
  const contactPhone = document.createElement("li");
  const contactEmail = document.createElement("li");
  const contactVk = document.createElement("li");
  const contactFb = document.createElement("li");
  const contactOther = document.createElement("li");
  const contactInput = document.createElement("input");
  const contactDelete = document.createElement("button");
  const contactDeleteTooltip = document.createElement("span");

  contact.classList.add("contact");
  contactDeleteTooltip.classList.add("contact__tooltip", "site-tooltip");
  contactType.classList.add("contact__type");
  contactName.classList.add("contact__name", "btn-reset");
  contactList.classList.add("contact__list", "list-reset");
  contactPhone.classList.add("contact__item", "contact__phone");
  contactVk.classList.add("contact__item", "contact__vk");
  contactEmail.classList.add("contact__item", "contact__email");
  contactFb.classList.add("contact__item", "contact__fb");
  contactOther.classList.add("contact__item", "contact__other");
  contactInput.classList.add("contact__input");
  contactDelete.classList.add("contact__delete", "btn-reset");

  contactName.textContent = "Телефон";
  contactPhone.textContent = "Телефон";
  contactEmail.textContent = "Email";
  contactVk.textContent = "Vk";
  contactFb.textContent = "Facebook";
  contactOther.textContent = "Другое";
  contactDeleteTooltip.textContent = "Удалить контакт";
  contactInput.placeholder = "Введите данные";
  contactInput.type = "text";
  contactDelete.innerHTML = svgDelete;

  contactDelete.addEventListener("click", (e) => {
    e.preventDefault();
    contact.remove();
    document
      .querySelector(".modal__btn-contact")
      .classList.add("modal__btn-contact--active");
  });

  contactName.addEventListener("click", (e) => {
    // при нажатии добавится или уберется класс, который способствоет открытию списка и повороту стрелки
    e.preventDefault();
    contactList.classList.toggle("contact__list--active");
    contactName.classList.toggle("contact__list--active");
  });

  contactType.addEventListener("mouseleave", () => {
    // когда убираем мышку со списка, он закрывается
    contactList.classList.remove("contact__list--active");
    contactName.classList.remove("contact__list--active");
  });

  // при нажатии на какой-либо тип, он устанавливается в поле
  const setType = (type) => {
    type.addEventListener("click", () => {
      contactName.textContent = type.textContent;
      contactList.classList.remove("contact__list--active");
      contactName.classList.remove("contact__list--active");
    });
  };

  const typesArray = [
    contactPhone,
    contactEmail,
    contactVk,
    contactFb,
    contactOther,
  ];

  for (const type of typesArray) {
    setType(type);
  }
  contactDelete.append(contactDeleteTooltip);
  contact.append(contactType, contactInput, contactDelete);
  contactType.append(contactName, contactList);
  contactList.append(
    contactPhone,
    contactEmail,
    contactVk,
    contactFb,
    contactOther
  );

  return {
    contact,
    contactName,
    contactInput,
    contactDelete,
  };
};
