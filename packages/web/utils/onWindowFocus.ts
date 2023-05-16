type State = {
  added: boolean;
  interval: false | ReturnType<typeof setInterval>;
  inFrame: boolean;
  callbacks: Array<SetFocusedCallback>;
};

type EnrichedHTMLIFrameElement = HTMLIFrameElement & {
  ___onWindowFocusHandled: boolean;
};

type SetFocusedCallback = (focused?: boolean) => void;

const state: State = {
  added: false,
  interval: false,
  inFrame: false,
  callbacks: [],
};

export const onWindowFocus = (newCallback: SetFocusedCallback) => {
  if (typeof window === "undefined") {
    return;
  }
  state.callbacks.push(newCallback);
  start();
  return () => {
    state.callbacks = state.callbacks.filter(
      (registeredCallback) => registeredCallback !== newCallback
    );
    stop();
  };
};

const runIFrameCheck = () => {
  const iframes = Array.from(document.getElementsByTagName("iframe"));
  console.debug("Polling iframes... found: ", iframes.length);

  (iframes as EnrichedHTMLIFrameElement[]).forEach((iframe) => {
    if (iframe.___onWindowFocusHandled) {
      return;
    }
    iframe.___onWindowFocusHandled = true;
    iframe.addEventListener("touchend", () => {
      state.inFrame = true;
    });
    iframe.addEventListener("mouseup", () => {
      state.inFrame = true;
    });
    iframe.addEventListener("focus", () => {
      state.inFrame = true;
    });
  });
};

const start = () => {
  if (state.interval) {
    clearInterval(state.interval);
  }

  if (!state.added) {
    state.added = true;
    window.addEventListener("focus", () => {
      if (state.inFrame) {
        state.inFrame = false;
        return;
      } else {
        state.callbacks.forEach((callback) => callback(true));
      }
    });
  }

  state.interval = setInterval(runIFrameCheck, 500);
};

const stop = () => {
  if (!state.callbacks.length && state.interval) {
    clearInterval(state.interval);
  }
};
