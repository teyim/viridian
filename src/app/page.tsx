import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GitBranch, GitCommit, GitPullRequest, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold">Viridian</h1>
          <Link href="/signin">
            <Button variant="outline">Sign In</Button>
          </Link>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6">
              Grow Your Virtual Forest with Every Commit
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Turn your GitHub activity into a thriving garden. Watch your contributions bloom into beautiful trees and track your progress in a unique way.
            </p>
            <Link href="/signin">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                Start Growing Your Forest
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <GitCommit className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold mb-2">Commit Tracking</h3>
              <p className="text-gray-600">Every commit helps your garden grow</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <GitPullRequest className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold mb-2">PR Rewards</h3>
              <p className="text-gray-600">Earn special trees with pull requests</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <GitBranch className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold mb-2">Branch Growth</h3>
              <p className="text-gray-600">Expand your forest with new branches</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Star className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-bold mb-2">Achievement Trees</h3>
              <p className="text-gray-600">Unlock rare trees with milestones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitCommit className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Connect GitHub</h3>
              <p className="text-gray-600">Link your GitHub account to start tracking your activity</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitPullRequest className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Code & Earn</h3>
              <p className="text-gray-600">Your coding activity earns XP and unlocks new trees</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Grow Your Forest</h3>
              <p className="text-gray-600">Watch your virtual forest thrive with your GitHub activity</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}