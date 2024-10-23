interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface DetailedGithubUser extends GithubUser {
  name?: string;
  company?: string;
  location?: string;
  email?: string;
}

const searchGithub = async (): Promise<GithubUser[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return data.map((user: any) => ({
      login: user.login,
      id: user.id,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
    }));
  } catch (err) {
    console.error('Error fetching GitHub users:', err);
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<DetailedGithubUser | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return {
      login: data.login,
      id: data.id,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      name: data.name,
      company: data.company,
      location: data.location,
      email: data.email,
    };
  } catch (err) {
    console.error('Error fetching GitHub user:', err);
    return null;
  }
};

export { searchGithub, searchGithubUser };
export type { GithubUser, DetailedGithubUser };
