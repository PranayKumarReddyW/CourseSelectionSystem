import { useEffect, useState } from "react";
import { BentoGridItem } from "../components/ui/bento-grid";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background";
import { Dialog } from "@headlessui/react"; // Import the Dialog component from Headless UI
import { Button } from "../components/ui/button"; // Import your custom Button component
import { CourseSelectionForm } from "../components/CourseSelection"; // Import the CourseSelectionForm component

export default function BentoGridDemo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/courses/getAllCourses`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        const { data } = result;

        if (!Array.isArray(data.courses)) {
          throw new Error("Unexpected data format");
        }

        setCoursesData(data.courses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const theoryCourses = coursesData.filter(
    (course) => course.type === "Theory"
  );
  const labCourses = coursesData.filter((course) => course.type === "Lab");

  const openDialog = (course) => {
    setSelectedCourse(course);
    setSelectedTeacher(""); // Reset selected teacher
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedCourse(null);
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const handleSave = () => {
    // Handle the save action, e.g., save the selected teacher for the course
    console.log("Selected Teacher:", selectedTeacher);
    closeDialog();
  };

  return (
    <AuroraBackground>
      <div className="flex flex-col min-h-screen p-8 bg-gray-100">
        <h1 className="text-5xl font-bold mb-8 text-center text-blue-600">
          Courses Information
        </h1>

        {loading && <p className="text-center text-lg">Loading...</p>}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {/* Render Theory Courses */}
        {theoryCourses.length > 0 && (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Theory Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {theoryCourses.map((course) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-2" // Padding around the items
                >
                  <BentoGridItem
                    title={course.title}
                    description={course.description}
                    className="h-full bg-white shadow-3xl rounded-lg p-6 hover:shadow-4xl transition-shadow duration-300 transform hover:scale-105 flex flex-col"
                  >
                    <div className="flex-grow">
                      <p className="text-lg">
                        {" "}
                        {/* Adjusted text size */}
                        <strong>Faculty:</strong>{" "}
                        {course.availableTeachers.length > 0
                          ? course.availableTeachers.join(", ")
                          : "No faculty assigned"}
                      </p>
                    </div>
                    <Button
                      onClick={() => openDialog(course)} // Open dialog on click
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-lg"
                    >
                      View
                    </Button>
                  </BentoGridItem>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Render Lab Courses */}
        {labCourses.length > 0 && (
          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-6">Lab Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {labCourses.map((course) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-2" // Padding around the items
                >
                  <BentoGridItem
                    title={course.title}
                    description={course.description}
                    className="h-full bg-white shadow-3xl rounded-lg p-6 hover:shadow-4xl transition-shadow duration-300 transform hover:scale-105 flex flex-col"
                  >
                    <div className="flex-grow">
                      <p className="text-lg">
                        {" "}
                        {/* Adjusted text size */}
                        <strong>Faculty:</strong>{" "}
                        {course.availableTeachers.length > 0
                          ? course.availableTeachers.join(", ")
                          : "No faculty assigned"}
                      </p>
                    </div>
                    <Button
                      onClick={() => openDialog(course)} // Open dialog on click
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-lg"
                    >
                      View
                    </Button>
                  </BentoGridItem>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Display a message if no courses are available */}
        {!loading &&
          !error &&
          theoryCourses.length === 0 &&
          labCourses.length === 0 && (
            <p className="text-center text-lg">No courses available.</p>
          )}

        {/* Dialog for selecting a teacher */}
        {selectedCourse && (
          <Dialog
            open={isOpen}
            onClose={closeDialog}
            className="fixed inset-0 z-10 flex items-center justify-center"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
            <div className="bg-white rounded-lg p-6 z-20 w-11/12 sm:w-1/2">
              <Dialog.Title className="text-2xl font-semibold mb-4">
                Select a Teacher for {selectedCourse.title}
              </Dialog.Title>
              <div className="flex flex-col">
                {selectedCourse.availableTeachers.map((teacher) => (
                  <label
                    key={teacher}
                    className="flex items-center mb-2 text-lg"
                  >
                    <input
                      type="radio"
                      value={teacher}
                      checked={selectedTeacher === teacher}
                      onChange={handleTeacherChange}
                      className="mr-2"
                    />
                    {teacher}
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  onClick={handleSave}
                  disabled={!selectedTeacher}
                  className="text-lg"
                >
                  Save
                </Button>
                <Button
                  onClick={closeDialog}
                  className="ml-2 text-lg"
                  variant="secondary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Dialog>
        )}
      </div>
      <CourseSelectionForm />
    </AuroraBackground>
  );
}
