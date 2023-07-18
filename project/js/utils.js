import { contactTooltip } from "./createTooltip.js";
import { svgEmail, svgFb, svgOther, svgPhone, svgVk } from "./svg.js";

export const formatDate = (data) => {
  const newDate = new Date(data);

  const correctDate = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const resultDate = newDate.toLocaleString("ru", correctDate);

  return resultDate;
};

export const formatTime = (data) => {
  const newDate = new Date(data);

  const correctDate = {
    hour: "numeric",
    minute: "numeric",
  };

  const resultTime = newDate.toLocaleString("ru", correctDate);

  return resultTime;
};

export const createContactLink = (type, value, element, svg, item) => {
  // принимает тип контакта, значение контакта, элемент-ссылку, svg и тот элемент, в который она будет помещаться
  const setTooltip = contactTooltip(type, value);
  element = document.createElement("a");
  element.classList.add("contacts__link");
  element.innerHTML = svg;

  if (type === "Email") {
    element.href = `mailto:${value.trim()}`;
  } else if (type === "Телефон") {
    element.href = `tel:${value.trim()}`;
    setTooltip.tooltipValue.style.color = "var(--colorWhite)";
    setTooltip.tooltipValue.style.textDecoration = "none";
    // setTooltip.tooltipType.textContent = "";
  } else {
    element.href = value.trim();
  }
  element.append(setTooltip.tooltip);
  item.append(element);
};

export const createContactItemByType = (type, value, item) => {
  switch (type) {
    case "Телефон":
      let phone;
      createContactLink(type, value, phone, svgPhone, item);
      break;
    case "Email":
      let email;
      createContactLink(type, value, email, svgEmail, item);
      break;
    case "Vk":
      let vk;
      createContactLink(type, value, vk, svgVk, item);
      break;
    case "Facebook":
      let fb;
      createContactLink(type, value, fb, svgFb, item);
      break;
    case "Другое":
      let other;
      createContactLink(type, value, other, svgOther, item);
      break;

    default:
      break;
  }
};
