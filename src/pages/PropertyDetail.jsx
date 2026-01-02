import { useParams } from 'react-router-dom'
import { MapPin, Mail, Phone, User as UserIcon, Bed, CookingPot, Home, Building2, Ruler, Calendar, ListChecks, Facebook, Linkedin, MessageCircle } from 'lucide-react'
import tinyHome1 from './tiny home 1.jpg'
import tinyHomesData from '../data/tinyHomes.json'
import auctionData from '../data/auction.json'
import tradeshowData from '../data/tradeshow.json'
import landsLotsData from '../data/landsLots.json'

export default function PropertyDetail() {
  const { id } = useParams()
  
  // Find the property by ID in any dataset
  const rawData = tinyHomesData.find(item => item.id === id) || 
               auctionData.find(item => item.id === id) || 
               tradeshowData.find(item => item.id === id) ||
               landsLotsData.find(item => item.id === id)

  // Normalize data structure
  const data = rawData ? {
    ...rawData,
    location: rawData.location || `${rawData.address}, ${rawData.city}, ${rawData.state}`,
    type: rawData.type || 'Land/Lot',
    agent: rawData.agent || rawData.listedBy,
    beds: rawData.beds || 'N/A',
    sleeps: rawData.sleeps || 'N/A',
    kitchen: rawData.kitchen || 'N/A',
  } : null

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Property Not Found</h2>
        <p className="text-gray-500">The property you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-12 pb-12 pt-8">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-12">
        <div className="xl:col-span-3 space-y-8">
          {/* Header Info */}
          <div className="space-y-2">
            <div>
               <span className="bg-[#FFF5E6] text-[#FFA500] px-4 py-1.5 rounded-md font-medium text-sm inline-block mb-2">{data.propertyFor}</span>
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <h1 className="text-4xl font-normal text-[#333333] tracking-tight uppercase">{data.title}</h1>
                 <div className="text-3xl font-bold text-[#333333]">
                    {data.price}
                 </div>
               </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="h-5 w-5 text-[#333333]" />
              <span className="text-base text-gray-500">{data.location}</span>
            </div>
          </div>

          {/* Description Placeholder since data is missing */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>This is a beautiful {data.type.toLowerCase()} located in {data.location}. It features {data.beds} beds, {data.sleeps} sleeps, and {data.kitchen} kitchen(s). Contact the agent for more details.</p>
          </div>

          <div className="pt-4 flex items-center gap-6">
            <span className="text-gray-600 font-medium text-lg">Share</span>
            <div className="flex gap-2">
              <a className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 shadow-sm" href="#" aria-label="Share on Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 shadow-sm" href="#" aria-label="Share on LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 shadow-sm" href="#" aria-label="Share on WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <aside className="xl:col-span-2">
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-lg sticky top-24">
            <h2 className="text-2xl font-normal text-[#333333] mb-6">Home Listed By</h2>
            <hr className="border-gray-100 mb-8" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden flex-shrink-0 text-white">
                   <UserIcon className="w-10 h-10" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-600 text-base flex items-center gap-2">
                    <UserIcon className="h-4 w-4" /> <span>{data.agent}</span>
                  </div>
                </div>
              </div>
              <button type="button" className="bg-[#F5A623] hover:bg-[#E09612] text-white px-6 py-3 rounded-full font-medium text-sm transition-colors shadow-sm whitespace-nowrap">View My Listings</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.03)]">
          <h3 className="text-2xl font-semibold text-gray-900">Home Details</h3>
          <hr className="border-gray-100 my-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="flex items-start gap-4">
              <Home className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Property Type :</div>
                <div className="font-bold text-gray-900 text-lg">{data.type}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ListChecks className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Model :</div>
                <div className="font-bold text-gray-900 text-lg">{data.modelLabel}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Bed className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Sleeps :</div>
                <div className="font-bold text-gray-900 text-lg">{data.sleeps}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CookingPot className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Kitchen :</div>
                <div className="font-bold text-gray-900 text-lg">{data.kitchen}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Bed className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Beds :</div>
                <div className="font-bold text-gray-900 text-lg">{data.beds}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <iframe
          title="Property Map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(data.location)}&t=k&output=embed`}
          className="w-full h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}
