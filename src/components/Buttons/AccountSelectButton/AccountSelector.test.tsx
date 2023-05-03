import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AccountSelectorButton } from "./AccountSelectorButton";
// import { MassaToken } from "../../../assets/svg-components/MassaToken";
import { FiUser, FiAlertTriangle } from "react-icons/fi";

describe("Components | Buttons | Account Selector", () => {
  test("it should render", () => {
    const args = {
      profileimage: <FiUser className="text-neutral" />,
      accountname: "account #",
<<<<<<< HEAD
      svg: <FiAlertTriangle />,
=======
      massatoken: <MassaToken theme={theme} />,
>>>>>>> 4d1b096 (Refactored AccSelectBtn + test suits)
      accountbalance: "0,000.00",
    };
    render(<AccountSelectorButton {...args} />);

    let accountSelector = screen.getByTestId("account-selector-button");

    expect(accountSelector).toBeTruthy();
  });

  test("it fire the onClick fn", () => {
    const onClickMock = jest.fn();
<<<<<<< HEAD
    const args = {
      profileimage: <FiUser className="text-neutral" />,
      accountname: "account #",
      svg: <FiAlertTriangle />,
=======
    const theme = "theme-light";
    const args = {
      profileimage: <FiUser className="text-neutral" />,
      accountname: "account #",
      massatoken: <MassaToken theme={theme} />,
>>>>>>> 4d1b096 (Refactored AccSelectBtn + test suits)
      accountbalance: "0,000.00",
    };
    render(<AccountSelectorButton onClick={onClickMock} {...args} />);

    let accountSelector = screen.getByTestId("account-selector-button");
    fireEvent.click(accountSelector);
    expect(onClickMock).toHaveBeenCalled();
    expect(accountSelector).toBeTruthy();
  });
});
