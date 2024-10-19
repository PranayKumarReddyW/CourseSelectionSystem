import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"; // Adjust the import based on your UI components
import { Select } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button"; // Adjust the import based on your UI components
import axios from "axios"; // Ensure axios is installed

export function CourseSelectionForm() {
  const [theoryCourses, setTheoryCourses] = useState([]);
  const [labCourses, setLabCourses] = useState([]);
  const [selectedTheoryCourses, setSelectedTheoryCourses] = useState(
    Array(4).fill(null)
  );
  const [selectedLabCourses, setSelectedLabCourses] = useState(
    Array(2).fill(null)
  );

  useEffect(() => {
    // Fetch courses from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/courses/getAllCourses`
        ); // Update with your API endpoint
        const coursesData = response.data; // Assuming the response contains a `data` array
        const theory = coursesData.filter((course) => course.type === "theory");
        const lab = coursesData.filter((course) => course.type === "lab");

        setTheoryCourses(theory);
        setLabCourses(lab);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleTheoryChange = (e, index) => {
    const value = e.target.value;
    const updated = [...selectedTheoryCourses];
    updated[index] = value;
    setSelectedTheoryCourses(updated);
  };

  const handleLabChange = (e, index) => {
    const value = e.target.value;
    const updated = [...selectedLabCourses];
    updated[index] = value;
    setSelectedLabCourses(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Theory Courses:", selectedTheoryCourses);
    console.log("Selected Lab Courses:", selectedLabCourses);
    // Perform further actions, like sending data to the backend
  };

  // Get available theory and lab courses for dropdowns, excluding already selected ones
  const getAvailableCourses = (selectedCourses, allCourses) => {
    return allCourses.filter(
      (course) => !selectedCourses.includes(course.name)
    );
  };

  return <Card></Card>;
}
