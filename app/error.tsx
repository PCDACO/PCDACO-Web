"use client"
import { ArrowLeft, Car, MapPin, Route, AlertTriangle, Gauge, Key, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white p-4" >
      <div className="w-full max-w-4xl" >
        {/* Admin header bar */}
        < div className="w-full bg-slate-800 rounded-t-lg p-4 flex items-center justify-between border-b border-slate-700" >
          <div className="flex items-center gap-2" >
            <Car className="h-5 w-5 text-blue-400" />
            <span className="font-semibold" > PCDACO Admin </span>
          </div>
          < div className="flex items-center gap-2 text-slate-400 text-sm" >
            <span>Admin Portal </span>
            <span>•</span>
            < span > System Status </span>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-slate-800/50 p-6 md:p-10 rounded-b-lg border border-t-0 border-slate-700" >
          <div className="grid md:grid-cols-2 gap-8 items-center" >
            <div className="space-y-6" >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium" >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Vehicle Not Found
              </div>

              < h1 className="text-7xl font-bold tracking-tighter" >
                <span className="text-red-500" > 404 </span> Error
              </h1>

              < p className="text-xl text-slate-300" >
                The vehicle you're looking for has been checked out or doesn't exist in our fleet database.
              </p>

              < div className="pt-4 space-y-4" >
                <div className="flex items-start gap-3" >
                  <div className="mt-1 bg-slate-700 p-2 rounded-full" >
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  < div >
                    <h3 className="font-medium" > Last Known Location </h3>
                    < p className="text-slate-400 text-sm" > The requested resource was not found on this server.</p>
                  </div>
                </div>

                < div className="flex items-start gap-3" >
                  <div className="mt-1 bg-slate-700 p-2 rounded-full" >
                    <Route className="h-4 w-4 text-green-400" />
                  </div>
                  < div >
                    <h3 className="font-medium" > Suggested Routes </h3>
                    < p className="text-slate-400 text-sm" > Return to the dashboard or search for another vehicle.</p>
                  </div>
                </div>
              </div>

              < div className="flex flex-col sm:flex-row gap-4 pt-2" >
                <Link
                  href="/statistics"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Return to Dashboard
                </Link>
                < Link
                  href="javascript:history.back()"
                  className="inline-flex items-center justify-center rounded-md border border-slate-600 bg-transparent px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </Link>
              </div>
            </div>

            {/* Creative car illustration */}
            <div className="relative h-64 md:h-80 flex items-center justify-center" >
              {/* Road */}
              < div className="absolute bottom-0 w-full h-12 bg-slate-700 rounded-lg" >
                <div className="relative h-full" >
                  {/* Road markings */}
                  < div className="absolute top-1/2 left-0 right-0 h-1 flex justify-between transform -translate-y-1/2" >
                    <div className="w-10 h-1 bg-yellow-400" > </div>
                    < div className="w-10 h-1 bg-yellow-400" > </div>
                    < div className="w-10 h-1 bg-yellow-400" > </div>
                    < div className="w-10 h-1 bg-yellow-400" > </div>
                    < div className="w-10 h-1 bg-yellow-400" > </div>
                  </div>
                </div>
              </div>

              {/* Car silhouette */}
              <div className="absolute bottom-12 transform translate-y-1/2" >
                <div className="relative w-48 h-20" >
                  {/* Car body */}
                  < div className="absolute bottom-0 w-full h-10 bg-red-500 rounded-md" > </div>

                  {/* Car top */}
                  <div className="absolute bottom-10 left-8 right-8 h-10 bg-red-500 rounded-t-lg" > </div>

                  {/* Windows */}
                  <div className="absolute bottom-10 left-10 right-10 h-8 bg-blue-300 rounded-t-lg opacity-70" > </div>

                  {/* Wheels */}
                  <div className="absolute bottom-0 left-6 w-8 h-8 bg-slate-900 rounded-full border-4 border-slate-400" > </div>
                  < div className="absolute bottom-0 right-6 w-8 h-8 bg-slate-900 rounded-full border-4 border-slate-400" > </div>
                </div>
              </div>

              {/* Error signs */}
              <div className="absolute top-4 right-4 flex flex-col items-end gap-3" >
                <div className="bg-slate-700 p-3 rounded-lg flex items-center gap-2" >
                  <Gauge className="h-5 w-5 text-red-400" />
                  <span className="text-sm font-medium" > Status: Not Found </span>
                </div>
                < div className="bg-slate-700 p-3 rounded-lg flex items-center gap-2" >
                  <Key className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium" > Access: Denied </span>
                </div>
              </div>

              {/* Direction sign */}
              <div className="absolute top-1/4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center" >
                <span className="font-medium mr-2" > Dashboard </span>
                < ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Admin footer */}
          <div className="mt-12 pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400" >
            <div>SpeedFleet Admin Portal • System Error Code: VEH - 404 </div>
            < div className="flex gap-4" >
              <Link href="/statistics" className="hover:text-white transition-colors" >
                Help Center
              </Link>
              < Link href="/statistics" className="hover:text-white transition-colors" >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

