import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

export function SignIn() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate("/dashboard");
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
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground" htmlFor="email">
                            Email
                        </label>
                        <Input id="email" type="email" placeholder="name@example.com" className="bg-background/50 border-input focus:ring-primary" />
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
                        <Input id="password" type="password" placeholder="••••••••" className="bg-background/50 border-input focus:ring-primary" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button onClick={handleSignIn} className="w-full text-md h-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold shadow-md">Sign In</Button>
                    <div className="text-sm text-center text-muted-foreground">
                        Don't have an account? <Link to="#" className="text-primary hover:underline font-medium">Sign up</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
