import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Available Roles", href: "/ai-employees" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/#how-it-works" },
];

export function HeaderV3() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex items-center justify-between h-18 py-4">

                        {/* Logo */}
                        <Link to="/" className="block">
                            <img
                                src="/logo.png"
                                alt="PrimeRole"
                                className="h-8 w-auto"
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className={`text-sm font-medium transition-colors relative group ${location.pathname === link.href
                                        ? "text-purple-600"
                                        : "text-gray-600 hover:text-purple-600"
                                        }`}
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTAs */}
                        <div className="hidden md:flex items-center gap-3">
                            <Button
                                variant="ghost"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg px-5"
                            >
                                Sign In
                            </Button>
                            <Button
                                className="text-sm font-medium rounded-lg px-5"
                                style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}
                            >
                                Start Free
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-900" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-900" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden"
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-900 py-3 border-b border-gray-100"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 mt-4">
                                <Button
                                    variant="outline"
                                    className="w-full justify-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    className="w-full justify-center"
                                    style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Start Free
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
