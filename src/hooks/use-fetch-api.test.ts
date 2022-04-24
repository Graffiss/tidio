import { renderHook } from "@testing-library/react-hooks";
import useFetchAPI from "./use-fetch-api";
import mockData from "../mockData.json";
import * as api from "../api";

const data = mockData.slice(0, 1);

beforeEach(() => {
  jest.spyOn(api, "default").mockResolvedValue(data);
});

afterEach(() => {
  jest.spyOn(api, "default").mockRestore();
});

describe("useFetchAPI hook", () => {
  test("hook make fetch request when rendered initially to DOM", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchAPI());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(data);
  });

  test("hook make request for additional data when loadMoreData method has been called", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchAPI());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);

    result.current.loadMoreData();

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([...data, ...data]);
  });

  test("hook returns error value when something went wrong", async () => {
    jest
      .spyOn(api, "default")
      .mockRejectedValueOnce(new Error("Something went wrong"));

    const { result, waitForNextUpdate } = renderHook(() => useFetchAPI());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("");

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Something went wrong");
  });
});
