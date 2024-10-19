import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "react-toastify"; // Import toast
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error

    setLoading(true); // Set loading state

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed!");
      }

      // Handle successful login
      const data = await response.json();

      // Save the JWT token to localStorage
      localStorage.setItem("token", data.token); // Adjust based on your response structure

      console.log("Login successful!", data);
      toast.success("Login successful!"); // Show success toast

      // Navigate to the home page
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.message);
      toast.error("Invalid credentials!"); // Show error toast
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>
          Access your account using your credentials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            {/* Email Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <CardFooter className="flex justify-center">
            <Button type="submit" disabled={loading} className="mt-4">
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
