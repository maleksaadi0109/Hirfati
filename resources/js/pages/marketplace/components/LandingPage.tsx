import React, { useState, useEffect, useRef } from 'react';
import { Search, Wrench, GraduationCap, Home, Zap, Hammer, Paintbrush, ChevronDown, Star, MapPin, ArrowRight, Shield, Clock, Heart, CheckCircle, Award, Users, TrendingUp, Sparkles } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

interface LandingPageProps {
  onSearch: (query: string, category: string) => void;
  onNavigate: (page: string) => void;
}

// 3D Floating Shapes Component
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
        className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-orange-400/30 to-pink-400/30 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
        className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
        className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"
      />

      {/* Floating geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: 'transform' // Performance optimization
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        >
          <div
            className={`w-${2 + Math.floor(Math.random() * 4)} h-${2 + Math.floor(Math.random() * 4)} ${i % 3 === 0 ? 'bg-orange-400/20' : i % 3 === 1 ? 'bg-blue-400/20' : 'bg-purple-400/20'
              } ${i % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'}`}
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Parallax Section Component
const ParallaxSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const categories = [
  { id: 'all', name: 'All Categories', icon: Search },
  { id: 'maintenance', name: 'Maintenance', icon: Wrench },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'construction', name: 'Construction', icon: Hammer },
  { id: 'electrical', name: 'Electrical', icon: Zap },
  { id: 'painting', name: 'Painting', icon: Paintbrush },
  { id: 'home-services', name: 'Home Services', icon: Home },
  { id: 'moving', name: 'Moving', icon: ArrowRight },
];

const featuredServices = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    service: 'Professional Electrician',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 'From 50 LYD',
    location: 'Tripoli',
    verified: true,
  },
  {
    id: 2,
    name: 'Sarah Khaled',
    service: 'English Tutor',
    rating: 5.0,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 'From 40 LYD/hr',
    location: 'Benghazi',
    verified: true,
  },
  {
    id: 3,
    name: 'Mohamed Ali',
    service: 'Plumbing Expert',
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 'From 60 LYD',
    location: 'Misrata',
    verified: true,
  },
  {
    id: 4,
    name: 'Layla Mahmoud',
    service: 'Interior Designer',
    rating: 4.9,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 'Custom Quote',
    location: 'Tripoli',
    verified: true,
  },
];

const stats = [
  { icon: Users, value: '1M+', label: 'Active Users' },
  { icon: CheckCircle, value: '5M+', label: 'Tasks Completed' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
  { icon: Award, value: '50K+', label: 'Verified Taskers' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export function LandingPage({ onSearch, onNavigate }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 20;
    }
    return false;
  });

  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000 })]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, 'all');
  };

  const handleCategoryClick = (categoryId: string) => {
    onSearch('', categoryId);
  };

  return (
    <div className="flex flex-col bg-slate-50 font-sans selection:bg-orange-200" style={{ flex: '1 0 auto' }}>
      {/* Enhanced Navbar with optimized blur effect */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/95 backdrop-blur-sm shadow-lg shadow-slate-900/5 py-3'
        : 'bg-white/60 backdrop-blur-md py-4'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: scrolled
                    ? '0 0 0 0px rgba(249, 115, 22, 0)'
                    : '0 0 0 4px rgba(249, 115, 22, 0.1)'
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-xl overflow-hidden border-2 border-orange-500/20"
              >
                <img
                  src="/images/hirfati-logo.jpg"
                  alt="حرفتي Logo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent tracking-tight">
                Hirfati
              </span>
              <div className="text-[10px] text-orange-600 font-semibold -mt-1">حرفتي</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <a
              href="/login"
              className="text-slate-600 font-semibold hover:text-orange-600 px-4 py-2 rounded-full transition-all duration-300 hidden sm:block hover:bg-orange-50"
            >
              Sign In
            </a>
            <a
              href="/login"
              className="relative px-6 py-2.5 rounded-full font-bold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 active:scale-95 overflow-hidden group"
            >
              <span className="relative z-10">Become a Tasker</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Enhanced Hero Section with 3D effects */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
          <FloatingShapes />
        </div>

        {/* Animated grid */}
        <div className="absolute inset-0 z-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              {/* Trending badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full mb-6 border border-orange-200/50 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-900">Trusted by 1M+ Libyans</span>
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-6xl sm:text-8xl font-extrabold text-slate-900 mb-8 leading-[1.05] tracking-tight"
              >
                Get help. <br />
                <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                  Gain happiness.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl sm:text-2xl text-slate-600 mb-12 font-medium max-w-lg leading-relaxed"
              >
                Connect with trusted local experts for home repairs, errands, and more.
                <span className="text-slate-900 font-bold decoration-orange-400/30 underline decoration-4 underline-offset-4"> Your time matters.</span>
              </motion.p>

              {/* Enhanced Search Bar with Glassmorphism */}
              <motion.form
                variants={scaleIn}
                onSubmit={handleSearch}
                className="relative max-w-xl group"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative flex items-center p-3 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-900/10 border border-white/50 focus-within:border-orange-400/50 focus-within:ring-4 focus-within:ring-orange-100 transition-all duration-300"
                >
                  <div className="pl-4 pr-3 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                    <Search className="w-7 h-7" />
                  </div>
                  <input
                    type="text"
                    placeholder="What do you need help with?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-xl text-slate-900 placeholder-slate-400 h-14 px-2 font-medium"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-2xl font-bold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                  >
                    <a href='/login'>
                      Get Help
                    </a>
                  </motion.button>
                </motion.div>

                {/* Popular Pills */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-6 flex flex-wrap items-center gap-3 text-sm font-medium pl-2"
                >
                  <span className="text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Popular:
                  </span>
                  {['Cleaning', 'Mounting', 'Moving', 'Repairs'].map(tag => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="relative px-4 py-2 rounded-full bg-gradient-to-r from-white to-slate-50 border border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-600 hover:shadow-md transition-all overflow-hidden group"
                    >
                      <span className="relative z-10">{tag}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-50 to-pink-50"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ))}
                </motion.div>
              </motion.form>

              {/* Stats */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 grid grid-cols-3 gap-6"
              >
                {stats.slice(0, 3).map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Icon className="w-4 h-4 text-orange-600" />
                        <div className="font-bold text-slate-900">{stat.value}</div>
                      </div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right Image with 3D perspective */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:h-[600px] hidden lg:block"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover:scale-[1.02] transition-all duration-700"
                whileHover={{
                  rotateY: -5,
                  rotateX: 5,
                  z: 50
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src="/images/hero-handyman.jpg"
                  alt="Professional handyman at work"
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Floating trust badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex -space-x-3">
                      {featuredServices.slice(0, 3).map((service, i) => (
                        <motion.img
                          key={i}
                          src={service.image}
                          alt=""
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="w-10 h-10 rounded-full border-3 border-white shadow-lg object-cover"
                        />
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <div className="font-bold text-slate-900">Trusted by 1M+</div>
                        <Shield className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs text-slate-600 ml-1">4.9/5</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "Verified reviews from real neighbors across Libya."
                  </p>
                </motion.div>

                {/* Floating particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-orange-400/40 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </motion.div>

              {/* 3D shadow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-3xl -z-10 translate-y-8" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid with 3D cards */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Popular projects in <span className="text-orange-600">your area</span>
            </h2>
            <p className="text-slate-600 text-lg">Choose from thousands of skilled professionals</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  variants={fadeInUp}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-300 h-48 overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    {/* Icon Container */}
                    <div className="w-16 h-16 rounded-full bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-8 h-8 text-orange-600 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Category Name */}
                    <span className="text-lg font-semibold text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                      {category.name}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Value Proposition with parallax */}
      <section id="how-it-works" className="py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-300/20 to-pink-300/20 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-900">Simple & Fast</span>
            </motion.div>
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Everyday life made <span className="text-orange-600">easier</span>
            </h2>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto">
              Three simple steps to get your tasks done by verified professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Choose your Tasker",
                desc: "Browse trusted Taskers by skills, reviews, and price. All profiles verified.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Clock,
                title: "Schedule it",
                desc: "Get your project done as soon as tomorrow. Flexible timing that works for you.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: CheckCircle,
                title: "Pay securely",
                desc: "Pay directly through the حرفتي platform only when served. Your money is protected.",
                color: "from-orange-500 to-red-500"
              }
            ].map((item, idx) => (
              <ParallaxSection key={idx}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    rotateY: 5
                  }}
                  className="relative group h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-200/30 transition-all duration-500 border border-slate-100 overflow-hidden h-full">
                    {/* Number badge */}
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-600 transition-all">
                      {idx + 1}
                    </div>

                    {/* Icon with gradient */}
                    <motion.div
                      whileHover={{ rotateY: 360 }}
                      transition={{ duration: 0.8 }}
                      className={`w-16 h-16 mb-6 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">{item.desc}</p>

                    {/* Hover gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />

                    {/* Bottom accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                  </div>
                </motion.div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Taskers with 3D carousel */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-4">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
              >
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-900">Top Performers</span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
                Top Rated <span className="text-orange-600">Taskers</span>
              </h2>
              <p className="text-slate-600 mt-2">Verified professionals you can trust</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl"
            >
              See all
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
            <div className="flex gap-6">
              {featuredServices.map((service, idx) => (
                <div key={service.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{
                      y: -15,
                      rotateY: 5,
                      scale: 1.02
                    }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-2xl hover:shadow-orange-200/30 transition-all cursor-pointer h-full flex flex-col group relative overflow-hidden"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Verified badge */}
                    {service.verified && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10"
                      >
                        <CheckCircle className="w-5 h-5 text-white" />
                      </motion.div>
                    )}

                    {/* Profile section */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.1, rotateZ: 5 }}
                          className="w-16 h-16 rounded-2xl overflow-hidden border-3 border-orange-200 shadow-lg"
                        >
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        {/* Online indicator */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-md" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-1">
                          {service.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-yellow-500 text-sm font-bold">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1">{service.rating}</span>
                          </div>
                          <span className="text-slate-400 text-sm">({service.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {service.location}
                        </div>
                      </div>
                    </div>

                    {/* Service info */}
                    <div className="mb-6 flex-1">
                      <h5 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-orange-600" />
                        {service.service}
                      </h5>
                      <p className="text-sm text-slate-500 italic line-clamp-2">
                        "Professional, punctual, and did a fantastic job. Highly recommend!"
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <span className="font-bold text-slate-900 text-lg">{service.price}</span>
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="text-orange-600 text-sm font-bold group-hover:underline flex items-center gap-1"
                      >
                        View Profile
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </div>

                    {/* Hover gradient effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-pink-50/0 group-hover:from-orange-50/50 group-hover:to-pink-50/30 transition-all duration-500 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA with 3D effect */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-600/20 to-pink-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20"
          >
            <Heart className="w-5 h-5 text-pink-400 fill-current" />
            <span className="text-white font-semibold">Join our community</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Don't just dream it. <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Task it.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join the community of people getting things done. From small errands to big projects.
            <span className="text-orange-400 font-semibold"> Start today.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-full font-bold text-lg transition-all text-center shadow-2xl shadow-orange-900/50 hover:shadow-orange-500/50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.button
              onClick={() => {
                const howItWorks = document.getElementById('how-it-works');
                howItWorks?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              See How It Works
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-4 gap-8"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center"
                >
                  <Icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="font-bold text-white text-2xl mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-8 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            {/* Brand column */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-orange-500/20">
                  <img
                    src="/images/hirfati-logo.jpg"
                    alt="حرفتي Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xl">Hirfati</div>
                  <div className="text-xs text-orange-600">حرفتي</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Connecting communities with trusted professionals across Libya.
              </p>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-100 flex items-center justify-center transition-colors"
                  >
                    <div className="w-5 h-5 bg-slate-400 rounded-full" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            <div>
              <h5 className="font-bold text-slate-900 mb-4">Discover</h5>
              <ul className="space-y-3 text-slate-600 text-sm">
                {['Become a Tasker', 'Services By City', 'All Services', 'Elite Taskers'].map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3, color: '#ea580c' }}
                      className="hover:text-orange-600 transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-4">Company</h5>
              <ul className="space-y-3 text-slate-600 text-sm">
                {['About Us', 'Careers', 'Press', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3, color: '#ea580c' }}
                      className="hover:text-orange-600 transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-4">Learn More</h5>
              <ul className="space-y-3 text-slate-600 text-sm">
                {['How it Works', 'Safety', 'Blog', 'Terms & Privacy'].map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3, color: '#ea580c' }}
                      className="hover:text-orange-600 transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-4">Download App</h5>
              <p className="text-sm text-slate-600 mb-4">Get the app for the best experience</p>
              <div className="flex flex-col gap-3">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-white/20 rounded" />
                  App Store
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-white/20 rounded" />
                  Google Play
                </motion.a>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-slate-400 border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>&copy; 2025 حرفتي (Hirfati). All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-orange-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}