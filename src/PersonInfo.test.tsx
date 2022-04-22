import { render, screen } from "@testing-library/react";
import PersonInfo, { Props } from "./PersonInfo";

const data = {
  id: "1",
  jobTitle: "Fabricator",
  emailAddress: "Ron_Giles3711@dionrab.com",
  firstNameLastName: "Ron Giles",
};

describe("PersonInfo", () => {
  const props: Props = {
    data,
    onClick: () => null,
  };

  test("renders component correctly", () => {
    const { container } = render(<PersonInfo {...props} />);
    expect(container).toBeInTheDocument();
  });

  test("renders name correctly", () => {
    render(<PersonInfo {...props} />);
    const nameElement = screen.getByText("Ron Giles");

    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent("Ron Giles");
  });

  test("renders job title correctly", () => {
    render(<PersonInfo {...props} />);
    const jobTitlelement = screen.getByText("Fabricator");

    expect(jobTitlelement).toBeInTheDocument();
    expect(jobTitlelement).toHaveTextContent("Fabricator");
  });

  test("renders email address correctly", () => {
    render(<PersonInfo {...props} />);
    const emailElement = screen.getByText(/@dionrab.com/i);

    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent("Ron_Giles3711@dionrab.com");
  });

  test("passes provided class name correctly", () => {
    const { container } = render(
      <PersonInfo {...props} className="highlight" />
    );
    expect(container.querySelector("div")).toHaveClass("highlight");
  });
});
