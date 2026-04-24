export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export async function fetchGithubContributions(username: string): Promise<ContributionDay[]> {
  // Using a more stable community API for GitHub contributions JSON
  const apiUrl = `https://github-contributions-api.deno.dev/${username}.json`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch contributions");
    
    const data = await response.json();
    
    // The API returns an object with a 'contributions' array of arrays (weeks)
    // We want a flat array of days
    const days: ContributionDay[] = [];
    
    if (data && data.contributions) {
      data.contributions.forEach((week: any) => {
        week.forEach((day: any) => {
          days.push({
            date: day.date,
            level: day.level,
            count: day.count,
          });
        });
      });
    }

    return days;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    // Return some mock data if it fails, so the game is at least playable
    return generateMockData();
  }
}

function generateMockData(): ContributionDay[] {
  const mockDays: ContributionDay[] = [];
  const today = new Date();
  for (let i = 371; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    mockDays.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5),
      level: Math.floor(Math.random() * 5),
    });
  }
  return mockDays;
}
