global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  groupCollapsed: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
