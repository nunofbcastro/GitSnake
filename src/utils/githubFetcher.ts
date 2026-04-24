export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export async function fetchGithubContributions(username: string): Promise<ContributionDay[]> {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://github.com/users/${username}/contributions`
  )}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Failed to fetch contributions");
    
    const data = await response.json();
    const html = data.contents;
    
    // Parse the HTML using DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    // Modern GitHub contribution graph uses <td class="ContributionCalendar-day">
    // or <rect data-date="..." data-level="...">
    const days: ContributionDay[] = [];
    const elements = doc.querySelectorAll('td.ContributionCalendar-day, rect.ContributionCalendar-day');
    
    elements.forEach((el) => {
      const date = el.getAttribute('data-date');
      const levelAttr = el.getAttribute('data-level');
      
      if (date && levelAttr !== null) {
        days.push({
          date,
          level: parseInt(levelAttr, 10),
          count: 0, // Count is harder to get exactly from raw HTML without complex regex, level is enough for the game
        });
      }
    });

    return days;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
}
