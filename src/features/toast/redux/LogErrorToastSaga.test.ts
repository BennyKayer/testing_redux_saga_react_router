import { expectSaga } from "redux-saga-test-plan";

import { ToastOptions } from "../types";
import { logErrorToast, logErrorToasts } from "./LogErrorToastSaga";

const errorToastOptions: ToastOptions = {
  title: "It's time to panic",
  status: "error",
};

const errorToastAction = {
  type: "test",
  payload: errorToastOptions,
};

test("saga calls analytics when it receives error toast", () => {
  return expectSaga(logErrorToasts, errorToastAction)
    .call(logErrorToast, "It's time to panic")
    .run();
});

const nonErrorToastAction = {
  type: "test",
  payload: {
    title: "No error occurred",
    status: "info" as const,
  },
};
test("log that's not error doesn't trigger analytics", () => {
  return (
    expectSaga(logErrorToasts, nonErrorToastAction)
      // arg here weird? right, time for partial assertions
      // .not.call(logErrorToast, "It's not time to panic")
      .not.call.fn(logErrorToast)
      .run()
  );
});
