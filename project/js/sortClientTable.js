export const sortTable = () => {
  const table = document.querySelector("table");
  const headers = table.querySelectorAll("th");
  const tbody = table.querySelector("tbody");

  const directions = Array.from(headers).map(() => "");
  // console.log(directions);

  const transform = (type, content) => {
    switch (type) {
      case "id":
        return parseFloat(content);
      case "create":
        return content.split(".").reverse().join("-");
      case "update":
        return content.split(".").reverse().join("-");
      case "text":
      default:
        return content;
    }
  };

  const sortColumn = (index) => {
    const type = headers[index].getAttribute("data-type");
    // console.log(type);
    const rows = tbody.querySelectorAll("tr");
    //будем брать дирекцию только того хеддера, на который мы кликнули или будем присваивать ему sortUp
    const direction = directions[index] || "sortUp";
    const multiply = direction === "sortUp" ? 1 : -1;
    const newRows = Array.from(rows);

    newRows.sort((row1, row2) => {
      // будем брать каждую строку и сравнивать друг с другом
      const cellA = row1.querySelectorAll("td")[index].textContent;
      const cellB = row2.querySelectorAll("td")[index].textContent;

      const a = transform(type, cellA);
      const b = transform(type, cellB);
      // console.log(a, b);

      switch (true) {
        case a > b:
          return 1 * multiply;
        case a < b:
          return -1 * multiply;
        default:
          break;
        case a === b:
          return 0;
      }
    });

    [].forEach.call(rows, (row) => {
      tbody.removeChild(row);
    });

    directions[index] = direction === "sortUp" ? "sortDown" : "sortUp";

    newRows.forEach((newRow) => {
      tbody.appendChild(newRow);
    });
  };

  [].forEach.call(headers, (header, index) => {
    header.addEventListener("click", () => {
      sortColumn(index);
    });
  });
};
