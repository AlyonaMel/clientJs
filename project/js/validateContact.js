export const validateClientContact = (contactType, contactInput) => {
  const writeValue = document.getElementById("writeName");
  const onlyNumbers = /[^0-9]+$/g; // регулярное выражение, которое проверяет на наличие только цифр
  const onlyEmail = /[^a-zA-Z|@|.]+$/g;

  const onInputValue = (input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "var(--colorGraySuit)";
      writeValue.textContent = "";
    });

    input.oncut =
      input.oncopy =
      input.onpaste =
        () => {
          input.style.borderColor = "var(--colorGraySuit)";
          writeValue.textContent = "";
        };
  };

  const showErrorMessage = (message, block, input) => {
    block.textContent = message;
    input.style.borderColor = "var(--colorBurntSienna)";
  };

  onInputValue(contactInput);

  if (!contactInput.value) {
    showErrorMessage(
      "Не все добавленные контакты полностью заполнены!",
      writeValue,
      contactInput
    );
    return false;
  }

  switch (contactType.innerHTML) {
    case "Телефон":
      if (onlyNumbers.test(contactInput.value)) {
        showErrorMessage(
          "Допустим только ввод цифр!",
          writeValue,
          contactInput
        );
        return false;
      } else if (contactInput.value.length !== 11) {
        showErrorMessage(
          "Номер должен состоять из 11 цифр!",
          writeValue,
          contactInput
        );
        return false;
      }

      return true;
    case "Email":
      if (onlyEmail.test(contactInput.value)) {
        showErrorMessage(
          "Вы ввели некорректный Email!",
          writeValue,
          contactInput
        );
        return false;
      }

      return true;
    default:
      return true;
  }
};
