import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "../auth/actions";
import { Bookmark } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-black">
            <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-blue-100 p-3">
                            <Bookmark className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
                        Sign in to Bookmarker
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Keep your bookmarks organized and accessible everywhere.
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <form action={loginWithGoogle}>
                        <Button
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            type="submit"
                        >
                            Sign in with Google
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
