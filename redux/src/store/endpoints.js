export const user = "/user";
export const signup = user + "/signup";
export const login = user + "/login";
export const logout = user + "/logout";
export const logoutAll = logout + "/all";

export const portfolios = "/portfolios";
export const portfoliosByUsername = username => portfolios + "/" + username;
export const portfolioPage = username =>
  portfoliosByUsername(username) + "/pages";

export const pages = "/pages";
export const pagesById = pageId => pages + "/" + pageId;
export const pageArtifacts = pageId => pagesById(pageId) + "/artifacts";

export const artifacts = "/artifacts";
export const artifactsById = artifactId => artifacts + "/" + artifactId;
