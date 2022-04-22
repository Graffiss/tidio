import { renderHook } from "@testing-library/react-hooks";
import { render, screen } from "@testing-library/react";
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
    const { result, waitForNextUpdate } = renderHook(() => useFetchAPI());

    result.current.fetchData();

    await waitForNextUpdate();

    const loadMoreButton = screen.getByText("Load more");
    const loadingDataText = screen.queryByText("Loading data...");

    expect(loadMoreButton).toBeInTheDocument();
    expect(loadMoreButton).toHaveTextContent("Load more");
    expect(loadingDataText).not.toBeInTheDocument();
  });
});

describe("Error state", () => {
  test("after initial data fetch call with error", async () => {
    jest
      .spyOn(api, "default")
      .mockRejectedValueOnce(new Error("Something went wrong"));
    render(<App />);
    const { result, waitForNextUpdate } = renderHook(() => useFetchAPI());

    result.current.fetchData();

    await waitForNextUpdate();

    const tryAgainButton = screen.getByText("Try again");
    const somethingWentWrongText = screen.getByText(/went wrong/i);

    expect(tryAgainButton).toBeInTheDocument();
    expect(tryAgainButton).toHaveTextContent("Try again");

    expect(somethingWentWrongText).toBeInTheDocument();
    expect(somethingWentWrongText).toHaveTextContent("Something went wrong");
  });
});
