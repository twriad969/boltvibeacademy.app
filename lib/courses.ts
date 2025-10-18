// API endpoint for fetching course data
const COURSES_API_URL = 'https://n8n.srv915514.hstgr.cloud/webhook/courses';

// Interface for course data from API
interface CourseData {
  module: string;
  title: string;
  videoIframe: string;
  url: string | null;
}

// Function to fetch course data from API
export async function fetchCourseData(): Promise<CourseData[]> {
  try {
    const response = await fetch(COURSES_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

// Function to get lessons with fresh data from API
export async function getLessons(): Promise<Lesson[]> {
  const courseData = await fetchCourseData();
  return convertCourseDataToLessons(courseData);
}

// Deprecated: Use getLessons() instead for fresh data
// This is kept for backward compatibility but will return empty array
export const LESSONS: Lesson[] = [];
