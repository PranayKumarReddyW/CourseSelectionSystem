import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const AddCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [theoryCount, setTheoryCount] = useState(0);
  const [labCount, setLabCount] = useState(0);
  const [studentId, setStudentId] = useState(""); // State to store student ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/courses/getAllCourses`
        );
        const coursesData = await coursesResponse.json();
        setCourses(coursesData.data.courses);
      } catch (error) {
        toast.error("Failed to fetch courses.");
      }
    };

    const fetchTeachers = async () => {
      try {
        const teachersResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/teachers/getAllTeachers`
        );
        const teachersData = await teachersResponse.json();
        setTeachers(teachersData.data.teachers);
      } catch (error) {
        toast.error("Failed to fetch teachers.");
      }
    };

    fetchData();
    fetchTeachers();

    // Get student ID from JWT token
    (async () => {
      const jwt_decode = (await import("jwt-decode")).default; // Dynamically import jwt-decode
      const token = localStorage.getItem("token"); // Replace with your method to get the token
      if (token) {
        const decoded = jwt_decode(token); // Use jwt_decode here
        setStudentId(decoded.id); // Assuming your JWT has an 'id' field for the student ID
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !selectedFaculty) {
      toast.error("Please select both a course and a faculty member.");
      return;
    }

    const selectedCourseObj = courses.find(
      (course) => course._id === selectedCourse
    );

    // Check course type limits
    if (selectedCourseObj.type === "Theory" && theoryCount >= 4) {
      toast.error("You can't add more than 4 theory courses.");
      return;
    }

    if (selectedCourseObj.type === "Lab" && labCount >= 2) {
      toast.error("You can't add more than 2 lab courses.");
      return;
    }

    // Check if the course is already selected
    const alreadySelected = selectedAssignments.some(
      (assignment) => assignment.course === selectedCourseObj.title
    );

    if (alreadySelected) {
      toast.error("This course has already been assigned.");
      return;
    }

    // Update course and faculty selection
    const newAssignment = {
      course: selectedCourseObj.title,
      faculty: selectedFaculty,
      courseType: selectedCourseObj.type,
    };

    setSelectedAssignments((prev) => [...prev, newAssignment]);

    // Remove selected course from the courses list
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course._id !== selectedCourse)
    );

    // Reset the form after selection
    setSelectedCourse("");
    setSelectedFaculty("");

    // Update the counters
    if (selectedCourseObj.type === "Theory") {
      setTheoryCount((prevCount) => prevCount + 1);
    } else if (selectedCourseObj.type === "Lab") {
      setLabCount((prevCount) => prevCount + 1);
    }

    // Send selected courses to the backend
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/courses/addSelectedCourses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedCourses: [...selectedAssignments, newAssignment],
            studentId: studentId, // Use the student ID from the token
          }),
        }
      );
      toast.success("Courses assigned and saved successfully!");
    } catch (error) {
      toast.error("Failed to save selected courses.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center mt-10">
        <Card className="w-full max-w-lg bg-gray-700 p-6">
          {" "}
          {/* Increased size */}
          <CardHeader>
            <CardTitle className="text-white text-xl font-bold">
              Add Course
            </CardTitle>{" "}
            {/* Bolder font */}
            <CardDescription className="text-gray-300 text-lg font-bold">
              Select a course and faculty to assign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* Course Selection */}
                <div className="flex flex-col space-y-1.5">
                  <Select
                    value={selectedCourse}
                    onValueChange={setSelectedCourse}
                    className="bg-gray-800 text-white" // High contrast for dropdown
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800">
                      <SelectGroup>
                        <SelectLabel className="text-gray-200 text-lg font-bold">
                          {" "}
                          {/* Bolder font */}
                          Courses
                        </SelectLabel>
                        {courses.map((course) => (
                          <SelectItem
                            key={course._id}
                            value={course._id}
                            className="text-gray-300"
                          >
                            {" "}
                            {/* High contrast for item */}
                            {course.title} {course.type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Faculty Selection */}
                <div className="flex flex-col space-y-1.5">
                  <Select
                    value={selectedFaculty}
                    onValueChange={setSelectedFaculty}
                    disabled={!selectedCourse}
                    className="bg-gray-800 text-white" // High contrast for dropdown
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a faculty" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800">
                      <SelectGroup>
                        <SelectLabel className="text-gray-200 text-lg font-bold">
                          {" "}
                          {/* Bolder font */}
                          Faculty
                        </SelectLabel>
                        {selectedCourse &&
                          courses
                            .find((course) => course._id === selectedCourse)
                            ?.availableTeachers?.map((teacherId) => {
                              const teacher = teachers.find(
                                (t) => t._id === teacherId.teacherId
                              );
                              return (
                                teacher && (
                                  <SelectItem
                                    key={teacher._id}
                                    value={teacher.name}
                                    className="text-gray-300" // High contrast for item
                                  >
                                    {teacher.name}
                                  </SelectItem>
                                )
                              );
                            })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <CardFooter className="flex justify-center mt-3">
                  <Button type="submit" className="text-lg font-bold">
                    {" "}
                    {/* Bolder font */}
                    Submit
                  </Button>
                </CardFooter>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Display selected assignments */}
        <div className="mt-6 w-full max-w-lg">
          {" "}
          {/* Increased size */}
          <Card className="bg-gray-700 p-4">
            {" "}
            {/* Increased padding */}
            <CardHeader>
              <CardTitle className="text-white text-xl font-bold">
                Selected Courses
              </CardTitle>{" "}
              {/* Bolder font */}
            </CardHeader>
            <CardContent>
              {selectedAssignments.length === 0 ? (
                <p className="text-gray-300 text-lg font-bold">
                  No courses selected yet.
                </p>
              ) : (
                <ul className="text-gray-300 text-lg font-bold">
                  {selectedAssignments.map((assignment, index) => (
                    <li key={index}>
                      {assignment.course} - Faculty: {assignment.faculty} (
                      {assignment.courseType})
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddCoursesPage;
