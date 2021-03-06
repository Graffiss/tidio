import { renderHook } from "@testing-library/react-hooks";
import { fireEvent, render, screen } from "@testing-library/react";
import * as api from "./api";
import mockData from "./mockData.json";
import useFetchAPI from "./hooks/use-fetch-api";
import App from "./App";

const data = mockData.slice(0, 1);

beforeEach(() => {
  jest.spyOn(api, "default").mockResolvedValue(data);
});

afterEach(() => {
  jest.spyOn(api, "default").mockRestore();
});

describe("Loading state", () => {
  test("before initial data fetch call", () => {
    render(<App />);

    const loadMoreButton = screen.queryByText("Load more");
    const loadingDataText = screen.getByText("Loading data...");

    expect(loadMoreButton).not.toBeInTheDocument();
    expect(loadingDataText).toBeInTheDocument();
    expect(loadingDataText).toHaveTextContent("Loading data...");
  });

  test("after initial data fetch call", async () => {
    render(<App />);
    const { waitForNextUpdate } = renderHook(() => useFetchAPI());

    await waitForNextUpdate();

    const loadMoreButton = screen.getByText("Load more");
    const loadingDataText = screen.queryByText("Loading data...");

    expect(loadMoreButton).toBeInTheDocument();
    expect(loadMoreButton).toHaveTextContent("Load more");
    expect(loadingDataText).not.toBeInTheDocument();
  });
});

describe("Error state", () => {
  test("after fetch call with an error", async () => {
    jest
      .spyOn(api, "default")
      .mockRejectedValueOnce(new Error("Something went wrong"));
    render(<App />);
    const { waitForNextUpdate } = renderHook(() => useFetchAPI());

    await waitForNextUpdate();

    const tryAgainButton = screen.getByText("Try again");
    const somethingWentWrongText = screen.getByText(/went wrong/i);

    expect(tryAgainButton).toBeInTheDocument();
    expect(tryAgainButton).toHaveTextContent("Try again");

    expect(somethingWentWrongText).toBeInTheDocument();
    expect(somethingWentWrongText).toHaveTextContent("Something went wrong");
  });
});

describe("Addind cards to Selected array", () => {
  test("togglePersonCard function works properly", async () => {
    render(<App />);
    const { waitForNextUpdate } = renderHook(() => useFetchAPI());

    await waitForNextUpdate();

    const personInfo = screen.getByTestId("person-info");
    const selected = screen.getByText(/selected contacts/i);

    expect(selected).toHaveTextContent("Selected contacts: 0");

    fireEvent.click(personInfo);
    expect(selected).toHaveTextContent("Selected contacts: 1");
  });
});
