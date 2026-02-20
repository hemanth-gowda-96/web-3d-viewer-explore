import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function SignIn() {
    const navigate = useNavigate();
    const { session, signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // If perfectly logged in already, just redirect them back to the dashboard immediately.
    if (session) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error.message);
        } else {
            navigate("/dashboard");
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center flex-grow py-12 w-full h-full">
            <Card className="w-full max-w-md mx-auto shadow-xl border-primary/20 bg-card/90 backdrop-blur-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">Sign In</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Enter your email and password to access your account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignIn}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground" htmlFor="email">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="bg-background/50 border-input focus:ring-primary"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground" htmlFor="password">
                                    Password
                                </label>
                                <Link to="#" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-background/50 border-input focus:ring-primary"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full text-md h-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold shadow-md"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                        <div className="text-sm text-center text-muted-foreground mt-4">
                            Don't have an account? <Link to="#" className="text-primary hover:underline font-medium">Sign up</Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
