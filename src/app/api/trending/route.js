import googleTrends from 'google-trends-api';

export async function GET(req) {
  try {
    // Your predefined data (hardcoded by you)
    const data = ['car', 'test', 'boo', 'foo',"aa","ram"];

    // Fetch trending data from Google Trends
    const trends = await googleTrends.realTimeTrends({
      geo: 'IN', // Modify the geo parameter as needed
      category: 'all',
    });

    // Parse the real-time trends data to extract words from story titles
    const trendingWords = JSON.parse(trends).storySummaries.trendingStories.flatMap(story =>
      story.title.split(' ') // Split titles into words and flatten the array
    );

    // Remove duplicates, filter small words (optional), and limit to top 10
    const uniqueTrendingWords = [...new Set(trendingWords)]
    .map(word => word.replace(/[^a-zA-Z0-9]/g, '')) // Remove non-alphanumeric characters
    .filter(word => word.length > 2) // Filter out short words
    .slice(0, 6); // Take only the top 10 words
  
    // Return the response with both the hardcoded data and the trending words
    return new Response(
      JSON.stringify({ commonwords: data, trendingWords: uniqueTrendingWords }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching trending words:', error);
    return new Response('Failed to fetch trending words', { status: 500 });
  }
}
