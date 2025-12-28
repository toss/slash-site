const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const PROJECTS = [
  {
    name: "es toolkit",
    url: "/es-toolkit",
  },
  {
    name: "es git",
    url: "/es-git",
  },
  {
    name: "es hangul",
    url: "/es-hangul",
  },
  {
    name: "overlay kit",
    url: "/overlay-kit",
  },
  {
    name: "react simplikit",
    url: "/react-simplikit",
  },
  {
    name: "use funnel",
    url: "/use-funnel",
  },
  {
    name: "Suspensive",
    url: "/suspensive",
  },
];

async function fetchGitHubStats() {
  const stats = {};

  for (const project of PROJECTS) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/toss${project.url}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            "User-Agent": "monad-project",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        stats[project.name] = {
          stargazers_count: data.stargazers_count,
          updated_at: new Date().toISOString(),
        };
        console.log(`✓ ${project.name}: ${data.stargazers_count} stars`);
      } else {
        console.error(
          `✗ ${project.name}: ${response.status} ${response.statusText}`
        );
        stats[project.name] = {
          stargazers_count: 0,
          updated_at: new Date().toISOString(),
        };
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`✗ ${project.name}: ${error.message}`);
      stats[project.name] = {
        stargazers_count: 0,
        updated_at: new Date().toISOString(),
      };
    }
  }

  const dataDir = path.join(__dirname, "..", "src", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const tsOutputPath = path.join(dataDir, "github-stats.ts");
  const tsContent = `export const githubStats = ${JSON.stringify(
    stats,
    null,
    2
  )};`;
  fs.writeFileSync(tsOutputPath, tsContent);

  console.log(`\nGitHub stats saved to ${tsOutputPath}`);
  console.log(`Generated at: ${new Date().toISOString()}`);
}

fetchGitHubStats().catch(console.error);
