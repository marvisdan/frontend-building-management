import { RenderHookResult, act, renderHook } from "@testing-library/react";
import useCopyToClipboard, { ReturnType } from "../useCopyToClipboard";

describe("useCopyToClipboard", () => {
  const mockText = "Text to copy";
  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: jest.fn(() => Promise.resolve()) },
      writable: true,
    });
  });

  it("should copy text to clipboard successfully", async () => {
    let hook: RenderHookResult<ReturnType, {}> | undefined;
    await act(async () => {
      hook = renderHook<ReturnType, {}>(useCopyToClipboard);
    });

    await act(async () => {
      hook?.result.current.copy(mockText);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockText);
    expect(hook?.result.current.copiedText).toEqual(mockText);
  });

  it("should handle copy failure", async () => {
    let hook: RenderHookResult<ReturnType, {}> | undefined;

    await act(async () => {
      hook = renderHook<ReturnType, {}>(useCopyToClipboard);
    });

    (navigator.clipboard.writeText as jest.Mock).mockImplementationOnce(() =>
      Promise.reject()
    );

    await act(async () => {
      hook?.result.current.copy(mockText);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockText);
    expect(hook?.result.current.copiedText).toBeNull();
  });

  it("should not copy when clipboard is not supported", async () => {
    let hook: RenderHookResult<ReturnType, {}> | undefined;

    await act(async () => {
      hook = renderHook<ReturnType, {}>(useCopyToClipboard);
    });

    (navigator as any).clipboard = null;

    await act(async () => {
      hook?.result.current.copy(mockText);
    });

    expect(hook?.result.current.copiedText).toBeNull();
  });
});
