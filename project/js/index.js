import { createClientsHeader } from "./createHeader.js";
import { createClientsSection } from "./createClientsSection.js";
import { getClients } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClientTable.js";
import { searchClients } from "./searchClients.js";

const createApp = async () => {
  const app = document.querySelector(".app");
  const header = createClientsHeader();
  const clientSection = createClientsSection();
  app.append(header, clientSection.main);
  const preloader = document.querySelector(".preloader");
  const tableWrapper = document.querySelector(".clients__wrapper");

  try {
    tableWrapper.style.overflow = "visible";
    const clients = await getClients();
    searchClients(clients);

    for (const client of clients) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(client));
    }
  } catch (error) {
    alert(`Произошла ошибка: ${error}`);
    // console.log(error);
  } finally {
    preloader.remove();

    tableWrapper.style.overflow = "auto";
  }
};

createApp();
document.addEventListener("DOMContentLoaded", sortTable);
