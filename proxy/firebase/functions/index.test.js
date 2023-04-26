const { parseFn } = require("maineffectjs");

const fn = parseFn(require.resolve("./index"));

describe("Associate user", () => {
  test("should associate the user", async () => {
    const mock = jest.fn();
    const associateUser = fn.find("associateUser").provide({
      functions: {
        logger: {
          info() {},
        },
      },
      admin: {
        firestore() {
          return {
            collection() {
              return {
                doc() {
                  return {
                    set: mock,
                  };
                },
              };
            },
          };
        },
      },
    });
    await associateUser.callWith("1", { id: "bar" });
    expect(mock).toBeCalledWith({ dwUserId: "bar" });
  });
});

describe("Associate account", () => {
  test("should associate an account", async () => {
    const mock = jest.fn();
    const associateAccount = fn.find("associateAccount").provide({
      functions: {
        logger: {
          info() {},
        },
      },
      admin: {
        firestore() {
          return {
            collection() {
              return {
                doc() {
                  return {
                    collection() {
                      return {
                        doc() {
                          return {
                            set: mock,
                          };
                        },
                      };
                    },
                  };
                },
              };
            },
          };
        },
      },
    });
    await associateAccount.callWith("1", "2", { id: "bar" });
    expect(mock).toBeCalledWith({ dwUserId: "2" });
  });
});

describe("Proxy Handler", () => {
    test("should test the proxy handler", async () => {
      const mock = jest.fn();
      const proxyHandler = fn.find("proxyHandler").provide({
        functions: {
          logger: {
            info() {},
          },
        },
        admin: {
          firestore() {
            return {
              collection() {
                return {
                  doc() {
                    return {
                      collection() {
                        return {
                          doc() {
                            return {
                              set: mock,
                            };
                          },
                        };
                      },
                    };
                  },
                };
              },
            };
          },
        },
      });
      await associateAccount.callWith("1", "2", { id: "bar" });
      expect(mock).toBeCalledWith({ dwUserId: "2" });
    });
  });