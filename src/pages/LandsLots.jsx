import { Search, Heart, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import tinyHome1 from './tiny home 1.jpg'
import landsLotsData from '../data/landsLots.json'

export default function LandsLots() {
  const [keyword, setKeyword] = useState('')
  const [landFor, setLandFor] = useState('')
  const [price, setPrice] = useState('')
  const [sizeUnit, setSizeUnit] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [results, setResults] = useState([])
  const [sortBy, setSortBy] = useState('Keyword')

  const resetFilters = () => {
    setKeyword('')
    setLandFor('')
    setPrice('')
    setSizeUnit('')
    setZipcode('')
  }

  useEffect(() => {
    setResults(landsLotsData)
  }, [])

  const toNum = (p) => Number(p.replace(/[^0-9.]/g, ''))
  const filteredResults = results.filter((item) => {
    const text = `${item.title} ${item.state} ${item.city} ${item.address}`.toLowerCase()
    const keywordOk = keyword ? text.includes(keyword.toLowerCase()) : true
    const landForOk = landFor ? item.propertyFor === landFor : true
    const priceNum = toNum(item.price)
    let priceOk = true
    if (price === 'Under $500,000') priceOk = priceNum < 500000
    else if (price === '$500,000 - $1,000,000') priceOk = priceNum >= 500000 && priceNum <= 1000000
    else if (price === '$1,000,000+') priceOk = priceNum > 1000000
    return keywordOk && landForOk && priceOk
  })

  const keywordScore = (item) => {
    if (!keyword) return 0
    const k = keyword.toLowerCase()
    const title = item.title.toLowerCase()
    const text = `${item.title} ${item.state} ${item.city} ${item.address}`.toLowerCase()
    if (!text.includes(k)) return 0
    const occurrences = (text.match(new RegExp(k, 'g')) || []).length
    const firstIndex = text.indexOf(k)
    const startsInTitle = title.startsWith(k) ? 1 : 0
    const inTitle = title.includes(k) ? 1 : 0
    return occurrences * 10 + (100 - firstIndex) + startsInTitle * 10 + inTitle * 5
  }

  const sortedResults =
    sortBy === 'Keyword' && !keyword
      ? filteredResults
      : [...filteredResults].sort((a, b) => {
          if (sortBy === 'Keyword') return keywordScore(b) - keywordScore(a)
          if (sortBy === 'Highest Price') return toNum(b.price) - toNum(a.price)
          if (sortBy === 'Lowest Price') return toNum(a.price) - toNum(b.price)
          if (sortBy === 'Name') return a.title.localeCompare(b.title)
          return 0
        })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span> / </span>
          <span className="text-yellow-600 font-medium">Lands/Lots</span>
        </div>
      </div>

      <div className="lg:col-span-3">
        <h1 className="text-3xl font-semibold text-gray-900">Lands/Lots</h1>
      </div>

      <aside className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keyword</label>
            <div className="relative">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Keyword"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Land For</label>
            <select
              value={landFor}
              onChange={(e) => setLandFor(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Land For</option>
              <option>Sale</option>
              <option>Rent</option>
              <option>Auction</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select Price</option>
              <option>Under $500,000</option>
              <option>$500,000 - $1,000,000</option>
              <option>$1,000,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size Unit</label>
            <select
              value={sizeUnit}
              onChange={(e) => setSizeUnit(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Size Unit</option>
              <option>SqFt</option>
              <option>Acre</option>
              <option>Hectare</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zipcode</label>
            <input
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Zipcode"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button type="button" className="py-2 px-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold">Search</button>
            <button type="button" onClick={resetFilters} className="py-2 px-3 rounded-full border border-gray-300 text-gray-700 font-semibold">Reset</button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800">Lands/Lots For Rent</h2>
        </div>
      </aside>

      <section className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
          <p className="text-gray-700 font-medium">Search results</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1 px-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option>Keyword</option>
              <option>Highest Price</option>
              <option>Lowest Price</option>
              <option>Name</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedResults.map((item, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
              <div className="relative">
                <img src={tinyHome1} alt={item.title} className="w-full h-48 object-cover" />
                <span className="absolute top-3 left-3 bg-yellow-300 text-gray-900 text-xs font-semibold px-3 py-1 rounded-md">Sale</span>
                <button type="button" className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-black/50 backdrop-blur text-white flex items-center justify-center">
                  <Heart className="h-5 w-5" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white text-2xl font-bold">{item.price}</div>
              </div>
              <div className="p-4">
                <div className="text-gray-900 font-semibold">{item.title}</div>
                <div className="mt-2 space-y-1 text-sm text-gray-700">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>State: {item.state}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>City: {item.city}</span></div>
                  <div className="flex items-start gap-2"><MapPin className="h-4 w-4" /><span>Address: {item.address}</span></div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-3 text-sm">
                  <span className="text-yellow-600 font-medium">Listed by:</span>
                  <span className="ml-1 text-gray-800">{item.listedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
