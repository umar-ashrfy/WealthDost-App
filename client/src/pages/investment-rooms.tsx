import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";

const InvestmentRooms = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all"); // all, free, premium, sponsored
  const [showCreateTribe, setShowCreateTribe] = useState(false);


  // Mock data - would be fetched from API
  const rooms = [
    {
      id: 1,
      name: "Value Investing Masters",
      description: "Deep dive into fundamental analysis and long-term value investing strategies",
      creator: "Rajesh Kumar",
      creatorAvatar: "RK",
      category: "Value Investing",
      memberCount: 1250,
      isPremium: true,
      premiumPrice: "299",
      isSponsored: false,
      sponsorName: null,
      xpReward: 50,
      badges: ["Expert Verified", "High Activity"]
    },
    {
      id: 2,
      name: "Tech Stock Analysis Hub",
      description: "Analyze tech giants and emerging technology companies",
      creator: "Priya Sharma",
      creatorAvatar: "PS",
      category: "Technology",
      memberCount: 890,
      isPremium: false,
      premiumPrice: null,
      isSponsored: true,
      sponsorName: "TechVest Pro",
      xpReward: 30,
      badges: ["Trending", "Active Community"]
    },
    {
      id: 3,
      name: "Banking Sector Deep Dive",
      description: "Comprehensive analysis of banking and financial services",
      creator: "Vikram Patel",
      creatorAvatar: "VP",
      category: "Banking",
      memberCount: 650,
      isPremium: true,
      premiumPrice: "199",
      isSponsored: false,
      sponsorName: null,
      xpReward: 40,
      badges: ["Expert Led"]
    }
  ];

  const categories = ["all", "Value Investing", "Technology", "Banking", "Healthcare", "Energy"];
  const filterTypes = [
    { value: "all", label: "All Rooms" },
    { value: "free", label: "Free" },
    { value: "premium", label: "Premium" },
    { value: "sponsored", label: "Sponsored" }
  ];

  const filteredRooms = rooms.filter(room => {
    const categoryMatch = filterCategory === "all" || room.category === filterCategory;
    const typeMatch = filterType === "all" || 
      (filterType === "free" && !room.isPremium && !room.isSponsored) ||
      (filterType === "premium" && room.isPremium) ||
      (filterType === "sponsored" && room.isSponsored);
    return categoryMatch && typeMatch;
  });



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-20 shadow-sm">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="p-1 text-gray-600">
                <span className="material-icons text-lg">arrow_back</span>
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Tribes</h1>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 text-purple-600"
              onClick={() => setShowCreateTribe(true)}
            >
              <span className="material-icons text-lg">add</span>
            </Button>
          </div>
          
          {/* Dropdown Filters */}
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="sponsored">Sponsored</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Value Investing">Value Investing</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Banking">Banking</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              {/* Room Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-sm">{room.name}</h3>
                    {room.isSponsored && (
                      <Badge className="text-xs bg-blue-100 text-blue-700">
                        Sponsored by {room.sponsorName}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{room.description}</p>
                  
                  {/* Creator Info */}
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                        {room.creatorAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">by {room.creator}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <span className="material-icons text-sm mr-1">group</span>
                      {room.memberCount.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <span className="material-icons text-sm mr-1">stars</span>
                      +{room.xpReward} XP
                    </span>
                  </div>
                </div>
                
                {/* Premium Price */}
                {room.isPremium && (
                  <div className="text-right ml-3">
                    <div className="text-lg font-bold text-purple-600">₹{room.premiumPrice}</div>
                    <div className="text-xs text-gray-500">/month</div>
                  </div>
                )}
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-1 mb-3">
                {room.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
              
              {/* Action Button */}
              <Link href={`/room/${room.id}`}>
                <Button 
                  className={`w-full text-sm ${room.isPremium ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
                  size="sm"
                >
                  {room.isPremium ? `Subscribe for ₹${room.premiumPrice}/mo` : "Join Tribe"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
        
        {filteredRooms.length === 0 && (
          <div className="text-center py-8">
            <span className="material-icons text-4xl text-gray-300 mb-2">meeting_room</span>
            <p className="text-gray-600">No rooms found for selected filters</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => {
              setFilterCategory("all");
              setFilterType("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Bottom padding for safe area */}
      <div className="h-20"></div>

      {/* Create Tribe Modal */}
      {showCreateTribe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Create New Tribe</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowCreateTribe(false)}
                >
                  <span className="material-icons">close</span>
                </Button>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Tribe Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Tribe Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm" 
                    placeholder="e.g., Tech Growth Investors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm" 
                    rows={3}
                    placeholder="Describe what your tribe is about..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="value-investing">Value Investing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Monetization Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Monetization</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="monetization" value="free" className="text-purple-600" defaultChecked />
                      <span className="text-sm">Free Tribe</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="monetization" value="premium" className="text-purple-600" />
                      <span className="text-sm">Premium Tribe (₹99-₹499/month)</span>
                    </label>
                  </div>
                </div>

                {/* Premium Price (conditional) */}
                <div className="hidden" id="premium-price">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Monthly Price</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">₹</span>
                    <input 
                      type="number" 
                      className="flex-1 p-3 border border-gray-300 rounded-lg text-sm" 
                      placeholder="199"
                      min="99"
                      max="499"
                    />
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tribe Features</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-purple-600" defaultChecked />
                      <span className="text-sm">Discussion posts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-purple-600" defaultChecked />
                      <span className="text-sm">Stock recommendations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-purple-600" />
                      <span className="text-sm">Live events & webinars</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-purple-600" />
                      <span className="text-sm">Premium polls & insights</span>
                    </label>
                  </div>
                </div>

                {/* Revenue Split Info */}
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-sm text-purple-800">
                    <strong>Revenue Split:</strong> You keep 70%, platform takes 30%
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    Includes payment processing, hosting, and community management tools
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCreateTribe(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-purple-600 text-white"
                  onClick={() => setShowCreateTribe(false)}
                >
                  Create Tribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentRooms;