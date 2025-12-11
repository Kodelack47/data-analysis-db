import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const NameInput = () => {
  // State variables for name, email, greeting message, and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [greeting, setGreeting] = useState("");
  // Use an object to manage errors for multiple fields
  const [errors, setErrors] = useState({ name: '', email: '' });

  // Function to handle form submission (called when the Submit button is clicked)
  const handleSubmit = () => {
    // Clear previous errors/greetings
    setErrors({ name: '', email: '' });
    setGreeting("");

    let valid = true;
    let nameError = "";
    let emailError = "";

    // Validation for Name field (must be at least 2 characters)
    if (!name.trim() || name.trim().length < 2) {
      nameError = "Name must be at least 2 characters.";
      valid = false;
    }

    // Validation for Email field (must contain @ and . if provided)
    if (email.trim() && (!email.includes("@") || !email.includes("."))) {
        emailError = "Please enter a valid email address.";
        valid = false;
    }

    // If validation failed for either field, update the error state and stop
    if (!valid) {
      setErrors({ name: nameError, email: emailError });
      return;
    }

    // If valid, set the success greeting message
    setGreeting(`Hello, ${name.trim()}! Welcome to data analysis!`);
  };

  // Function to handle the "Clear" button functionality
  const handleClear = () => {
    setName("");
    setEmail("");
    setGreeting("");
    setErrors({ name: '', email: '' });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Personalize Your Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name Input Group */}
        <div>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Add this line for the character count: */}
          <p className="text-right text-xs text-gray-500 mt-1">
            {name.length} characters
          </p>
          {/* Display name error conditionally */}
          {errors.name && (
            <p className="text-center text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Input Group */}
        <div>
          <Input
            placeholder="Enter your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" // Ensures a relevant keyboard opens on mobile
          />
          {/* Display email error conditionally */}
          {errors.email && (
            <p className="text-center text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Buttons Group */}
        <div className="flex space-x-4">
          <Button onClick={handleSubmit} className="flex-1">
            Say Hello
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="flex-1"
          >
            Clear
          </Button>
        </div>

        {/* Greeting Message Display */}
        {greeting && (
          <p className="text-center text-green-600 font-medium">{greeting}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default NameInput;
