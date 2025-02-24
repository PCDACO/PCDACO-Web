/* eslint-disable react/no-unescaped-entities */
'use client'
import Image from "next/image"
import { Star, StarHalf, User } from "lucide-react"
import { Button } from "../ui/button";

export interface DriverProfileProps {
    id: string;
}
export default function DriverProfile({ id }: DriverProfileProps) {
    console.log("🔍 ~ components/drivers/profile.tsx:8 ~ id:", id)
    const driver = {
        name: "John Doe",
        age: 35,
        contactNumber: "+1 (555) 123-4567",
        email: "john.doe@example.com",
        rating: 4.5,
        avatar: "/placeholder.svg?height=200&width=200",
    }

    const recentFeedbacks = [
        { id: 1, user: "Alice", rating: 5, comment: "Excellent driver, very punctual and professional." },
        { id: 2, user: "Bob", rating: 4, comment: "Good experience overall. Car was clean and well-maintained." },
        { id: 3, user: "Charlie", rating: 5, comment: "John is a fantastic driver. Highly recommended!" },
    ]

    const RatingStars = ({ rating }: { rating: number }) => (
        <div className="flex">
            {[...Array(Math.floor(rating))].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            {rating % 1 !== 0 && <StarHalf className="w-4 h-4 fill-current" />}
        </div>
    )

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <main className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="md:col-span-1">
                        <div className="mb-4">
                            {driver.avatar ? (
                                <Image
                                    src={driver.avatar || "/placeholder.svg"}
                                    alt={driver.name}
                                    width={200}
                                    height={200}
                                    className="rounded-full border-2 border-gray-300"
                                />
                            ) : (
                                <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="w-24 h-24 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">{driver.name}</h2>
                        <div className="flex items-center mb-4">
                            <RatingStars rating={driver.rating} />
                            <span className="ml-2">{driver.rating.toFixed(1)}</span>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <ul className="space-y-2 mb-6">
                            <li>
                                <strong>Age:</strong> {driver.age}
                            </li>
                            <li>
                                <strong>Contact Number:</strong> {driver.contactNumber}
                            </li>
                            <li>
                                <strong>Email:</strong> {driver.email}
                            </li>
                        </ul>

                        <h2 className="text-xl font-semibold mb-4">License Images</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg mb-2">Driver's License (Front)</h3>
                                <Image
                                    src="/placeholder.svg?height=150&width=240"
                                    alt="Driver's License Front"
                                    width={240}
                                    height={150}
                                    className="border border-gray-300"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg mb-2">Driver's License (Back)</h3>
                                <Image
                                    src="/placeholder.svg?height=150&width=240"
                                    alt="Driver's License Back"
                                    width={240}
                                    height={150}
                                    className="border border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Recent Feedbacks</h2>
                    <div className="space-y-4">
                        {recentFeedbacks.map((feedback) => (
                            <div key={feedback.id} className="border border-gray-200 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <strong>{feedback.user}</strong>
                                    <RatingStars rating={feedback.rating} />
                                </div>
                                <p>{feedback.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex justify-center space-x-4">
                    <Button variant="outline" className="w-32">
                        Decline
                    </Button>
                    <Button className="w-32">Accept</Button>
                </div>
            </main>
        </div>
    )
}


