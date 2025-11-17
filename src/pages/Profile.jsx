import Navbar from '../components/Navbar'

export default function Profile(){
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold">Profile</h1>
        <p className="text-white/70 mt-2">Sign-in and timeline features coming soon.</p>
      </main>
    </div>
  )
}
