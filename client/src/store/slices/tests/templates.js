export const newPage = {
  name: "name",
  type: "type",
  username: "a",
  id: "a",
  artifacts: [],
};

export const savedPortfolio = {
  theme: "oldTheme",
  bio: "b",
  username: "a",
  pages: [],
};

export const fullPage = {
  page: newPage,
  artifacts: [
    { username: "a", pageId: "a", id: "a", body: "a" },
    { username: "a", pageId: "a", id: "b", body: "a" },
    { username: "a", pageId: "a", id: "c", body: "a" },
  ],
};

export const pages = [
  {
    ...newPage,
    id: "b",
    artifacts: [{ id: "a" }, { id: "b" }, { id: "c" }],
  },
  newPage,
];

export const artifacts = [
  { username: "a", pageId: "a", id: "a", body: "a" },
  { username: "a", pageId: "a", id: "b", body: "a" },
  { username: "a", pageId: "a", id: "c", body: "a" },
];

export const fullPortfolio = {
  portfolio: {
    ...savedPortfolio,
    artifacts: [
      { id: pages[0].id, name: pages[0].name },
      { id: pages[1].id, name: pages[1].name },
    ],
  },
  pages,
  artifacts,
};

export const user = { user: { username: "a" }, token: "t" };

export const newArtifact = {
  type: "type",
  body: "body",
  username: "a",
  pageId: "a",
  id: "a",
};
