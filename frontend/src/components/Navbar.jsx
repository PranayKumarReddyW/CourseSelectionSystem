import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  ); // Check if user is authenticated based on token

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location]);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    ...(isAuthenticated
      ? [{ label: "Select Courses", path: "/add-courses" }] // Only include if authenticated
      : []), // Include no items if not authenticated
    { label: "Teachers", path: "/teachers" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setIsAuthenticated(false); // Update authentication state
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="bg-purple-900">
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.path}>
              <Button
                color="foreground"
                onPress={() => {
                  navigate(item.path);
                  setActiveButton(item.path);
                }}
                variant="text"
                className={`text-lg ${
                  activeButton === item.path ? "border-b-2 border-black" : ""
                }`}
              >
                {item.label}
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Menu for small screens */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.path}>
              <Link
                color="foreground"
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarContent justify="end">
          {isAuthenticated ? (
            // Show Logout if the user is authenticated
            <NavbarItem>
              <Button onPress={handleLogout} variant="text" className="text-lg">
                Logout
              </Button>
            </NavbarItem>
          ) : (
            // Show Login and Sign Up if the user is not authenticated
            <>
              <NavbarItem>
                <Button
                  onPress={() => {
                    navigate("/login");
                    setActiveButton("/login");
                  }}
                  variant="text"
                  className={`text-lg ${
                    activeButton === "/login" ? "border-b-2 border-black" : ""
                  }`}
                >
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  onPress={() => {
                    navigate("/signup");
                    setActiveButton("/signup");
                  }}
                  color="primary"
                  variant="flat"
                  className="text-lg"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
