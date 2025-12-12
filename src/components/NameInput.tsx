import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const NameInput = () => {
  // State variables for name, email, greeting message, and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [greeting, setGreeting] = useState("");
  const [errors, setErrors] = useState({ name: '', email: '' });

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let currentErrors = { name: '', email: '' };

    if (!name.trim()) {
      currentErrors.name = 'Name is required.';
    }

    if (!email.trim()) {
      currentErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      currentErrors.email = 'Email address is invalid.';
    }

    setErrors(currentErrors);

    if (currentErrors.name === '' && currentErrors.email === '') {
      setGreeting(`Hello, ${name.trim()}! A confirmation email has been sent to ${email.trim()}.`);
      // You could add logic here to actually send data to a backend
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Personalize Your Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name Input Group */}
        <div>
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email Input Group */}
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Say Hello
        </Button>

        {/* Greeting Message Display */}
        {greeting && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-sm">
            {greeting}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NameInput;
