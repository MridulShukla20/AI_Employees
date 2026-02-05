import { Link } from "react-router-dom";
import { Twitter, Linkedin, Facebook } from "lucide-react";

const footerLinks = {
    product: [
        { label: "AI Employees", href: "/ai-employees" },
        { label: "How It Works", href: "/#how-it-works" },
        { label: "Report Cards", href: "/#report-cards" },
        { label: "Pricing", href: "/pricing" },
    ],
    company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security", href: "/security" },
        { label: "GDPR", href: "/gdpr" },
    ],
};

const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "X (Twitter)" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

export function FooterV3() {
    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8 font-sans">
            <div className="container mx-auto px-6 max-w-[1240px]">

                {/* Main Grid: 4 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* --- Brand Column (Left) --- */}
                    <div className="flex flex-col items-start space-y-6">
                        {/* Logo */}
                        <Link to="/" className="block">
                            <img
                                src="/primerole-logo.png"
                                alt="PrimeRole"
                                className="h-8 w-auto"
                            />
                        </Link>

                        {/* Mission Statement */}
                        <p className="text-[15px] text-slate-500 leading-relaxed font-normal max-w-[280px]">
                            The AI-Human collaboration platform where humans lead and AI employees execute.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors duration-200"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* --- Product Column --- */}
                    <div>
                        <h4 className="font-semibold text-slate-900 text-sm mb-5">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-slate-500 hover:text-slate-900 transition-colors text-[14px] font-normal block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Company Column --- */}
                    <div>
                        <h4 className="font-semibold text-slate-900 text-sm mb-5">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-slate-500 hover:text-slate-900 transition-colors text-[14px] font-normal block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Legal Column --- */}
                    <div>
                        <h4 className="font-semibold text-slate-900 text-sm mb-5">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-slate-500 hover:text-slate-900 transition-colors text-[14px] font-normal block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- Bottom Bar --- */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[13px] text-slate-500 font-normal">
                        © 2026 PrimeRole. All rights reserved.
                    </p>

                    <p className="text-[13px] text-slate-500 font-normal">
                        Made with 💜 for teams who believe in AI-human collaboration
                    </p>
                </div>
            </div>
        </footer>
    );
}
