// API endpoints for fetching course data (Season 1 and Season 2)
const COURSES_API_URL_S1 = 'https://rjebddhntcqiwpqtqjya.supabase.co/functions/v1/courses-api';
const COURSES_API_URL_S2 = 'https://wluejivpcrhjtqvhnltm.supabase.co/functions/v1/courses-api';

// Interface for course data from API
interface CourseData {
  module: string;
  title: string;
  videoIframe: string;
  url: string | null;
}

// Function to fetch course data from API by season
export async function fetchCourseData(season: 1 | 2 = 1): Promise<CourseData[]> {
  try {
    const endpoint = season === 2 ? COURSES_API_URL_S2 : COURSES_API_URL_S1;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(season === 1 ? {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZWJkZGhudGNxaXdwcXRxanlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1Njk3MzMsImV4cCI6MjA3NDE0NTczM30.m8oMLivHEuuyq3axWDfNqVEOtXx-4q9O1oQWrAYwn10'
        } : {}),
      },
      // Add cache control to ensure fresh data
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Ensure data is an array
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: expected array');
    }

    return data;
  } catch (error) {
    console.error('Error fetching course data:', error);
    // Return empty array as fallback
    return [];
  }
}

export interface Lesson {
  id: number;
  title: string;
  shortTitle?: string;
  duration?: string;
  videoSrc?: string | null;
  videoIframe?: string | null;
  description?: string;
  module: string;
}

// Function to convert API course data to lessons format (showing API response as-is)
export function convertCourseDataToLessons(courseData: CourseData[]): Lesson[] {
  return courseData.map((course, index) => ({
    id: index + 1,
    title: course.title,
    shortTitle: course.title,
    videoSrc: course.url,
    videoIframe: course.videoIframe,
    module: course.module,
  }));
}

// Function to get lessons with fresh data from API for a specific season
export async function getLessons(season: 1 | 2 = 1): Promise<Lesson[]> {
  const courseData = await fetchCourseData(season);
  return convertCourseDataToLessons(courseData);
}

// Deprecated: Use getLessons() instead for fresh data
// This is kept for backward compatibility but will return empty array
export const LESSONS: Lesson[] = [];
