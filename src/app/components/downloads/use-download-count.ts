import { useSuspenseQuery } from "@tanstack/react-query";

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

// GitHub repo mapping for getting dependents
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

interface DayDownload {
  day: string;
  downloads: number;
}

interface PackageDownloadData {
  downloads: DayDownload[];
  totalDownloads: number;
  packageName: string;
}

interface ChartDataPoint {
  month: string;
  downloads: number;
  fullDate: string;
}

interface GitHubRepoStats {
  stargazers_count: number;
  forks_count: number;
  // dependents는 별도 API 호출 필요
}

async function getPackageDownloads(
  packageName: string,
  startDate: string,
  endDate: string
): Promise<PackageDownloadData> {
  const url = `https://api.npmjs.org/downloads/range/${startDate}:${endDate}/${packageName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { downloads: [], totalDownloads: 0, packageName };
    }

    const data = await response.json();
    const downloads = data.downloads || [];
    const totalDownloads = downloads.reduce(
      (sum: number, day: DayDownload) => sum + day.downloads,
      0
    );

    return { downloads, totalDownloads, packageName };
  } catch (error) {
    return { downloads: [], totalDownloads: 0, packageName };
  }
}

function aggregateByMonth(
  allPackagesData: PackageDownloadData[]
): ChartDataPoint[] {
  const monthlyData: { [key: string]: number } = {};

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

async function getGitHubStats(repo: string): Promise<GitHubRepoStats> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    if (!response.ok) {
      return { stargazers_count: 0, forks_count: 0 };
    }
    const data = await response.json();
    return {
      stargazers_count: data.stargazers_count || 0,
      forks_count: data.forks_count || 0,
    };
  } catch (error) {
    console.error(`Error fetching GitHub stats for ${repo}:`, error);
    return { stargazers_count: 0, forks_count: 0 };
  }
}

async function getDependentsCount(repo: string): Promise<number> {
  try {
    // GitHub dependents API는 제한적이므로 웹 스크래핑 방식 사용
    const response = await fetch(
      `https://github.com/${repo}/network/dependents`,
      { 
        headers: { 'Accept': 'text/html' } 
      }
    );
    
    if (!response.ok) return 0;
    
    const html = await response.text();
    // "xxx dependents" 텍스트에서 숫자 추출
    const match = html.match(/(\d{1,3}(?:,\d{3})*)\s+dependents/);
    if (match) {
      return parseInt(match[1].replace(/,/g, '')) || 0;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error fetching dependents for ${repo}:`, error);
    return 0;
  }
}

async function fetchAllDownloads() {
  const now = new Date();
  const startDate = "2020-01-01";
  const endDate = now.toISOString().split("T")[0];

  // 다운로드 수 병렬 처리
  const downloadPromises = PACKAGES.map((pkg) =>
    getPackageDownloads(pkg, startDate, endDate)
  );

  // GitHub 통계 병렬 처리 (중복 제거)
  const uniqueRepos = Array.from(new Set(Object.values(GITHUB_REPOS)));
  const githubPromises = uniqueRepos.map(async (repo) => {
    const [stats, dependents] = await Promise.all([
      getGitHubStats(repo),
      getDependentsCount(repo)
    ]);
    return { repo, stats, dependents };
  });

  const [downloadResults, githubResults] = await Promise.all([
    Promise.all(downloadPromises),
    Promise.all(githubPromises)
  ]);

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

  return {
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
}

const CACHE_TIME = 24 * 60 * 60 * 1000;

export const useSuspenseDownloadCount = () => {
  return useSuspenseQuery({
    queryKey: ["npm-downloads"],
    queryFn: fetchAllDownloads,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
