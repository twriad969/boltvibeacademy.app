import Link from "next/link";

export default function DemoLessonPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="font-hind-siliguri text-3xl md:text-4xl font-bold text-center mb-8 text-[#0a2463]">
        আমাদের ডেমো লেসন
      </h1>
      
      {/* Video Player */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden mb-8">
        <div style={{position:"relative",paddingTop:"56.25%"}}>
          <iframe 
            src="https://iframe.mediadelivery.net/embed/512728/1136fc60-2849-4cc3-a4cc-3e05268c67de?autoplay=false&loop=false&muted=false&preload=true&responsive=true" 
            loading="lazy" 
            style={{border:0,position:"absolute",top:0,height:"100%",width:"100%"}} 
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>

      {/* Course Description */}
      <p className="font-hind-siliguri text-lg text-center max-w-2xl mb-8 text-slate-700">
        আমাদের কোর্সে আরও ৫০+ লেসন আছে। এছাড়াও ট্রেন্ডিং আপডেট এবং সাপ্তাহিক আপডেট পাবে তারা।
      </p>

      {/* Call to Action Buttons */}
      <div className="flex gap-4">
        <Link href="https://vibeacademy.app/#checkout" passHref>
          <button className="font-hind-siliguri bg-[#5D28E0] hover:bg-[#4A20B5] text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 shadow-lg">
            কিনতে চাই
          </button>
        </Link>
        <Link href="https://preview--zinc-gallery-studio.lovable.app/" passHref>
          <button className="font-hind-siliguri bg-[#2E8B57] hover:bg-[#1F6B3F] text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 shadow-lg">
            রিভিউ দেখুন
          </button>
        </Link>
      </div>
    </div>
  );
}
