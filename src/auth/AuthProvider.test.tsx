import { useApolloClient } from "@apollo/client";
import { useUserDetailsQuery } from "@dashboard/graphql";
import useNotifier from "@dashboard/hooks/useNotifier";
import { useAuthState } from "@saleor/sdk";
import { act, renderHook } from "@testing-library/react-hooks";
import { useIntl } from "react-intl";

import { useAuthProvider } from "./hooks/useAuthProvider";

const adminCredentials = {
  email: "admin@example.com",
  password: "admin",
  token: null,
};

const nonStaffUserCredentials = {
  email: "client@example.com",
  password: "password",
};

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

jest.mock("react-intl", () => ({
  useIntl: jest.fn(() => ({
    formatMessage: jest.fn(x => x.defaultMessage),
  })),
  defineMessages: jest.fn(x => x),
}));

jest.mock("@saleor/sdk", () => ({
  useAuth: jest.fn(() => ({
    login: jest.fn(() => ({
      data: {
        tokenCreate: {
          errors: [],
          user: {},
        },
      },
    })),
    logout: jest.fn(),
  })),
  useAuthState: jest.fn(() => undefined),
}));
jest.mock("@apollo/client", () => ({
  useApolloClient: jest.fn(() => ({
    clearStore: jest.fn(),
  })),
  ApolloError: jest.fn(),
}));

jest.mock("@dashboard/graphql", () => ({
  useUserDetailsQuery: jest.fn(() => ({
    data: undefined,
  })),
}));

jest.mock("@dashboard/hooks/useNotifier", () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

jest.mock("@dashboard/hooks/useNavigator", () => ({
  __esModule: true,
  default: jest.fn(() => () => undefined),
}));
jest.mock("@dashboard/hooks/useLocalStorage", () => ({
  __esModule: true,
  default: jest.fn(() => []),
}));
jest.mock("@dashboard/auth", () => ({
  useUser: jest.fn(),
}));
jest.mock("use-react-router", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    location: {},
  })),
}));

describe("AuthProvider", () => {
  it("Staff user will be logged in if has valid credentials", async () => {
    // Arrange
    const intl = useIntl();
    const notify = useNotifier();
    const apolloClient = useApolloClient();

    (useAuthState as jest.Mock).mockImplementation(() => ({
      authenticated: true,
      authenticating: false,
    }));
    (useUserDetailsQuery as jest.Mock).mockImplementation(() => ({
      data: {
        me: {
          email: adminCredentials.email,
          isStaff: true,
        },
      },
    }));

    // Act
    const hook = renderHook(() =>
      useAuthProvider({ intl, notify, apolloClient }),
    );

    // Assert
    expect(hook.result.current.user?.email).toBe(adminCredentials.email);
    expect(hook.result.current.authenticated).toBe(true);
  });

  it("User will not be logged in if doesn't have valid credentials", async () => {
    // Arrange
    const intl = useIntl();
    const notify = useNotifier();
    const apolloClient = useApolloClient();

    (useAuthState as jest.Mock).mockImplementation(() => ({
      authenticated: false,
      authenticating: false,
    }));
    (useUserDetailsQuery as jest.Mock).mockImplementation(() => ({
      data: {
        me: null,
      },
    }));

    // Act
    const hook = renderHook(() =>
      useAuthProvider({ intl, notify, apolloClient }),
    );

    // Assert
    expect(hook.result.current.user).toBe(null);
    expect(hook.result.current.authenticated).toBe(false);
  });

  it("Non-staff user will not be logged in", async () => {
    // Arrange
    const intl = useIntl();
    const notify = useNotifier();
    const apolloClient = useApolloClient();

    (useAuthState as jest.Mock).mockImplementation(() => ({
      authenticated: false,
      authenticating: false,
    }));
    (useUserDetailsQuery as jest.Mock).mockImplementation(() => ({
      data: {
        me: {
          email: nonStaffUserCredentials.email,
          isStaff: false,
        },
      },
    }));

    // Act
    const hook = renderHook(() =>
      useAuthProvider({ intl, notify, apolloClient }),
    );
    await act(async () =>
      hook.result.current.login(
        nonStaffUserCredentials.email,
        nonStaffUserCredentials.password,
      ),
    );

    // Assert
    expect(hook.result.current.errors).toEqual([
      "unauthorizedDashboardAccessError",
    ]);
    expect(hook.result.current.authenticated).toBe(false);
  });
});
