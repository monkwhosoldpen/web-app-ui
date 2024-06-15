export const scheme = `io.goatsconnect${process.env.STAGE === "development"
  ? ".development"
  : process.env.STAGE === "staging"
    ? ".staging"
    : ""
  }`;
