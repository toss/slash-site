const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const PACKAGES = [
  "es-toolkit",
  "es-git",
  "es-hangul",
  "overlay-kit",
  "react-simplikit",
  "use-funnel",
  "@suspensive/react",
  "@suspensive/react-query",
  "@suspensive/jotai",
  "@suspensive/zustand",
];

const GITHUB_REPOS = {
  "es-toolkit": "toss/es-toolkit",
  "es-git": "toss/es-git",
  "es-hangul": "toss/es-hangul",
  "overlay-kit": "toss/overlay-kit",
  "react-simplikit": "toss/react-simplikit",
  "use-funnel": "toss/use-funnel",
  "@suspensive/react": "toss/suspensive",
  "@suspensive/react-query": "toss/suspensive",
  "@suspensive/jotai": "toss/suspensive",
  "@suspensive/zustand": "toss/suspensive",
};

async function getPackageDownloads(packageName, startDate, endDate) {
  const url = `https://api.npmjs.org/downloads/range/${startDate}:${endDate}/${packageName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`${packageName}: NPM API returned ${response.status}`);
      return { downloads: [], totalDownloads: 0, packageName };
    }

    const data = await response.json();
    const downloads = data.downloads || [];
    const totalDownloads = downloads.reduce(
      (sum, day) => sum + day.downloads,
      0
    );

    console.log(`${packageName}: ${totalDownloads.toLocaleString()} downloads`);
    return { downloads, totalDownloads, packageName };
  } catch (error) {
    console.error(`✗ ${packageName}: ${error.message}`);
    return { downloads: [], totalDownloads: 0, packageName };
  }
}

async function getGitHubStats(repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        "User-Agent": "monad-project",
      },
    });

    if (!response.ok) {
      console.log(`${repo}: GitHub API returned ${response.status}`);
      return { stargazers_count: 0, forks_count: 0 };
    }

    const data = await response.json();
    return {
      stargazers_count: data.stargazers_count || 0,
      forks_count: data.forks_count || 0,
    };
  } catch (error) {
    console.error(`✗ ${repo}: ${error.message}`);
    return { stargazers_count: 0, forks_count: 0 };
  }
}

async function getDependentsCount(repo) {
  try {
    const response = await fetch(
      `https://github.com/${repo}/network/dependents`,
      {
        headers: { Accept: "text/html" },
      }
    );

    if (!response.ok) return 0;

    const html = await response.text();
    const match = html.match(/(\\d{1,3}(?:,\\d{3})*)\\s+dependents/);
    if (match) {
      return parseInt(match[1].replace(/,/g, "")) || 0;
    }

    return 0;
  } catch (error) {
    console.error(`Dependents for ${repo}: ${error.message}`);
    return 0;
  }
}

function aggregateByMonth(allPackagesData) {
  const monthlyData = {};

  allPackagesData.forEach((packageData) => {
    packageData.downloads.forEach((day) => {
      const date = new Date(day.day);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      monthlyData[monthKey] += day.downloads;
    });
  });

  return Object.entries(monthlyData)
    .map(([monthKey, downloads]) => {
      const [year, month] = monthKey.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      const monthName = date.toLocaleString("en", { month: "short" });
      const yearShort = year.slice(-2);

      return {
        month: `${monthName} '${yearShort}`,
        downloads: Math.round(downloads),
        fullDate: monthKey,
      };
    })
    .sort((a, b) => a.fullDate.localeCompare(b.fullDate));
}

async function fetchAllNpmStats() {
  const now = new Date();
  const startDate = "2020-01-01";
  const endDate = now.toISOString().split("T")[0];

  console.log("📦 Fetching NPM download statistics...");

  const downloadResults = [];
  for (const pkg of PACKAGES) {
    const result = await getPackageDownloads(pkg, startDate, endDate);
    downloadResults.push(result);
    // Rate limit 방지
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("\\n⭐ Fetching GitHub statistics...");

  // GitHub 통계 병렬 처리 (중복 제거)
  const uniqueRepos = Array.from(new Set(Object.values(GITHUB_REPOS)));
  const githubResults = [];

  for (const repo of uniqueRepos) {
    try {
      const [stats, dependents] = await Promise.all([
        getGitHubStats(repo),
        getDependentsCount(repo),
      ]);
      githubResults.push({ repo, stats, dependents });
      console.log(
        `✌🏻 ${repo}: ${stats.stargazers_count} stars, ${dependents} dependents`
      );
    } catch (error) {
      console.error(`✗ ${repo}: ${error.message}`);
      githubResults.push({
        repo,
        stats: { stargazers_count: 0, forks_count: 0 },
        dependents: 0,
      });
    }

    // Rate limit 방지
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  const totalDownloads = downloadResults.reduce(
    (sum, result) => sum + result.totalDownloads,
    0
  );
  const totalStars = githubResults.reduce(
    (sum, result) => sum + result.stats.stargazers_count,
    0
  );
  const totalDependents = githubResults.reduce(
    (sum, result) => sum + result.dependents,
    0
  );
  const monthlyChartData = aggregateByMonth(downloadResults);

  const npmStats = {
    totalDownloads,
    totalStars,
    totalDependents,
    monthlyData: monthlyChartData,
    packages: downloadResults.map((result) => ({
      name: result.packageName,
      downloads: result.totalDownloads,
    })),
    period: { start: startDate, end: endDate },
    lastUpdated: new Date().toISOString(),
  };

  const dataDir = path.join(__dirname, "..", "src", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const tsOutputPath = path.join(dataDir, "npm-stats.ts");
  const tsContent = `export const npmStats = ${JSON.stringify(
    npmStats,
    null,
    2
  )};`;
  fs.writeFileSync(tsOutputPath, tsContent);

  console.log(`NPM stats saved to ${tsOutputPath}`);
  console.log(`Total Downloads: ${totalDownloads.toLocaleString()}`);
  console.log(`Total Stars: ${totalStars.toLocaleString()}`);
  console.log(`Total Dependents: ${totalDependents.toLocaleString()}`);
  console.log(`Generated at: ${new Date().toISOString()}`);
}

fetchAllNpmStats().catch(console.error);
