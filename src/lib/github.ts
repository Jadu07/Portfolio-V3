import { GistData } from "./projects";

const GIST_ID = "56e3a47bb662c0e4c939be6d6044abdc";

export async function getGistData(token: string): Promise<GistData> {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    // we do not want to cache this in the admin panel
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch gist: ${res.status}`);
  }

  const data = await res.json();
  const firstFileName = Object.keys(data.files)[0];
  const fileContent = data.files[firstFileName].content;
  
  return JSON.parse(fileContent);
}

export async function updateGistData(token: string, newData: GistData): Promise<void> {
  // First get the gist to find out what the file is named
  const currentGistRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const currentGist = await currentGistRes.json();
  const firstFileName = Object.keys(currentGist.files)[0];

  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: {
        [firstFileName]: {
          content: JSON.stringify(newData, null, 2),
        }
      }
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update gist: ${res.status}`);
  }
}
